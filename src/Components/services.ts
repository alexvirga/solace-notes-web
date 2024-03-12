export const getNotes = async () => {
  console.log(import.meta.env.VITE_API_URL);
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/notes`);
    if (!response.ok) throw new Error("Failed to fetch notes");
    return await response.json();
  } catch (err) {
    throw err; // re-throw to be handled by calling function
  }
};

export const deleteNote = async (id: number) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/notes/delete/${id}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) throw new Error("Failed to delete note");
    return response.status; // or return await response.json() if your API sends back a response;
  } catch (err) {
    throw err;
  }
};

export const editNote = async (
  id: number,
  newBody: string,
  newTitle: string
) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/notes/edit/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ noteBody: newBody, noteTitle: newTitle }),
      }
    );
    if (!response.ok) throw new Error("Failed to update note");
    return response.status;
  } catch (err) {
    throw err;
  }
};

export const createNote = async (newBody: string, newTitle: string) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/notes/new`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ noteBody: newBody, noteTitle: newTitle }),
    });
    if (!response.ok) throw new Error("Failed to update note");
    return response.status;
  } catch (err) {
    throw err;
  }
};
