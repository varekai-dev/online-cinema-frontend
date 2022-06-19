import { FC } from 'react'

import { useHorizontalScroll } from '@/hooks/useHorizontalScroll'

import styles from './Gallery.module.scss'
import GalleryItem from './GalleryItem'
import { IGalleryItem } from './gallery.interface'

const Gallery: FC<{ items: IGalleryItem[] }> = ({ items }) => {
	const { elRef } = useHorizontalScroll()
	return (
		<div className={styles.gallery} ref={elRef}>
			{items.map((item) => (
				<GalleryItem item={item} key={item.link} variant="vertical" />
			))}
		</div>
	)
}

export default Gallery
