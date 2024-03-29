import { loadTemp1API } from './API/temp1';
import { errorMapper } from './modules/errorMapper'
import { doTransferLink } from './plan/link/linkModule';
import { linkPlan1, outMinePlan1, plan1, towerPlan1 } from './plan/planloader';
import { checkMineKeeper, checkOuters, checkReverser, checkWorkers, doSpawn } from './plan/spawn/spawnModule';
import { assignAllPrototype } from './prototype/assign';
import { stateScanner1 } from './stats/memoryStats';
import { autoTreadEnergy } from './tread/temp';
import { cleanMemory, getPixel } from './utils/util';
import { runTowerDefence } from './war/defence/tower';



/**
 * 初始化
 * 因为不在errorMapper里，即使报错也不会有映射
 */
const golbalResetTime = Game.time;
console.log("重载代码或global重置，等待初始化:");
console.log(`总计消耗cpu${Game.cpu.getUsed()}`);
console.log("——载入计划表——");
global.plan = plan1;
global.towerplan = towerPlan1;
global.linkplan = linkPlan1;
global.outMinePlan = outMinePlan1;
console.log(`载入完成！总计消耗cpu${Game.cpu.getUsed()}`);
console.log("——挂载所有原型——");
assignAllPrototype();
console.log(`挂载完成！总计消耗cpu${Game.cpu.getUsed()}`);
loadTemp1API();

/**
 * 主循环，每个tick会执行一次
 * 被errorMapper包装过
 * 所以会显示报错
 * 而且不会受到垃圾邮件！
 */
export const loop = errorMapper(() => {if(Game.shard.name == "shard3"){
    //运行时间等于当前时间减去global重置时间
    const ticks = Game.time - golbalResetTime;
    /**
     * 每100个tick执行一次
     * 这些任务不必每次都做
     */
    if(!(ticks%100)){
        console.log(`当前已经运行了 ${ticks} ticks`);//每运行100个tick就打出来
        cleanMemory();//回收没用的creep记忆
    }
    // if(!((ticks+10)%20)){
    //     autoTreadEnergy();
    // }

    
    //压缩cpu
    getPixel();
    //清空待孵化列表
    global.spawnlist = [];
    /**
     * 暂行，待优化
     * 监控worker的生存状态
     * 没有的话按照计划的优先级推送孵化任务
     * 目前每tick都推
     * TODO:之后会被孪生制取代
     */
    
    checkWorkers();
    if(Game.rooms["E37N52"] && Game.rooms["E37N52"].find(FIND_HOSTILE_CREEPS).length == 0){
        if(Game.rooms["E38N51"] && Game.rooms["E38N51"].find(FIND_HOSTILE_CREEPS).length == 0){
            checkReverser();
            checkOuters();
        }
        
    }
    checkMineKeeper();
    /**
     * 处理孵化任务，待优化
     */
    doSpawn();
    /**
     * 运行creep
     */
    for(let name in Game.creeps){
        const creep = Game.creeps[name]
        if(creep.memory.role) creep.runAs(creep.memory.role);
    }

    doTransferLink();

    // 先用着吧
    runTowerDefence();
    stateScanner1();
    if(!(Game.time%500))Game.rooms["E43N51"].terminal.send(RESOURCE_ENERGY, 3000, "E36N52");

    if(Game.cpu.getUsed() < 12 && !(ticks%25))autoTreadEnergy(3.5);
}});
