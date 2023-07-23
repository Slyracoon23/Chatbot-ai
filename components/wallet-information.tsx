import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
} from '@/components/ui/card';




type WalletInfoProps = {
    walletAddress: string;
    totalBalance: number;
    nfts: Array<string>;
    walletType: string;

}

const WalletInfo: React.FC<WalletInfoProps> = ({ walletAddress, totalBalance, nfts, walletType }) => {
    return (
        <Card className="bg-[rgba(255, 255, 0.04)] w-[205px] rounded-lg border border-[#2D2D2D]">
            <CardContent className="grid gap-4 p-4">
                <div className="Content flex flex-col items-start gap-4">
            <img className="rounded-full" src={walletType} width="60" height="60"/>
            <div className="flex flex-col items-start justify-start gap-2">
                <div className="text-xs font-medium text-gray-400">Account Address</div>
                <div className="text-md font-medium text-white">{walletAddress}</div>
            </div>
            <div className="flex flex-col items-start justify-start gap-2">
                <div className="text-xs font-medium text-gray-400">Total Balance</div>
                <div className="text-md font-medium text-white">{totalBalance}</div>
            </div>
            <div className="flex flex-col items-start justify-start gap-2">
                <div className="text-xs font-medium text-gray-400"> NFTs</div>
                <div className="flex items-start gap-2">
                    {/* Sample Ellipse, you can add more as per your requirement */}
                    <div className="h-7 w-7 rounded-full bg-gray-400"></div>
                </div>
            </div>

    
        </div>
        </CardContent>
        </Card>
    );
};

export default WalletInfo;
