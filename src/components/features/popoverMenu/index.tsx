import { MenubarSeparator } from "@/components/ui/menubar";
import PopOverWrapper from "@/components/wrappers/popOverWrapper";
import { Button } from "flowbite-react";
import { MoreHorizontal, MoreVertical } from "lucide-react";
import React, { useState } from "react";

const PopoverMenu = ({ menuInfo, vertical }: IProps) => {
  const [open, setOpen] = useState(false);

  return (
    <PopOverWrapper
      open={open}
      setOpen={setOpen}
      onClose={() => setOpen(false)}
      className="p-1"
      content={
        <div>
          {menuInfo.map((each) => (
            <div key={each.text}>
              <Button
                color={each.color || "transparent"}
                className={each.className}
                onClick={each.action && each.action}
              >
                {each.text}
              </Button>
              {each.showSeparator && (
                <MenubarSeparator className="max-w-full m-0" />
              )}
            </div>
          ))}
        </div>
      }
    >
      <Button size="fit" color="transparent" className="flex items-center">
        {vertical ? (
          <MoreVertical color="hsl(var(--foreground-5))" />
        ) : (
          <MoreHorizontal color="hsl(var(--foreground-5))" />
        )}
      </Button>
    </PopOverWrapper>
  );
};

export default PopoverMenu;

interface IProps {
  vertical?: boolean;
  menuInfo: IPopoverMenu[];
}

export interface IPopoverMenu {
  text: string;
  className?: string;
  color?: string;
  action?: () => void;
  showSeparator?: boolean;
}
