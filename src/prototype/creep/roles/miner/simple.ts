/**
 * 
 */
export function run_as_miner(this:Creep){
    let readyPos = this.memory.readyPos;
    if(!readyPos)return -10;
    if(this.pos.x == readyPos.x && this.pos.y == readyPos.y){
        this.domine();
    }else{
        let target = new RoomPosition(readyPos.x,readyPos.y,this.room.name);
        this.goTo(target,0);
    }
}
