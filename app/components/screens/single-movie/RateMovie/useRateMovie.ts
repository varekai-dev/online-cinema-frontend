import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { RatingService } from '@/services/rating.service'

import { toastError } from '@/utils/toast-error'

export const useRateMovie = (movieId: string) => {
	const [rating, setRating] = useState(0)
	const [isSended, setIsSended] = useState(false)

	const { refetch } = useQuery(
		['movie rating', movieId],
		() => RatingService.getByUserMovie(movieId),
		{
			onSuccess: ({ data }) => setRating(data),
			onError: (error) => {
				toastError(error, 'Get movie rating')
			},
			enabled: !!movieId,
		}
	)
	const { mutateAsync } = useMutation(
		'update movie rating',
		({ value }: { value: number }) => RatingService.setRating(movieId, value),
		{
			onSuccess: () => {
				toastr.success('Rate movie', 'Your rating was successfully saved')
				setIsSended(true)
				refetch()
				setTimeout(() => {
					setIsSended(false)
				}, 2400)
			},
			onError: (error) => {
				toastError(error, 'Update rating')
			},
		}
	)
	const handleClick = async (nextValue: number) => {
		setRating(nextValue)
		await mutateAsync({ value: nextValue })
	}

	return { rating, handleClick, isSended }
}
