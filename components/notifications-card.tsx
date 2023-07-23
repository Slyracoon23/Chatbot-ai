import { BellRing, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'

const notifications = [
  {
    title: 'Your call has been confirmed.',
    description: '1 hour ago'
  },
  {
    title: 'You have a new message!',
    description: '1 hour ago'
  },
  {
    title: 'Your subscription is expiring soon!',
    description: '2 hours ago'
  }
]

type CardProps = React.ComponentProps<typeof Card>

export default function NotificationsCard({ className, ...props }: CardProps) {
  return (
    <Card
      className={cn(
        'bg-[rgba(255, 255, 0.04)] w-[205px] rounded-lg border border-[#2D2D2D]',
        className
      )}
      {...props}
    >
      <CardHeader className="flex-row items-center justify-between p-3">
        <CardTitle className="text-sm font-medium text-gray-400">
          Notifications
        </CardTitle>
        <Button className="h-2 w-16 bg-[#ABFD2C] text-xs text-[#171717]">
          Mark all as read
        </Button>
      </CardHeader>
      <Separator className=" w-full border-0 border-[#2D2D2D]" />
      <CardContent className="grid gap-4 p-5">
        <div className="space-y-4">
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="mb-1 grid grid-cols-[25px_1fr] items-start pb-1 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-[#FFFFFF]" />
              <div className="space-y-0">
                <p className="text-xs font-medium leading-none text-white">
                  {notification.title}
                </p>
                {/* <p className="text-xs text-white">
                  {notification.description}
                </p> */}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
