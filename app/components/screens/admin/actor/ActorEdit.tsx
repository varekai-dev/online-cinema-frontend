import dynamic from 'next/dynamic'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { stripHtml } from 'string-strip-html'

import Button from '@/components/ui/form-elements/Button'
import SlugField from '@/components/ui/form-elements/SlugField/SlugField'
import UploadField from '@/components/ui/form-elements/UploadField/UploadField'

import SkeletonLoader from '@/ui/SkeletonLoader'
import AdminNavigation from '@/ui/admin-navigation/AdminNavigation'
import Field from '@/ui/form-elements/Field'
import Heading from '@/ui/heading/Heading'

import formStyles from '@/shared/admin/adminForm.module.scss'

import Meta from '@/utils/meta/Meta'
import { generateSlug } from '@/utils/string/generateSlug'

import { IActorEditInput } from './actor-edit.interface'
import { useActorEdit } from './useActorEdit'

const DynamicTextEditor = dynamic(
	() => import('@/ui/form-elements/TextEditor'),
	{
		ssr: false,
	}
)

const ActorEdit: FC = () => {
	const {
		handleSubmit,
		register,
		control,
		formState: { errors },
		setValue,
		getValues,
	} = useForm<IActorEditInput>({
		mode: 'onChange',
	})

	const { isLoading, onSubmit } = useActorEdit(setValue)

	return (
		<Meta title="Edit actor">
			<AdminNavigation />
			<Heading title="Edit actor" />
			<form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
				{isLoading ? (
					<SkeletonLoader count={3} />
				) : (
					<>
						<div className={formStyles.fields}>
							<Field
								{...register('name', {
									required: 'Name is required',
								})}
								placeholder="Name"
								error={errors.name}
								style={{ width: '49%' }}
							/>
							<div style={{ width: '49%' }}>
								<SlugField
									register={register}
									error={errors.slug}
									generate={() =>
										setValue('slug', generateSlug(getValues('name')))
									}
								/>
							</div>
							<Controller
								control={control}
								name="photo"
								defaultValue=""
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<UploadField
										placeholder="Photo"
										error={error}
										value={value}
										onChange={onChange}
										folder="actors"
									/>
								)}
							/>
						</div>

						<Button>Update</Button>
					</>
				)}
			</form>
		</Meta>
	)
}

export default ActorEdit
