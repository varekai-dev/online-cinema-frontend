import { useAuth } from 'hooks/useAuth'
import { useRouter } from 'next/router'

export const useAuthRedirect = () => {
	const { user } = useAuth()

	const { query, push } = useRouter()
}
