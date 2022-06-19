import { IActor, IMovie } from '@/shared/types/movie.types'

export interface ICatalog {
	title: string
	description?: string
	movies: IMovie[]
	actor?: Omit<IActor, 'countMovies'>
}
