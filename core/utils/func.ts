/*
                    GNU GENERAL PUBLIC LICENSE
                       Version 3, 29 June 2007

 Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
 Everyone is permitted to copy and distribute verbatim copies
 of this license document, but changing it is not allowed.
*/

import { builtinMethods } from "../lib/io";

export function getJSFuncCounterpart(key: string) {
	if (key == "PRINT") {
		return builtinMethods.io.PRINT;
	}

	return "";
}

export function parseBuiltInFunctions(
	tokens: string[],
	pos: number,
	id: string,
	key: string
): string[] {
	let vectorOfTokens: string[] = tokens;

	for (let tk = 0; tk < tokens.length; tk++) {
		vectorOfTokens[tk] = vectorOfTokens[tk].replace(
			id,
			getJSFuncCounterpart(key)
		);
	}

	return vectorOfTokens;
}
