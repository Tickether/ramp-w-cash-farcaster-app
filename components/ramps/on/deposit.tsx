import Image from "next/image";
import { Button } from "../../ui/button";
import { Drawer, DrawerTitle, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTrigger } from "../../ui/drawer";
import { BanknoteArrowUp, Loader2, Zap } from "lucide-react";
import { useState } from "react";
import { OnRamp } from "./onRamp";
import { useAccount } from "wagmi";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
    amount: z.string()
});

export function Deposit() {

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


    const { address } = useAccount()
    
    const [selectedNetwork, setSelectedNetwork] = useState<'celo' | 'base' | null>(null);
    const [selectedToken, setSelectedToken] = useState<string | null>(null);

    
    const [amount, setAmount] = useState<string>("")
    const [loadingAddCeloDollar, setLoadingAddCeloDollar] = useState(false)
    const [openOnRamp, setOpenOnRamp] = useState(false)
    const [reference, setReference] = useState("")

    const form = useForm < z.infer < typeof formSchema >> ({
        resolver: zodResolver(formSchema),
        
    
    })

    function onSubmit(values: z.infer < typeof formSchema > ) {
        try {
            console.log(values);
            setLoadingAddCeloDollar(true)
                setOpenOnRamp(true)
                setAmount(values.amount)
                const ref = `${address}-${(new Date()).getTime().toString()}`
                setReference(ref)
        } catch (error) {
            console.error("Form submission error", error);
        }
    }


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
                                        <Image src="https://assets.coingecko.com/coins/images/11090/standard/InjXBNx9_400x400.jpg?1696511031" alt="Celo" width={24} height={24} />
                                    </div>
                                    Celo
                                </Button>
                                <Button
                                    variant={selectedNetwork === 'base' ? 'default' : 'outline'}
                                    className="flex-1 h-12 rounded-xl"
                                    onClick={() => handleNetworkSelect('base')}
                                >
                                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                        <Image src="https://avatars.githubusercontent.com/u/16627100?s=200&v=4" alt="Base" width={24} height={24} />
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
                                            <div className="flex flex-col items-center justify-center">
                                                <span className="text-lg">
                                                    <Image src={token.icon} alt={token.name} width={24} height={24} />
                                                </span>
                                                <div className="text-xs font-medium">{token.symbol}</div>
                                                <div className="text-xs text-muted-foreground">{token.name}</div>
                                            </div>
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Amount Input */}
                        {selectedToken && (
                            <div className="space-y-2">
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
                                        
                                        <FormField
                                        control={form.control}
                                        name="amount"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Amount</FormLabel>
                                                <FormControl>
                                                    <Input 
                                                        {...field}
                                                        placeholder="Enter an Amount..."
                                                        // Only allow digits:
                                                        onChange={(e) => {
                                                            // remove every non-digit
                                                            const onlyNums = e.target.value.replace(/\D+/g, "");
                                                            field.onChange(onlyNums);
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                        />
                                        {selectedNetwork && selectedToken && (
                                            <Button className="w-full h-12 rounded-xl">
                                                {
                                                    loadingAddCeloDollar ? (
                                                        <Loader2 className="mr-2 animate-spin" />
                                                    ) : (
                                                        <>
                                                            <Zap className="mr-2" />
                                                            
                                                        </>
                                                    )
                                                }
                                                <p>Continue to On-ramp</p>
                                            </Button>
                                        )}
                                    </form>
                                </Form>
                            </div>
                        )}
                    </div>
                    
                    <DrawerFooter className="px-4">
                        
                    </DrawerFooter>
                </div>
            </DrawerContent>
        
        {openOnRamp && (
                <OnRamp
                    setOpenOnRamp={setOpenOnRamp}
                    address={address!}
                    coin={selectedToken!.toUpperCase()}
                    network={selectedNetwork!.toUpperCase()}
                    amount={amount}
                    reference={reference}
                    setLoadingAddCeloDollar={setLoadingAddCeloDollar}
                />
            )}
        </Drawer>
        
    )
}