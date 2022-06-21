import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import Catalog from '@/components/screens/catalog-movies/Catalog'

import { IActor, IMovie } from '@/shared/types/movie.types'

import { ActorService } from '@/services/actor.service'
import { MovieService } from '@/services/movie.service'

import Error404 from '../404'

interface IActorPage {
	movies: IMovie[]
	actor: IActor | undefined
}

const ActorPage: NextPage<IActorPage> = ({ movies, actor }) => {
	console.log(actor)
	return actor ? (
		<Catalog title={actor.name} movies={movies} actor={actor} />
	) : (
		<Error404 />
	)
}

export default ActorPage

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: actors } = await ActorService.getAll()
		const paths = actors.map((actor) => ({
			params: { slug: actor.slug },
		}))
		return {
			paths,
			fallback: 'blocking',
		}
	} catch (error) {
		return {
			paths: [],
			fallback: false,
		}
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: actor } = await ActorService.getBySlug(String(params?.slug))
		const { data: movies } = await MovieService.getByActor(actor._id)
		return {
			props: {
				movies,
				actor,
			},
			revalidate: 60,
		}
	} catch (error) {
		return {
			props: {
				movies: [],
			},
		}
	}
}
