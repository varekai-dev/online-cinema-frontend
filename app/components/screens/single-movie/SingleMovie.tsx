import dynamic from 'next/dynamic'
import { FC } from 'react'
import ReactPlayer from 'react-player'

import Banner from '@/components/ui/banner/Banner'
import Gallery from '@/components/ui/gallery/Gallery'
import SubHeading from '@/components/ui/heading/SubHeading'

import Meta from '@/utils/meta/Meta'

import { IMoviePage } from '../../../../pages/movie/[slug]'

import Content from './Content/Content'

const DynamicPlayer = dynamic(
	() => import('@/components/ui/video-player/VideoPlayer'),
	{ ssr: false }
)

const SingleMovie: FC<IMoviePage> = ({ movie, similarMovies }) => {
	return (
		<Meta title={movie.title} description={`Watch ${movie.title}`}>
			<Banner
				image={movie.bigPoster}
				Detail={() => <Content movie={movie} />}
			/>

			<DynamicPlayer slug={movie.slug} videoSources={movie.videoUrl} />
			{similarMovies.length > 0 && (
				<div className="mt-12">
					<SubHeading title="Similar" />
					<Gallery items={similarMovies} />
				</div>
			)}
			<div className="mb-40"></div>
			{/* Rating */}
		</Meta>
	)
}

export default SingleMovie
