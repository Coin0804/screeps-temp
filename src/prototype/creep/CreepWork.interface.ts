interface Creep{
    dopickup(resource:Resource):number
    doupgrade(dush?:boolean):number
    dostore(target:AnyStoreStructure,resourceType?:ResourceConstant):number
    dostoreAll(target:AnyStoreStructure):number
    dobuild(strategy?:1|0,dush?:boolean):number
    dobuildAt(pos:RoomPosition):number
    dorepair():number
    domine():number
    dowithdraw(target:AnyStoreStructure|Ruin|Tombstone,resourceType?:ResourceConstant):number
    dowithdrawAll(target:AnyStoreStructure|Ruin|Tombstone):number
    doclaim(controller:StructureController):number
    doreserve(controller:StructureController):number
    searchAndCollecte():number
    withdrawInStorage():number

}

interface CreepMemory{
    //维修目标
    repairTarget?: Id<AnyStructure>
    //挖矿目标
    source?: number
    //
    role?:string
    //
    building?:boolean
    //
    repairing?:boolean
    //
    upgrading?:boolean
    //
    readyPos?:{x:number,y:number}
    //
    storeTargets?:Id<AnyStoreStructure>[]
    //
    withdrawTargets?:Id<AnyStoreStructure | Ruin | Tombstone>[]
    //
    linkfloor?: number
}