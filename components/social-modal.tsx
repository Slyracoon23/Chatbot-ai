import { BellRing, Check } from 'lucide-react'
import React, { useState } from 'react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'

type SocialModalProps = {
  username: string
  followers: number
  following: number
  socialAccountType: string
}

const SocialModal: React.FC<SocialModalProps> = ({
  username,
  followers,
  following,
  socialAccountType
}) => {
  return (
    <Card className="bg-[rgba(255, 255, 0.04)] w-[205px] rounded-lg border border-[#2D2D2D]">
      <CardContent className="grid gap-4 p-5">
        <div className="Content flex flex-col items-start gap-6">
          <div className="Frame1000005067 flex flex-col items-start justify-center gap-4">
            <div className="Group400 relative h-16 w-16">
              <div className="Oval absolute left-0 top-0 h-full w-full bg-blue-900 opacity-50"></div>
            </div>
            <div className="AccountInformation flex flex-col items-start gap-2">
              <div className="Text text-sm font-medium text-gray-400">
                Account Name
              </div>
              <div className="Text text-lg font-medium text-white">
                {username}
              </div>
            </div>
          </div>
          {/* <div className="Frame1000005062 flex flex-col items-start gap-2">
                    <div className="Text text-sm font-medium text-gray-400">Connected to {numberOfConnections}</div>
                    <div className="Frame1000005061 flex items-start gap-2"> */}
          {/* {/* Sample Ellipse, you can add more as per your requirement */}
          {/* <div className="Ellipse45 h-7 w-7 rounded-full bg-gray-400"></div>
                    </div>
                </div>  */}
          <div className="SocialStats flex items-start gap-10">
            <div className="Followers flex flex-col items-start gap-1">
              <div className="Text text-xs font-medium text-gray-400">
                Followers
              </div>
              <div className="Text text-md font-medium text-white ">
                {followers}
              </div>
            </div>
            <div className="Following flex flex-col items-start gap-1">
              <div className="Text text-xs font-medium text-gray-400">
                Following
              </div>
              <div className="Text text-md font-medium text-white">
                {following}
              </div>
            </div>
          </div>
          <div className="Frame1000005063 flex flex-col items-start justify-start gap-2">
            <Button className="inline-flex h-8 w-40 items-center justify-center gap-2.5 rounded-full border bg-[#ABFD2C] p-2 hover:bg-[#C2FF64]">
              <div className="Text text-center text-base font-medium text-black">
                View {socialAccountType}
              </div>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default SocialModal
