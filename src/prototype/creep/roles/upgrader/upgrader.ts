


export function run_as_upgrader(creep:Creep){
    let upgrading = creep.memory.upgrading||false;
    let err = -100;
    if(upgrading){
        err = creep.doupgrade();
        if(err == ERR_NOT_ENOUGH_ENERGY){
            upgrading = false;
        }else if(err == OK){
            creep.memory.crossLevel =11;
        }
    }
    if(!upgrading){
        err = creep.withdrawInStorage();
        if(err == ERR_FULL) upgrading = true;
    }
    creep.memory.upgrading = upgrading;
    return err;
}