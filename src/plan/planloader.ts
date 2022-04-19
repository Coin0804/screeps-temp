export const plan1:Plan = {
    roomlist:[
        {
            name:'E36N53',
            workerlist:[
                {
                    name:"ci_transformer",
                    number:1,
                    body:[CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE],
                    memory:{
                        crossLevel:12
                    }
                },
                {
                    name:"collector",
                    number:0,
                    body:[CARRY,CARRY,CARRY,CARRY,
                        MOVE,MOVE,MOVE,MOVE
                    ]
                },
                {
                    name:"miner",
                    number:0,
                    body:[WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE],
                    memory:[
                        {source:0,readyPos:{x:44,y:12}},
                        {source:1,readyPos:{x:19,y:33}}
                    ]
                },
                {
                    name:"link_miner",
                    number:2,
                    body:[WORK,WORK,WORK,WORK,WORK,CARRY,MOVE],
                    memory:[
                        {source:1,readyPos:{x:19,y:33},linkfloor:40},
                        {source:0,readyPos:{x:44,y:12},linkfloor:40}
                    ]
                },
                {
                    name:"transformer",
                    number:0,
                    body:[CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,MOVE],
                    memory:[
                        {withdrawTargets:["62553709cd5ecd03cb5c597d"],storeTargets:["62559c94dd2d666398c06c85","625644736adc11833762150f"]},
                        {withdrawTargets:["6256bc628f89e857cbe91ea8"],storeTargets:["625644736adc11833762150f"]}
                    ]
                },
                {
                    name:"ce_transformer",
                    number:1,
                    body:[CARRY,CARRY,CARRY],
                    directions:[BOTTOM],
                    memory:{
                        standed:true
                    }
                },
                {
                    name:"builder",
                    number:1,
                    body:[WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
                },
                {
                    name:"upgrader",
                    number:1,
                    body:[WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
                }
            ]
        },//第一个房间
        // {
            
        // }
    ],
    wall:80000
}


export const towerPlan1:TowerPlan = {
    towerlist:[<Id<StructureTower>>"62559c94dd2d666398c06c85"]
}

export const linkPlan1:LinkPlan = {
    pairs:[
        {from:<Id<StructureLink>>"625b1f15158189267a1efe69",to:<Id<StructureLink>>"6257e65af4acb2674275fe6e"},
        {from:<Id<StructureLink>>"6257e4bb34865a426e67062d",to:<Id<StructureLink>>"6257e65af4acb2674275fe6e"},
    ]
}
