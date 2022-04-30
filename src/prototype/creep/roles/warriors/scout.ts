export function run_as_scout(creep:Creep){
    let flag = Game.flags["scoutAim"];
    if(flag){
        creep.goTo(flag.pos);
    }
}