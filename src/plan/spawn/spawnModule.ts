function load(role:CreepBeBirth,roomname?:string){
    if(role.number === 0 )return;
    for(let i=0;i<(role.number || 1);i++){
        //处理name
        let name = roomname? roomname+'_'+role.rolename+'_'+(i+1) : role.rolename+'_'+(i+1);
        let creep = Game.creeps[name];
        if(!creep){
            if(global.spawnlist.length < 50) {
                //处理memory
                let memory:any;
                if(role.memory){
                    memory = role.memory[i]?role.memory[i]:role.memory;
                }else{
                    memory = {};
                }
                //无论如何得有角色
                memory.role = role.rolename;
                //装填参数
                if(role.team) memory.team = role.team;
                let properties:SpawnProperties = {memory:memory};
                if(role.directions) properties.directions = role.directions;
                
                //推送进入列表
                let spawnItem:SpawnItem = {
                    room:(roomname || 'E36N52'),
                    body:role.body,
                    name:name,
                    properties:properties
                };
                if(role.birthSpawn)spawnItem.birthSpawn = role.birthSpawn;
                spawnlist.push(spawnItem);
            }
        }else{
            if(creep.memory.role != role.rolename){
                creep.memory.role = role.rolename;
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
            if(resinfo && resinfo.ticksToEnd + reverser.efftctTicks <= 5000) load(reverser);
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
            const spawn = Game.rooms[spawnItem.room].find(FIND_MY_SPAWNS)[spawnItem.birthSpawn?spawnItem.birthSpawn:0];
            err = spawn.spawnCreep(spawnItem.body,spawnItem.name,spawnItem.properties);
        }
        return err;
    }
    return OK;
}



