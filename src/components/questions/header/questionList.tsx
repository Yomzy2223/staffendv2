import React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { QuestionType, questionTypes } from "../constants";

function QuestionList({
  setOpen,
  setSelectedType,
}: {
  setOpen: (open: boolean) => void;
  setSelectedType: (type?: QuestionType) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter status..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {questionTypes.map((type: QuestionType) => (
            <CommandItem
              key={type.label}
              value={type.label}
              onSelect={(value) => {
                setSelectedType(
                  questionTypes.find(
                    (type: QuestionType) => type.label === value
                  )
                );
                setOpen(false);
              }}
            >
              {type.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export default QuestionList;
