

import React, { useState } from 'react'

function Parqueo1() {

    const [text, setText] = useState('');
    const [updated, setUpdated] = useState('');


    const textOnChange = (event) => {
        setText(event.target.value)
    }

    const buttonOnClick = () => {
        setUpdated(text)
    }

    return (

        <div>
            <input type="text" value={text} onChange={textOnChange} />
            <button onClick={buttonOnClick}> Registrar vehiculo</button>
            <p>Placas:{text}</p>
            <p>Cedula:{updated}</p>
        </div>
    )
}

export default Parqueo1;
