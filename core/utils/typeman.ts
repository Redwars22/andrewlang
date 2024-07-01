/*
                    GNU GENERAL PUBLIC LICENSE
                       Version 3, 29 June 2007

 Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
 Everyone is permitted to copy and distribute verbatim copies
 of this license document, but changing it is not allowed.
*/

// Piece of code written by AndrewNation

import { TToken, ITypeManipulation, JSTypeDictionary } from "../type/types";

export function handleParseTypeCasting(tokens: TToken[]){
    let valueToCast: ITypeManipulation = {
        value: "",
        initialType: "any",
        typeTarget: ""
    };

    const _tokens = tokens

    valueToCast.typeTarget = _tokens[0];
    valueToCast.value = _tokens[1];
    valueToCast.initialType = typeof valueToCast.value;

    return `${JSTypeDictionary[valueToCast.typeTarget]}${valueToCast.value}`
}