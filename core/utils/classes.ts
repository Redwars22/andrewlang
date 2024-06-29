/*
                    GNU GENERAL PUBLIC LICENSE
                       Version 3, 29 June 2007

 Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
 Everyone is permitted to copy and distribute verbatim copies
 of this license document, but changing it is not allowed.
*/

import { keywords } from "../keywords";
import { symbols } from "../symbols";

// Piece of code written by AndrewNation

export const classRules = {
  METHOD_CALL: /[a-zA-Z0-9]*\.{1}[a-zA-Z0-9]*\(.*\)[;]?/gm,
  CONSTRUCTOR: "",
  METHOD: /[a-z0-9_]+\([a-z0-9_ ,]*\)/gm,
};

export const JSClass = {
    THIS_KEYWORD: "this"
}

export function parseThisKeyword(tokens: string[]): string {
  const _tokens = tokens;

  for (let tok = 0; tok < _tokens.length; tok++) {
    if (
      _tokens[tok].includes(symbols.OBJECT_PROP_OR_METHOD) &&
      _tokens[tok].includes(keywords.OBJ_THIS_INSTANCE)
    ) {
        _tokens[tok] = _tokens[tok].replace(keywords.OBJ_THIS_INSTANCE, JSClass.THIS_KEYWORD);
    }
  }

  return _tokens.join(" ");
}
