import { Button } from "flowbite-react";
import { PlusCircle } from "lucide-react";
import React, { useState } from "react";
import Question from "../questions";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGlobalFucntions } from "@/hooks/globalFunctions";
import { QuestionType } from "../questions/constants";
import QuestionList from "../questions/header/questionList";

const DynamicQuestionForm = ({ title }: { title?: string }) => {
  const [formInfo, setformInfo] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<QuestionType>();
  const { isDesktop } = useGlobalFucntions();

  const handleQuestionSubmit = (values: any) => {
    console.log(values);
  };

  const btnText = (formInfo.length > 0 ? "Add another " : "Create a ") + title;

  return (
    <div>
      {formInfo.map((info, i) => (
        <Question
          number={i + 1}
          type={info.type}
          title={title}
          submitHandler={handleQuestionSubmit}
        />
      ))}

      {isDesktop ? (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              onClick={() => setformInfo([...formInfo, { type: selectedType }])}
            >
              <PlusCircle />
              {btnText}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="start">
            <QuestionList setOpen={setOpen} setSelectedType={setSelectedType} />
          </PopoverContent>
        </Popover>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button
              onClick={() => setformInfo([...formInfo, { type: selectedType }])}
            >
              <PlusCircle />
              {btnText}
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

export default DynamicQuestionForm;
