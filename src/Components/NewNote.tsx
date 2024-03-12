import { useState } from "react";
import {
  Button,
  Box,
  FormLabel,
  TextField,
  Typography,
  Card,
} from "@mui/material";
import { createNote } from "./services";

interface Props {
  getNotes: () => void;
}
const NewNote = ({ getNotes }: Props) => {
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [bodyError, setBodyError] = useState("");

  const createNoteHnadler = async () => {
    try {
      const response = await createNote(newBody, newTitle);
      if (response === 200) {
        getNotes();
        setNewBody("");
        setNewTitle("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createNoteHnadler();
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

  return (
    <Box className="new-note-section">
      <Typography variant="h2" textAlign="left">
        New Note
      </Typography>
      <Card className="new-note-form-card">
        <form onSubmit={handleSubmit} className={"new-note-form"}>
          <FormLabel> Title</FormLabel>
          <TextField
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <FormLabel> Body</FormLabel>
          <TextField
            value={newBody}
            rows={4}
            multiline
            onChange={handleBodyChange}
            error={!!bodyError}
            helperText={bodyError}
            required
          />
          <Button type="submit" disabled={!!bodyError || !newBody.length}>
            Create New Note
          </Button>
        </form>
      </Card>
    </Box>
  );
};

export default NewNote;
