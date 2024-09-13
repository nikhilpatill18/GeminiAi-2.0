import { createContext, useState } from "react";
import run from "../config/Gemini";
export const Context = createContext();
const ContextProvider = (props) => {
    const [input, setinput] = useState("");
    const [recentprompt, setrecentprompt] = useState("")
    const [previousprompt, setpreviousprompt] = useState([]);
    const [showresult, setshowresult] = useState(false);
    const [loading, setloading] = useState(false);
    const [resultdata, setresultdata] = useState("");
    const deletepara = (index, nextword) => {
        setTimeout(function () {
            setresultdata((prev) => prev + nextword)
        }, 75 * index)
    }
    const newchat = () => {
        setloading(false)
        setshowresult(false)

    }
    const onSent = async (prompt) => {
        setresultdata("")
        setloading(true)
        setshowresult(true)
        let response = ""
        if (prompt == undefined) {
            setrecentprompt(input)
            setpreviousprompt((prev) => [...prev, input])
            response = await run(input)
        }
        else {
            response = await run(prompt)
            setrecentprompt(prompt)

        }
        let responseArray = response.split("**")
        let newresponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i == 0 || i % 2 == 0) {
                newresponse += responseArray[i]
            }
            else {
                newresponse += "<b>" + responseArray[i] + "</b>"
            }
        }
        let newResponse2 = newresponse.split("*").join("</br>")
        let newresponsearray = newResponse2.split(" ");
        for (let i = 0; i < newresponsearray.length; i++) {
            const nextword = newresponsearray[i]
            deletepara(i, nextword + " ")
        }
        // setresultdata(newResponse2)
        setloading(false)
        setinput("")
    }
    // onSent("what is react js")
    const contextvalue = {
        previousprompt, setpreviousprompt, onSent, setrecentprompt
        , recentprompt, showresult, loading, resultdata, input, setinput, run, newchat

    }
    return (
        <Context.Provider value={contextvalue}>
            {props.children}
        </Context.Provider>
    )
}
export default ContextProvider
