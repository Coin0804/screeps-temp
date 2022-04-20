type roomSituation = {
    danger?:{
        npc:{
            be:boolean,
            list?:Creep[],
            closest?:Creep
        },
        player:{
            be:boolean,
            list?:Creep[],
            closest?:Creep
        }
    }



}