type Plan = {
    roomlist:{
        name:string,
        workerlist:{
            name:string,
            number:number,
            body:BodyPartConstant[],
            birthSpawn?:number,
            memory?:any,
            directions?:DirectionConstant[]
        }[]
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
