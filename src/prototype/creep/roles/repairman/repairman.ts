

export function run_as_repairman(creep:Creep){
    let repairing = creep.memory.repairing||false;
    let err = -100;
    if(repairing){
        err = creep.dorepair();
        if(err == ERR_NOT_ENOUGH_ENERGY){
            creep.memory.repairTarget = null;
            repairing = false;
        }else if(err == ERR_INVALID_TARGET){
            err = creep.runAs('upgrader');//之后会被任务系统替代
        }
    }
    if(!repairing){
        err = creep.withdrawInStorage();
        if(err == ERR_FULL || creep.store.getFreeCapacity() == 0) repairing = true;
    }
    creep.memory.repairing = repairing;
    return err;
}
