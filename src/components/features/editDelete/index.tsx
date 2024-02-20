import { Button, TextInput } from "flowbite-react";
import { PencilLine, Trash2 } from "lucide-react";
import React, { useState } from "react";
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

  const matches = value.trim().toLowerCase() === "delete";

  const handleDelete = () => {
    if (!deleteClicked) {
      setDeleteClicked(true);
      return;
    }
    if (matches) deleteAction();
  };

  return (
    <div className="flex gap-4">
      {deleteClicked ? (
        <TextInput
          placeholder="Enter DELETE to confirm action"
          value={value}
          onChange={(e) => setValue(e.target.value)}
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
          disabled={!matches}
        >
          <Trash2 size={16} color="hsl(var(--destructive-foreground))" />
        </Button>
      )}
    </div>
  );
};

export default EditDelete;
