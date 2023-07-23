import lf from 'localforage'
import { last, assoc, isNil } from 'ramda'
import Link from 'next/link'
import Jdenticon from 'react-jdenticon'
import Image from 'next/image'
import { Button } from './ui/button'

export default function NextIdButton({
  userMap,
  setUser,
  setUserMap,
  setEditUser,
  user,
  setIsModal
}: any) {
  return (
    <>
      <div>
        <div>
          <Link href="/">
            <div>NextID x WeaveDB</div>
          </Link>
          <div></div>
          {isNil(user) ? (
            <Button onClick={() => setIsModal(true)}>
              <div>Connect NextID</div>
            </Button>
          ) : (
            <div>
              <div>
                <Link href={`/u/${user.handle}`}>
                  <div>{user.handle}</div>
                </Link>
              </div>
              <div
                onClick={() => {
                  if (confirm('Would you like to sign out?')) {
                    setUser(null)
                    lf.removeItem('user')
                  }
                }}
              >
                {isNil(user.image) ? (
                  <Jdenticon size="35" value={user.id} />
                ) : (
                  <Image
                    className="rounded-full border"
                    alt="user image"
                    src={user.image}
                    width={35}
                    height={35}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div>GraphID Demo</div>
    </>
  )
}
