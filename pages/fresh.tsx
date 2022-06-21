import { GetStaticProps, NextPage } from 'next'

import Catalog from '@/components/screens/catalog-movies/Catalog'

import { IMovie } from '@/shared/types/movie.types'

import { MovieService } from '@/services/movie.service'

const FreshPage: NextPage<{ movies: IMovie[] }> = ({ movies }) => {
	return (
		<Catalog
			title="Fresh movies"
			movies={movies}
			description="New movies and series in excellent quality: legal, safe, without ads"
		/>
	)
}

export default FreshPage

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: movies } = await MovieService.getAll()

		return {
			props: {
				movies,
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
