import { createElement } from 'react'
import { type IconBaseProps } from 'react-icons'
import { AiFillCloseCircle } from 'react-icons/ai'
import { IoWater, IoWaterOutline } from 'react-icons/io5'

const icons = {
  likeEmpty: IoWaterOutline,
  likeFilled: IoWater,
  delete: AiFillCloseCircle,
}

export const Icon = ({ name, ...restProps }: { name: keyof typeof icons } & IconBaseProps) => {
  return createElement(icons[name], restProps)
}
