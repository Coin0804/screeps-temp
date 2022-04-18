import { errorMapper } from './modules/errorMapper'
import { plan1, towerPlan1 } from './plan/planloader';
import { assignAllPrototype } from './prototype/assign';
import { cleanMemory } from './utils/util';

const plan = plan1;
const towerplan = towerPlan1;
assignAllPrototype()


let spawnlist:SpawnItem[] = [];

global.plan = plan
export const loop = errorMapper(() => {
    const ticks = Game.time;
    if(!(ticks%1000))console.log(`${ticks}`);
    if(Game.cpu.bucket == 10000){
        Game.cpu.generatePixel();
        console.log("good, get a pixel.");
    } 
    // console.log("p1")
    spawnlist = [];
    cleanMemory();
    // console.log("p2")
    for(let role of plan.workerlist){
        for(let i=0;i<role.number;i++){
            let creep = Game.creeps[role.name+(i+1)];
            if(!creep){
                if(spawnlist.length < 50) {
                    let m = role.memory ? (role.memory[i]?role.memory[i]:role.memory): {};
                    m.role = role.name;
                    let spawnItem:SpawnItem = {body:role.body,name:role.name+(i+1),memory:m};
                    spawnlist.push(spawnItem);
                }
            }else{
                if(creep.memory.role != role.name){
                    creep.memory.role = role.name;
                }
            }
        }
    }
    // console.log("p3")
    if(spawnlist.length){
        let spawnItem:SpawnItem;
        let err = -13;
        while(err != 0 && spawnlist.length){
            spawnItem = spawnlist.shift();
            err = Game.spawns["SH"].spawnCreep(spawnItem.body,spawnItem.name);
            if(err == 0){
                Memory.creeps[spawnItem.name] = spawnItem.memory;
            }
        }
    }
    // console.log("p4")

    // for(let i in Creep.prototype){
    //     console.log(i);
    // }
    for(let name in Game.creeps){
        const creep = Game.creeps[name]
        // console.log(creep)
        creep.runAs(creep.memory.role);
    }

    // console.log("p5")

    for(let id of towerPlan1.towerlist){
        let tower = Game.getObjectById(id);
        if(tower){
            let targets = tower.room.find(FIND_HOSTILE_CREEPS,{
                filter:t => {return tower.pos.getRangeTo(t) <= 15;}
            });
            if(targets.length){
                let enemies = _.groupBy(targets,(c) =>{
                    let parts = _.groupBy(c.body,p => {
                       return p.hits>0 ? p.type : 'damaged';
                    });
                    
                    if(parts[HEAL] && parts[HEAL].length > 5){
                        console.log('find a healer!');
                        return 'healer';
                    }else if(( (parts[ATTACK] && parts[ATTACK].length > 5) || (parts[RANGED_ATTACK] && parts[RANGED_ATTACK].length > 5)) && tower.pos.getRangeTo(c)<=5){
                        console.log('dangerous attacker come colse!');
                        return 'dangerous'
                    }
                    return 'normal';
                });
                if(enemies['healer']) {
                    let target = tower.pos.findClosestByRange(enemies['healer'],{
                        filter:(t:Creep) => {return tower.pos.getRangeTo(t) < 8;}
                    });
                    tower.attack(target);
                }else if(enemies['dangerous']){
                    let target = tower.pos.findClosestByRange(enemies['dangerous']);
                    tower.attack(target);
                }else{
                    let target = tower.pos.findClosestByRange(enemies['normal']);
                    tower.attack(target);
                }
            }else{
                targets = tower.room.find(FIND_MY_CREEPS,{
                    filter:t => {return t.hits < t.hitsMax;}
                });
                if(targets.length){
                    tower.heal(targets[0]);
                }
            }
            
            
            // var RT;
            // var repair_area = tp1.tl[t].repair_area;
            // var structures = tower.room.find(FIND_STRUCTURES)
            // for(let i in structures){
            //     RT = structures[i];
                
            //     if(RT.pos.x >= repair_area[0] && RT.pos.x <= repair_area[2]){
            //      if(RT.pos.y >= repair_area[1] && RT.pos.y <= repair_area[3]){
            //       if(RT.hits <RT.hitsMax){
            //       let isr = RT.structureType == "rampart" ;
            //       let isw = RT.structureType == "constructedWall";
            //       if((isr || isw)&& RT.hits < 10000){
            //         tower.repair(RT);
            //       }
            //       }
            //      }
            //     }
            // }
            // var closestDamagedStructure = tower.pos.findClosestByRange(, {
            //     filter: (structure) => structure.hits < structure.hitsMax
            // });
            // if(closestDamagedStructure) {
            //     tower.repair(closestDamagedStructure);
            // }
        }
    }
});
