import { FC } from 'react'

import Button from '@/components/ui/form-elements/Button'

import styles from './AdminCreateButton.module.scss'

const AdminCreateButton: FC<{ onClick: () => void }> = ({ onClick }) => {
	return <Button onClick={onClick}>Create new</Button>
}
export default AdminCreateButton
