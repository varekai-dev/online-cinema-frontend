import axios from 'axios'
import Cookies from 'js-cookie'

import { removeTokensStorage } from '@/services/auth/auth.helper'

import { API_URL } from '@/configs/api.config'

import { AuthService } from './../services/auth/auth.service'
import { errorCatch, getContentType } from './api.helpers'

export const axiosClassic = axios.create({
	baseURL: API_URL,
	headers: getContentType(),
})

export const instance = axios.create({
	baseURL: API_URL,
	headers: getContentType(),
})

instance.interceptors.request.use((config) => {
	const accessToken = Cookies.get('accessToken')
	if (config.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}
	return config
})

instance.interceptors.response.use(
	(config) => config,
	async (error) => {
		const originalRequest = error.config

		if (
			(error.response.status === 401 ||
				errorCatch(error) === 'Invalid token or expired!' ||
				'Please sign in!') &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				await AuthService.getNewTokens()
				return instance(originalRequest)
			} catch (error) {
				if (errorCatch(error) === 'Invalid token or expired!') {
					removeTokensStorage()
					AuthService.logout()
				}
			}
		}
		throw error
	}
)

export default instance
