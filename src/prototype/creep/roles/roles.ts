import Worker from "../actions"
import { run_as_builder } from "./workers/builder/builder";
import { run_as_repairman } from "./workers/repairman/repairman";
import { run_as_collector } from "./workers/collector/normal";
import { run_as_upgrader } from "./workers/upgrader/upgrader";
import { run_as_miner } from "./workers/miner/simple";
import { run_as_transformer_outter } from "./workers/transformer/outter";
import { run_as_transformer_inner } from "./workers/transformer/inner";
import { run_as_transformer_central } from "./workers/transformer/central";
import { run_as_miner_linked } from "./workers/miner/linked";
import { run_as_colonizer } from "./workers/claimer/colonizer";
import { run_as_builder_out } from "./workers/claimer/outbuilder";
import { run_as_upgrader_special } from "./workers/upgrader/special";
import { run_as_miner_outer } from "./workers/miner/outter";
import { run_as_transformer_through_rooms } from "./workers/transformer/throughRooms";
import { run_as_minekeeper } from "./warriors/minekeeper";
import { run_as_scout } from "./warriors/scout";

const roles={
    builder:run_as_builder,
    repairman:run_as_repairman,
    upgrader:run_as_upgrader,
    collector:run_as_collector,
    miner:run_as_miner,
    transformer:run_as_transformer_outter,
    ci_transformer:run_as_transformer_inner,
    ce_transformer:run_as_transformer_central,
    link_miner:run_as_miner_linked,
    colonizer:run_as_colonizer,
    o_builder:run_as_builder_out,
    s_upgrader:run_as_upgrader_special,
    o_miner:run_as_miner_outer,
    tr_transformer:run_as_transformer_through_rooms,
    minekeeper:run_as_minekeeper,
    scout:run_as_scout
}

export class WorketInRole extends Worker{
    runAs(role:string){
        if(roles[role])return (roles[role](this));
        return -100;
    }
}
