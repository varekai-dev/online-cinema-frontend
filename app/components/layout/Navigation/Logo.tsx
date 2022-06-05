import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import logoImage from '@/assets/images/logo.svg'

const Logo: FC = (props) => (
	<Link href="/">
		<a className="px-layout mt-3 mb-10 block">
			<Image
				src={logoImage}
				width={256}
				height={69}
				alt="Online cinema"
				draggable={false}
			/>
		</a>
	</Link>
)

export default Logo
