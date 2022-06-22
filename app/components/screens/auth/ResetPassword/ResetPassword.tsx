import { useRouter } from 'next/router'
import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import Button from '@/components/ui/form-elements/Button'
import Field from '@/components/ui/form-elements/Field'
import Heading from '@/components/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'

import authStyles from '../Auth.module.scss'

import { IResetPasswordInput } from './IResetPassword.interface'
import styles from './ResetPassword.module.scss'
import { useResetPassword } from './useResetPassword'

const ResetPassword: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		watch,
	} = useForm<IResetPasswordInput>()
	const { isLoading, mutate } = useResetPassword()
	const { query } = useRouter()
	const token = query.token
	const onSubmit: SubmitHandler<IResetPasswordInput> = (data) => {
		mutate({ password: data.password, token: String(token) })
	}

	return (
		<Meta title="Auth">
			<section className={authStyles.wrapper}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Heading title="Reset password" className="mb-6" />
					<Field
						{...register('password', {
							required: 'Password is required',
							minLength: {
								value: 6,
								message: 'Password must be at least 6 characters',
							},
						})}
						placeholder="Password"
						type="password"
						error={errors.password}
					/>
					<Field
						{...register('confirmPassword', {
							validate: (val: string) => {
								if (watch('password') != val) {
									return 'Your passwords do no match'
								}
							},
						})}
						placeholder="Confirm Password"
						type="password"
						error={errors.confirmPassword}
					/>
					<div className={styles.button}>
						<Button type="submit" isLoading={isLoading}>
							Change password
						</Button>
					</div>
				</form>
			</section>
		</Meta>
	)
}

export default ResetPassword
