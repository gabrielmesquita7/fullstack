import { Component } from "react";
import { fetchNotes, addNote, deleteNote } from "../../services/apiService";

class Home extends Component {
    constructor(props) {
      super(props);
      this.state = {
        notes: [],
      };
    }
  
    componentDidMount() {
      this.refreshNotes();
    }
  
    async refreshNotes() {
      const data = await fetchNotes();
      this.setState({ notes: data });
    }
  
    async addClick() {
      const newNotes = document.getElementById("newNotes").value;
      const result = await addNote(newNotes);
      alert(result);
      this.refreshNotes();
    }
  
    async deleteClick(id) {
      const result = await deleteNote(id);
      alert(result);
      this.refreshNotes();
    }
  
    render() {
      const { notes } = this.state;
      return (
        <div className="App">
          <h2>App Template</h2>
          <input id="newNotes" />
          &nbsp;
          <button onClick={() => this.addClick()}>Add</button>
          {notes.map((note) => (
            <p key={note.id}>
              <b>* {note.description}</b>&nbsp;
              <button onClick={() => this.deleteClick(note.id)}>Delete</button>
            </p>
          ))}
        </div>
      );
    }
  }
  
  export default Home;
  