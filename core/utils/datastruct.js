"use strict";
/*
                    GNU GENERAL PUBLIC LICENSE
                       Version 3, 29 June 2007

 Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
 Everyone is permitted to copy and distribute verbatim copies
 of this license document, but changing it is not allowed.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.defToConst = defToConst;
var symbols_1 = require("../symbols");
// Piece of code written by AndrewNation
function defToConst(data) {
    return "const ".concat(data.id, " ").concat(symbols_1.symbols.ASSIGN, " ").concat(data.value);
}
