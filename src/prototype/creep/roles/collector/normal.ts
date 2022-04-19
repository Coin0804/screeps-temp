import { run_as_builder } from "../builder/builder";


export function run_as_collector(creep:Creep){
    let err = creep.searchAndCollecte();
    if(err != OK && creep.room.storage) return creep.dostore(creep.room.storage);
    err = creep.dostore(<AnyStoreStructure>creep.pos.findClosestByRange(FIND_STRUCTURES,{filter:(s) => {
        return (s.structureType == "spawn" || s.structureType == "extension" || s.structureType == "tower" ||s.structureType == "container")
                && s.store.getFreeCapacity('energy') > 0;
    }}));
    if(err != OK)err = run_as_builder(creep);
    return err;
}
