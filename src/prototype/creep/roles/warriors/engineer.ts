export function run_as_engineer(creep:Creep){
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

    flag = Game.flags["smashAim"];
    if(flag){
        if(creep.room.name == flag.pos.roomName){
            let result = creep.room.lookAt(flag.pos).filter((r)=>{
                return r.type == LOOK_STRUCTURES && r.structure.hits > 0;
            })[0];
            let wall = result?result.structure:undefined;
            if(wall){
                let err:number = creep.dismantle(wall);
                if(err == ERR_NOT_IN_RANGE) err = creep.goTo(wall.pos);
                return err
            }
        }
        return creep.goTo(flag.pos,1);
    }
    return ERR_INVALID_TARGET;
}