import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useGlobalFucntions } from "@/hooks/globalFunctions";
import { Button } from "flowbite-react";
import { QuestionType } from "../constants";
import QuestionList from "./questionList";

const QuestionHeader = ({
  title,
  number,
}: {
  title?: string;
  number: number;
}) => {
  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<QuestionType>();
  const { isDesktop } = useGlobalFucntions();

  return (
    <div>
      <h3>{(title || "Question ") + number}</h3>
      {isDesktop ? (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button color="ghost" className="w-[150px] justify-start">
              {selectedType ? <>{selectedType.label}</> : <>+ Set status</>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="start">
            <QuestionList setOpen={setOpen} setSelectedType={setSelectedType} />
          </PopoverContent>
        </Popover>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button className="w-[150px] justify-start">
              {selectedType ? <>{selectedType.label}</> : <>+ Set status</>}
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mt-4 border-t">
              <QuestionList
                setOpen={setOpen}
                setSelectedType={setSelectedType}
              />
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};

export default QuestionHeader;
