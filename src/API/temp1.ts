
export function loadTemp1API(){
    if(!global.API)global.API = {};
    global.API.createColonizer = function(name:string,team = 1){
        return Game.spawns["SH"].spawnCreep([CLAIM,MOVE],name,{memory:{role:"colonizer",team:team}});
    }
    global.API.createOutBuilder = function(name:string,team = 1){
        return Game.spawns["SH"].spawnCreep(
            [WORK,WORK,WORK,WORK,WORK,
             CARRY,CARRY,CARRY,CARRY,CARRY,
             MOVE,MOVE,MOVE,MOVE,MOVE,
             MOVE,MOVE,MOVE,MOVE,MOVE],
            name,{memory:{role:"o_builder",team:team}});
    }
    global.API.createCollector = function(name:string){
        return Game.spawns["SH"].spawnCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],name,{memory:{role:"collector"}});
    }
}