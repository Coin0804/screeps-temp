
export function runTowerDefence(){
    for(let id of global.towerplan.towerlist){
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
}