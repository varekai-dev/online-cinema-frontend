import { FC } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Provider } from 'react-redux'

import Layout from '@/components/layout/Layout'

import { TypeComponentAuthFields } from '@/shared/types/auth.types'

import { store } from '@/store/store'

import ReduxToast from '../components/ui/redux-toastr/reduxToast'

import AuthProvider from './AuthProvider/AuthProvider'
import HeadProvider from './HeadProvider/HeadProvider'

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			staleTime: Infinity,
		},
	},
})

const MainProvider: FC<TypeComponentAuthFields> = ({ children, Component }) => {
	return (
		<HeadProvider>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					<ReactQueryDevtools initialIsOpen={false} />
					<ReduxToast />
					<AuthProvider Component={Component}>
						<Layout>{children}</Layout>
					</AuthProvider>
				</QueryClientProvider>
			</Provider>
		</HeadProvider>
	)
}

export default MainProvider
