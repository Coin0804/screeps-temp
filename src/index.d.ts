type SpawnProperties = {
    memory:any,
    directions?:DirectionConstant[]
}

type SpawnItem = {
    birthroom:string
    birthSpawn?:number
    body:BodyPartConstant[]
    name:string
    properties:SpawnProperties
}
