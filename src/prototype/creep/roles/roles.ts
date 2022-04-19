import Worker from "../actions"
import { run_as_builder } from "./builder/builder";
import { run_as_repairman } from "./repairman/repairman";
import { run_as_collector } from "./collector/normal";
import { run_as_upgrader } from "./upgrader/upgrader";
import { run_as_miner } from "./miner/simple";
import { run_as_transformer_outter } from "./transformer/outter";
import { run_as_transformer_inner } from "./transformer/inner";
import { run_as_transformer_central } from "./transformer/central";

const roles={
    builder:run_as_builder,
    repairman:run_as_repairman,
    upgrader:run_as_upgrader,
    collector:run_as_collector,
    miner:run_as_miner,
    transformer:run_as_transformer_outter,
    ci_transformer:run_as_transformer_inner,
    ce_transformer:run_as_transformer_central
}

export class WorketInRole extends Worker{
    runAs(role:string){
        if(roles[role])return (roles[role](this));
        return -100;
    }
}
