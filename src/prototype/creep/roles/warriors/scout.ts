export function run_as_scout(creep:Creep){
    let nextTarget = creep.memory.nextTarget||1;
    let flag = Game.flags["path"+nextTarget];
    if(flag){
        if(flag.pos.roomName==creep.pos.roomName && flag.pos.getRangeTo(creep)<=1){
            nextTarget++;
            flag = Game.flags["path"+nextTarget];
        }
    }
    creep.memory.nextTarget = nextTarget;
    if(flag) return creep.goTo(flag.pos,0);
    
    flag = Game.flags["scoutAim"];
    if(creep.room.controller)creep.signController(creep.room.controller,"I want this room");
    if(flag) return creep.goTo(flag.pos,0);
    return ERR_INVALID_TARGET;
}