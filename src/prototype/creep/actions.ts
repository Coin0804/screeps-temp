import { store2Array } from "../../utils/util.js";
import MoveCreep from "./go.js";




/**
 * creep的各项行动，挂载到creep原型
 * 
 */
export default class Worker extends MoveCreep{
    /**
     * 捡起掉落物
     * 因为掉落物要贴脸才能捡，所以应该没有效率的问题
     */
    public dopickup(resource:Resource){
        //先判断背包是否已满，免得进行多余操作
        if(this.store.getFreeCapacity(resource.resourceType) == 0) return ERR_FULL;
        /**
         * 不必判断目标中是否还有资源，
         * 因为如果没有的话目标就没了
         */
        let err:number = this.pickup(resource);
        if(err == ERR_NOT_IN_RANGE){
            err = this.goTo(resource.pos);
        }
        return err;
    }

    /**
     * 升级控制中心
     * dush默认false，
     * 如果开启就会尽可能挤占靠前位置
     */
    public doupgrade(dush=false){
        //先判断能量是否还有，免得进行多余操作
        if(this.store.getUsedCapacity(RESOURCE_ENERGY) == 0) return ERR_NOT_ENOUGH_ENERGY;
        //看看房间对不对
        if(this.room.controller && this.room.controller.my){
            let err = this.upgradeController(this.room.controller);
            if(err == OK) this.memory.crossLevel =11;
            else this.memory.crossLevel =10;
            if(err == ERR_NOT_IN_RANGE){
                err = this.goTo(this.room.controller.pos,3);
            }else if(dush){//未测试，就硬挤
                err = this.goTo(this.room.controller.pos,1);
            }
            return err;
        }
        return ERR_NOT_OWNER;
    }

    /**
     * 写逻辑的事，能叫抄吗
     * 这叫借鉴！
     */
    public do63upgrade(){
        //todo
    }
    
    /**
     * 储存物品指定资源
     * 
     */
    public dostore(target:AnyStoreStructure,resourceType = RESOURCE_ENERGY){
        //先判断要放的东西是否有，免得进行多余操作
        if(this.store.getUsedCapacity(resourceType) == 0) return ERR_NOT_ENOUGH_RESOURCES;
        //先判断要放的东西是否还能放，免得进行多余操作
        if(target && target.store.getFreeCapacity(resourceType) > 0){
            let err = this.transfer(target,resourceType);
            if(err == ERR_NOT_IN_RANGE){
                err = this.goTo(target.pos);
            }
            return err;
        }
        return ERR_FULL;
    }


    /**
     * 储存所有
     * 优先储存数量最多的
     */
    public dostoreAll(target:AnyStoreStructure){
        //先判断要放的东西是否有，免得进行多余操作
        if(this.store.getUsedCapacity() == 0) return ERR_NOT_ENOUGH_ENERGY;
        //数组化，目的是排序
        let array = store2Array(this.store);
        for(const r of array){
            //先判断要放的东西是否还能放，免得进行多余操作
            if(target && target.store.getFreeCapacity(r.resourceType) > 0){
                let err = this.transfer(target,r.resourceType);
                if(err == ERR_NOT_IN_RANGE){
                    err = this.goTo(target.pos);
                }
                if(err == OK) return err;
            }
        }
        return ERR_FULL;//全放不下再返回
    }

    /**
     * 进行建筑
     * strategy 为 1 时优先建造新建的建筑
     */
    public dobuild(strategy = 0,dush = false){
        //先判断能量是否还有，免得进行多余操作
        if(this.store.getUsedCapacity(RESOURCE_ENERGY) == 0) return ERR_NOT_ENOUGH_ENERGY;
        //待优化
        let constructionsites = this.room.find(FIND_CONSTRUCTION_SITES);
        if(constructionsites.length){
            let index = strategy? constructionsites.length-1 : 0;
            let err:number = this.build(constructionsites[index]);
            if(err == ERR_NOT_IN_RANGE){
                err = this.goTo(constructionsites[index].pos,3);
            }else if(dush){//待测试
                err = this.goTo(constructionsites[index].pos,1);
            }
            return err;
        }
        return ERR_NOT_FOUND;
    }

    public dobuildAt(pos:RoomPosition){
        //先判断能量是否还有，免得进行多余操作
        if(this.store.getUsedCapacity(RESOURCE_ENERGY) == 0) return ERR_NOT_ENOUGH_ENERGY;
        //查看该点
        if(this.room.name != pos.roomName) return ERR_NOT_IN_RANGE;
        let result = this.room.lookAt(pos).filter((s) => s.type == LOOK_CONSTRUCTION_SITES)[0];
        if(!result) return ERR_NOT_FOUND;
        //
        let err:number = this.build(result.constructionSite);
        if(err == ERR_NOT_IN_RANGE){
            err = this.goTo(result.constructionSite.pos);
        }
        return err;
    }

    /**
     * 进行维修
     * 总感觉哪里不对
     */
    public dorepair(){
        //先判断能量是否还有，免得进行多余操作
        if(this.store.getUsedCapacity(RESOURCE_ENERGY) == 0){
            // this.memory.repairTarget = null;//没能量了解绑对象 不知道为什么没成功
            return ERR_NOT_ENOUGH_ENERGY;
        } 
        //如果记忆中已经有了目标则直接读取
        let structure = this.memory.repairTarget ? Game.getObjectById(this.memory.repairTarget):null;
        //如果没有，或者目标已经完全不必维修，重新寻找目标
        if(!structure || !structure.hits || structure.hits == structure.hitsMax){
            let structures = _.groupBy(this.room.find(FIND_STRUCTURES),(s) => {
                if(s.structureType == STRUCTURE_WALL || s.structureType == STRUCTURE_RAMPART){
                    if(s.hits < (global.plan.wall || 250000)) return "wall";
                }else if(s.hits && s.hits < s.hitsMax*0.85){
                    return "unhealthy";
                } 
                return "healthy";
            });
            if(structures.unhealthy){
                structure = this.pos.findClosestByRange(structures.unhealthy);
                console.log("going to repair"+structure.pos.stringify()+"because it's unhealthy")
            }else if(structures.wall){
                structure = this.pos.findClosestByRange(structures.wall);
                console.log("going to repair"+structure.pos.stringify()+"because it's wall")
            }else{
                structure = null;
            }
        }
        //找到目标开始维修，否则报错
        if(structure){
            
            this.memory.repairTarget = structure.id;//缓存
            let err:number = this.repair(structure);
            if(err == ERR_NOT_IN_RANGE){
                err = this.goTo(structure.pos);
            }
            return err;
        }
        this.memory.repairTarget = null;//否则解绑记忆
        return ERR_INVALID_TARGET;
    }
    
    /**
     * 进行挖矿（能源）
     */
    public domine(){
        //待优化
        let source:Source;
        if(this.memory.source){
            source = this.room.find(FIND_SOURCES)[this.memory.source];
        }else{
            source = this.pos.findClosestByRange(FIND_SOURCES);
        }
        let err:number = this.harvest(source);
        if(err == ERR_NOT_IN_RANGE){
            err = this.goTo(source.pos);
        }
        return err;
    }

    public dowithdraw(target:AnyStoreStructure|Ruin|Tombstone,resourceType = RESOURCE_ENERGY){
        //先判断背包是否已满，免得进行多余操作
        if(this.store.getFreeCapacity(resourceType) == 0) return ERR_FULL;
        //先判断要取的东西是否有，免得进行多余操作
        if(!target || target.store.getUsedCapacity(resourceType) == 0) return ERR_NOT_ENOUGH_RESOURCES;
        let err = this.withdraw(target,resourceType);
        if(err == ERR_NOT_IN_RANGE){
            err = this.goTo(target.pos);
        }
        return err;
    }

    public dowithdrawAt(pos:RoomPosition,resourceType = RESOURCE_ENERGY){
        //先判断背包是否已满，免得进行多余操作
        if(this.store.getFreeCapacity(resourceType) == 0) return ERR_FULL;
        //查看该点
        if(this.room.name != pos.roomName) return ERR_NOT_IN_RANGE;
        let result = this.room.lookAt(pos).filter((s) => s.type == LOOK_STRUCTURES && s.structure.structureType == STRUCTURE_CONTAINER)[0];
        if(!result) return ERR_NOT_FOUND;
        //要过去先的
        let target = <StructureContainer>result.structure;
        if(!target) return ERR_NOT_ENOUGH_RESOURCES;
        let err = this.withdraw(target,resourceType);
        if(err != OK){
            err = this.goTo(target.pos);
        }
        return err;
    }

    public dowithdrawAll(target:AnyStoreStructure|Ruin|Tombstone){
        //先判断背包是否已满，免得进行多余操作
        if(this.store.getFreeCapacity() == 0) return ERR_FULL;
        //数组化，目的是排序
        let array = store2Array(target.store);
        for(const r of array){
            //先判断要取的东西是否有，免得进行多余操作
            if(!target || target.store.getUsedCapacity(r.resourceType) == 0) return ERR_NOT_ENOUGH_RESOURCES;
            let err = this.withdraw(target,r.resourceType);
            if(err == ERR_NOT_IN_RANGE){
                err = this.goTo(target.pos);
            }
            if(err ==OK) return err;
        }
    }

    public doclaim(controller:StructureController){
        let err:number = this.claimController(controller);
        if(err == ERR_NOT_IN_RANGE){
            err = this.goTo(controller.pos);
        }
        return err;
    }

    public doreserve(controller:StructureController){
        let err:number = this.reserveController(controller);
        if(err == ERR_NOT_IN_RANGE){
            err = this.goTo(controller.pos);
        }
        return err;
    }

    searchAndCollecte(){
        //先判断背包是否已满，免得进行多余操作
        if(this.store.getFreeCapacity() <= 50) return ERR_FULL;
        let resource = this.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
        if(resource && resource.amount > 100){
            return this.dopickup(resource);
        }else{
            let tombstone = this.pos.findClosestByRange(FIND_TOMBSTONES,{
                    filter: t => {
                        return t.store.getUsedCapacity() > 0;
                    }
                });
            if(tombstone){
                return this.dowithdraw(tombstone);
            }else{
                let ruin = this.pos.findClosestByRange(FIND_RUINS,{
                    filter: r => {
                        return r.store.getUsedCapacity() > 0;
                    }
                });
                if(ruin){
                    return this.dowithdraw(ruin);
                }else{
                    let enimyStructure = this.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES,{filter:(s) => s.structureType == STRUCTURE_TERMINAL})
                    if(enimyStructure)return this.dowithdraw(<StructureTerminal>enimyStructure);

                    return ERR_NOT_FOUND;
                }
            }
        }
    }


    withdrawInStorage(){
        let storages:AnyStoreStructure[] = this.room.find(FIND_STRUCTURES,{filter:
            (s) => (s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_STORAGE)&& s.store.getUsedCapacity(RESOURCE_ENERGY) > 0
        });
        let storage = this.pos.findClosestByRange(storages);
        if(storage) {
            let err = this.dowithdraw(storage);
            if(err == ERR_NOT_ENOUGH_RESOURCES && Game.flags[this.room.name+"onhold"]){
                err = this.goTo(Game.flags[this.room.name+"onhold"].pos);
            }
            return err
        }
        return ERR_NOT_FOUND;
    }
}