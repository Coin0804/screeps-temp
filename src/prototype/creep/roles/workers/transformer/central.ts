
export function run_as_transformer_central(creep:Creep){
    //先更新
    creep.room.find(FIND_MY_SPAWNS)[0].renewCreep(creep);
    //获取对象，没有直接返回
    let link:StructureLink = <StructureLink>creep.room.find(FIND_STRUCTURES,{filter:(s) => {
        return s.structureType == STRUCTURE_LINK && creep.pos.getRangeTo(s) == 1;
    }})[0];
    if(!link) return ERR_NOT_IN_RANGE;
    let terminal = creep.room.terminal;
    if(!terminal || terminal.pos.getRangeTo(creep) > 1) return ERR_NOT_IN_RANGE;
    //
    let err = -100;
    if(link.store.getUsedCapacity(RESOURCE_ENERGY) > 0){
        err = creep.dowithdraw(link);
    }
    console.log(err,creep.name);
    if(terminal.store.getUsedCapacity(RESOURCE_ENERGY) < 5000){
        if(creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0){
            return creep.dostore(terminal);
        }else if(err != 0 && creep.store.getUsedCapacity() == 0){
            return creep.withdrawInStorage(1000);
        }
    }else if(terminal.store.getUsedCapacity(RESOURCE_OPS) < 10000 &&
     creep.room.storage && creep.room.storage.store.getUsedCapacity(RESOURCE_OPS) >5000){
        if(creep.store.getUsedCapacity(RESOURCE_OPS) > 0){
            return creep.dostore(terminal,RESOURCE_OPS);
        }else if(err != 0 && creep.store.getUsedCapacity() == 0){
            return creep.dowithdraw(creep.room.storage,RESOURCE_OPS);
        }
    }else if(err != 0 && creep.store.getUsedCapacity() == 0){
        if(terminal.store.getUsedCapacity(RESOURCE_ENERGY) > 10000){
            err = creep.dowithdraw(terminal);
        }else{
            let enemyStructures:AnyStoreStructure[] = creep.room.find(FIND_STRUCTURES,{filter:(s) => {return s.pos.getRangeTo(creep)<=1&&(s as AnyStoreStructure).store 
                && (s as AnyOwnedStructure).owner && (s as AnyOwnedStructure).owner.username != creep.owner.username} });
            
            if(enemyStructures.length){
                err = creep.dowithdrawAll(enemyStructures[0]);
            }
        }
    }
    if(creep.room.storage && creep.room.storage.owner.username == creep.owner.username) return creep.dostoreAll(creep.room.storage);
    return creep.dostoreAll(terminal);

    
    // let err = creep.dowithdrawAll(terminal,5000);
    // console.log(err);
    // if(err == ERR_FULL){
    //     err = creep.dostoreAll(creep.room.storage);
    //     return err;
    // }else if(err == ERR_NOT_ENOUGH_RESOURCES){
    //     err = creep.dowithdraw(creep.room.storage);
    //     if(err == ERR_FULL){
    //         err = creep.dostore(creep.room.storage);
    //         return err;
    //     }
    // }
    
    // if(link){
        
    //     if(err == ERR_FULL){
    //         err = creep.dostore(creep.room.storage);
    //         return err;
    //     }else if(err == OK){
    //         return err;
    //     }
    // }
    // //todo
    
    // return err;

}