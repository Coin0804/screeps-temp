


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
        }else if(err == ERR_NOT_FOUND){
            err = creep.runAs('repairman');//之后会被任务系统替代
        }
    }
    if(!building){
        err = creep.withdrawInStorage();
        if(err == ERR_FULL) building = true;
    }
    creep.memory.building = building;
    return err;
}