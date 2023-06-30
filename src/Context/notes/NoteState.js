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
      // const response = await fetch(`${host}/api/notes/addNote`, {
      //   method: "POST",
      //   mode: "cors",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5ODQyY2IyNWI4MTQzODkxY2Y3Y2IzIn0sImlhdCI6MTY4Nzc0Nzk1MX0.lMMl-dLYIMrgcTqgWVHj4HsGhhOq3y95io5U3ZU0c_4"
      //   },
      //   body: JSON.stringify({title, description, tag})
      // });
      
      // const json = response.json();
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

    }

    //Delete a note
    const deleteNote = (id) => {
      console.log("Deleting the note with id: "+id);
      const newNotes = notes.filter((note) => { return note._id !== id })
      setNotes(newNotes);
    }

    //Edit a note
    const editNote = async (id, title, description, tag) => {

      const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5ODQyY2IyNWI4MTQzODkxY2Y3Y2IzIn0sImlhdCI6MTY4Nzc0Nzk1MX0.lMMl-dLYIMrgcTqgWVHj4HsGhhOq3y95io5U3ZU0c_4"
        },
        body: JSON.stringify({title, description, tag})
      });

      // const json = response.json();
    
      for(let index = 0; index < notes.length; index++)
      {
        const element = notes[index];
        if(element.id === id)
        {
          element.title = title;
          element.description = description;
          element.tag = tag;
        }
      }
      
    }

    return(
        <NoteContext.Provider value = {{notes, addNote, deleteNote, editNote, getNotes}}> 
            {props.children} 
        </NoteContext.Provider>
    )

}

export default NoteState