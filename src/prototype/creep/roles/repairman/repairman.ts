

export function run_as_repairman(creep:Creep){
    let repairing = creep.memory.repairing||false;
    let err = -100;
    if(repairing){
        err = creep.dorepair();
        if(err == ERR_NOT_ENOUGH_ENERGY){
            repairing = false;
            creep.memory.crossLevel =10;
        }else if(err == ERR_INVALID_TARGET){
            err = creep.runAs['upgrader']();//之后会被任务系统替代
        }
    }
    if(!repairing){
        if(creep.room.storage){
            err = creep.dowithdraw(creep.room.storage);
            if(err == ERR_NOT_ENOUGH_RESOURCES && Game.flags[creep.room.name+"onhold"]){
                err = creep.goTo(Game.flags[creep.room.name+"onhold"].pos);
            }else if(err == ERR_FULL){
                repairing = true;//其实可以直接动，放着先
            }
        }
    }
    creep.memory.repairing = repairing;
    return err;
}
