import axios, { axiosClassic } from 'api/interceptors'

import { IComment } from '@/components/ui/comments/comments.interface'

export const CommentService = {
	async getMovieComments(movieId: string) {
		return axiosClassic.get<IComment[]>(`/comments/${movieId}`)
	},
	async deleteComment(commentId: string) {
		return axios.delete(`/comments/${commentId}`)
	},
	async updateComment(data: any) {
		return axios.put(`/comments`, data)
	},
	async postComment(data: any) {
		return axios.post(`/comments`, data)
	},
}
