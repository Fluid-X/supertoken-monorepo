import styles from "./styles.module.css"

import InitializerData from "./InitializerData"
import CheckList from "./CheckList"

export default function SelectionBar() {
	return (
		<form className={styles.form}>
			<InitializerData />
			<CheckList />
		</form>
	)
}
