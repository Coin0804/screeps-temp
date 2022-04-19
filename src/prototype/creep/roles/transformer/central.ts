
export function run_as_transformer_central(creep:Creep){
    creep.room.find(FIND_MY_SPAWNS)[0].renewCreep(creep);
    let link:StructureLink = <StructureLink>creep.room.find(FIND_STRUCTURES,{filter:(s) => {
        return s.structureType == STRUCTURE_LINK && creep.pos.getRangeTo(s) == 1;
    }})[0];
    if(link){
        let err = creep.dowithdraw(link);
        if(err == ERR_FULL){
            err = creep.dostore(creep.room.storage);
            return err;
        }else if(err == OK){
            return err;
        }
        return -100
    }
    //todo
    


}