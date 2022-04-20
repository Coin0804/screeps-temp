

export function isWithdrawable(withdrawTargets:Id<AnyStoreStructure|Ruin|Tombstone>[],floor = 0){
    if(withdrawTargets){
        for(let id of withdrawTargets){
            let target = Game.getObjectById(id);
            if(target.store[RESOURCE_ENERGY] > floor){
                return target;
            }
        }
    }
    return null;
}

export function isStoreable(storeTargets:Id<AnyStoreStructure>[],amount:number){
    if(storeTargets){
        for(let id of storeTargets){
            let target = Game.getObjectById(id);
            if(target && target.id && target.store.getFreeCapacity(RESOURCE_ENERGY) > amount/2 && amount >= 50){
                return target;
            }
        }
    }
    return null;
}

export function serializeFarPath(positions:RoomPosition[],position0:RoomPosition){
    if (positions.length == 0) return '';
    // 确保路径里第一个位置是自己当前的位置
    if (!positions[0].isEqualTo(position0)) positions.splice(0,0,position0);

    return positions.map((pos, index) => {
        // 最后一个位置就不用再移动
        if (index >= positions.length - 1) return null
        // 由于房间边缘地块会有重叠，所以这里筛除掉重叠的步骤
        if (pos.roomName != positions[index + 1].roomName) return null
        // 获取到下个位置的方向
        return pos.getDirectionTo(positions[index + 1])
    }).join('');
}

export function getOppositeDirection(direction:DirectionConstant){
    return <DirectionConstant>((direction + 3) % 8 + 1);
}

export function store2Array(store){
    const array = []
    for (let resourceType in store) {
        array.push({resourceType:resourceType,amount:store.getUsedCapacity(resourceType)});
    }
    return array.sort((a,b) => a.amount - b.amount);
}

export function clearMemory(){
    //过于暴力还没测试
    // Memory = {};
    Memory.creeps = {};
}

//已经完美了
export function cleanMemory(){
    for(let n in Memory.creeps){
        if(!Game.creeps[n]){
            delete Memory.creeps[n];
        }
    }
}

export function getPixel(){
    if(Game.cpu.bucket == 10000 && !global.stopGeneratePixel){
        Game.cpu.generatePixel();
        console.log("好耶，又有一个Pixcel咯");
    }
}