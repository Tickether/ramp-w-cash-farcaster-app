import { Minimize2 } from "lucide-react";

interface DepositProps {
    setOpenOnRamp: (openOnRamp : boolean) => void
    address: `0x${string}`
    coin: string
    network: string
    amount: string
    reference: string   
    setLoadingAddCeloDollar: (loadingAddCeloDollar: boolean) => void
}

export function OnRamp({ setOpenOnRamp, address, coin, network, amount, reference, setLoadingAddCeloDollar } : DepositProps) {

    
    


 
    return (
        <main className="fixed flex flex-col z-150 bg-gray-900/25 w-screen h-screen items-center justify-center top-0 left-0 right-0 bottom-0 backdrop-blur-[0.666px]">

            <div className="w-full h-full relative">
                <div
                    onClick={async()=>{
                        setOpenOnRamp(false)
                        setLoadingAddCeloDollar(false)
                    }}
                    className="absolute cursor-pointer p-5 top-0 right-0"
                >
                    <Minimize2 className="text-yellow-600"/>
                </div>
                <div className="h-full w-full">
                    <iframe
                        src={
                            `
                                https://useaccrue.com/hosted/ramp?key=CSHRMP-PUBK_pVc9ndu0HOOS4opC&paymentType=deposit&address=${address}&coin=${coin}&network=${network}&amount=${amount}&reference=${reference}&isWalletContext=false
                            `
                        }
                        title="cashRamp"
                        className="w-full h-full"
                    ></iframe>
                </div>
            </div>

        </main>
    );
}