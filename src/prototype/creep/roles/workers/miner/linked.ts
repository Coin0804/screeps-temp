
export function run_as_miner_linked(creep:Creep){
    let readyPos = creep.memory.readyPos;
    if(!readyPos) return -100;
    if(creep.pos.x == readyPos.x && creep.pos.y == readyPos.y){
        let err1 = creep.domine();
        // console.log(creep.memory.linkfloor || 50)
        if(creep.store.getUsedCapacity(RESOURCE_ENERGY) >= (creep.memory.linkfloor || 50)){
            let link = <StructureLink>creep.room.find(FIND_MY_STRUCTURES,{filter:(s) => {
                return s.structureType == STRUCTURE_LINK && creep.pos.getRangeTo(s) == 1;
            }})[0];
            let err2 = creep.dostore(link);
            return err1 || err2;
        }
        return err1;
    }
    let target = new RoomPosition(readyPos.x,readyPos.y,creep.room.name);
    let err = creep.goTo(target,0);
    return err;
}