import cn from 'classnames'
import { FC } from 'react'

import Logo from './Logo'
import MenuContainer from './MenuContainer/MenuContainer'
import styles from './Navigation.module.scss'

const Navigation: FC = () => {
	return (
		<div
			className={cn(
				styles.navigation,
				'scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100'
			)}
		>
			<Logo />
			<MenuContainer />
		</div>
	)
}

export default Navigation
