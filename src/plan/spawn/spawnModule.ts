function load(creepBeBirth:CreepBeBirth,roomname?:string){
    if(creepBeBirth.number === 0 )return;
    for(let i=0;i<creepBeBirth.number;i++){
        //处理name
        let name = roomname? roomname+'_'+creepBeBirth.rolename+'_'+(i+1) : creepBeBirth.rolename+'_'+(creepBeBirth.team)+'_'+(i+1);
        let creep = Game.creeps[name];
        if(!creep){
            if(global.spawnlist.length < 50) {
                //处理memory
                let memory:any;
                if(creepBeBirth.memory){
                    memory = creepBeBirth.memory[i]?creepBeBirth.memory[i]:creepBeBirth.memory;
                }else{
                    memory = {};
                }
                //无论如何得有角色
                memory.role = creepBeBirth.rolename;
                //装填参数
                if(creepBeBirth.team) memory.team = creepBeBirth.team;
                let properties:SpawnProperties = {memory:memory};
                if(creepBeBirth.directions) properties.directions = creepBeBirth.directions;
                
                //推送进入列表
                let spawnItem:SpawnItem = {
                    birthroom:creepBeBirth.birthroom ? creepBeBirth.birthroom : (roomname || 'E36N52'),
                    body:creepBeBirth.body,
                    name:name,
                    properties:properties
                };
                if(creepBeBirth.birthSpawn)spawnItem.birthSpawn = creepBeBirth.birthSpawn;
                if(spawnItem.name == "colonizer_2")console.log(spawnItem.birthroom);
                spawnlist.push(spawnItem);
            }
        }else{
            if(creep.memory.role != creepBeBirth.rolename){
                creep.memory.role = creepBeBirth.rolename;
            }
        }
    }
}



//暴力遍历,管他，用着先
export function checkWorkers(){
    //每个房间遍历
    for(let room of global.plan.roomlist){
        //房间中每种角色遍历
        for(let role of room.workerlist){
            //每种角色的每个单位遍历
            load(role,room.name);
        }
    }
}



export function checkOuters(){
    for(let miner of global.outMinePlan.miners){
        load(miner);
    }
    for(let transformer of global.outMinePlan.transformers){
        load(transformer);
    }
}

export function checkReverser(){
    for(let reverser of global.outMinePlan.reversers){
        let flag = Game.flags["colonize"+reverser.team];
        if(flag && flag.room && flag.room.controller){
            let resinfo = flag.room.controller.reservation;
            if(!resinfo || resinfo.ticksToEnd + reverser.efftctTicks <= 5000) load(reverser);
        }
    }
}

export function checkMineKeeper(){
    for(let minekeeper of global.outMinePlan.guards){
        load(minekeeper);
    }
}

export function doSpawn(){
    if(global.spawnlist.length){
        let err = -100;
        let spawnItem:SpawnItem;
        while(err != OK && spawnlist.length){
            spawnItem = spawnlist.shift();
            const spawn = Game.rooms[spawnItem.birthroom].find(FIND_MY_SPAWNS)[spawnItem.birthSpawn?spawnItem.birthSpawn:0];
            err = spawn.spawnCreep(spawnItem.body,spawnItem.name,spawnItem.properties);
            if(spawnItem.name == "colonizer_2")console.log(err);

        }
        return err;
    }
    return OK;
}



