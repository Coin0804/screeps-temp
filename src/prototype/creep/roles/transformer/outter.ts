import {isStoreable,isWithdrawable} from "@/utils/util"

/**
 * 
 */
export function run_as_transformer_outter(this:Creep){
    if(this.store.getFreeCapacity() == 0 ){
        let target:AnyStoreStructure = isStoreable(this.memory.storeTargets,this.store.getUsedCapacity("energy"));
        if(target){
            this.dostore(target);
        }else{
            this.goTo(Game.flags["p1"].pos);
        }
    }else{
        let target = isWithdrawable(this.memory.withdrawTargets);
        this.dowithdraw(target);
    }
    return OK;
}