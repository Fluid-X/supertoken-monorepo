import { useContext } from "react"
import { CodeContext } from "../../context"
import styles from "./styles.module.css"

export default function InitializerData() {
	const {
		name,
		symbol,
		initialSupply,
		setName,
		setSymbol,
		setInitialSupply
	} = useContext(CodeContext)
	return (
		<div className={styles.formSection}>
			<div className={styles.formGroup}>
				<label htmlFor="name">Super Token Name</label>
				<input
					className={styles.input}
					name="name"
					onChange={e => setName!(e.target.value)}
					value={name}
				/>
			</div>
			<div className={styles.formGroup}>
				<label htmlFor="symbol">Super Token Symbol</label>
				<input
					className={styles.input}
					name="symbol"
					onChange={e => setSymbol!(e.target.value)}
					value={symbol}
				/>
			</div>
			<div className={styles.formGroup}>
				<label htmlFor="initialSupply">Initial Supply</label>
				<input
					className={styles.input}
					name="initialSupply"
					type="number"
					onChange={e => setInitialSupply!(parseInt(e.target.value))}
					value={initialSupply}
				/>
			</div>
		</div>
	)
}
