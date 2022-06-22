import cn from 'classnames'
import dynamic from 'next/dynamic'
import { FC } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { stripHtml } from 'string-strip-html'

import { useAuth } from '@/hooks/useAuth'

import formStyles from '@/shared/admin/adminForm.module.scss'

import { register } from '@/store/user/user.actions'

import SkeletonLoader from '../SkeletonLoader'

import Comment from './Comment'
import styles from './Comments.module.scss'
import { useComments } from './useComments'

const DynamicTextEditor = dynamic(
	() => import('@/ui/form-elements/TextEditor'),
	{
		ssr: false,
	}
)
const Comments: FC<{ movieId: string }> = ({ movieId }) => {
	const { handleSubmit, control, setValue, register } = useForm<{
		content: string
	}>({
		mode: 'onSubmit',
	})
	const { data, isLoading, mutate } = useComments(movieId)
	const { user } = useAuth()
	const onSubmit: SubmitHandler<{ content: string }> = ({ content }) => {
		mutate({ content: String(content), movieId })
		setValue('content', '')
	}

	return (
		<div className={styles.comments}>
			<div className={styles.heading}>Comments</div>
			{isLoading ? (
				<SkeletonLoader count={5} className="h-32" />
			) : (
				<>
					{data?.map((comment) => (
						<Comment key={comment._id} comment={comment} />
					))}
				</>
			)}
			{user ? (
				<form
					onSubmit={handleSubmit(onSubmit)}
					className={cn(formStyles.form, styles.form)}
				>
					<textarea
						className={styles.textArea}
						{...register('content', {
							required: 'Message is required',
						})}
						placeholder="Message"
					/>

					<div className={styles.buttonWrapper}>
						<button className={styles.button}>Submit</button>
					</div>
				</form>
			) : (
				<h3 className={styles.notAuthorized}>
					To leave comments you need to be authorized
				</h3>
			)}
		</div>
	)
}

export default Comments
