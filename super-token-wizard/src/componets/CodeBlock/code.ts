const npmPackageName = "@some-package"

interface CodeParams {
	name: string
	symbol: string
	initialSupply: number
	mintable: boolean
	burnable: boolean
	supplyCapped: boolean
	maxSupply: number
}

export const code = ({
	name,
	symbol,
	initialSupply,
	mintable,
	burnable,
	supplyCapped,
	maxSupply
}: CodeParams) =>
	generateCode(
		name,
		symbol,
		initialSupply,
		supplyCapped,
		maxSupply,
		generateInheritance({ mintable, burnable }),
		generateFunctions({ mintable, burnable, supplyCapped }),
		generateImports({ mintable, burnable })
	)

const generateCode = (
	name: string,
	symbol: string,
	initialSupply: number,
	supplyCapped: boolean,
	maxSupply: number,
	inherited: Array<string>,
	functions: Array<string>,
	imports: Array<string>
) => `
// SPDX-License-Identifier: AGPLv3
pragma solidity ^0.8.0;

import {SuperTokenBase} from "${npmPackageName}/SuperTokenBase.sol";
${imports.reduce((str, imp) => str + `${imp}\n`, "")}

contract ${name.replaceAll(" ", "")} is SuperTokenBase${inherited.reduce(
	(str, inherit) => str + `, ${inherit}`,
	""
)} {${
	supplyCapped
		? `\n\tuint256 public constant maxSupply = ${maxSupply} * 1e18;\n`
		: ""
}\n\tfunction initialize() external {\n\t\t_initialize("${name}", "${symbol}");${
	initialSupply > 0
		? `\n\t\t_mint(receiver, ${initialSupply} * 1e18, new bytes(0));`
		: ""
}\n\t}${functions.reduce((str, func) => str + `\n\n${func}`, "")}
}
`

interface GeneratorParams {
	mintable: boolean
	burnable: boolean
	supplyCapped?: boolean
}

const generateFunctions = ({
	mintable,
	burnable,
	supplyCapped
}: GeneratorParams) => {
	let funcs: Array<string> = []
	if (burnable)
		funcs.push(
			"\tfunction burn(uint256 amount, bytes memory userData) external {\n\t\t_burn(msg.sender, amount, userData);\n\t}"
		)
	if (mintable)
		funcs.push(
			`\tfunction mint(address receiver, uint256 amount, bytes memory userData) external onlyOwner {${
				supplyCapped
					? '\n\t\trequire(amount + _totalSupply() <= maxSupply, "Supply Capped");'
					: ""
			}\n\t\t_mint(receiver, amount, userData);\n\t}`
		)
	return funcs
}

const generateInheritance = ({ mintable, burnable }: GeneratorParams) => {
	let inherits: Array<string> = []
	if (burnable) inherits.push("BurnableSuperToken")
	if (mintable) inherits.push("MintableSuperToken, Ownable")
	return inherits
}

const generateImports = ({ mintable, burnable }: GeneratorParams) => {
	let imps: Array<string> = []
	if (burnable)
		imps.push(
			`import {BurnableSuperToken} from "${npmPackageName}/BurnableSuperToken.sol";`
		)
	if (mintable)
		imps.push(
			`import {MintableSuperToken} from "${npmPackageName}/MintableSuperToken.sol";\nimport {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";`
		)
	return imps
}

export const getRemixUrl = (code: string) =>
	`https://remix.ethereum.org/?#code=${btoa(
		code
	)}&optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.7+commit.e28d00a7.js`
