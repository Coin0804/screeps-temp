import Worker  from "./creep/actions";
import MoveCreep from "./creep/go";
import { WorketInRole } from "./creep/roles/roles";
import RoomPositionPlus from "./roomPosition/change";

function assign(obj1:{[key:string]:any},obj2:{[key:string]:any}){
    Object.getOwnPropertyNames(obj2.prototype).forEach(key =>{
        // if(key == 'runAs')console.log('there be runAs');
        if(key.includes('Getter')) {
            // console.log('there be Getter');
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


export function assignAllPrototype(){
    // console.log("assignall")
    assign(Creep,Worker);
    assign(Creep,MoveCreep);
    assign(PowerCreep,MoveCreep);
    assign(Creep,WorketInRole);
    assign(RoomPosition,RoomPositionPlus)
}