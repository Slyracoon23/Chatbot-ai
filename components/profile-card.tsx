import { BellRing, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

type CardProps = React.ComponentProps<typeof Card>;

export function UserProfileCard({ className, ...props }: CardProps) {
  return (
    <Card className={cn("w-[205px]", className)} {...props}>
      <div className="inline-flex flex-col items-start justify-start gap-3 overflow-hidden rounded-xl border-2 border-gray-700 bg-white/10 p-4 backdrop-blur-md">
        <div className="inline-flex items-center justify-start gap-8">
          <div className="flex items-center justify-start gap-2">
            <div className="flex items-center justify-start gap-2">
              <img className="h-10 w-10 rounded-full" src="https://via.placeholder.com/40x40" />
            </div>
            <div className="inline-flex flex-col items-start justify-start gap-1">
              <div className="break-words text-sm font-medium text-white">Rebecca.eth</div>
              <div className="break-words text-xs font-light italic text-gray-400">0xl29...xZaf12</div>
            </div>
          </div>
          <div className="break-words text-xs font-medium text-green-500">Edit</div>
        </div>
    
        <Button className="h-4 w-full">Disconnect</Button>

      </div>
    </Card>
  );
}
