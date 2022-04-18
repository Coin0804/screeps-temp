import {isStoreable,isWithdrawable} from "@/utils/util"

/**
 * 
 */
export function run_as_transformer_outter(creep:Creep){
    if(creep.store.getFreeCapacity() == 0 ){
        let target:AnyStoreStructure = isStoreable(creep.memory.storeTargets,creep.store.getUsedCapacity("energy"));
        if(target){
            creep.dostore(target);
        }else{
            creep.goTo(Game.flags["p1"].pos);
        }
    }else{
        let target = isWithdrawable(creep.memory.withdrawTargets);
        creep.dowithdraw(target);
    }
    return OK;
}