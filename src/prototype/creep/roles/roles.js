import { run_as_builder } from "./builder/builder";



class WorkerInRole extends Creep{
    runAs = {
        builder:run_as_builder,

    }
}


let test = {
    run:function(creep){
        creep.goTo(Game.flags['Aim'].pos,0);
    }
};

module.exports = {
    run:function(creep){
        // console.log(creep);
        if(creep.memory.role){
            let role = creep.memory.role;
            if(role == "collector"){
                collector.run(creep);
            }else if(role == "miner"){
                miner.run(creep);
            }else if(role == "transformer"){
                transformer.run(creep);
            }else if(role == "ci_transformer"){
                ci_transformer.run(creep);
            }else if(role == "builder"){
                builder.run(creep);
            }else if(role == "upgrader"){
                upgrader.run(creep);
            }else if(role == "test"){
                test.run(creep);
            }
        }
    }
};