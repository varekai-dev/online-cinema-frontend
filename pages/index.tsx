import type { GetStaticProps, NextPage } from 'next'

import Home from '@/components/screens/home/Home'
import { IHome } from '@/components/screens/home/home.interface'
import { IGalleryItem } from '@/components/ui/gallery/gallery.interface'
import { ISlide } from '@/components/ui/slider/slider.interface'

import { ActorService } from '@/services/actor.service'
import { MovieService } from '@/services/movie.service'

import { getGenresList } from '@/utils/movie/getGenresListEach'

import { getMoviesUrl } from '@/configs/api.config'
import { getActorUrl, getMovieUrl } from '@/configs/url.config'

const HomePage: NextPage<IHome> = ({ slides, trendingMovies, actors }) => {
	return (
		<Home slides={slides} trendingMovies={trendingMovies} actors={actors} />
	)
}

export default HomePage

export const getStaticProps: GetStaticProps = async () => {
	try {
		const { data: movies } = await MovieService.getAll()

		const slides: ISlide[] = movies.slice(0, 3).map((m) => ({
			_id: m._id,
			link: getMoviesUrl(m.slug),
			bigPoster: m.bigPoster,
			subTitle: getGenresList(m.genres),
			title: m.title,
		}))
		const { data: dataActors } = await ActorService.getAll()
		const actors: IGalleryItem[] = dataActors
			.sort((b, a) => a.countMovies - b.countMovies)
			.slice(0, 7)
			.map((actor) => ({
				link: getActorUrl(actor.slug),
				name: actor.name,
				posterPath: actor.photo,
				content: {
					title: actor.name,
					subTitle: `+${actor.countMovies} movies`,
				},
			}))

		const dataTrendingMovies = await MovieService.getMostPopularMovies()

		const trendingMovies = dataTrendingMovies.slice(0, 7).map((movie) => ({
			link: getMovieUrl(movie.slug),
			name: movie.title,
			posterPath: movie.poster,
		}))

		return {
			props: {
				slides,
				actors,
				trendingMovies,
			} as IHome,
		}
	} catch (error) {
		return {
			props: {
				slides: [],
				trendingMovies: [],
				actors: [],
			},
		}
	}
}
