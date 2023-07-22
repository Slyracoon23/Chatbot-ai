import { nanoid } from '@/lib/utils'
import Spotlight from '@/components/spotlight'
import { ConnectButton } from '@/components/connect-button'

export const runtime = 'edge'

export default function IndexPage() {
  const id = nanoid()

  return (
    <div className="flex-row justify-around align-middle">
      <Spotlight />
      <ConnectButton />
    </div>
  )
}
