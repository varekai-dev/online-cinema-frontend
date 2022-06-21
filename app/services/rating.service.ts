import axios from 'api/interceptors'

import { IUser } from '@/shared/types/user.types'

import { getRatingsUrl } from '@/configs/api.config'

export const RatingService = {
	async setRating(movieId: string, value: number) {
		return axios.post<IUser>(getRatingsUrl('/set-rating'), {
			movieId,
			value,
		})
	},
	async getByUserMovie(movieId: string) {
		return axios.get<number>(getRatingsUrl(`/${movieId}`))
	},
}
