
export function doTransferLink(){
    let floor = global.linkplan.floor || 500;
    for(let i in global.linkplan.pairs){
        let linkfrom = Game.getObjectById(global.linkplan.pairs[i].from);
        if(linkfrom.store.getUsedCapacity(RESOURCE_ENERGY) > floor){
            let linkto = Game.getObjectById(global.linkplan.pairs[i].to);
            if(linkfrom.store.getUsedCapacity(RESOURCE_ENERGY) <= linkto.store.getFreeCapacity(RESOURCE_ENERGY)){
                let err = linkfrom.transferEnergy(linkto);
                if(err == OK) return err;
            }
        }
    }
    return ERR_BUSY;
}