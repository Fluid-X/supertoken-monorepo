import { useContext } from "react"
import { CodeContext } from "../../context"
import styles from "./styles.module.css"
import { code, getRemixUrl } from "./code"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism"

export default function CodeBlock() {
	const {
		name,
		symbol,
		initialSupply,
		mintable,
		burnable,
		supplyCapped,
		maxSupply
	} = useContext(CodeContext)
	const codeString = code({
		name,
		symbol,
		initialSupply,
		mintable,
		burnable,
		supplyCapped,
		maxSupply
	})

	const copy = async () => {
		if ("clipboard" in navigator) {
			await navigator.clipboard.writeText(codeString)
		} else console.log("clipboard not supported")
	}

	return (
		<div className={styles.codeWrapper}>
			<div className={styles.buttonBar}>
				<button className={styles.button} onClick={() => copy()}>
					Copy to Clipboard
				</button>
				<a className={styles.linkButton} href={getRemixUrl(codeString)}>
					Open In Remix IDE
				</a>
			</div>
			<pre className={styles.code}>
				<SyntaxHighlighter language="solidity" style={tomorrow}>
					{codeString}
				</SyntaxHighlighter>
			</pre>
		</div>
	)
}
