import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export function DeleteDialog({ isOpen, onClose, onDelete }: Props) {
  return (
    <Dialog
      aria-labelledby="responsive-dialog-title"
      open={isOpen}
      onClose={onClose}
    >
      <DialogTitle id="responsive-dialog-title">Confirm delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this todo?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="error" variant="contained" onClick={onDelete}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
