const act = require('creepActions');


function run(creep){
    if(creep.store.getFreeCapacity() == 0 || creep.store.getUsedCapacity()>creep.store.getUsedCapacity(RESOURCE_ENERGY)){
        act.dostore(creep,creep.room.storage);
    }else{
        let resource = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
        if(resource && resource.amount > 100){
            act.dopickup(creep,resource);
        }else{
            let tombstone = creep.pos.findClosestByRange(FIND_TOMBSTONES,{
                    filter: t => {
                        return t.store.getUsedCapacity() > 0;
                    }
                });
            if(tombstone){
                act.dowithdraw(creep,tombstone);
            }else{
                let ruin = creep.pos.findClosestByRange(FIND_RUINS,{
                    filter: r => {
                        return r.store.getUsedCapacity() > 0;
                    }
                });
                if(ruin){
                    act.dowithdraw(creep,ruin,true);
                }else{
                    act.dostore(creep,creep.room.storage);
                }
            }
        }
    }
}

module.exports = {
    run
};