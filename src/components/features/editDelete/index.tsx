import { Button, TextInput } from "flowbite-react";
import { PencilLine, Trash2 } from "lucide-react";
import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import { Oval } from "react-loading-icons";

const EditDelete = ({
  onEdit,
  deleteAction,
  loading,
}: {
  onEdit: () => void;
  deleteAction: () => void;
  loading?: boolean;
}) => {
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [value, setValue] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const matches = value.trim().toLowerCase() === "delete";

  const handleDelete = () => {
    if (!deleteClicked) {
      setDeleteClicked(true);
      return;
    }
    if (matches) deleteAction();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && matches) {
      deleteAction();
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [deleteClicked]);

  return (
    <div className="flex items-center gap-4">
      {deleteClicked ? (
        <TextInput
          ref={inputRef}
          placeholder="Type DELETE to confirm action"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          color="failure"
          className="[&_input]:h-6 [&_input]:py-0 [&_input]:placeholder:text-sm focus:[&_input]:outline-none"
        />
      ) : (
        <Button type="button" color="ghost" size="fit">
          <PencilLine size={16} color="hsl(var(--primary))" onClick={onEdit} />
        </Button>
      )}

      {loading ? (
        <Oval
          className="h-4 w-4"
          stroke="hsl(var(--destructive-foreground))"
          strokeOpacity={1}
          strokeWidth={3}
        />
      ) : (
        <Button
          type="button"
          color="ghost"
          size="fit"
          onClick={handleDelete}
          disabled={deleteClicked && !matches}
        >
          <Trash2 size={16} color="hsl(var(--destructive-foreground))" />
        </Button>
      )}
      {deleteClicked && (
        <Button
          type="button"
          color="ghost"
          size="fit"
          className="text-primary"
          onClick={() => {
            setDeleteClicked(false);
            setValue("");
          }}
          disabled={loading}
        >
          Cancel
        </Button>
      )}
    </div>
  );
};

export default EditDelete;
