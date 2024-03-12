import { useState, useEffect } from "react";
import { editNote } from "./services";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import {
  IconButton,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
} from "@mui/material";
import "../App.css";

interface Note {
  id: number;
  title: string;
  body: string;
}

interface Props {
  note: Note;
  deleteNote: (id: number) => void;
  getNotes: () => void;
}

const Note = ({ note, deleteNote, getNotes }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newBody, setNewBody] = useState(note.body);
  const [newTitle, setNewTitle] = useState(note.title);
  const [bodyError, setBodyError] = useState("");

  useEffect(() => {
    setNewBody(note.body);
    setNewTitle(note.title);
  }, [note]);

  const editNoteHandler = async () => {
    try {
      const response = await editNote(note.id, newBody, newTitle);
      if (response === 200) {
        getNotes();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editNoteHandler();
    setIsEditing(false);
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newBody = event.target.value;
    setNewBody(newBody);
    if (newBody.length < 20 || newBody.length > 300) {
      setBodyError("Body must be between 20 and 300 characters.");
    } else {
      setBodyError("");
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setBodyError("");
    setNewBody(note.body);
  };

  return (
    <Card className="note">
      {isEditing ? (
        <form
          className="editForm"
          onSubmit={handleFormSubmit}
          id={`${note.id}`}
        >
          <TextField
            className="title-input"
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />

          <TextField
            className="body-input"
            value={newBody}
            multiline
            rows={3}
            error={!!bodyError}
            helperText={bodyError}
            onChange={handleBodyChange}
          />
          <CardActions>
            <Button type="submit" disabled={!!bodyError}>
              Save
            </Button>
            <Button onClick={cancelEdit}>Cancel</Button>
          </CardActions>
        </form>
      ) : (
        <>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {note.title}
            </Typography>
            <Typography variant="body2">{note.body}</Typography>
          </CardContent>
          <CardActions className={"action-container"}>
            <IconButton onClick={() => deleteNote(note.id)}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={() => setIsEditing(!isEditing)}>
              <ModeEditIcon />
            </IconButton>
          </CardActions>
        </>
      )}
    </Card>
  );
};

export default Note;
