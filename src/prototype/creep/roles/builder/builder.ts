


/**
 * 
 */
export function run_as_builder(creep:Creep){
    let building = creep.memory.building||false;
    let err = -100;
    if(building){
        err = creep.dobuild();
        if(err == ERR_NOT_ENOUGH_ENERGY){
            building =false;
            creep.memory.crossLevel =10;
        }else if(err == ERR_NOT_FOUND){
            err = creep.runAs('repairman');//之后会被任务系统替代
        }
    }
    if(!building){
        if(creep.room.storage){
            err = creep.dowithdraw(creep.room.storage);
            if(err == ERR_NOT_ENOUGH_RESOURCES && Game.flags[creep.room.name+"onhold"]){
                err = creep.goTo(Game.flags[creep.room.name+"onhold"].pos);
            }else if(err == ERR_FULL){
                building = true;//其实可以直接动，放着先
            }
        }
    }
    creep.memory.building = building;
    return err;
}