import { useState } from "react";
import { Button } from "../ui/button";

export function Wrapper() {

    //const [isOnRamp, setIsOnRamp] = useState(false);
    //const [isOffRamp, setIsOffRamp] = useState(false);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="text-center space-y-4 mb-8">
                <h1 className="text-4xl md:text-5xl font-bold">Welcome to Ramp w/ Cash 💸</h1>
                <div className="space-y-2">
                    <p className="text-lg md:text-xl">Onramp cUSD, USDT & USDC</p>
                    <p className="text-lg md:text-xl">using African Local Currencies onto Farcaster wallet</p>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="min-w-[200px]">On-ramp</Button>
                <Button size="lg" variant="outline" className="min-w-[200px]">Off-ramp</Button>
            </div>
        </div>
    )
}