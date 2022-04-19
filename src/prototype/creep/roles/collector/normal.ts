

export function run_as_collector(creep:Creep){
    if(creep.store.getFreeCapacity() == 0 || creep.store.getUsedCapacity()>creep.store.getUsedCapacity(RESOURCE_ENERGY)){
        return creep.dostoreAll(creep.room.storage);
    }else{//前有屎山，也就是说接下来优化很有用
        return creep.searchAndCollecte();
    }
}
