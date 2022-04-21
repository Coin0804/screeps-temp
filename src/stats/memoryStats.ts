export function stateScanner1() {
    // 每 20 tick 运行一次
    if (Game.time % 30) return; 
  
    if (!Memory.stats1) Memory.stats1 = {};
    
    // 统计 GCL / GPL 的升级百分比和等级
    Memory.stats1.gcl = (Game.gcl.progress / Game.gcl.progressTotal) * 100;
    Memory.stats1.gclLevel = Game.gcl.level;
    Memory.stats1.gpl = (Game.gpl.progress / Game.gpl.progressTotal) * 100;
    Memory.stats1.gplLevel = Game.gpl.level;
    // CPU 的当前使用量
    Memory.stats1.cpu = Game.cpu.getUsed();
    // bucket 当前剩余量
    Memory.stats1.bucket = Game.cpu.bucket;


    let progressnow = Game.rooms["E36N52"].controller.progress;
    let totalProgressnow = Game.rooms["E36N52"].controller.progressTotal;
    if(Memory.stats1.room1prosess) Memory.stats1.room1prosessSpeed = (progressnow - Memory.stats1.room1prosess)/30;
    Memory.stats1.room1prosess = progressnow;
    Memory.stats1.room1prosessPersentage = (progressnow/totalProgressnow) * 100;
    let storage = Game.rooms["E36N52"].storage.store.getUsedCapacity(RESOURCE_ENERGY);
    // if(Memory.stats1.room1storage) Memory.stats1.room1storageChange = (Memory.stats1.room1storage - storage)/30;
    Memory.stats1.room1storage = storage;
    storage = Game.rooms["E37N51"].storage.store.getUsedCapacity(RESOURCE_ENERGY);
    Memory.stats1.room2storage = storage;
    let amount = 0;
    let containers:StructureContainer[] = Game.rooms["E36N52"].find(FIND_STRUCTURES,{filter:(s) => s.structureType == STRUCTURE_CONTAINER});
    containers.forEach((s) => {
        amount += s.store.getUsedCapacity(RESOURCE_ENERGY);
    });
    Memory.stats1.upgraderStorage = amount;
}
export function statsScanner2(){
    if(Game.time % 30) return;
    

}

