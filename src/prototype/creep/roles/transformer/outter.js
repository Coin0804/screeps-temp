const act = require("creepActions");
const util = require('util');

function run(creep){
    if(creep.store.getFreeCapacity() == 0 ){
        let target = util.isStoreable(creep.memory.storeTargets,creep.store.getUsedCapacity("energy"));
        if(target){
            act.dostore(creep,target);
        }else{
            creep.goTo(Game.flags["p1"]);
        }
    }else{
        let target = util.isWithdrawable(creep.memory.withdrawTargets);
        act.dowithdraw(creep,target);
    }
    
}

module.exports = {
    run
};