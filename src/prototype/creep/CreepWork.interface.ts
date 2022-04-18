interface Creep{
    dopickup(resource:Resource):number
    doupgrade(dush?:boolean):number
    dostore(target:AnyStoreStructure,resourceType:ResourceConstant):number
    dostoreAll(target:AnyStoreStructure):number
    dobuild(strategy?:1|0,dush?:boolean):number
    dorepair():number
    domine():number
    dowithdraw(target:AnyStoreStructure,resourceType?:ResourceConstant):number
    dowithdrawAll(target:AnyStoreStructure):number
}

interface CreepMemory{
    //维修目标
    repairTarget?: Id<AnyStructure>
    //挖矿目标
    source?: number
    //
    role:string
}