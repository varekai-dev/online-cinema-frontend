import ActorEdit from '@/components/screens/admin/actor/ActorEdit'

import { NextPageAuth } from '@/shared/types/auth.types'

const GenreEditPage: NextPageAuth = () => {
	return <ActorEdit />
}

GenreEditPage.isOnlyAdmin = true

export default GenreEditPage
