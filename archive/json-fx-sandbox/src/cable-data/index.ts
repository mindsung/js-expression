import { exportJSON, fx } from "../common";
import { CableDataTemplate } from "./cable-data-template";
import { CableData } from "./cable-data";
import * as path from "path";

const out = fx(CableDataTemplate, [{ name: "$", value: CableData }]);

const json = JSON.stringify(out, null, 2);

exportJSON(path.resolve(__dirname, "out/cable-data.json"), json);
console.log(json.substr(0, 10000));
