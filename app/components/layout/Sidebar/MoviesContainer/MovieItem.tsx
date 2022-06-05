import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'

import MaterialIcon from '@/components/ui/MaterialIcon'

import { IMovie } from '@/shared/types/movie.types'

import { getGenresListEach } from '@/utils/movie/getGenresListEach'

import { getGenresUrl } from '@/configs/api.config'
import { getMovieUrl } from '@/configs/url.config'

import styles from './MovieList.module.scss'

const MovieItem: FC<{ movie: IMovie }> = ({ movie }) => {
	return (
		<div className={styles.item}>
			<Link href={getMovieUrl(movie.slug)}>
				<a>
					<Image
						draggable={false}
						alt={movie.title}
						width="65"
						height="97"
						src={movie.poster}
						priority
					/>
				</a>
			</Link>
			<div className={styles.info}>
				<div>
					<div className={styles.title}>{movie.title}</div>
					<div className={styles.genres}>
						{movie.genres.map((genre, idx) => (
							<Link href={getGenresUrl(genre.slug)} key={genre._id}>
								<a>{getGenresListEach(idx, movie.genres.length, genre.name)}</a>
							</Link>
						))}
					</div>
				</div>
				<div className={styles.rating}>
					<MaterialIcon name="MdStarRate" />
					<span>{movie.rating.toFixed(1)}</span>
				</div>
			</div>
		</div>
	)
}

export default MovieItem
