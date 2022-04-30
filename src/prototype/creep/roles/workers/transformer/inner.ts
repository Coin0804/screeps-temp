/**
 * 
 */
export function run_as_transformer_inner(creep:Creep){
    if(creep.store.getUsedCapacity() == 0){
        creep.withdrawInStorage(0);
    }else{
        let target:AnyStoreStructure = creep.pos.findClosestByRange(FIND_STRUCTURES,{
            filter: (s) => {
                let flag = (s.structureType == "spawn" || s.structureType == "extension" || s.structureType == "tower")&& s.store.getFreeCapacity('energy') > 0;
                return flag;
            }
        });
        if(target && creep.store.getUsedCapacity(RESOURCE_ENERGY) >= 50){
            creep.dostore(target);
        }else{
            creep.withdrawInStorage(0);
            let spawn = creep.room.find(FIND_MY_SPAWNS)[0];
            if(spawn && creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0 && (spawn.renewCreep(creep) == ERR_NOT_IN_RANGE)){
                creep.goTo(spawn.pos);
            }
        }
        
    }
    return OK;
}
