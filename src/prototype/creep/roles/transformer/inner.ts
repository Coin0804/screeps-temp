/**
 * 
 */
export function run_as_transformer_inner(this:Creep){
    if(this.store.getUsedCapacity() == 0){
        this.dowithdraw(this.room.storage);
    }else{
        let target:AnyStoreStructure = this.pos.findClosestByRange(FIND_STRUCTURES,{
            filter: (s) => {
                let flag = (s.structureType == "spawn" || s.structureType == "extension")&& s.store.getFreeCapacity('energy') > 0;
                // console.log(flag);
                return flag;
            }
        });
        if(target && this.store.getUsedCapacity(RESOURCE_ENERGY) >= 50){
            this.dostore(target);
        }else{
            this.dowithdraw(this.room.storage);
            if(Game.spawns["SH"].renewCreep(this) == ERR_NOT_IN_RANGE){
                this.moveTo(Game.spawns["SH"]);
            }
        }
        
    }
    return OK;
}
