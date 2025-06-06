// button component
import "../styles/button.css";

export default function Button({label, onClick, disabled = false, id}){
    return (
        <button id={id} onClick={onClick} disabled={disabled} >
            {label}
        </button>
    );
};