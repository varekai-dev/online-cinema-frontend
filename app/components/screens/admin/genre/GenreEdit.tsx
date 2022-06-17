import dynamic from 'next/dynamic'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { stripHtml } from 'string-strip-html'

import Button from '@/components/ui/form-elements/Button'
import SlugField from '@/components/ui/form-elements/SlugField/SlugField'

import SkeletonLoader from '@/ui/SkeletonLoader'
import AdminNavigation from '@/ui/admin-navigation/AdminNavigation'
import Field from '@/ui/form-elements/Field'
import Heading from '@/ui/heading/Heading'

import formStyles from '@/shared/admin/adminForm.module.scss'

import Meta from '@/utils/meta/Meta'
import { generateSlug } from '@/utils/string/generateSlug'

import { IGenreEditInput } from './genre-edit.interface'
import { useGenreEdit } from './useGenreEdit'

const DynamicTextEditor = dynamic(
	() => import('@/ui/form-elements/TextEditor'),
	{
		ssr: false,
	}
)

const GenreEdit: FC = () => {
	const {
		handleSubmit,
		register,
		control,
		formState: { errors },
		setValue,
		getValues,
	} = useForm<IGenreEditInput>({
		mode: 'onChange',
	})

	const { isLoading, onSubmit } = useGenreEdit(setValue)

	return (
		<Meta title="Edit Genre">
			<AdminNavigation />
			<Heading title="Edit genre" />
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
								style={{ width: '31%' }}
							/>
							<div style={{ width: '31%' }}>
								<SlugField
									register={register}
									error={errors.slug}
									generate={() =>
										setValue('slug', generateSlug(getValues('name')))
									}
								/>
							</div>
							<Field
								{...register('icon', {
									required: 'Icon is required',
								})}
								placeholder="Icon"
								error={errors.icon}
								style={{ width: '31%' }}
							/>
						</div>
						<div style={{ width: '100%' }}>
							<Controller
								name="description"
								control={control}
								defaultValue=""
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									//@ts-ignore
									<DynamicTextEditor
										placeholder="Description"
										onChange={onChange}
										error={error}
										value={value}
									/>
								)}
								rules={{
									validate: {
										required: (v) =>
											(v && stripHtml(v).result.length > 0) ||
											'Description is required!',
									},
								}}
							/>
						</div>

						<Button>Update</Button>
					</>
				)}
			</form>
		</Meta>
	)
}

export default GenreEdit
