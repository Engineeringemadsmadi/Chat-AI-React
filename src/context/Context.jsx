import { createContext, useEffect, useState } from "react";

import run from "../gemini";
import { use } from "react";
export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    /* so when we will click one this send button this input file data will be saved in
       this recent prompt and will display it our main component*/
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");


    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData(prev => prev + nextWord);
        }, 75 * index);
    };

    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }


    const onSent = async (prompt) => {
        // لكي يتم تهيآة النتيجة القديمة ,عندما اريد طلب نتيجة جديدة
        // we will run this function our result data will be rest.
        //  so that our previous response will be removed from our state
        setResultData("");
        // so that we can diplay some loading animation omn our  screen .
        // we will make it.
        setLoading(true);
        // we will add set show result true.
        setShowResult(true);
        let response;
        try {
            if (prompt !== undefined) {
                // after making it true we are getiing the data using  Run chat
                response = await run(prompt);
                setRecentPrompt(prompt)
            }
            else {
                setPrevPrompts(prev => [...prev, input]);
                setRecentPrompt(input);
                response = await run(input);
            }
            if (!response) {
                console.error("Response is undefined or empty");
                setLoading(false);
                return;
            }
            let responseArray = response.split("**");
            let newResponse = "";
            for (let i = 0; i < responseArray.length; i++) {
                if (i === 0 || i % 2 !== 1) {
                    newResponse += responseArray[i];
                } else {
                    newResponse += `<b> ${responseArray[i]} </b>`;
                }
            }
            let newResponse2 = newResponse.split("*").join("</br>");
            //then set result data by response
            let newArrayResponse = newResponse2.split(" ");
            for (let i = 0; i < newArrayResponse.length; i++) {
                const nextWord = newArrayResponse[i];
                delayPara(i, nextWord + " ")
            }
        }
        catch (error) {
            console.error("Error fetching response:", error);
        } finally {
            // then stop animation
            setLoading(false);
            // then seting up
            setInput("")
        }
    };
    const contextValue = {
        recentPrompt,
        setRecentPrompt,
        prevPrompts,
        setPrevPrompts,
        showResult,
        setShowResult,
        loading,
        setLoading,
        resultData,
        setResultData,
        setInput,
        onSent,
        newChat,
    } // to access to this varibles in components {main,sidebar}
    return (
        <>
            <Context.Provider value={contextValue}>
                {props.children}
            </Context.Provider>
        </>
    )
}

export default ContextProvider;
