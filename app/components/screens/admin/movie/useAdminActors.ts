import { useQuery } from 'react-query'

import { IOption } from '@/components/ui/select/select.interface'

import { ActorService } from '@/services/actor.service'

import { toastError } from '@/utils/toast-error'

export const useAdminActors = () => {
	const queryData = useQuery('list of actors', () => ActorService.getAll(), {
		onError: (error) => {
			toastError(error, 'Get actor')
		},
		select: ({ data }) =>
			data.map(
				(actor): IOption => ({
					value: actor._id,
					label: actor.name,
				})
			),
	})

	return queryData
}
