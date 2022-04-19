type Plan = {
    roomlist:{
        name:string,
        workerlist:{
            name:string,
            number:number,
            body:BodyPartConstant[],
            birthSpawn?:number,
            memory?:any,
            direction?:DirectionConstant
        }[]
    }[]
    mianSpawn?:number
    wall:number
}

type TowerPlan = {
    towerlist:Id<StructureTower>[]
}
