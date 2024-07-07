"use strict";
/*
                    GNU GENERAL PUBLIC LICENSE
                       Version 3, 29 June 2007

 Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
 Everyone is permitted to copy and distribute verbatim copies
 of this license document, but changing it is not allowed.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.transpileToCPP = transpileToCPP;
// Piece of code written by AndrewNation
var fs = require("fs");
function compileCPP(input, output) { }
function transpileToCPP(code, output) {
    var template = fs.readFileSync("./template/base.cpp", "utf-8");
    var baseTemplate = template.split("/n");
    var finalCode = [];
    for (var i = 0; i < baseTemplate.length; i++) {
        finalCode.push(baseTemplate[i]);
        if (i == 5) {
            for (var j = 0; j < code.length; j++) {
                console.log(code[j]);
                finalCode.push(code[j]);
            }
        }
    }
    fs.writeFile(output, finalCode.join("\n"), function (err) {
        if (err) {
            console.error(err);
        }
        else {
            console.log("Successfully wrote data to ".concat(output));
        }
    });
}
