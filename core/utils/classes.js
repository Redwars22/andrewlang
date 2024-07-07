"use strict";
/*
                    GNU GENERAL PUBLIC LICENSE
                       Version 3, 29 June 2007

 Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
 Everyone is permitted to copy and distribute verbatim copies
 of this license document, but changing it is not allowed.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSClass = exports.classRules = void 0;
exports.parseThisKeyword = parseThisKeyword;
var keywords_1 = require("../keywords");
var symbols_1 = require("../symbols");
// Piece of code written by AndrewNation
exports.classRules = {
    METHOD_CALL: /[a-zA-Z0-9]*\.{1}[a-zA-Z0-9]*\(.*\)[;]?/gm,
    CONSTRUCTOR: "",
    METHOD: /[a-z0-9_]+\([a-z0-9_ ,]*\)/gm,
};
exports.JSClass = {
    THIS_KEYWORD: "this"
};
function parseThisKeyword(tokens) {
    var _tokens = tokens;
    for (var tok = 0; tok < _tokens.length; tok++) {
        if (_tokens[tok].includes(symbols_1.symbols.OBJECT_PROP_OR_METHOD) &&
            _tokens[tok].includes(keywords_1.keywords.OBJ_THIS_INSTANCE)) {
            _tokens[tok] = _tokens[tok].replace(keywords_1.keywords.OBJ_THIS_INSTANCE, exports.JSClass.THIS_KEYWORD);
        }
    }
    return _tokens.join(" ");
}
