import { useQuery } from 'react-query'

import { IOption } from '@/components/ui/select/select.interface'

import { GenreService } from '@/services/genre.service'

import { toastError } from '@/utils/toast-error'

export const useAdminGenres = () => {
	const queryData = useQuery('list of genres', () => GenreService.getAll(), {
		onError: (error) => {
			toastError(error, 'Get genres')
		},
		select: ({ data }) =>
			data.map(
				(genre): IOption => ({
					value: genre._id,
					label: genre.name,
				})
			),
	})

	return queryData
}
