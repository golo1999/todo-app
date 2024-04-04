import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export function DeleteDialog({ isOpen, onClose, onDelete }: Props) {
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      aria-labelledby="responsive-dialog-title"
      fullScreen={fullScreen}
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
        <Button color="warning" variant="contained" onClick={onDelete}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
