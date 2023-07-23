// import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import Spotlight from '@/components/spotlight'
import { ConnectButton } from '@/components/connect-button'
import SocialModal from '@/components/social-modal'
import { UserProfileCard } from '@/components/profile-card'
import NotificationsCard from '@/components/notifications-card'
import OtherProfile from '@/components/other-profile'
import WalletInfo from '@/components/wallet-information'

export const runtime = 'edge'

export default function IndexPage() {
  // const id = nanoid()

  return (
    <div className="flex-row justify-around align-middle">
      <Spotlight />
    </div>
  )
}
