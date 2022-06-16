import ActorList from '@/components/screens/admin/actors/ActorsList'

import { NextPageAuth } from '@/shared/types/auth.types'

const ActorListPage: NextPageAuth = () => {
	return <ActorList />
}

ActorListPage.isOnlyAdmin = true

export default ActorListPage
