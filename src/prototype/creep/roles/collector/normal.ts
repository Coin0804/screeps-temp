

export function run_as_collector(creep:Creep){
    if(creep.store.getFreeCapacity() == 0 || creep.store.getUsedCapacity()>creep.store.getUsedCapacity(RESOURCE_ENERGY)){
        return creep.dostoreAll(creep.room.storage);
    }else{//前有屎山，也就是说接下来优化很有用
        let resource = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
        if(resource && resource.amount > 100){
            return creep.dopickup(resource);
        }else{
            let tombstone = creep.pos.findClosestByRange(FIND_TOMBSTONES,{
                    filter: t => {
                        return t.store.getUsedCapacity() > 0;
                    }
                });
            if(tombstone){
                return creep.dowithdraw(tombstone);
            }else{
                let ruin = creep.pos.findClosestByRange(FIND_RUINS,{
                    filter: r => {
                        return r.store.getUsedCapacity() > 0;
                    }
                });
                if(ruin){
                    return creep.dowithdraw(ruin);
                }else{
                    return creep.dostoreAll(creep.room.storage);
                }
            }
        }
    }
}
