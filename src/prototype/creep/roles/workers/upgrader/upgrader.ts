


export function run_as_upgrader(creep:Creep){
    let upgrading = creep.memory.upgrading||false;
    let err = -100;
    if(upgrading){
        err = creep.doupgrade(creep.memory.dush);
        // console.log(err+" "+creep.name);
        if(err == ERR_NOT_ENOUGH_ENERGY){
            upgrading = false;
        }
    }
    if(!upgrading){
        err = creep.withdrawInStorage();
        // if(creep.name == 'E36N53_upgrader_1')console.log(err+"b");
        if(err == ERR_FULL|| creep.store.getFreeCapacity() == 0) upgrading = true;
    }
    creep.memory.upgrading = upgrading;
    // if(creep.name == 'E36N53_upgrader_1')console.log(err+"c");
    return err;
}