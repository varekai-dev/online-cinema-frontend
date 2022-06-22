import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { toastError } from '@/utils/toast-error'

import { AuthService } from './../../../services/auth/auth.service'

export const useAuthVerification = () => {
	const { query } = useRouter()

	const token = query.token

	useQuery(
		['validate email', token],
		() => AuthService.emailVerification(String(token)),
		{
			enabled: !!token,
			select: ({ data }) => data,
			onError: (error) => toastError(error, 'Token not valid'),
			retry: 0,
			onSuccess: () => {
				toastr.success('Email verified', 'Verification was successful')
			},
		}
	)
}
