import { useContext } from "react"
import { CodeContext } from "../../context"
import styles from "./styles.module.css"

export default function CheckList() {
	const {
		mintable,
		burnable,
		supplyCapped,
		maxSupply,
		setMintable,
		setBurnable,
		setSupplyCapped,
		setMaxSupply
	} = useContext(CodeContext)
	return (
		<div className={styles.formSection}>
			<div className={styles.checkGroup}>
				<input
					className={styles.checkBox}
					name="mintable"
					type="checkbox"
					onChange={() => setMintable!(!mintable)}
					checked={mintable}
				/>
				<label htmlFor="mintable">Mintable</label>
			</div>
			{mintable ? (
				<>
					<div className={styles.checkGroup}>
						<input
							className={styles.checkBox}
							name="supplyCapped"
							type="checkbox"
							onChange={() => setSupplyCapped!(!supplyCapped)}
							checked={supplyCapped}
						/>
						<label htmlFor="supplyCapped">Supply Capped</label>
					</div>
					{supplyCapped ? (
						<div className={styles.formGroup}>
							<label
								className={styles.maxSuppplyLabel}
								htmlFor="maxSupply"
							>
								Max Supply
							</label>
							<input
								className={styles.maxSupplyInput}
								name="maxSupply"
								type="number"
								onChange={e =>
									setMaxSupply!(
										isNaN(parseInt(e.target.value))
											? 0
											: parseInt(e.target.value)
									)
								}
								value={maxSupply}
							/>
						</div>
					) : null}
				</>
			) : null}
			<div className={styles.checkGroup}>
				<input
					className={styles.checkBox}
					name="burnable"
					type="checkbox"
					onChange={() => setBurnable!(!burnable)}
					checked={burnable}
				/>
				<label htmlFor="burnable">Burnable</label>
			</div>
		</div>
	)
}
