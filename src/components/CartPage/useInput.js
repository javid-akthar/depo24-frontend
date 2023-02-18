import {useState} from 'react';


function useInput(initiatlValue) {
    const[value, setValue] = useState(initiatlValue);
    const reset = () =>{
        setValue(initiatlValue);
    }
    const bind = {
        value,
        onChange : e =>{
            setValue(e.target.value);
        }
    }
    return [value, bind, reset];
}

export default useInput;