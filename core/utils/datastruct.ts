/*
                    GNU GENERAL PUBLIC LICENSE
                       Version 3, 29 June 2007

 Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
 Everyone is permitted to copy and distribute verbatim copies
 of this license document, but changing it is not allowed.
*/

import { symbols } from "../symbols";
import { IVarOrConst } from "../type/types";

// Piece of code written by AndrewNation

export function defToConst(data: IVarOrConst){
    return `const ${data.id} ${symbols.ASSIGN} ${data.value}`;
}