import { FC } from 'react'
import * as MaterialIcons from 'react-icons/md'

import { useRenderClient } from '@/hooks/useRenderClient'

import { TypeMaterialIconName } from '@/shared/types/icon.types'

const MaterialIcon: FC<{ name: TypeMaterialIconName }> = ({ name }) => {
	const IconComponent = MaterialIcons[name]

	const { isRenderClient } = useRenderClient()

	if (!isRenderClient) return null

	return <IconComponent /> || <MaterialIcons.MdDragIndicator />
}

export default MaterialIcon
