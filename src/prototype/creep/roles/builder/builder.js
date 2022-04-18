


export function run_as_builder(){
    const building = this.memory.building||false;
    let err = -100;
    if(building){
        err = this.dobuild();
    }


    if( && this.store.getUsedCapacity(RESOURCE_ENERGY) == 0){
        this.memory.building = false;
        this.memory.upgrading = false;
        this.memory.reparing = false;
        this.memory.repairTarget = null;
        this.memory.crossLevel = 10;
    }else if(!this.memory.building && this.store.getFreeCapacity() == 0){
        this.memory.building = true;
    }
    
    if(this.memory.building){
        let err = act.dobuild(this);
        if(err == -6){
            repairman.run(this);
        }
    }else if(!this.memory.building){
        act.dowithdraw(this,this.room.storage);
    }
}