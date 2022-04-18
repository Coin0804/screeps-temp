



export function run_as_upgrader(this:Creep){
    let upgrading = this.memory.upgrading||false;
    let err = -100;
    if(upgrading){
        err = this.doupgrade();
        if(err == ERR_NOT_ENOUGH_ENERGY){
            upgrading = false;
            this.memory.crossLevel =10;
        }else if(err == OK){
            this.memory.crossLevel =11;
        }
    }
    if(!upgrading){
        if(this.room.storage){
            err = this.dowithdraw(this.room.storage);
            if(err == ERR_NOT_ENOUGH_RESOURCES && Game.flags[this.room.name+"onhold"]){
                err = this.goTo(Game.flags[this.room.name+"onhold"].pos);
            }else if(err == ERR_FULL){
                upgrading = true;//其实可以直接动，放着先
            }
        }
    }
    this.memory.upgrading = upgrading;
    return err;
}