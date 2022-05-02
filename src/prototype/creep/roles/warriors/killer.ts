export function run_as_killer(creep:Creep){
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
    
    flag = Game.flags["killAim"];
    if(flag){
        if(creep.room.name == flag.pos.roomName){
            let enemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(enemy){
                let err:number = creep.rangedAttack(enemy);
                if(err == ERR_NOT_IN_RANGE) err = creep.goTo(enemy.pos);
                return err
            }
        }
        return creep.goTo(flag.pos,0);
    }
    return ERR_INVALID_TARGET;
}
