import { useState } from "react"
import CodeBlock from "./componets/CodeBlock"
import Header from "./componets/Header"
import SelectionBar from "./componets/SelectionBar"
import { CodeContext, initialState } from "./context"

export default function App() {
	const [name, setName] = useState(initialState.name)
	const [symbol, setSymbol] = useState(initialState.symbol)
	const [initialSupply, setInitialSupply] = useState(
		initialState.initialSupply
	)
	const [mintable, setMintable] = useState(initialState.mintable)
	const [burnable, setBurnable] = useState(initialState.burnable)
	const [supplyCapped, setSupplyCapped] = useState(initialState.supplyCapped)
	const [maxSupply, setMaxSupply] = useState(initialState.maxSupply)

	return (
		<CodeContext.Provider
			value={{
				name,
				symbol,
				initialSupply,
				mintable,
				burnable,
				supplyCapped,
				maxSupply,
				setName,
				setSymbol,
				setInitialSupply,
				setMintable,
				setBurnable,
				setSupplyCapped,
				setMaxSupply
			}}
		>
			<Header />
			<div className="app">
				<div className="wrapper">
					<SelectionBar />
					<CodeBlock />
				</div>
			</div>
		</CodeContext.Provider>
	)
}
