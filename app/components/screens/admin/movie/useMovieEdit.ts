import { useRouter } from 'next/router'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { MovieService } from '@/services/movie.service'

import { getKeys } from '@/utils/object/getKeys'

import { getAdminUrl } from '@/configs/url.config'

import { toastError } from '../../../../utils/toast-error'

import { IMovieEditInput } from './movie-edit.interface'

export const useMovieEdit = (setValue: UseFormSetValue<IMovieEditInput>) => {
	const { push, query } = useRouter()

	const genreId = String(query.id)

	const { isLoading } = useQuery(
		['movie', genreId],
		() => MovieService.getById(genreId),
		{
			onSuccess: ({ data }) => {
				getKeys(data).forEach((key) => setValue(key, data[key]))
			},
			onError: (error) => {
				toastError(error, 'Get movie')
			},
			enabled: !!query.id,
		}
	)
	const { mutateAsync } = useMutation(
		'update movie',
		(data: IMovieEditInput) => MovieService.update(genreId, data),
		{
			onSuccess: () => {
				toastr.success('Update movie', 'update was successful')
				push(getAdminUrl('genres'))
			},
			onError: (error) => {
				toastError(error, 'Update movie')
			},
		}
	)
	const onSubmit: SubmitHandler<IMovieEditInput> = async (data) => {
		mutateAsync(data)
	}

	return { onSubmit, isLoading }
}