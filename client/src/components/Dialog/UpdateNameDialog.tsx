import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { FormEvent } from "react";

interface Props {
  currentName?: string;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (name: string) => void;
}

export function UpdateNameDialog({
  currentName,
  isOpen,
  onClose,
  onUpdate,
}: Props) {
  return (
    <Dialog
      PaperProps={{
        component: "form",
        onSubmit: (event: FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          const name = formJson.name;

          if (name === currentName) {
            onClose();
            return;
          }

          onUpdate(name);
        },
      }}
      open={isOpen}
      onClose={onClose}
    >
      <DialogTitle>Confirm update</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the new todo name here.
        </DialogContentText>
        <TextField
          autoFocus
          defaultValue={currentName}
          fullWidth
          id="name"
          label="Name"
          margin="dense"
          name="name"
          required
          type="text"
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit">Update</Button>
      </DialogActions>
    </Dialog>
  );
}
