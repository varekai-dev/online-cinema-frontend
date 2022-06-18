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

import { IMovieEditInput } from './movie-edit.interface'
import { useAdminActors } from './useAdminActors'
import { useAdminGenres } from './useAdminGenres'
import { useMovieEdit } from './useMovieEdit'

const DynamicSelect = dynamic(() => import('@/components/ui/select/Select'), {
	ssr: false,
})

const MovieEdit: FC = () => {
	const {
		handleSubmit,
		register,
		control,
		formState: { errors },
		setValue,
		getValues,
	} = useForm<IMovieEditInput>({
		mode: 'onChange',
	})

	const { isLoading, onSubmit } = useMovieEdit(setValue)

	const { data: genres, isLoading: isGenresLoading } = useAdminGenres()
	const { data: actors, isLoading: isActorsLoading } = useAdminActors()

	return (
		<Meta title="Edit movie">
			<AdminNavigation />
			<Heading title="Edit movie" />
			<form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
				{isLoading ? (
					<SkeletonLoader count={3} />
				) : (
					<>
						<div className={formStyles.fields}>
							<Field
								{...register('title', {
									required: 'Title is required',
								})}
								placeholder="Title"
								error={errors.title}
								style={{ width: '49%' }}
							/>
							<div style={{ width: '49%' }}>
								<SlugField
									register={register}
									error={errors.slug}
									generate={() =>
										setValue('slug', generateSlug(getValues('title')))
									}
								/>
							</div>
							<Field
								{...register('parameters.country', {
									required: 'Country is required',
								})}
								placeholder="Country"
								error={errors.parameters?.country}
								style={{ width: '31%' }}
							/>
							<Field
								{...register('parameters.duration', {
									required: 'Duration is required',
								})}
								placeholder="Duration (min.)"
								error={errors.parameters?.duration}
								style={{ width: '31%' }}
							/>
							<Field
								{...register('parameters.year', {
									required: 'Year is required',
								})}
								placeholder="Year"
								error={errors.parameters?.duration}
								style={{ width: '31%' }}
							/>
							<Controller
								control={control}
								name="genres"
								rules={{ required: 'Select at least one genres' }}
								render={({ field, fieldState: { error } }) => (
									<DynamicSelect
										error={error}
										placeholder="Select genre"
										isMulti
										isLoading={isGenresLoading}
										field={field}
										options={genres || []}
									/>
								)}
							/>
							<Controller
								control={control}
								name="actors"
								rules={{ required: 'Select at least one actor' }}
								render={({ field, fieldState: { error } }) => (
									<DynamicSelect
										error={error}
										placeholder="Select actor"
										isMulti
										isLoading={isActorsLoading}
										field={field}
										options={actors || []}
									/>
								)}
							/>
							<Controller
								control={control}
								name="poster"
								defaultValue=""
								rules={{ required: 'Poster is required' }}
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<UploadField
										placeholder="Poster"
										error={error}
										value={value}
										onChange={onChange}
										folder="movies"
									/>
								)}
							/>
							<Controller
								control={control}
								name="bigPoster"
								defaultValue=""
								rules={{ required: 'Big poster is required' }}
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<UploadField
										placeholder="Big poster"
										error={error}
										value={value}
										onChange={onChange}
										folder="movies"
									/>
								)}
							/>
							<Controller
								control={control}
								name="videoUrl"
								defaultValue=""
								rules={{ required: 'Video is required' }}
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<UploadField
										placeholder="Video"
										error={error}
										value={value}
										onChange={onChange}
										folder="movies"
										style={{ marginTop: -25 }}
										isNoImage
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

export default MovieEdit
