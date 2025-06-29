import { Button } from "../ui/button";
import { Drawer, DrawerTitle, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTrigger } from "../ui/drawer";
import { BanknoteArrowUp } from "lucide-react";

export function OnRamp() {
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
                    
                    <DrawerFooter>
                        
                    </DrawerFooter>
                </div>

            </DrawerContent>
        </Drawer>
    )
}