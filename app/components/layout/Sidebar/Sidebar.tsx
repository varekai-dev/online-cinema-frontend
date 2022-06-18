import cn from 'classnames'
import { FC } from 'react'

import Search from './Search/Search'

import MoviesContainer from './MoviesContainer/MoviesContainer'
import styles from './Sidebar.module.scss'

const Sidebar: FC = () => {
	return (
		<div
			className={cn(
				styles.sidebar,
				'scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100'
			)}
		>
			<Search />
			<MoviesContainer />
		</div>
	)
}
export default Sidebar
