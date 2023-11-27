import Image from "next/image";
import { SidebriefLogo } from "@/assets/images";
import { BellRing, Search, Settings } from "lucide-react";
import { Button } from "flowbite-react";

export const Header = () => {
  return (
    <div className="h-[80px] flex items-center w-full">
      <Image src={SidebriefLogo} alt="sidebrief" quality={100} />
      <div className="w-[2px] h-[80px] bg-border ml-8 mr-10" />
      <div className="flex items-center justify-between w-full">
        <h2 className="text-foreground text-2xl font-semibold leading-normal">
          Hello, <span className="text-foreground-light-grey">Joshua</span>👋
        </h2>
        <div className="flex space-x-6 items-center">
          <div className="flex gap-4">
            <Button color="ghost" size="fit" className="w-fit h-fit p-2">
              <Search />
            </Button>
            <Button color="ghost" size="fit" className="w-fit h-fit p-2">
              <BellRing />
            </Button>
            <Button color="ghost" size="fit" className="w-fit h-fit p-2">
              <Settings />
            </Button>
          </div>
          <div>
            {/* User avatar | can be image */}
            <div className="w-12 h-12 grid place-content-center rounded-lg bg-[hsla(180,8%,97%,1)]">
              <span className="text-base leading-none font-medium">OG</span>
            </div>
            {/* There should be an icon here */}
          </div>
        </div>
      </div>
    </div>
  );
};
