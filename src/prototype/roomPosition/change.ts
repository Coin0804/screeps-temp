



export default class RoomPositionPlus extends RoomPosition{
    directionToObjects(direction:DirectionConstant){
        switch(direction){
            case 1:return {x: 0, y:-1};
            case 2:return {x: 1, y:-1};
            case 3:return {x: 1, y: 0};
            case 4:return {x: 1, y: 1};
            case 5:return {x: 0, y: 1};
            case 6:return {x:-1, y: 1};
            case 7:return {x:-1, y: 0};
            case 8:return {x:-1, y:-1};
            default: return undefined;
        }
    }

    stringify(){
        return `${this.roomName}/${this.x}/${this.y}/${Game.shard.name}`;
    }

    directionToPos(direction:DirectionConstant){
        let arr = this.directionToObjects(direction);
        return new RoomPositionPlus(this.x+arr[0],this.y+arr[1],this.roomName);
    }


}