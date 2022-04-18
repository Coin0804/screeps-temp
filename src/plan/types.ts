type plan = {
    workerlist:{name:string,number:number,body:BodyPartConstant[],memory?:any}[]
    wall:number
}

type towerplan = {
    towerlist:Id<StructureTower>[]
}
