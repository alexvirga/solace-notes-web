import { useState, useEffect } from "react";
import Note from "./Note";
import NewNote from "./NewNote";
import { Box, Typography, TextField } from "@mui/material";
import { deleteNote, getNotes } from "./services";
import "../App.css";

interface Notes {
  id: number;
  title: string;
  body: string;
}

const NotesPage = () => {
  const [notes, setNotes] = useState<Notes[]>();
  const [searchQuery, setSearchQuery] = useState("");

  const getData = async () => {
    try {
      const notesList = await getNotes();
      setNotes(notesList);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteNoteHandler = async (id: number) => {
    try {
      const response = await deleteNote(id);
      if (response === 200) {
        getData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box>
      <NewNote getNotes={getData} />
      <Box className="notes-container">
        <Typography variant="h2" textAlign={"left"}>
          All Notes
        </Typography>
        <TextField
          label="Search Notes"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Box className="notes-grid">
          {notes &&
            notes
              .filter(
                (note) =>
                  note.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  note.body.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((note) => (
                <Note
                  note={note}
                  deleteNote={deleteNoteHandler}
                  getNotes={getData}
                />
              ))}
        </Box>
      </Box>
    </Box>
  );
};
export default NotesPage;
