import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {

    const notesInitial = [
        {
          "_id": "64992f2c458fe13ec57953ae",
          "user": "649842cb25b8143891cf7cb3",
          "title": "My Title",
          "description": "Please! Wake up early.",
          "tag": "personal",
          "date": "2023-06-26T06:24:44.670Z",
          "__v": 0
        },
        {
          "_id": "64992f2f458fe13ec57953b0",
          "user": "649842cb25b8143891cf7cb3",
          "title": "My Title",
          "description": "Please! Wake up early.",
          "tag": "personal",
          "date": "2023-06-26T06:24:47.292Z",
          "__v": 0
        },
        {
          "_id": "6499497d30d27fe02767c986",
          "user": "649842cb25b8143891cf7cb3",
          "title": "Cool guy",
          "description": "This thing is very cool.",
          "tag": "coolby",
          "date": "2023-06-26T08:17:01.899Z",
          "__v": 0
        },
        {
          "_id": "6499497d30d27fe02767c986",
          "user": "649842cb25b8143891cf7cb3",
          "title": "Cool guy",
          "description": "This thing is very cool.",
          "tag": "coolby",
          "date": "2023-06-26T08:17:01.899Z",
          "__v": 0
        },
        {
          "_id": "6499497d30d27fe02767c986",
          "user": "649842cb25b8143891cf7cb3",
          "title": "Cool guy",
          "description": "This thing is very cool.",
          "tag": "coolby",
          "date": "2023-06-26T08:17:01.899Z",
          "__v": 0
        },
        {
          "_id": "6499497d30d27fe02767c986",
          "user": "649842cb25b8143891cf7cb3",
          "title": "Cool guy",
          "description": "This thing is very cool.",
          "tag": "coolby",
          "date": "2023-06-26T08:17:01.899Z",
          "__v": 0
        },
        {
          "_id": "6499497d30d27fe02767c986",
          "user": "649842cb25b8143891cf7cb3",
          "title": "Cool guy",
          "description": "This thing is very cool.",
          "tag": "coolby",
          "date": "2023-06-26T08:17:01.899Z",
          "__v": 0
        },
        {
          "_id": "6499497d30d27fe02767c986",
          "user": "649842cb25b8143891cf7cb3",
          "title": "Cool guy",
          "description": "This thing is very cool.",
          "tag": "coolby",
          "date": "2023-06-26T08:17:01.899Z",
          "__v": 0
        },
        {
          "_id": "6499497d30d27fe02767c986",
          "user": "649842cb25b8143891cf7cb3",
          "title": "Cool guy",
          "description": "This thing is very cool.",
          "tag": "coolby",
          "date": "2023-06-26T08:17:01.899Z",
          "__v": 0
        },
        {
          "_id": "6499497d30d27fe02767c986",
          "user": "649842cb25b8143891cf7cb3",
          "title": "Cool guy",
          "description": "This thing is very cool.",
          "tag": "coolby",
          "date": "2023-06-26T08:17:01.899Z",
          "__v": 0
        },
        {
          "_id": "6499497d30d27fe02767c986",
          "user": "649842cb25b8143891cf7cb3",
          "title": "Cool guy",
          "description": "This thing is very cool.",
          "tag": "coolby",
          "date": "2023-06-26T08:17:01.899Z",
          "__v": 0
        },
        {
          "_id": "6499497d30d27fe02767c986",
          "user": "649842cb25b8143891cf7cb3",
          "title": "Cool guy",
          "description": "This thing is very cool.",
          "tag": "coolby",
          "date": "2023-06-26T08:17:01.899Z",
          "__v": 0
        },
        {
          "_id": "6499497d30d27fe02767c986",
          "user": "649842cb25b8143891cf7cb3",
          "title": "Cool guy",
          "description": "This thing is very cool.",
          "tag": "coolby",
          "date": "2023-06-26T08:17:01.899Z",
          "__v": 0
        },
        {
          "_id": "6499497d30d27fe02767c986",
          "user": "649842cb25b8143891cf7cb3",
          "title": "Cool guy",
          "description": "This thing is very cool.",
          "tag": "coolby",
          "date": "2023-06-26T08:17:01.899Z",
          "__v": 0
        },
        {
          "_id": "6499497d30d27fe02767c986",
          "user": "649842cb25b8143891cf7cb3",
          "title": "Cool guy",
          "description": "This thing is very cool.",
          "tag": "coolby",
          "date": "2023-06-26T08:17:01.899Z",
          "__v": 0
        }
    ]

    const [notes, setNotes] = useState(notesInitial)

    return(
        <NoteContext.Provider value = {{notes, setNotes}}> 
            {props.children} 
        </NoteContext.Provider>
    )

}

export default NoteState