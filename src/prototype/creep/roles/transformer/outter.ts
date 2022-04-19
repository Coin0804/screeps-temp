import {isStoreable,isWithdrawable} from "@/utils/util"

/**
 * 
 */
export function run_as_transformer_outter(creep:Creep){
    // console.log(creep.name+"ready");
    if(creep.store.getFreeCapacity() <= creep.store.getCapacity()*0.2){
        // console.log(creep.name+"going to store");
        let target:AnyStoreStructure = isStoreable(creep.memory.storeTargets,creep.store.getUsedCapacity("energy"));
        if(target){
            // console.log(target.pos.stringify());
            creep.dostore(target);
        }else{
            // console.log("can't store");
            creep.goTo(Game.flags["p1"].pos);
        }
    }else{
        let target = isWithdrawable(creep.memory.withdrawTargets);
        if(target)creep.dowithdraw(target);
    }
    return OK;
}