import { describe, it } from "mocha";
import { $CABLE_DATA_1, $CABLE_DATA_2 } from "./sample/sources/cable-data";
import { JsonFx } from "./compiler/runtime/json-fx";
import { coreExpressions } from "./expressions/core";
import { mathExpressions } from "./expressions/math";
import { cableDataTemplate } from "./sample/cable-data-template";
import * as fs from "fs";

// const fs = require("fs");

describe("Sandbox", () => {
  it("Executes w/o throwing exceptions", function () {
    const fx = new JsonFx(coreExpressions, mathExpressions);

    // const script = fx.compile({
    //   "@user($id, $firstName, $lastName)": {
    //     "id": "$id",
    //     "firstName": "$firstName",
    //     "lastName": "$lastName"
    //   },
    //   "@userFromA($u)": "{ $split: $u.name:split(','), ret: @user($u.id, $split[0], $split[1]) }.ret",
    //   "users": "$A"
    // });
    // const output1 = script.evaluate({
    //     name: "$A", value: [
    //       { id: 7, name: "Aaron Eads" },
    //       { id: 1, name: "Robb Eads" },
    //       { id: 4, name: "Peter Parker" }
    //     ]
    //   },
    //   {
    //     name: "$B", value: [
    //       { id: 9, firstName: "Tony", lastName: "Stark" },
    //       { id: 10, firstName: "Bruce", lastName: "Banner" }
    //     ]
    //   });
    // console.log(output1);

    const script = fx.compile({
      "@doEveryTime()": { "hello": 5 },
      "@doSomething($a, $b)": {
        "a": "'var $a = ' + $a",
        "b": "'var $b = ' + $b",
        "$a_plus_b": "$a + $b",
        "a_and_b": "'var $a = ' + $a + ' and var $b = ' + $b + ' and $a + $b = ' + $a_plus_b"
      },
      "$c": "$.a + $.b",
      "$d": "@doSomething($.a, $.b)",
      "result": {
        "c": "$c",
        "d": "$d",
        "e": "@doSomething($.a, $c)",
        "$abc": "$.a + $.b + $c",
        "abc1": "$abc",
        "abc2": "$abc + ' #2'",
        "$hello": "@doEveryTime()",
        "hello": "$hello"
      }
    });
    const output1 = script.evaluate({ name: "$", value: { a: 3, b: 5 } });
    console.log(output1);
    const output2 = script.evaluate({ name: "$", value: { a: 4, b: 6 } });
    console.log(output2);

    // const script = fx.compile(cableDataTemplate);
    // const output1 = script.evaluate({ name: "$", value: $CABLE_DATA_1 });
    // console.log(output1);
    // const output2 = script.evaluate({ name: "$", value: $CABLE_DATA_2 });
    // console.log(output2);

    // fs.writeFile("./cable-1.json", JSON.stringify(output1, null, 2), err => console.log(err));
    // fs.writeFile("./cable-2.json", JSON.stringify(output2, null, 2), err => console.log(err));
  });
});
