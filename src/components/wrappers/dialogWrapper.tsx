import React from "react";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Modal } from "flowbite-react";
import { useGlobalFucntions } from "@/hooks/globalFunctions";

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
          <Modal.Body>{children}</Modal.Body>
        </Modal>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>{children}I'm mobile</DrawerContent>
        </Drawer>
      )}
    </div>
  );
};

export default DialogWrapper;
