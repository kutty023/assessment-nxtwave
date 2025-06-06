// Error message display component
import "../styles/errorMessage.css";

export default function ErrorMessage({ message }){
    // if error found display them else non
    return message ? <p className="error-message">{message}</p> : null;
}