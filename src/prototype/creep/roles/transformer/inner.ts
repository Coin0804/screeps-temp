/**
 * 
 */
export function run_as_transformer_inner(creep:Creep){
    // console.log(creep.name+"ready");
    if(creep.store.getUsedCapacity() == 0){
        creep.dowithdraw(creep.room.storage);
    }else{
        let target:AnyStoreStructure = creep.pos.findClosestByRange(FIND_STRUCTURES,{
            filter: (s) => {
                let flag = (s.structureType == "spawn" || s.structureType == "extension")&& s.store.getFreeCapacity('energy') > 0;
                // console.log(flag);
                return flag;
            }
        });
        // if(target)console.log(target.id);
        if(target && creep.store.getUsedCapacity(RESOURCE_ENERGY) >= 50){
            creep.dostore(target);
        }else{
            // console.log(creep.name);
            creep.dowithdraw(creep.room.storage);
            if(Game.spawns["SH"].renewCreep(creep) == ERR_NOT_IN_RANGE){
                creep.goTo(Game.spawns["SH"].pos);
            }
        }
        
    }
    return OK;
}
