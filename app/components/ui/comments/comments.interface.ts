export interface IComment {
	_id: string
	user: {
		_id: string
		email: string
		avatarPath: string | null
	}
	movie: string
	content: string
	createdAt: string
	updatedAt: string
}
