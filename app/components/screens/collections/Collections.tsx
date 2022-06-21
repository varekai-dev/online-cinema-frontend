import { FC } from 'react'

import Description from '@/components/ui/heading/Description'
import Heading from '@/components/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'

import CollectionItem from './CollectionItem'
import styles from './Collections.module.scss'
import { ICollection } from './collections.interface'

const TITLE = 'Discovery'
const DESCRIPTION = 'In this section you will find all genres on our site'

const Collections: FC<{ collections: ICollection[] }> = ({ collections }) => {
	return (
		<Meta title={TITLE} description={DESCRIPTION}>
			<Heading title={TITLE} className={styles.heading} />
			<Description text={DESCRIPTION} className={styles.description} />
			<section className={styles.collections}>
				{collections.map((collection) => (
					<CollectionItem key={collection._id} collection={collection} />
				))}
			</section>
		</Meta>
	)
}

export default Collections
