import {getOppositeDirection,serializeFarPath} from '../../utils/util.js'
/**
 * 可移动的creep，挂载到Creep原型
 */
export default class MoveCreep extends Creep{
    public requestCross(direction:DirectionConstant){
        if (!this.memory.crossLevel) this.memory.crossLevel = 10;    // 10为默认对穿等级
        // 获取目标方向一格的位置
        const fontPos = this.pos.directionToPos(direction);
        // 在出口、边界
        if (!fontPos) return ERR_NOT_FOUND;
        const fontCreep = (fontPos.lookFor(LOOK_CREEPS)[0] || fontPos.lookFor(LOOK_POWER_CREEPS)[0]);
        if (!fontCreep) return ERR_NOT_FOUND;
        if (fontCreep.owner.username != this.owner.username) return;
        if (fontCreep.manageCross(direction,this.memory.crossLevel)){
            this.move(direction);
            return OK;
        }
        return ERR_BUSY;
    }

    public manageCross(direction:DirectionConstant,crossLevel:number){
        if (!this.memory) return true;
        if (!this.memory.crossLevel) this.memory.crossLevel = 10;
        if (this.memory.standed || this.memory.crossLevel > crossLevel){
            return false;
        }
        this.move( getOppositeDirection(direction));
        return true;
    }

    public go(direction:DirectionConstant){
        const moveResult = this.move(direction);
        if (moveResult != OK) return moveResult;
        // 如果ok的话，有可能撞上东西了或者一切正常
        const currentPos = `${this.pos.x}/${this.pos.y}`
        if (this.memory.moveData.prePos && currentPos == this.memory.moveData.prePos){
            const crossResult = this.memory.disableCross ? ERR_BUSY : this.requestCross(direction);
            if (crossResult != OK){
                delete this.memory.moveData;
                return ERR_INVALID_TARGET;
            }
        }
        this.memory.moveData.prePos = currentPos;
        return OK;
    }

    public goTo(target:RoomPosition,range = 1){
        if(!global.pathCache) global.pathCache = {};
        // console.log("ready to go to "+target.stringify());
        if (!this.memory.moveData) this.memory.moveData = {index:0};
        // 确认目标没有变化，如果变化了就重新规划路线 //缓存也是
        const targetPos = target.stringify();
        if ((targetPos !== this.memory.moveData.targetPos)|| !this.memory.moveData.path){
            console.log('path changed,tring again.'+this.name);
            this.memory.moveData.targetPos = targetPos;
            this.memory.moveData.path = this.findPath(target,range);
        }
        // 还为空的话就是没有找到路径
        if (!this.memory.moveData.path){
            // console.log('no path found.');
            delete this.memory.moveData.path;
            return OK;
        }
        // 使用缓存进行移动
        const goResult = this.goByPath();
        // 如果发生撞停或者参数异常，说明缓存可能存在问题，移除缓存
        if (goResult === ERR_INVALID_TARGET){
            console.log('error happend,clear data.'+this.name);
            delete this.memory.moveData;
            const pathKey = `${this.pos.stringify()} ${target.stringify()}`;
            if(global.pathCache[pathKey]) delete global.pathCache[pathKey];
        }else if(goResult != OK && goResult != ERR_TIRED){
            // console.log(`异常码：${goResult}`);
        }
        // console.log(`异常码：${goResult}`);
        return goResult;
    }

    public goByPath(){
        if (!this.memory.moveData) return ERR_NO_PATH;
        const index = this.memory.moveData.index;
        // 移动索引超过数组上限代表到达目的地
        if (index >= this.memory.moveData.path.length){
            delete this.memory.moveData.path;
            return OK;
        }
        // 获取方向，进行移动
        const direction = <DirectionConstant>Number(this.memory.moveData.path[index]);
        const goResult = this.go(direction);
        // 移动成功，更新下次移动索引
        if (goResult == OK) this.memory.moveData.index ++;
        return goResult;
    
    }

    public findPath(target:RoomPosition,range:number){
        // console.log("ready to find path to "+target.stringify());
        /* 全局路线存储 */
        if(!global.pathCache) global.pathCache = {};
        if (!this.memory.moveData) this.memory.moveData = {};
        this.memory.moveData.index = 0;
        
        
        /* 查找全局中是否已经有预定路线，如果有了就直接返回路线 */
        const pathKey = `${this.pos.stringify()} ${target.stringify()}`;
        let path = global.pathCache[pathKey];
        if(path ) {//&& this.room.name != target.roomName
            // console.log("cache found,return");
            return path;
        }
        
        const result = PathFinder.search(this.pos,{pos:target,range:range},{
            plainCost:2,swampCost:10,maxOps:target.roomName == this.room.name?300:8000,
            roomCallback: (roomName) => {
                // if (Memory.bypassRooms && Memory.bypassRooms.includes(roomName)) return false;// 在全局绕过房间列表的房间 false
                // if (this.memory.bypassRooms && this.memory.bypassRooms.includes(roomName)) return false;// 在爬虫记忆绕过房间列表的房间 false
                if(this.room.name == target.roomName && roomName != this.room.name) return false;
                const room = Game.rooms[roomName];
                if (!room) return;// 没有视野的房间只观察地形
                let costs = new PathFinder.CostMatrix;
                // 将道路的cost设置为1，无法行走的建筑设置为255(包括未建成的)
                room.find(FIND_STRUCTURES).forEach( struct =>{
                    if (struct.structureType === STRUCTURE_ROAD){
                        costs.set(struct.pos.x,struct.pos.y,1);
                    }
                    else if (struct.structureType !== STRUCTURE_CONTAINER 
                    && (struct.structureType !==STRUCTURE_RAMPART || !struct.my)){
                        costs.set(struct.pos.x,struct.pos.y,255);
                    }
                });
                room.find(FIND_MY_CONSTRUCTION_SITES).forEach( cons => {
                    if (cons.structureType != 'road' && cons.structureType != 'rampart' && cons.structureType != 'container')
                    costs.set(cons.pos.x,cons.pos.y,255);
                });
                /* 防止撞到其他虫子造成堵虫 */
                room.find(FIND_HOSTILE_CREEPS).forEach( creep => {
                    costs.set(creep.pos.x,creep.pos.y,255);
                });
                // 不支持对穿的位置
                room.find(FIND_MY_CREEPS).forEach( creep => {
                    const cl1 = this.memory.crossLevel;
                    const cl2 = creep.memory.crossLevel;
                    if (( cl1 && cl2 && cl1 < cl2 ) || creep.memory.standed){
                        costs.set(creep.pos.x,creep.pos.y,255);
                    }else{
                        costs.set(creep.pos.x,creep.pos.y,2);
                    }
                });
                return costs;
            }
        });
        
        if (result.path.length <= 0) return null;
        // console.log(result.path.length);
        path = serializeFarPath(result.path,this.pos);
        // console.log(path,result.incomplete);
        if (!result.incomplete) global.pathCache[pathKey] = path;
        return path;
    }
}
