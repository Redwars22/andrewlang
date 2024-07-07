"use strict";
/*
                    GNU GENERAL PUBLIC LICENSE
                       Version 3, 29 June 2007

 Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
 Everyone is permitted to copy and distribute verbatim copies
 of this license document, but changing it is not allowed.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleParseTypeCasting = handleParseTypeCasting;
// Piece of code written by AndrewNation
var types_1 = require("../type/types");
function handleParseTypeCasting(tokens) {
    var valueToCast = {
        value: "",
        initialType: "any",
        typeTarget: ""
    };
    var _tokens = tokens;
    valueToCast.typeTarget = _tokens[0];
    valueToCast.value = _tokens[1];
    valueToCast.initialType = typeof valueToCast.value;
    return "".concat(types_1.JSTypeDictionary[valueToCast.typeTarget]).concat(valueToCast.value);
}
