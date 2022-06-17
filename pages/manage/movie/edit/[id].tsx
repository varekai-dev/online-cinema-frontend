import MovieEdit from '@/components/screens/admin/movie/MovieEdit'

import { NextPageAuth } from '@/shared/types/auth.types'

const GenreEditPage: NextPageAuth = () => {
	return <MovieEdit />
}

GenreEditPage.isOnlyAdmin = true

export default GenreEditPage
