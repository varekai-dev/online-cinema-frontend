import { useMutation } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { toastError } from '@/utils/toast-error'

import { AuthService } from '../../../../services/auth/auth.service'

export const useRestorePassword = () => {
	const { mutateAsync, isLoading } = useMutation(
		'reset password',
		(email: string) => AuthService.restorePassword(email),
		{
			onSuccess: () => {
				toastr.success(
					'Restore password',
					'link to reset password has been sent to your email'
				)
			},
			onError: (error) => {
				toastError(error, 'Restore password')
			},
		}
	)

	return {
		mutate: mutateAsync,
		isLoading,
	}
}
