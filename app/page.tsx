import { nanoid } from '@/lib/utils'
import Spotlight from '@/components/spotlight';

export const runtime = 'edge'

export default function IndexPage() {
  const id = nanoid()

  return (
    <div className="flex-row justify-around align-middle">
      <Spotlight />
    </div>
  )
}
