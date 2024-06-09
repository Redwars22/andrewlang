/*
                    GNU GENERAL PUBLIC LICENSE
                       Version 3, 29 June 2007

 Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
 Everyone is permitted to copy and distribute verbatim copies
 of this license document, but changing it is not allowed.
*/

// Piece of code written by AndrewNation

import { TTokens } from "./type/types";

export function tokenize(code: string[]): TTokens {
  let tokenizedLines: TTokens = [[]];
  let currentLineTokens: string[];

  for (let line = 0; line < code.length; line++) {
    currentLineTokens = code[line].split(" ");
    tokenizedLines[line] = currentLineTokens;
  }

  return tokenizedLines;
}
