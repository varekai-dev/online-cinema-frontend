import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import Button from '@/components/ui/form-elements/Button'
import Field from '@/components/ui/form-elements/Field'
import Heading from '@/components/ui/heading/Heading'

import { validEmail } from '@/shared/regex'

import Meta from '@/utils/meta/Meta'

import authStyles from '../Auth.module.scss'

import styles from './ResetPassword.module.scss'
import { useRestorePassword } from './useRestorePassword'

const RestorePassword: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<{ email: string }>()
	const { isLoading, mutate } = useRestorePassword()

	const onSubmit: SubmitHandler<{ email: string }> = ({ email }) => {
		mutate(email)
		reset()
	}

	return (
		<Meta title="Auth">
			<section className={authStyles.wrapper}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Heading title="Restore password" className="mb-6" />
					<Field
						{...register('email', {
							required: 'Email is required',
							pattern: {
								value: validEmail,
								message: 'Invalid email address',
							},
						})}
						placeholder="Email"
						error={errors.email}
					/>

					<div className={styles.button}>
						<Button type="submit" isLoading={isLoading}>
							Restore password
						</Button>
					</div>
				</form>
			</section>
		</Meta>
	)
}

export default RestorePassword
