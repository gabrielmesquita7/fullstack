const API_URL = "http://localhost:5147/";

async function fetchNotes() {
  try {
    const response = await fetch(API_URL + "API/App/GetNodes");
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function addNote(newNote) {
  try {
    const data = new FormData();
    data.append("newNotes", newNote);

    const response = await fetch(API_URL + "API/App/Insert", {
      method: "POST",
      body: data,
    });

    if (!response.ok) {
      throw new Error("Failed to insert");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return "Failed to insert";
  }
}

async function deleteNote(id) {
  try {
    const response = await fetch(API_URL + "API/App/Delete?id=" + id, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return "Failed to delete";
  }
}

export { fetchNotes, addNote, deleteNote };
