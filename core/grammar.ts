/*
                    GNU GENERAL PUBLIC LICENSE
                       Version 3, 29 June 2007

 Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
 Everyone is permitted to copy and distribute verbatim copies
 of this license document, but changing it is not allowed.
*/

import { classRules } from "./utils/classes";

// Piece of code written by AndrewNation

export const rules = {
  FUNCTION_CALL: /[a-z0-9_]+\([a-z0-9_]*\)[;]?/gm,
  INC_DEC_STATEMENT: /.*[a-zA-Z_0-9].{2}[-+]?(;)/gm,
  INC_DEC_STATEMENT_PRE: /.{2}[-+].*[a-zA-Z_0-9]?(;)/gm,
  CLASSES: classRules,
  NUMBER: /[0-9.]+/gm,
  IDENTIFIER: /[0-9a-z_A-Z]+/gm,
  ASSIGN_STATEMENT: /.*( )?=( )?.*(;)?/gm
};
