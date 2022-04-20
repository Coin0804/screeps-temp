

export function run_as_transformer_through_rooms(creep:Creep){
    //行动前检查
    let team = creep.memory.team;
    if(!team) return creep.goTo(Game.flags['aim'].pos);
    let fromflag = Game.flags['from'+team];
    let toflag = Game.flags['to'+team];
    if(!fromflag || !toflag) return creep.goTo(Game.flags['aim'].pos);
    //状态判断
    if(creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0){
        //回家
        if(creep.room.name != toflag.pos.roomName) return creep.goTo(toflag.pos);
        if(toflag.color == COLOR_GREEN){
            let target:AnyStoreStructure = creep.pos.findClosestByRange(FIND_STRUCTURES,{
                filter:s => (s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_STORAGE)
                && s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            });
            return creep.dostore(target);
        }
        return creep.goTo(toflag.pos)
    }else{
        //去搬去
        if(creep.room.name != fromflag.pos.roomName) return creep.goTo(fromflag.pos);
        let err = creep.dowithdrawAt(fromflag.pos);
        if(err != OK)return creep.goTo(fromflag.pos);
        return err;
    }
}