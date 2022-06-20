import ActorEdit from '@/components/screens/admin/actor/ActorEdit'
import UserEdit from '@/components/screens/admin/user/UserEdit'

import { NextPageAuth } from '@/shared/types/auth.types'

const UserEditPage: NextPageAuth = () => {
	return <UserEdit />
}

UserEditPage.isOnlyAdmin = true

export default UserEditPage
