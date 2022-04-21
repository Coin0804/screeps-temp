/**
 * 
 */
export function run_as_miner(creep:Creep){
    // console.log(creep.name+"ready")
    let readyPos = creep.memory.readyPos;
    if(!readyPos)return -100;
    if(creep.pos.x == readyPos.x && creep.pos.y == readyPos.y){
        let err = creep.domine();
        if(err == OK)creep.memory.standed = true;
        return err;
    }
    let target = new RoomPosition(readyPos.x,readyPos.y,creep.room.name);
    let err = creep.goTo(target,0);
    return err
}
