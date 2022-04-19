function moveAndClaim(creep:Creep,flag:Flag){
    if(flag.pos.roomName != creep.room.name ) return creep.goTo(flag.pos);
    return creep.doclaim(flag.room.controller);
}

function moveAndReserve(creep:Creep,flag:Flag){
    if(flag.pos.roomName != creep.room.name ) return creep.goTo(flag.pos);
    return creep.doreserve(flag.room.controller);
}



export function run_as_colonizer(creep:Creep){
    let team = creep.memory.team;
    if(!team) return creep.goTo(Game.flags['aim'].pos);
    let flag = Game.flags['colonize'+team];
    if(!flag) return creep.goTo(Game.flags['aim'].pos);
    switch(flag.color){
        case COLOR_RED: return moveAndClaim(creep,flag);
        case COLOR_PURPLE: return moveAndReserve(creep,flag);
        default: return creep.goTo(flag.pos);
    }
}