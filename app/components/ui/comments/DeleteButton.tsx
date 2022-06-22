import { FC } from 'react'
import { useMutation } from 'react-query'

import MaterialIcon from '../MaterialIcon'

import styles from './Comments.module.scss'
import { useComments } from './useComments'

const DeleteButton: FC<{ commentId: string; movieId: string }> = ({
	commentId,
	movieId,
}) => {
	const { deleteMutate } = useComments(movieId)
	return (
		<div
			className={styles.deleteButton}
			onClick={() => deleteMutate(commentId)}
		>
			<MaterialIcon name="MdDelete" />
		</div>
	)
}

export default DeleteButton
