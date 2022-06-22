import { getContentType } from 'api/api.helpers'
import { axiosClassic } from 'api/interceptors'
import Cookies from 'js-cookie'

import { getAuthUrl } from '@/configs/api.config'

import { IAuthResponse } from '@/store/user/user.interface'

import { IResetPasswordDto } from './../../components/screens/auth/ResetPassword/IResetPassword.interface'
import { removeTokensStorage, saveToStorage } from './auth.helper'

export const AuthService = {
	async emailVerification(token: string | undefined) {
		return await axiosClassic.get(getAuthUrl(`/verify-email?token=${token}`))
	},

	async resetPassword(data: IResetPasswordDto) {
		return await axiosClassic.post(getAuthUrl('/reset-password'), data)
	},

	async restorePassword(email: string) {
		return await axiosClassic.post(getAuthUrl('/restore-password'), { email })
	},

	async register(email: string, password: string) {
		const response = await axiosClassic.post<IAuthResponse>(
			getAuthUrl('/register'),
			{
				email,
				password,
			}
		)
		if (response.data.accessToken) {
			saveToStorage(response.data)
		}
		return response
	},
	async login(email: string, password: string) {
		const response = await axiosClassic.post<IAuthResponse>(
			getAuthUrl('/login'),
			{
				email,
				password,
			}
		)
		if (response.data.accessToken) {
			saveToStorage(response.data)
		}

		return response
	},
	logout() {
		removeTokensStorage()
		localStorage.removeItem('user')
	},

	async getNewTokens() {
		const refreshToken = Cookies.get('refreshToken')
		const response = await axiosClassic.post<IAuthResponse>(
			getAuthUrl('/login/access-token'),
			{
				refreshToken,
			},
			{
				headers: getContentType(),
			}
		)
		return response
	},
}
