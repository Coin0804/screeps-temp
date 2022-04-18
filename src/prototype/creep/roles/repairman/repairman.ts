

export function run_as_repairman(this:Creep){
    let repairing = this.memory.repairing||false;
    let err = -100;
    if(repairing){
        err = this.dorepair();
        if(err == ERR_NOT_ENOUGH_ENERGY){
            repairing = false;
            this.memory.crossLevel =10;
        }else if(err == ERR_INVALID_TARGET){
            err = this.runAs['upgrader']();//之后会被任务系统替代
        }
    }
    if(!repairing){
        if(this.room.storage){
            err = this.dowithdraw(this.room.storage);
            if(err == ERR_NOT_ENOUGH_RESOURCES && Game.flags[this.room.name+"onhold"]){
                err = this.goTo(Game.flags[this.room.name+"onhold"].pos);
            }else if(err == ERR_FULL){
                repairing = true;//其实可以直接动，放着先
            }
        }
    }
    this.memory.repairing = repairing;
    return err;
}
