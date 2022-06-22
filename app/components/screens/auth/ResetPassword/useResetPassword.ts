import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { toastError } from '@/utils/toast-error'

import { getAuthUrl } from './../../../../configs/api.config'
import { AuthService } from './../../../../services/auth/auth.service'
import { IResetPasswordDto } from './IResetPassword.interface'

export const useResetPassword = () => {
	const { push } = useRouter()
	const { mutateAsync, isLoading } = useMutation(
		'reset password',
		(data: IResetPasswordDto) => AuthService.resetPassword(data),
		{
			onSuccess: () => {
				toastr.success('Password reset', 'password reset successfully')
				setTimeout(() => {
					push(getAuthUrl(''))
				}, 2000)
			},
			onError: (error) => {
				toastError(error, 'Reset password')
			},
		}
	)

	return {
		mutate: mutateAsync,
		isLoading,
	}
}
