import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import parse from 'html-react-parser'
import Image from 'next/image'
import { FC } from 'react'

import { useAuth } from '@/hooks/useAuth'

import MaterialIcon from '../MaterialIcon'

import styles from './Comments.module.scss'
import DeleteButton from './DeleteButton'
import { IComment } from './comments.interface'

dayjs.extend(relativeTime)
const Comment: FC<{ comment: IComment }> = ({ comment }) => {
	const { user: authUser } = useAuth()
	const { updatedAt, content, user } = comment

	const isCanDelete = authUser?.isAdmin || user._id === authUser?._id
	return (
		<div className={styles.comment}>
			<div className={styles.avatar}>
				<Image
					src={user.avatarPath ? user.avatarPath : '/noAvatar.png'}
					alt="avatar"
					width="64"
					height="64"
				/>
			</div>
			<div className={styles.wrapper}>
				{isCanDelete && (
					<DeleteButton commentId={comment._id} movieId={comment.movie} />
				)}

				<div className={styles.name}>{user.email}</div>
				<div className={styles.time}>{dayjs(updatedAt).fromNow()}</div>
				<div className={styles.text}>{parse(content)}</div>
				<div className={styles.reply} onClick={() => alert('coming soon')}>
					Reply to {user.email}
				</div>
			</div>
		</div>
	)
}

export default Comment
