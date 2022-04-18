



export function run_as_upgrader(creep:Creep){
    let upgrading = creep.memory.upgrading||false;
    let err = -100;
    if(upgrading){
        err = creep.doupgrade();
        if(err == ERR_NOT_ENOUGH_ENERGY){
            upgrading = false;
            creep.memory.crossLevel =10;
        }else if(err == OK){
            creep.memory.crossLevel =11;
        }
    }
    if(!upgrading){
        if(creep.room.storage){
            err = creep.dowithdraw(creep.room.storage);
            if(err == ERR_NOT_ENOUGH_RESOURCES && Game.flags[creep.room.name+"onhold"]){
                err = creep.goTo(Game.flags[creep.room.name+"onhold"].pos);
            }else if(err == ERR_FULL){
                upgrading = true;//其实可以直接动，放着先
            }
        }
    }
    creep.memory.upgrading = upgrading;
    return err;
}