// import { nanoid } from '@/lib/utils'
// import { Chat } from '@/components/chat'
import Spotlight from '@/components/spotlight'
import { ConnectButton } from '@/components/connect-button'
import SocialModal from '@/components/social-modal'
import { UserProfileCard } from '@/components/profile-card'
import NotificationsCard from '@/components/notifications-card'
import OtherProfile from '@/components/other-profile'
import WalletInfo from '@/components/wallet-information'

export const runtime = 'edge'

export default function ComponentPage() {
  // const id = nanoid()

  return (
    <div className="flex-row justify-around align-middle">
      <Spotlight />
      <div className="flex flex-col items-center justify-center gap-4">
        <SocialModal
          username="@therealkartik"
          followers={1234}
          following={1234} socialAccountType={'Twitter'}        />

        <UserProfileCard profileImage={'https://pbs.twimg.com/profile_images/1085757468158742528/0jwhEGnX_400x400.jpg'} username={'therealkartik'} userAddress={'kartik.eth'}        />

        <NotificationsCard />

        <OtherProfile username={'kartik.eth'} numberOfConnections={1234}/>
        <WalletInfo walletAddress={'kartik.eth'} totalBalance={1234} walletType={'Metamask'} nfts={[]} />
      </div>


    </div>
  )
}
