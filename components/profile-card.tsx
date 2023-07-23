'use client'

import { BellRing, Check, Plus } from 'lucide-react'
import { PlusIcon } from 'lucide-react'
import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import Image from 'next/image'

type CardProps = React.ComponentProps<typeof Card>

type UserProfileCardProps = {
  profileImage: string
  username: string
  userAddress: string
  onClose?: () => void
}

export function UserProfileCard({
  className,
  profileImage,
  username,
  userAddress,
  onClose,
  ...props
}: CardProps & UserProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(username)
  const [image, setImage] = useState(profileImage)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleEditClick = () => {
    if (isEditing) {
      // Save changes here
    }
    setIsEditing(!isEditing)
  }

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const fileUrl = URL.createObjectURL(event.target.files[0])
      setImage(fileUrl)
    }
  }

  return (
    <Card
      className={cn(
        'bg-black bg-opacity-50 w-[205px] rounded-lg border border-[#2D2D2D] absolute bottom-0 left-0 z-10',
        className
      )}
      {...props}
    >
      <CardContent className="grid gap-2 p-4">
        <div className="inline-flex items-center justify-start gap-4">
          <div className="flex items-center justify-start gap-2">
            <div className="relative">
              <Image
                onClick={handleImageClick}
                className="h-10 w-full cursor-pointer rounded-full object-cover"
                src={image || "/kartek.png"}
                alt={name}
                width={20}
                height={20}
              />
              <input
                ref={fileInputRef}
                onChange={handleImageChange}
                type="file"
                hidden
                accept="image/*"
              />

              {isEditing && (
                <div className="bg-opacity/50 absolute inset-0 flex items-center justify-center bg-black ">
                  <PlusIcon size={20} color="white" />
                </div>
              )}
            </div>
            <div className="inline-flex flex-col items-start justify-start gap-1">
              {isEditing ? (
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-20 break-words bg-[#ABFD2C] text-sm font-medium text-black outline-none"
                />
              ) : (
                <div className="break-words text-sm font-medium text-white">
                  {name}
                </div>
              )}
              <div className="break-words text-xs font-light italic text-gray-400">
                {userAddress}
              </div>
            </div>
          </div>
          <div
            onClick={handleEditClick}
            className="cursor-pointer break-words text-xs font-medium text-[#ABFD2C]"
          >
            {isEditing ? 'Save' : 'Edit'}
          </div>
        </div>

        <Button className="h-6 w-full bg-transparent text-xs text-[#FFFFFF] hover:bg-[#171717}"
          onClick={onClose}
        >
          Disconnect
        </Button>
      </CardContent>
    </Card>
  )
}
