
function yellowFarBuild(creep:Creep,flag:Flag){
    //没到过去先
    if(flag.pos.roomName != creep.room.name ) return creep.goTo(flag.pos);
    //到了准备开始建造
    let building = creep.memory.building||false;
    let err = -100;
    if(building){
        err = creep.dobuild();
        if(err == ERR_NOT_ENOUGH_ENERGY){
            building =false;
        }else if(err == ERR_NOT_FOUND){
            err = creep.goTo(flag.pos);
        }
    }
    if(!building){
        err = creep.searchAndCollecte();
        //todo
        if(err == ERR_FULL){
            building = true;//其实可以直接动，放着先
            creep.memory.crossLevel =10;
        }
    }
    creep.memory.building = building;
    return err;
}

function redFarBuild(creep:Creep,flag:Flag){
    //没到过去先
    if(flag.pos.roomName != creep.room.name ) return creep.goTo(flag.pos);
    //到了准备开始建造
    let building = creep.memory.building||false;
    let err = -100;
    if(building){
        err = creep.dobuildAt(flag.pos);
        if(err == ERR_NOT_ENOUGH_ENERGY){
            building =false;
        }else if(err == ERR_NOT_FOUND){
            err = creep.goTo(flag.pos);
        }
    }
    if(!building){
        err = creep.searchAndCollecte();
        //todo
        if(err == ERR_FULL){
            building = true;//其实可以直接动，放着先
            creep.memory.crossLevel =10;
        }
    }
    creep.memory.building = building;
    return err;
}

export function run_as_builder_out(creep:Creep){
    //行动前检查
    let team = creep.memory.team;
    if(!team) return ERR_INVALID_TARGET;
    let flag = Game.flags['build'+team];
    if(!flag) return creep.goTo(Game.flags['aim'].pos);
    switch(flag.color){
        case COLOR_YELLOW: return yellowFarBuild(creep,flag);
        case COLOR_RED: return redFarBuild(creep,flag);
        default: return creep.goTo(flag.pos);
    }
}