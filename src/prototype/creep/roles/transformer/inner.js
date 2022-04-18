const act = require("creepActions");

function run(creep){
    if(creep.store.getUsedCapacity() == 0){
        act.dowithdraw(creep,creep.room.storage);
    }else{
        let target = creep.pos.findClosestByRange(FIND_STRUCTURES,{
            filter: (s) => {
                let flag = (s.structureType == "spawn" || s.structureType == "extension")&& s.store.getFreeCapacity('energy') > 0;
                // console.log(flag);
                return flag;
            }
        });
        if(target && creep.store.getUsedCapacity(RESOURCE_ENERGY) >= 50){
            act.dostore(creep,target);
        }else{
            act.dowithdraw(creep,creep.room.storage);
            if(Game.spawns["SH"].renewCreep(creep) == ERR_NOT_IN_RANGE){
                creep.moveTo(Game.spawns["SH"]);
            }
        }
        
    }
}

module.exports = {
    run
};