function truePrice(o:Order){
    return o.price*o.amount/(o.amount - Game.market.calcTransactionCost(o.amount,"E36N52",o.roomName));
}




export function autoTreadEnergy(ceiling = 3){
    // if(Game.resources["pixel"] >= 10) Game.market.createOrder({type:ORDER_SELL,resourceType:PIXEL,price:29999,totalAmount:10});
    if(Game.market.credits > 500000){
        let orders = Game.market.getAllOrders((o) => 
            o.resourceType == RESOURCE_ENERGY &&
            o.amount >= 1000 && 
            o.amount*o.price+500000 < Game.market.credits &&
            truePrice(o) <=  ceiling &&
            o.type == ORDER_SELL
        );
        orders = orders.sort((a,b) => truePrice(a) - truePrice(b));
        for(let order of orders){
            for(let i in order)console.log(i,order[i]);
            console.log(`buy ${order.amount} energy in true price ${truePrice(order)}`);
            Game.market.deal(order.id,order.amount,"E36N52");   
        }
        
    }
}