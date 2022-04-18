

export function run_as_collector(this:Creep){
    if(this.store.getFreeCapacity() == 0 || this.store.getUsedCapacity()>this.store.getUsedCapacity(RESOURCE_ENERGY)){
        return this.dostoreAll(this.room.storage);
    }else{//前有屎山，也就是说接下来优化很有用
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
                    return this.dostoreAll(this.room.storage);
                }
            }
        }
    }
}
