
/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

import {GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const apiKey = "AIzaSyAtLq5WsOf7fFxDMGUqilN-fFtpvmg3j4s";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

async function run(prompt) {
    console.log("The type prompt :",typeof prompt , "The prompt",prompt ,"\n");

    const chatSession = model.startChat({
        generationConfig,
        // safetySettings: Adjust safety settings
        // See https://ai.google.dev/gemini-api/docs/safety-settings
        history: [],
    });

    console.log("\n The chatSession :",chatSession);
    // تحقق مما اذا كانت الجلسة صحيحة
    try {
        const result = await chatSession.sendMessage(prompt);
        console.log(result.response.text());
        
        //Show result ask ( respons )
        return result.response.text();
    }catch (error){
        console.error("Emad Error Sending message:" , error);
    };
}

export default run;