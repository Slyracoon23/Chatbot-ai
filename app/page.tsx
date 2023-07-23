// import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import Spotlight from '@/components/spotlight'
import { ConnectButton } from '@/components/connect-button'
import SocialModal from '@/components/social-modal'
import { UserProfileCard } from '@/components/profile-card'
import NotificationsCard from '@/components/notifications-card'

export const runtime = 'edge'

export default function IndexPage() {
  // const id = nanoid()

  return (
    <div className="flex-row justify-around align-middle">
      <Spotlight />
      <ConnectButton />
      <div className="flex flex-col items-center justify-center gap-4">
        <SocialModal
          accountName="Account Name"
          username="@therealkartik"
          followers="10.2k"
          following="599"
        />

        <UserProfileCard />

        <NotificationsCard />

      </div>


    </div>
  )
}
