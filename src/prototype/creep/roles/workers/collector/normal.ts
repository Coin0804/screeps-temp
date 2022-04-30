import { run_as_builder } from "../builder/builder";


export function run_as_collector(creep:Creep){
    console.log(creep.name)
    let err = creep.searchAndCollecte();
    if(err != OK){
        if(creep.store.getUsedCapacity() == 0){
            let flag = Game.flags[creep.room.name + "onhold"];
            if(!flag)flag = Game.flags["aim"];
            return creep.goTo(flag.pos);
        }


        err = creep.dostoreAll(<AnyStoreStructure>creep.pos.findClosestByRange(FIND_STRUCTURES,{filter:(s) => {
            return (s.structureType == "spawn" || s.structureType == "extension" || 
            s.structureType == "tower" ||s.structureType == "container" || s.structureType == "storage"||
            (s.structureType == "terminal" && s.my) )
                    && s.store.getFreeCapacity('energy') > 0;
        }}));
        if(err != OK)err = run_as_builder(creep);
    }
    return err;
}
