import Worker  from "./creep/actions";
import MoveCreep from "./creep/go";
import { WorketInRole } from "./creep/roles/roles";
import RoomPositionPlus from "./roomPosition/change";

//挂载函数，来自hoho，但我看不懂if，只能看懂else
function assign(obj1:{[key:string]:any},obj2:{[key:string]:any}){
    Object.getOwnPropertyNames(obj2.prototype).forEach(key =>{
        if(key.includes('Getter')) {
            Object.defineProperty(obj1.prototype,key.split('Getter')[0],{
                get: obj2.prototype[key],
                enumerable:false,
                configurable:true
            });
        }else{
            obj1.prototype[key] = obj2.prototype[key];
        }
    });
}

/**
 * 挂载所有原型
 */
export function assignAllPrototype(){
    assign(Creep,Worker);
    assign(Creep,MoveCreep);
    assign(PowerCreep,MoveCreep);
    assign(Creep,WorketInRole);
    assign(RoomPosition,RoomPositionPlus)
}