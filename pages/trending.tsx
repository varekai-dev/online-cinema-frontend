import { GetStaticProps, NextPage } from 'next'

import Catalog from '@/components/ui/catalog-movies/Catalog'

import { IMovie } from '@/shared/types/movie.types'

import { MovieService } from '@/services/movie.service'

const TrendingPage: NextPage<{ movies: IMovie[] }> = ({ movies }) => {
	return (
		<Catalog
			title="Trending movies"
			movies={movies}
			description="Trending movies and series in excellent quality: legal, safe, without ads"
		/>
	)
}

export default TrendingPage

export const getStaticProps: GetStaticProps = async () => {
	try {
		const movies = await MovieService.getMostPopularMovies()

		return {
			props: {
				movies,
			},
		}
	} catch (error) {
		return {
			props: {
				movies: [],
			},
		}
	}
}
