import "./App.css";
import { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    };
  }

  API_URL = " http://localhost:5147/";

  componentDidMount() {
    this.refreshNotes();
  }

  async refreshNotes() {
    try {
      const response = await fetch(this.API_URL + "API/App/GetNodes");
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const data = await response.json();
      this.setState({ notes: data });
    } catch (error) {
      console.error(error);
    }
  }

  async addClick() {
    try {
      var newNotes = document.getElementById("newNotes").value;
      const data = new FormData();
      data.append("newNotes", newNotes);

      const response = await fetch(this.API_URL + "API/App/Insert", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        throw new Error("Failed to insert");
      }

      const result = await response.json();
      alert(result);
      this.refreshNotes();
    } catch (error) {
      console.error(error);
    }
  }

  async deleteClick(id) {
    fetch(this.API_URL + "API/App/Delete?id=" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result);
        this.refreshNotes();
      });
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
          <p>
            <b>* {note.description}</b>&nbsp;
            <button onClick={() => this.deleteClick(note.id)}>Delete</button>
          </p>
        ))}
      </div>
    );
  }
}
export default App;
