import { useMemo } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { CommentService } from '@/services/comments.service'

import { toastError } from './../../../utils/toast-error'

export const useComments = (movieId: string) => {
	const { isLoading, data, refetch } = useQuery(
		['movie comments', movieId],
		() => CommentService.getMovieComments(String(movieId)),
		{
			select: ({ data }) => data,
			enabled: !!movieId,
			onError: () => toastError('Error loading comments'),
		}
	)

	const { mutate, isLoading: isCreatePostLoading } = useMutation(
		'post comment',
		(data: any) => CommentService.postComment(data),
		{
			onSuccess: () => {
				toastr.success('Post comment', 'comment was created')
				refetch()
			},
			onError: () => toastError('Error posting comment'),
		}
	)
	const { mutate: deleteMutate, isLoading: isDeleteLoading } = useMutation(
		'delete comment',
		(commentId: string) => CommentService.deleteComment(commentId),
		{
			onSuccess: () => {
				toastr.success('Delete comment', 'create was successful')
				refetch()
			},
			onError: () => toastError('Error deleting'),
		}
	)
	return useMemo(
		() => ({
			isLoading,
			data,
			mutate,
			isCreatePostLoading,
			deleteMutate,
			isDeleteLoading,
		}),
		[
			isLoading,
			data,
			mutate,
			isCreatePostLoading,
			deleteMutate,
			isDeleteLoading,
		]
	)
}
