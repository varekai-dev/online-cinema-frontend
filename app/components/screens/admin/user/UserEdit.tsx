import dynamic from 'next/dynamic'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { stripHtml } from 'string-strip-html'

import Button from '@/components/ui/form-elements/Button'

import SkeletonLoader from '@/ui/SkeletonLoader'
import AdminNavigation from '@/ui/admin-navigation/AdminNavigation'
import Heading from '@/ui/heading/Heading'

import formStyles from '@/shared/admin/adminForm.module.scss'

import Meta from '@/utils/meta/Meta'

import AuthFields from '../../auth/AuthFields'

import { useUserEdit } from './useUserEdit'
import { IUserEditInput } from './user-edit.interface'

const UserEdit: FC = () => {
	const { handleSubmit, register, setValue, formState, control } =
		useForm<IUserEditInput>({
			mode: 'onChange',
		})

	const { isLoading, onSubmit } = useUserEdit(setValue)

	return (
		<Meta title="Edit user">
			<AdminNavigation />
			<Heading title="Edit user" />
			<form onSubmit={handleSubmit(onSubmit)} className="admin-form">
				{isLoading ? (
					<SkeletonLoader count={3} className="h-12 mt-4" />
				) : (
					<>
						<AuthFields register={register} formState={formState} />
						<Controller
							control={control}
							name="isAdmin"
							render={({ field }) => (
								<button
									onClick={(e) => {
										e.preventDefault()
										field.onChange(!field.value)
									}}
									className="text-link block mb-7"
								>
									{field.value ? 'Make it regular user' : 'Make it admin'}
								</button>
							)}
						/>

						<Button>Update</Button>
					</>
				)}
			</form>
		</Meta>
	)
}

export default UserEdit
