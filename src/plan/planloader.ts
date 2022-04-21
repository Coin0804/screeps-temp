export const plan1:Plan = {
    roomlist:[
        {
            name:'E36N52',
            workerlist:[
                {
                    rolename:"ci_transformer",
                    number:1,
                    body:[
                        CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,
                        CARRY,CARRY,MOVE,CARRY,CARRY,MOVE
                    ],
                    memory:{
                        crossLevel:12
                    }
                },
                {
                    rolename:"collector",
                    number:1,
                    body:[CARRY,CARRY,MOVE]
                },
                {
                    rolename:"miner",
                    number:0,
                    body:[WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE],
                    memory:[
                        {source:0,readyPos:{x:44,y:12}},
                        {source:1,readyPos:{x:19,y:33}}
                    ]
                },
                {
                    rolename:"link_miner",
                    number:2,
                    body:[WORK,WORK,WORK,WORK,WORK,CARRY,MOVE],
                    memory:[
                        {source:1,readyPos:{x:19,y:33},linkfloor:40},
                        {source:0,readyPos:{x:44,y:12},linkfloor:40}
                    ]
                },
                {
                    rolename:"transformer",
                    number:1,
                    body:[
                        CARRY,MOVE,CARRY,MOVE,
                        CARRY,MOVE,CARRY,MOVE,
                        CARRY,MOVE,CARRY,MOVE,
                        CARRY,MOVE,CARRY,MOVE,
                        CARRY,MOVE,CARRY,MOVE,
                        CARRY,MOVE,CARRY,MOVE,
                        CARRY,MOVE,CARRY,MOVE,
                        CARRY,MOVE,CARRY,MOVE
                    ],
                    memory:{
                        withdrawTargets:["625644736adc11833762150f"],
                        storeTargets:[
                            "625e94f34db25f697556859f","625eaefe313abb0826d7b2cf",
                            "625ebf9a57df5862bbb89d16","625fd65a61c01b692f13f48e",
                            "625fdcaca6b99f9f317e49c3"
                        ]
                    },
                    
                },
                {
                    rolename:"ce_transformer",
                    number:1,
                    body:[CARRY,CARRY,CARRY],
                    directions:[BOTTOM],
                    memory:{
                        standed:true
                    }
                },
                {
                    rolename:"builder",
                    number:1,
                    body:[
                        WORK,WORK,WORK,
                        WORK,WORK,WORK,
                        CARRY,CARRY,CARRY,
                        CARRY,CARRY,CARRY,
                        MOVE,MOVE,MOVE,
                        MOVE,MOVE,MOVE,
                        MOVE,MOVE,MOVE,
                        MOVE,MOVE,MOVE
                    ],
                },
                {
                    rolename:"upgrader",
                    number:4,
                    body:[
                        WORK,WORK,WORK,WORK,WORK,
                        WORK,WORK,WORK,WORK,WORK,
                        WORK,WORK,WORK,WORK,WORK,
                        CARRY,CARRY,CARRY,CARRY,CARRY,
                        MOVE,MOVE,MOVE,MOVE,MOVE,
                        MOVE,MOVE,MOVE,MOVE,MOVE
                    ],
                }
            ]
        },//第一个房间
        {
            name:'E37N51',
            workerlist:[
                {
                    rolename:"ci_transformer",
                    number:1,
                    body:[
                        CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,
                        CARRY,CARRY,MOVE
                    ],
                    memory:{
                        crossLevel:12
                    }
                },
                {
                    rolename:"miner",
                    number:2,
                    body:[WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE],
                    memory:[
                        {source:1,readyPos:{x:17,y:21}},
                        {source:0,readyPos:{x:31,y:20}}
                    ]
                },
                {
                    rolename:"transformer",
                    number:2,
                    body:[
                        CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,
                        CARRY,CARRY,MOVE
                    ],
                    memory:[
                        {withdrawTargets:["625eeb549412e176b53e52b6"],storeTargets:["625ffa88fa0bdb9d37a98cdc"]},
                        {withdrawTargets:["625ee9cbb3a6b4210362cda0"],storeTargets:["625ffa88fa0bdb9d37a98cdc"]},
                    ]
                },
                {
                    rolename:"collector",
                    number:0,
                    body:[CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                },
                {
                    rolename:"builder",
                    number:1,
                    body:[WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
                },
                {
                    rolename:"repairman",
                    number:0,
                    body:[WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE],
                },
                {
                    rolename:"upgrader",
                    number:0,
                    body:[WORK,CARRY,MOVE],
                    memory:{
                        crossLevel:12
                    }
                },
            ]
        }
    ],
    wall:119000
}


export const towerPlan1:TowerPlan = {
    towerlist:[
        <Id<StructureTower>>"62559c94dd2d666398c06c85",<Id<StructureTower>>"6257e90c2056ad2824f23937",
        <Id<StructureTower>>"625f6c727e57d60e9b91cbfc"
    ]
}

export const linkPlan1:LinkPlan = {
    pairs:[
        {from:<Id<StructureLink>>"625b1f15158189267a1efe69",to:<Id<StructureLink>>"6257e65af4acb2674275fe6e"},
        {from:<Id<StructureLink>>"6257e4bb34865a426e67062d",to:<Id<StructureLink>>"6257e65af4acb2674275fe6e"},
    ]
}

export const outMinePlan1:OutMinePlan = {
    miners:[
        {
            rolename:'o_miner',
            birthroom:'E36N52',
            team:1,
            number:1,
            body:[WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE],
        },
        {
            rolename:'o_miner',
            birthroom:'E37N51',
            number:1,
            team:2,
            body:[WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE],
        }
    ],
    transformers:[
        {
            rolename:"tr_transformer",
            birthroom:'E36N52',
            number:1,
            team:1,
            body:[
                CARRY,MOVE,CARRY,
                CARRY,MOVE,CARRY,
                CARRY,MOVE,CARRY,
                CARRY,MOVE,CARRY,
                CARRY,MOVE,CARRY,
                CARRY,MOVE,CARRY
            ]
        },
        {
            rolename:"tr_transformer",
            birthroom:'E37N51',
            number:2,
            team:2,
            body:[
                CARRY,MOVE,CARRY,
                CARRY,MOVE,CARRY,
                CARRY,MOVE,CARRY,
                CARRY,MOVE,CARRY,
                CARRY,MOVE,CARRY,
                CARRY,MOVE,CARRY,
                CARRY,MOVE,CARRY,
                CARRY,MOVE,CARRY
            ]
        },
        {
            rolename:"tr_transformer",
            birthroom:'E37N51',
            number:2,
            team:3,
            body:[
                CARRY,MOVE,CARRY,
                CARRY,MOVE,CARRY,
                CARRY,MOVE,CARRY,
                CARRY,MOVE,CARRY,
                CARRY,MOVE,CARRY,
                CARRY,MOVE,CARRY,
                CARRY,MOVE,CARRY,
                CARRY,MOVE,CARRY
            ]
        }
    ],
    reversers:[
        {
            rolename:'colonizer',
            birthroom:'E36N52',
            number:1,
            team:1,
            body:[
                CLAIM,CLAIM,MOVE,MOVE
            ],
            efftctTicks:500
        },
        {
            rolename:'colonizer',
            birthroom:'E37N51',
            number:1,
            team:2,
            body:[
                CLAIM,CLAIM,MOVE,MOVE
            ],
            efftctTicks:500
        }
    ],
    guards:[
        {
            rolename:'minekeeper',
            birthroom:'E36N52',
            number:1,
            team:1,
            body:[
                WORK,WORK,CARRY,
                MOVE,MOVE,MOVE,MOVE,MOVE,
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                HEAL,HEAL,HEAL,
                RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK
            ]
        },
        {
            rolename:'minekeeper',
            birthroom:'E37N51',
            number:1,
            team:2,
            body:[
                TOUGH,TOUGH,TOUGH,
                WORK,CARRY,
                MOVE,MOVE,MOVE,MOVE,MOVE,
                RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,
                HEAL                
            ]
        }
    ]





}
// Game.market.deal("625c2bdcb9aa188d03d31f2d",30000,"E36N52")