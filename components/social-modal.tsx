import { BellRing, Check } from "lucide-react"
import React, { useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,

} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

type SocialModalProps = {
    accountName: string;
    username: string;
    followers: string;
    following: string;
}

const SocialModal: React.FC<SocialModalProps> = ({ accountName, username, followers, following }) => {
    return (
        <div className="SocialModal flex w-[205px] flex-col items-start gap-2 overflow-hidden rounded-xl border border-gray-800 bg-[rgba(255,255,255,0.04)] p-4">
            <div className="Content flex flex-col items-start gap-6">
                <div className="Frame1000005067 flex flex-col items-start justify-center gap-4">
                    <div className="Group400 relative h-16 w-16">
                        <div className="Oval absolute left-0 top-0 h-full w-full bg-blue-900 opacity-50"></div>
                        <div className="Twitter absolute left-3 top-3 h-9 w-9">
                            <div className="Symbol absolute left-0 top-1 h-7 w-full bg-blue-400"></div>
                        </div>
                    </div>
                    <div className="Frame1000005066 flex flex-col items-start gap-2">
                        <div className="Text text-sm font-medium text-gray-400">{accountName}</div>
                        <div className="Text text-lg font-medium text-white">{username}</div>
                    </div>
                </div>
                <div className="Frame1000005062 flex flex-col items-start gap-2">
                    <div className="Text text-sm font-medium text-gray-400">Connected to</div>
                    <div className="Frame1000005061 flex items-start gap-2">
                        {/* Sample Ellipse, you can add more as per your requirement */}
                        <div className="Ellipse45 h-7 w-7 rounded-full bg-gray-400"></div>
                    </div>
                </div>
                <div className="Frame1000005065 flex items-start gap-14">
                    <div className="Frame1000005063 flex flex-col items-start gap-2">
                        <div className="Text text-sm font-medium text-gray-400">Followers</div>
                        <div className="Text text-lg font-medium text-white">{followers}</div>
                    </div>
                    <div className="Frame1000005064 flex flex-col items-start gap-2">
                        <div className="Text text-sm font-medium text-gray-400">Following</div>
                        <div className="Text text-lg font-medium text-white">{following}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SocialModal;
