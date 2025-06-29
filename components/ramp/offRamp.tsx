import { Button } from "../ui/button";
import { Drawer, DrawerTitle, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTrigger } from "../ui/drawer";
import { BanknoteArrowDown } from "lucide-react";

export function OffRamp() {
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="outline" className="w-80 h-12 rounded-2xl">
                    <BanknoteArrowDown className="text-yellow-600" />
                    Off-ramp
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm pb-6">
                    <DrawerHeader className="max-md:gap-[0.1rem]">
                        <DrawerTitle>
                           Withdraw from Farcaster
                        </DrawerTitle>
                        <DrawerDescription className="text-xs">Choose the network, token & amount to off-ramp.</DrawerDescription>
                    </DrawerHeader>
                    
                    <DrawerFooter>
                        
                    </DrawerFooter>
                </div>

            </DrawerContent>
        </Drawer>
    )
}