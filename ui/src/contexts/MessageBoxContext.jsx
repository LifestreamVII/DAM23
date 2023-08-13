import {useState, createContext} from "react";
import MessageBox from "../components/MessageBox";

export const messageBoxContext = createContext('');

export default function MessageBoxProvider(props) {
    const [message, setMessage] = useState(false);

    return (
        <messageBoxContext.Provider value={[message, setMessage]}>
            {message ? <MessageBox message={message} setMessage={setMessage} /> : null}
            {props.children}
        </messageBoxContext.Provider>
    )
}