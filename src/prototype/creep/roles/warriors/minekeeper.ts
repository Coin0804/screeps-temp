import { Dictionary } from "lodash";
import { run_as_builder_out } from "../workers/claimer/outbuilder";

//我的第一个兵种
export function run_as_minekeeper(creep:Creep){
    //跨房单位自检
    let team = creep.memory.team;
    if(!team) return creep.goTo(Game.flags['aim'].pos);
    let flag = Game.flags['defense'+team];
    if(!flag) return creep.goTo(Game.flags['aim'].pos);

    // /* 形势判断 */
    let inRoom = creep.room.name == flag.pos.roomName;
    // let danger = {player:false,npc:false};
    // if(inRoom){
    //     var enemyList = _.groupBy(creep.room.find(FIND_HOSTILE_CREEPS),
    //     (c) => {
    //         if(c.owner) return "player";
    //         return "npc";
    //     });

    //     if(enemyList.player){
    //         danger.player = true;

    //     }
    //     if(enemyList.npc) danger.npc = true;
        



    // }




    let cloestEnemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    /* 移动模块 */
    //如果没到防御房间，走过去。
    if(!inRoom){
        creep.say("正在前往保卫地点");
        creep.goTo(flag.pos);
    }else{
        if(cloestEnemy){
            creep.goTo(cloestEnemy.pos,3);
            creep.heal(creep);
            creep.rangedAttack(cloestEnemy);
        }
        else{
            if(flag.pos.roomName == Game.flags['build'+team].pos.roomName){
                let err = run_as_builder_out(creep)
            }
        }
    }
    // if(danger.npc){
    //     creep.goTo(creep.pos.findClosestByRange(enemyList.npc.map()))
    // }


    /* 治疗模块 */
    //无脑治疗自己先
    // creep.heal(creep);


    //攻击模块
    // if(cloestEnemy){
    //     creep.heal(creep);
    //     creep.rangedAttack(cloestEnemy);
    // }
    // else{
    //     let err = run_as_builder_out(creep)
    //     if(!err){
    //         // creep.goTo(flag.pos);
    //     }
    // }




}