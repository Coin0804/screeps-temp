type SpawnProperties = {
    memory:any,
    direction?:DirectionConstant
}

type SpawnItem = {
    room:string
    birthSpawn?:number
    body:BodyPartConstant[]
    name:string
    properties:SpawnProperties
}
