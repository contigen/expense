import { RotatingLines } from 'react-loader-spinner'

export function Spinner({ color, width }: { color?: string; width?: string }) {
  return (
    <RotatingLines
      strokeColor={color || `#525252`}
      strokeWidth='4'
      animationDuration='0.75'
      width={width || `20`}
    />
  )
}
