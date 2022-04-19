type SpawnProperties = {
    memory:any,
    directions?:DirectionConstant[]
}

type SpawnItem = {
    room:string
    birthSpawn?:number
    body:BodyPartConstant[]
    name:string
    properties:SpawnProperties
}
