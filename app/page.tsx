import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import Spotlight from '@/components/spotlight'

export const runtime = 'edge'

export default function IndexPage() {
  const id = nanoid()

  return <Spotlight />
}
