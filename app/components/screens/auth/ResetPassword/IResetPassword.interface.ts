export interface IResetPasswordInput {
	password: string
	confirmPassword: string
}

export interface IResetPasswordDto {
	password: string
	token: string
}
