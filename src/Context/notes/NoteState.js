import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {

    const host = "http://localhost:5000";

    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial)

    //Get all Notes
    const getNotes = async () => {
      const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5ODQyY2IyNWI4MTQzODkxY2Y3Y2IzIn0sImlhdCI6MTY4Nzc0Nzk1MX0.lMMl-dLYIMrgcTqgWVHj4HsGhhOq3y95io5U3ZU0c_4"
        }
      });
      
      const json = await response.json();
      console.log(json) 
      setNotes(json)

    }

    //Add a note
    const addNote = async (title, description, tag) => {
      const response = await fetch(`${host}/api/notes/addNote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5ODQyY2IyNWI4MTQzODkxY2Y3Y2IzIn0sImlhdCI6MTY4Nzc0Nzk1MX0.lMMl-dLYIMrgcTqgWVHj4HsGhhOq3y95io5U3ZU0c_4"
        },
        body: JSON.stringify({title, description, tag})
      });
      
      const json = await response.json();
      console.log(json);
      //TODO: Api Call
      console.log("Adding a new note.")
      const note = {
        "_id": "6499497d30d27fe02767c98613",
        "user": "649842cb25b8143891cf7cb3",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2023-06-26T08:17:01.899Z",
        "__v": 0
      };
      setNotes(notes.concat(note));
      getNotes();

    }

    //Delete a note
    const deleteNote = async (id) => {
      //API call
      const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5ODQyY2IyNWI4MTQzODkxY2Y3Y2IzIn0sImlhdCI6MTY4Nzc0Nzk1MX0.lMMl-dLYIMrgcTqgWVHj4HsGhhOq3y95io5U3ZU0c_4"
        }
      });

      const json = response.json();
      console.log(json);

      console.log("Deleting the note with id: "+id);
      const newNotes = notes.filter((note) => { return note._id !== id })
      setNotes(newNotes);
    }

    //Edit a note
    const editNote = async (id, title, description, tag) => {
      //API call
      const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5ODQyY2IyNWI4MTQzODkxY2Y3Y2IzIn0sImlhdCI6MTY4Nzc0Nzk1MX0.lMMl-dLYIMrgcTqgWVHj4HsGhhOq3y95io5U3ZU0c_4"
        },
        body: JSON.stringify({title, description, tag})
      });

      const json = await response.json();
      console.log(json);
    
      let newNotes = JSON.parse(JSON.stringify(notes))
      //Changing data in Frontend
      for(let index = 0; index < newNotes.length; index++)
      {
        const element = newNotes[index];
        if(element._id === id)
        {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setNotes(newNotes);
      
    }

    return(
        <NoteContext.Provider value = {{notes, addNote, deleteNote, editNote, getNotes}}> 
            {props.children} 
        </NoteContext.Provider>
    )

}

export default NoteState