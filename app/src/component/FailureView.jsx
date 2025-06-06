// Data fetch failure component to display the message

import '../styles/failureView.css';
import errorDisplayImage from "../assets/errorDisplayImage.svg";

export default function FailureView({onRetry}){
    return (
        <div className="failure-view">
            <img src={errorDisplayImage} alt="error illustrator" id="errorMessageDisplayImage" />
            <p>Something went wrong, Please try again!</p>
            <button onClick={onRetry}>Try again</button>
        </div>
    );
};
