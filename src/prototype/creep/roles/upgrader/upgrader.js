const act = require('creepActions');

function run(creep){
    if(creep.memory.upgrading && creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0){
        creep.memory.upgrading = false;
        creep.memory.crossLevel = 10;
    }else if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0){
        creep.memory.upgrading = true;
    }
    
    if(creep.memory.upgrading){
        let err = act.doupgrade(creep);
        if(err == 0) creep.memory.crossLevel = 11;
    }else if(!creep.memory.upgrading){
        act.dowithdraw(creep,creep.room.storage);
    }
}

module.exports = {
    run
};