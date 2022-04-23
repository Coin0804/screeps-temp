


/**
 * 
 */
export function run_as_builder(creep:Creep){
    let building = creep.memory.building||false;
    let err = -100;
    if(building){
        let strategy:0|1 = creep.memory.buildStrategy || 0;
        err = creep.dobuild(strategy, creep.memory.dush);
        if(err == ERR_NOT_ENOUGH_ENERGY){
            delete creep.memory.repairTarget;//没有任务系统产生的漏洞，先这样补着
            building =false;
        }else if(err == ERR_NOT_FOUND){
            err = creep.runAs('repairman');//之后会被任务系统替代
        }
    }
    if(!building){
        err = creep.withdrawInStorage();
        if(err == ERR_FULL || creep.store.getFreeCapacity() == 0) building = true;
    }
    creep.memory.building = building;
    return err;
}