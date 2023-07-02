import React from 'react'

function Alert(props) {

    const capitalize = (word)=>{
        if(word === "danger")
        {
          word = "error";
        }
        let thisword = word.charAt(0).toUpperCase()+word.slice(1);
        return thisword;
    }

  return (
    <div style={{width: '100%', height: '40px'}}>
        {
            props.alert && 
            <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
            <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
            </div>
        }
    </div>
    )
}

export default Alert