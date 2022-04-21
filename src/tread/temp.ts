function truePrice(o:Order){
    return o.price*o.amount/(o.amount - Game.market.calcTransactionCost(o.amount,"E36N52",o.roomName));
}




export function autoTreadEnergy(){
    if(Game.resources["pixel"] >= 10) Game.market.createOrder({type:ORDER_SELL,resourceType:PIXEL,price:29999,totalAmount:10});
    if(Game.market.credits > 1000000){
        let orders = Game.market.getAllOrders((o) => 
            o.resourceType == RESOURCE_ENERGY &&
            o.amount >= 1000 && 
            o.amount*o.price+1000000 < Game.market.credits &&
            truePrice(o) <= 3 &&
            o.type == ORDER_SELL
        );
        orders = orders.sort((a,b) => truePrice(a) - truePrice(b));
        if(orders[0]){
            for(let i in orders [0])console.log(i,orders[0][i]);
            console.log(`buy ${orders[0].amount} energy in true price ${truePrice(orders[0])}`);
            Game.market.deal(orders[0].id,orders[0].amount,"E36N52");   
        }
        
    }
}