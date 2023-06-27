import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {

    const s1 = {
        "name": "Raj",
        "class": "10"
    }

    const [state, setState] = useState(s1);

    const update = () => {
        setTimeout(() => {
            setState({
                "name": "Raghav",
                "class": "14"
            })
        }, 5000);
    }

    return(
        <NoteContext.Provider value = {{state: state, update: update}}> 
        {/* Can also be written as {{state, update}}, as in modern javascript. */}
            {props.children} 
        </NoteContext.Provider>
    )

}

export default NoteState