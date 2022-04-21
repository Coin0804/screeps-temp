type CreepBeBirth ={
    rolename:string,
    number:number,
    body:BodyPartConstant[],
    team?: number,
    birthSpawn?:number,
    memory?:any,
    directions?:DirectionConstant[],
    efftctTicks?:number
    birthroom?:string
}



type Plan = {
    roomlist:{
        name:string,
        workerlist:CreepBeBirth[]
    }[]
    mianSpawn?:number
    wall:number
}

type TowerPlan = {
    towerlist:Id<StructureTower>[]
}

type LinkPlan = {
    floor?: number
    pairs:{from:Id<StructureLink>,to:Id<StructureLink>}[]
}

type OutMinePlan = {
    miners:CreepBeBirth[]
    transformers:CreepBeBirth[]
    reversers:CreepBeBirth[]
    guards:CreepBeBirth[]
}
