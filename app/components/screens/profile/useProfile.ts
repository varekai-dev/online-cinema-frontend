import { useRouter } from 'next/router'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { UserService } from '@/services/user.service'

import { toastError } from '@/utils/toast-error'

import { IProfileInput } from './profile.interface'

export const useProfile = (setValue: UseFormSetValue<IProfileInput>) => {
	const { isLoading } = useQuery('profile', () => UserService.getProfile(), {
		onSuccess: ({ data }) => {
			setValue('email', data.email)
		},
		onError: (error) => {
			toastError(error, 'Get profile')
		},
	})
	const { mutateAsync } = useMutation(
		'update profile',
		(data: IProfileInput) => UserService.updateProfile(data),
		{
			onSuccess: () => {
				toastr.success('Update movie', 'update was successful')
			},
			onError: (error) => {
				toastError(error, 'Profile updated')
			},
		}
	)
	const onSubmit: SubmitHandler<IProfileInput> = async (data) => {
		mutateAsync(data)
	}

	return { onSubmit, isLoading }
}
