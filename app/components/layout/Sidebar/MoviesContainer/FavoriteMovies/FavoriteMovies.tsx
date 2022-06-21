import React, { FC } from 'react'

import { useFavorites } from '@/components/screens/favorites/useFavorites'
import SkeletonLoader from '@/components/ui/SkeletonLoader'

import { useAuth } from '@/hooks/useAuth'

import MovieList from '../MovieList'

import NotAuthFavorites from './NotAuthFavorites'

const FavoriteMovies: FC = () => {
	const { isLoading, favoriteMovies } = useFavorites()
	const { user } = useAuth()

	if (!user) return <NotAuthFavorites />

	if (favoriteMovies?.length === 0) return null

	return isLoading ? (
		<SkeletonLoader />
	) : (
		<>
			{!!favoriteMovies?.length ? (
				<MovieList
					movies={favoriteMovies?.slice(0, 3) || []}
					title="Favorites"
					link="/favorites"
				/>
			) : null}
		</>
	)
}

export default FavoriteMovies
