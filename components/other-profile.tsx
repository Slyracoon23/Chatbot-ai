import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';


type OtherProfileProps = {
    username: string;
    numberOfConnections: number;
}



const OtherProfile: React.FC<OtherProfileProps> = ({ username, numberOfConnections }) => {
    return (
        <Card className="bg-[rgba(255, 255, 0.04)] w-[205px] rounded-lg border border-[#2D2D2D]">
            <CardContent className="grid gap-4 p-4">
                <div className="Content flex flex-col items-start gap-4">
            <img className="rounded-full" src="https://via.placeholder.com/60x60" width="60" height="60" />
            <div className="flex flex-col items-start justify-start gap-2">
                <div className="text-xs font-medium text-gray-400">User Name</div>
                <div className="text-md font-medium text-white">{username}</div>
            </div>
            <div className="flex flex-col items-start justify-start gap-2">
                <div className="text-xs font-medium text-gray-400">Connected to ({numberOfConnections})</div>
                <div className="flex items-start gap-2">
                    {/* Sample Ellipse, you can add more as per your requirement */}
                    <div className="h-7 w-7 rounded-full bg-gray-400"></div>
                </div>
            </div>
            <div className="flex flex-col items-end justify-start gap-2.5">
                <button className="inline-flex h-8 w-40 items-center justify-center gap-2.5 rounded-full border border-white p-2 hover:bg-[#4D4D4D]">
                    <div className="text-center text-base font-medium text-white">Revoke</div>
                </button>
                <div className="w-40 text-center text-[8px] font-medium text-gray-400 ">Revoke your Request to {username}</div>
            </div>
        </div>
        
        </CardContent>
        </Card>
    );
};

export default OtherProfile;
