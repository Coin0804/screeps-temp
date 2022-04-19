

//暴力遍历,管他，用着先
export function checkWorkers(){
    //每个房间遍历
    for(let room of global.plan.roomlist){
        //房间中每种角色遍历
        for(let role of room.workerlist){
            //每种角色的每个单位遍历
            for(let i=0;i<role.number;i++){
                //处理name
                let name = room.name+'_'+role.name+'_'+(i+1);
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
                        memory.role = role.name;
                        //装填参数
                        let properties:SpawnProperties = {memory:memory};
                        if(role.direction) properties.direction = role.direction;
                        //推送进入列表
                        let spawnItem:SpawnItem = {
                            room:room.name,
                            body:role.body,
                            name:name,
                            properties:properties
                        };
                        if(role.birthSpawn)spawnItem.birthSpawn = role.birthSpawn;
                        spawnlist.push(spawnItem);
                    }
                }else{
                    if(creep.memory.role != role.name){
                        creep.memory.role = role.name;
                    }
                }
            }
        }
    }
}

export function doSpawn(){
    if(global.spawnlist.length){
        let err = -100;
        let spawnItem:SpawnItem;
        while(err != OK && spawnlist.length){
            spawnItem = spawnlist.shift();
            if(spawnItem.name == 'E36N53_transformer_2')console.log(spawnItem.properties.memory);
            err = Game.spawns["SH"].spawnCreep(spawnItem.body,spawnItem.name,spawnItem.properties);
            
            // if(err == 0){//备用，不知道为什么之前记忆打不上
            //     Memory.creeps[spawnItem.name] = spawnItem.memory;
            // }
        }
        return err;
    }
    return OK;
}



