/**
 * 
 */
export function run_as_miner(creep:Creep){
    // console.log(creep.name+"ready")
    let readyPos = creep.memory.readyPos;
    if(!readyPos)return -10;
    if(creep.pos.x == readyPos.x && creep.pos.y == readyPos.y){
        let err = creep.domine();
        // console.log(err)
    }else{
        // console.log
        let target = new RoomPosition(readyPos.x,readyPos.y,creep.room.name);
        creep.goTo(target,0);
    }
}
