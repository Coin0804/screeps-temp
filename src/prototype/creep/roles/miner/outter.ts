

export function run_as_miner_outer(creep:Creep){
    //行动前检查
    let team = creep.memory.team;
    if(!team) return creep.goTo(Game.flags['aim'].pos);
    let flag = Game.flags['mine'+team];
    if(!flag) return creep.goTo(Game.flags['aim'].pos);
    //没到过去先
    let readyPos = creep.memory.readyPos;
    if(readyPos && creep.pos.x == readyPos.x && creep.pos.y == readyPos.y && flag.pos.roomName == creep.room.name){
        let err = creep.domine();
        return err;
    }
    let err = creep.goTo(flag.pos,0);
    return err
}