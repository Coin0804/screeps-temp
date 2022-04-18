interface RoomPosition{
    stringify():string
    directionToObjects(direction:DirectionConstant):{x:number,y:number}
    directionToPos(direction:DirectionConstant):RoomPosition
}