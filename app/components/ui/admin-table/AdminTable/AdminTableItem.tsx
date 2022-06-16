import { FC } from 'react'

import AdminActions from './AdminActions/AdminActions'
import styles from './AdminTable.module.scss'
import { IAdminTableItem } from './admin-table.interface'

const AdminTableItem: FC<IAdminTableItem> = ({ removeHandler, tableItem }) => {
	return (
		<div className={styles.item}>
			{tableItem.items.map((value) => (
				<div key={value}>{value}</div>
			))}
			<AdminActions removeHandler={removeHandler} editUrl={tableItem.editUrl} />
		</div>
	)
}

export default AdminTableItem
