


/**
 * 
 */
export function run_as_builder(this:Creep){
    let building = this.memory.building||false;
    let err = -100;
    if(building){
        err = this.dobuild();
        if(err == ERR_NOT_ENOUGH_ENERGY){
            building =false;
            this.memory.crossLevel =10;
        }else if(err == ERR_NOT_FOUND){
            err = this.runAs['repairman']();//之后会被任务系统替代
        }
    }
    if(!building){
        if(this.room.storage){
            err = this.dowithdraw(this.room.storage);
            if(err == ERR_NOT_ENOUGH_RESOURCES && Game.flags[this.room.name+"onhold"]){
                err = this.goTo(Game.flags[this.room.name+"onhold"].pos);
            }else if(err == ERR_FULL){
                building = true;//其实可以直接动，放着先
            }
        }
    }
    this.memory.building = building;
    return err;
}