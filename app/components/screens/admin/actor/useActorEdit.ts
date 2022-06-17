import { useRouter } from 'next/router'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { ActorService } from '@/services/actor.service'

import { getKeys } from '@/utils/object/getKeys'

import { getAdminUrl } from '@/configs/url.config'

import { toastError } from '../../../../utils/toast-error'

import { IActorEditInput } from './actor-edit.interface'

export const useActorEdit = (setValue: UseFormSetValue<IActorEditInput>) => {
	const { push, query } = useRouter()

	const genreId = String(query.id)

	const { isLoading } = useQuery(
		['actor', genreId],
		() => ActorService.getById(genreId),
		{
			onSuccess: ({ data }) => {
				getKeys(data).forEach((key) => setValue(key, data[key]))
			},
			onError: (error) => {
				toastError(error, 'Get actor')
			},
			enabled: !!query.id,
		}
	)
	const { mutateAsync } = useMutation(
		'update actor',
		(data: IActorEditInput) => ActorService.update(genreId, data),
		{
			onSuccess: () => {
				toastr.success('Update actor', 'update was successful')
				push(getAdminUrl('actors'))
			},
			onError: (error) => {
				toastError(error, 'Update actor')
			},
		}
	)
	const onSubmit: SubmitHandler<IActorEditInput> = async (data) => {
		mutateAsync(data)
	}

	return { onSubmit, isLoading }
}
