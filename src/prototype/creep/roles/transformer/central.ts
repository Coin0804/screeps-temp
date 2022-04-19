
export function run_as_transformer_central(creep:Creep){
    let link:StructureLink = <StructureLink>creep.room.find(FIND_STRUCTURES,{filter:(s) => {
        return s.structureType == STRUCTURE_LINK && creep.pos.getRangeTo(s);
    }})[0];
    if(link){
        let err = creep.dowithdraw(link);
        if(err == ERR_FULL){
            err = creep.dostore(creep.room.storage);
            return err;
        }else if(err == OK){
            return err;
        }
    }
    //todo
    


}