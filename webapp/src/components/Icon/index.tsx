import { createElement } from 'react'
import { type IconBaseProps } from 'react-icons'
import { IoWater, IoWaterOutline } from 'react-icons/io5'

const icons = {
  likeEmpty: IoWaterOutline,
  likeFilled: IoWater,
}

export const Icon = ({ name, ...restProps }: { name: keyof typeof icons } & IconBaseProps) => {
  return createElement(icons[name], restProps)
}
