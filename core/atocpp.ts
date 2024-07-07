/*
                    GNU GENERAL PUBLIC LICENSE
                       Version 3, 29 June 2007

 Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
 Everyone is permitted to copy and distribute verbatim copies
 of this license document, but changing it is not allowed.
*/

import { transpile } from "./andrew";
import { tokenize } from "./tokenize";
import { TTokens } from "./type/types";
import { transpileToCPP } from "./utils/cpp";

// Piece of code written by AndrewNation

const fs = require("fs");
const { exec } = require("child_process");

let CPPCode: string[] = [];
let code: string[] = [];

function parse(lines: TTokens){
    for (let line = 0; line < lines.length; line++) {
        for (let pos = 0; pos < lines[line].length; pos++) {
          let currToken = lines[line][pos];

          CPPCode.push(lines[line].join(" "));
        }
    }
}

try {
    let input = process.argv[2];
    let output = process.argv[3];
  
    const data = fs.readFileSync(input, "utf-8");
    code = data.split("\n");

    parse(tokenize(code));
    transpileToCPP(CPPCode, output);

    exec(`g++ ${output} -o ${output.replace(".cpp","")}`);
} catch(e) {
    console.error(e);
}