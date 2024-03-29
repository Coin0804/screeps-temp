import { run_as_repairman } from "../repairman/repairman";

function yellowFarBuild(creep:Creep,flag:Flag){
    //没到过去先
    if(flag.pos.roomName != creep.room.name ) return creep.goTo(flag.pos);
    //到了准备开始建造
    let building = creep.memory.building||false;
    let err = -100;
    if(building){
        err = creep.dobuild();
        if(err == ERR_NOT_ENOUGH_ENERGY){
            delete creep.memory.repairTarget;//难看的补丁
            building =false;
        }else if(err == ERR_NOT_FOUND){
            if(creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0) err = run_as_repairman(creep);
            if(err != OK) err = creep.goTo(flag.pos);
        }
    }
    if(!building){
        err = creep.searchAndCollecte();
        if(err != OK) err = creep.withdrawInStorage(0);
        if(err != OK) err = creep.domine();
        //todo
        if(creep.store.getFreeCapacity() == 0){
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
        if(err != OK) err = creep.withdrawInStorage(0);
        if(err != OK) err = creep.domine();
        //todo
        if(creep.store.getFreeCapacity() == 0){
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
    if(!team) return creep.goTo(Game.flags['aim'].pos);
    let flag = Game.flags['build'+team];
    if(!flag) return creep.goTo(Game.flags['aim'].pos);
    switch(flag.color){
        case COLOR_YELLOW: return yellowFarBuild(creep,flag);
        case COLOR_RED: return redFarBuild(creep,flag);
        default: return creep.goTo(flag.pos);
    }
}