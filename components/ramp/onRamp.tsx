import { Button } from "../ui/button";
import { Drawer, DrawerTitle, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTrigger } from "../ui/drawer";
import { BanknoteArrowUp, Coins, Zap } from "lucide-react";
import { useState } from "react";

// Token data for each network
const networkTokens = {
    celo: [
      { symbol: "cUSD", name: "Celo Dollar", icon: "https://assets.coingecko.com/coins/images/13161/standard/icon-celo-dollar-color-1000-circle-cropped.png?1696512945" },
      { symbol: "USDT", name: "Tether", icon: "https://assets.coingecko.com/coins/images/325/standard/Tether.png?1696501661" },
      { symbol: "USDC", name: "USD Coin", icon: "https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694" },
    ],
    base: [
      { symbol: "USDC", name: "USD Coin", icon: "https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694" },
    ]
};

export function OnRamp() {
    const [selectedNetwork, setSelectedNetwork] = useState<'celo' | 'base' | null>(null);
    const [selectedToken, setSelectedToken] = useState<string | null>(null);

    const handleNetworkSelect = (network: 'celo' | 'base') => {
        setSelectedNetwork(network);
        setSelectedToken(null); // Reset token selection when network changes
    };

    const handleTokenSelect = (tokenSymbol: string) => {
        setSelectedToken(tokenSymbol);
    };

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button className="w-80 h-12 rounded-2xl">
                    <BanknoteArrowUp className="text-yellow-600" />
                    On-ramp
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm pb-6">
                    <DrawerHeader className="max-md:gap-[0.1rem]">
                        <DrawerTitle>
                            Deposit to Farcaster
                        </DrawerTitle>
                        <DrawerDescription className="text-xs">Choose the network, token & amount to on-ramp.</DrawerDescription>
                    </DrawerHeader>
                    
                    {/* Network Selection */}
                    <div className="px-4 space-y-3">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Select Network</label>
                            <div className="flex gap-2">
                                <Button
                                    variant={selectedNetwork === 'celo' ? 'default' : 'outline'}
                                    className="flex-1 h-12 rounded-xl"
                                    onClick={() => handleNetworkSelect('celo')}
                                >
                                    <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                        C
                                    </div>
                                    Celo
                                </Button>
                                <Button
                                    variant={selectedNetwork === 'base' ? 'default' : 'outline'}
                                    className="flex-1 h-12 rounded-xl"
                                    onClick={() => handleNetworkSelect('base')}
                                >
                                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                        B
                                    </div>
                                    Base
                                </Button>
                            </div>
                        </div>

                        {/* Token Selection */}
                        {selectedNetwork && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Select Token</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {networkTokens[selectedNetwork].map((token) => (
                                        <Button
                                            key={token.symbol}
                                            variant={selectedToken === token.symbol ? 'default' : 'outline'}
                                            className="h-16 rounded-xl flex flex-col items-center justify-center gap-1"
                                            onClick={() => handleTokenSelect(token.symbol)}
                                        >
                                            <span className="text-lg">{token.icon}</span>
                                            <div className="text-xs font-medium">{token.symbol}</div>
                                            <div className="text-xs text-muted-foreground">{token.name}</div>
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Amount Input */}
                        {selectedToken && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Amount</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        placeholder="0.00"
                                        className="w-full h-12 px-4 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    />
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                                        {selectedToken}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <DrawerFooter className="px-4">
                        {selectedNetwork && selectedToken && (
                            <Button className="w-full h-12 rounded-xl">
                                <Zap className="mr-2" />
                                Continue to On-ramp
                            </Button>
                        )}
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}