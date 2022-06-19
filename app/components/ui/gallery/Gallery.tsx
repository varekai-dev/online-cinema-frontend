import { FC } from 'react'

import { useHorizontalScroll } from '@/hooks/useHorizontalScroll'

import styles from './Gallery.module.scss'
import GalleryItem from './GalleryItem'
import { IGalleryItem } from './gallery.interface'

const Gallery: FC<{ items: IGalleryItem[] }> = ({ items }) => {
	const { elRef } = useHorizontalScroll()
	const props = items.length > 4 ? { ref: elRef } : {}
	return (
		<div className={styles.gallery} {...props}>
			{items.map((item) => (
				<GalleryItem item={item} key={item.link} variant="vertical" />
			))}
		</div>
	)
}

export default Gallery
