import type { NextPage } from 'next'

import Home from '@/components/screens/home/Home'
import { IHome } from '@/components/screens/home/home.interface'
import { ISlide } from '@/components/ui/slider/slider.interface'

import { MovieService } from '@/services/movie.service'

import { getGenresList } from '@/utils/movie/getGenresListEach'

import { getMoviesUrl } from '@/configs/api.config'

const HomePage: NextPage<IHome> = ({ slides }) => {
	return <Home slides={slides} />
}

export default HomePage

export const getStaticProps = async () => {
	try {
		const { data: movies } = await MovieService.getAll()

		const slides: ISlide[] = movies.slice(0, 3).map((m) => ({
			_id: m._id,
			link: getMoviesUrl(m.slug),
			bigPoster: m.bigPoster,
			subTitle: getGenresList(m.genres),
			title: m.title,
		}))
		return {
			props: {
				slides,
			} as IHome,
		}
	} catch (error) {
		return {
			props: {
				slides: [],
			},
		}
	}
}
