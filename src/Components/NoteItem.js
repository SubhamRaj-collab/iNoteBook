import React from 'react'

const NoteItem = (props) => {

    const {note} = props;

    return (
        <div className='col-md-3'>
            <div class="card my-3">
                <div class="card-body">
                    <h5 class="card-title">{note.title}</h5>
                    <p class="card-text">{note.description} Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa doloremque sint modi perferendis nihil doloribus culpa amet magnam cumque voluptatum laudantium, deleniti quam sunt, distinctio nisi laboriosam minima harum expedita, itaque odit enim voluptatem!</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem