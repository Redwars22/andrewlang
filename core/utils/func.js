"use strict";
/*
                    GNU GENERAL PUBLIC LICENSE
                       Version 3, 29 June 2007

 Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
 Everyone is permitted to copy and distribute verbatim copies
 of this license document, but changing it is not allowed.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJSFuncCounterpart = getJSFuncCounterpart;
exports.parseBuiltInFunctions = parseBuiltInFunctions;
var io_1 = require("../lib/io");
function getJSFuncCounterpart(key) {
    if (key == "PRINT") {
        return io_1.builtinMethods.io.PRINT;
    }
    return "";
}
function parseBuiltInFunctions(tokens, pos, id, key) {
    var vectorOfTokens = tokens;
    for (var tk = 0; tk < tokens.length; tk++) {
        vectorOfTokens[tk] = vectorOfTokens[tk].replace(id, getJSFuncCounterpart(key));
    }
    return vectorOfTokens;
}
