import { createContext, Dispatch, SetStateAction } from "react"

interface ICodeContext {
	name: string
	symbol: string
	initialSupply: number
	mintable: boolean
	burnable: boolean
	supplyCapped: boolean
	maxSupply: number
	setName?: Dispatch<SetStateAction<string>>
	setSymbol?: Dispatch<SetStateAction<string>>
	setInitialSupply?: Dispatch<SetStateAction<number>>
	setMintable?: Dispatch<SetStateAction<boolean>>
	setBurnable?: Dispatch<SetStateAction<boolean>>
	setSupplyCapped?: Dispatch<SetStateAction<boolean>>
	setMaxSupply?: Dispatch<SetStateAction<number>>
}

export const initialState = {
	name: "Super Juicy Token",
	symbol: "SJT",
	initialSupply: 1,
	mintable: false,
	burnable: false,
	supplyCapped: false,
	maxSupply: 0
}

export const CodeContext = createContext<ICodeContext>(initialState)
