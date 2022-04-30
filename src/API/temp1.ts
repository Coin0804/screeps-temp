import { autoTreadEnergy } from "@/tread/temp";

export function loadTemp1API(){
    if(!global.API)global.API = {};
    global.API.createColonizer = function(name:string,team = 1,spawn = "SH"){
        return Game.spawns[spawn].spawnCreep([CLAIM,MOVE],name,{memory:{role:"colonizer",team:team}});
    }
    global.API.createOutBuilder = function(name:string,team = 1,spawn = "SH"){
        return Game.spawns[spawn].spawnCreep(
            [WORK,WORK,WORK,WORK,WORK,
             CARRY,CARRY,CARRY,CARRY,CARRY,
             MOVE,MOVE,MOVE,MOVE,MOVE,
             MOVE,MOVE,MOVE,MOVE,MOVE],
            name,{memory:{role:"o_builder",team:team}});
    }
    global.API.createCollector = function(name:string,spawn = "SH"){
        return Game.spawns[spawn].spawnCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],name,{memory:{role:"collector"}});
    }
    global.API.createScout = function(name:string,spawn = "FY"){
        return Game.spawns[spawn].spawnCreep([MOVE],name,{memory:{role:"scout"}});
    }
    global.API.sellPixel = function(price:number,amount:number){
        return Game.market.createOrder({type:ORDER_SELL,resourceType:PIXEL,price:price,totalAmount:amount});
    }
    global.API.test1 = autoTreadEnergy;
    // let creep:Creep;
    // creep.signController()

    global.API.clearOrder = function(){
        for(let o in Game.market.orders){
            Game.market.cancelOrder(Game.market.orders[o].id);
        }
    }


    global.API.changeAllPixelPrice = function(price:number){
        for(let o in Game.market.orders){
            let order = Game.market.orders[o];
            if(order.resourceType == PIXEL){
                Game.market.changeOrderPrice(order.id,price);
            }
        }
    }

    global.API.changeOnePixelPrice = function(price:number){
        for(let o in Game.market.orders){
            let order = Game.market.orders[o];
            if(order.resourceType == PIXEL){
                return Game.market.changeOrderPrice(order.id,price);
            }
        }
    }
}