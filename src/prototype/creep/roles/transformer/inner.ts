/**
 * 
 */
export function run_as_transformer_inner(creep:Creep){
    // console.log(creep.name+"ready");
    if(creep.store.getUsedCapacity() == 0){
        creep.withdrawInStorage();
    }else{
        let target:AnyStoreStructure = creep.pos.findClosestByRange(FIND_STRUCTURES,{
            filter: (s) => {
                let flag = (s.structureType == "spawn" || s.structureType == "extension" || s.structureType == "tower")&& s.store.getFreeCapacity('energy') > 0;
                // console.log(flag);
                return flag;
            }
        });
        // if(target)console.log(target.id);
        if(target && creep.store.getUsedCapacity(RESOURCE_ENERGY) >= 50){
            // console.log('s');
            creep.dostore(target);
        }else{
            // console.log(creep.name);
            creep.withdrawInStorage();
            let spawn = creep.room.find(FIND_MY_SPAWNS)[0];
            if(spawn && (spawn.renewCreep(creep) == ERR_NOT_IN_RANGE)){
                creep.goTo(spawn.pos);
            }
        }
        
    }
    return OK;
}
