import { GetStaticProps, NextPage } from 'next'

import Catalog from '@/components/screens/catalog-movies/Catalog'
import Favorites from '@/components/screens/favorites/Favorites'

import { IMovie } from '@/shared/types/movie.types'

import { MovieService } from '@/services/movie.service'

const FavoritePage: NextPage = () => {
	return <Favorites />
}

export default FavoritePage
