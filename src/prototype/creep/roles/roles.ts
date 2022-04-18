import { run_as_builder } from "./builder/builder";
import Worker from "../actions"
import { run_as_repairman } from "./repairman/repairman";



export class WorkerInRole extends Worker{
    runAs={
        builder:run_as_builder,
        repairman:run_as_repairman,
        // miner:,
    }
}
