import React, { useContext, useEffect, useState ,useRef } from 'react';
import noteContext from '../Context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = (props) => {

  const context = useContext(noteContext);
  const {notes, getNotes, addNote} = context;

  const [note, setNote] = useState({etitle:"", edescription:"", etag:"default"})

  const updateNote = (currentNote) => {
    console.log("Update note clicked")
    ref.current.click();
    setNote({etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
  }
  
  const ref = useRef(null)

  useEffect(() => {

    getNotes()
    
    // eslint-disable-next-line
  }, [])

  const handleClick = (e) => {
      e.preventDefault();
      console.log("Updating the note....", note)
      // addNote(note.etitle, note.edescription, note.etag);
  }

  const onChange = (e) => {
      setNote({...note, [e.target.name]: e.target.value})
  }
  

  return (
    <>
      <AddNote/>

      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">

            <form className='my-3'>
              <div className="mb-3">
                <label htmlFor="etitle" className="form-label">Title</label>
                <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" value={note.etitle} onChange={onChange}/>
              </div>
              <div className="mb-3">
                <label htmlFor="edescription" className="form-label">Description</label>
                <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange}/>
              </div>
              <div className="mb-3">
                <label htmlFor="etag" className="form-label">Tag</label>
                <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange}/>
              </div>
            </form>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className='row my-3'>
          <h2>Your Notes</h2>
          {notes.map((note) => {
              return <NoteItem key={note._id} updateNote={updateNote} note={note}/>;
          })}
      </div>
    </>
  )
}

export default Notes