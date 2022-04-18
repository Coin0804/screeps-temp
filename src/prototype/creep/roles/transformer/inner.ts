/**
 * 
 */
export function run_as_transformer_inner(creep:Creep){
    console.log(typeof(creep))
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
        if(target && creep.store.getUsedCapacity(RESOURCE_ENERGY) >= 50){
            creep.dostore(target);
        }else{
            creep.dowithdraw(creep.room.storage);
            if(Game.spawns["SH"].renewCreep(creep) == ERR_NOT_IN_RANGE){
                creep.moveTo(Game.spawns["SH"]);
            }
        }
        
    }
    return OK;
}
