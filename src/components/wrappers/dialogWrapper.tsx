import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { Modal } from "flowbite-react";
import { useGlobalFucntions } from "@/hooks/globalFunctions";
import { X } from "lucide-react";

interface propsType {
  title: string;
  children: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DialogWrapper = ({ title, children, open, setOpen }: propsType) => {
  const { isDesktop } = useGlobalFucntions();

  return (
    <div>
      {isDesktop ? (
        <Modal size="lg" show={open} onClose={() => setOpen(false)} dismissible>
          <Modal.Header>
            <span className="text-lg font-semibold text-foreground">
              {title}
            </span>
          </Modal.Header>
          <Modal.Body className="p-5 pt-4">{children}</Modal.Body>
        </Modal>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent className="p-5 pt-0 rounded-t-3xl">
            <DrawerHeader className="flex justify-between px-0">
              <DrawerTitle className="text-lg font-semibold text-foreground">
                {title}
              </DrawerTitle>
              <DrawerClose>
                <X color="hsl(var(--foreground-5))" />
              </DrawerClose>
            </DrawerHeader>
            {children}
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};

export default DialogWrapper;
