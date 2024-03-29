/* 爬虫移动相关 */
interface Creep{
    // 通用寻路
    findPath(target:RoomPosition,range:number):string|null
    // 使用压缩数据移动
    goByPath():CreepMoveReturnCode | ERR_NO_PATH | ERR_NOT_IN_RANGE | ERR_INVALID_TARGET
    // 通用移动
    goTo(target:RoomPosition,range?:number):CreepMoveReturnCode | ERR_NO_PATH | ERR_NOT_IN_RANGE | ERR_INVALID_TARGET
    // 请求对穿
    requestCross(direction:DirectionConstant):OK | ERR_BUSY | ERR_NOT_FOUND
    // 处理对穿
    manageCross(direction:DirectionConstant,crossLevel:number):boolean
    // 单位移动
    go(direction: DirectionConstant): CreepMoveReturnCode | ERR_INVALID_TARGET
}

interface Memory{
    bypassRooms:Array<string>
}

/* 爬虫移动记忆 */
interface CreepMemory{
    // 爬虫移动数据
    moveData?: {
        // 序列化之后的路径信息
        path?: string
        // 移动索引，标志 creep 现在走到的第几个位置
        index?: number
        // 上一个位置信息，形如"14/4"，用于在 creep.move 返回 OK 时检查有没有撞墙
        prePos?: string
        // 所在shard
        shard?: string
        // 缓存路径的目标，该目标发生变化时刷新路径, 形如"14/4E14S1"
        targetPos?: string
        
    }
    // 爬虫绕过房间列表
    bypassRooms?: string[]
    // 对穿等级
    crossLevel?: number
    // 目标shard
    targetShard?: string
    // 跨shard穿过的portalRoom
    protalRoom?: string
    // 不允许对穿
    standed?: boolean
    // 禁用自己对穿
    disableCross?: boolean
    //
    team?: number
}
// declare module NodeJS {
//     // 全局对象
//     interface Global {
// 		Mounted:boolean
//         // 寻路的键值对
//         routeCache:{
//             // 键为路径的起点和终点 值为压缩后的路径
//             [routekey:string]:string
//         }
//     }
// }