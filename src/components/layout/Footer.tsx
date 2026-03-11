import { Disclaimer } from "@/components/layout/Disclaimer";

export function Footer() {
    return (
        <footer className="w-full flex flex-col">
            <Disclaimer />
            <div className="border-t py-6 md:py-0">
                <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 text-sm text-muted-foreground">
                    <p className="text-center leading-loose md:text-left">
                        © 2026 NihongoDoctor.com. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        {/* <a href="#" className="hover:underline">Privacy Policy</a>
                        <a href="#" className="hover:underline">Terms of Service</a> */}
                    </div>
                </div>
            </div>
        </footer>
    );
}
