import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

// component imports
import Writing from "./components/writing";

function App() {
    const [titleBar, settitleBar] = useState("Hello");

    async function greet() {
        // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
        setGreetMsg(await invoke("greet", { name }));
    }

    return (
        <main className="text-fontColor flex h-screen w-screen flex-col items-center justify-start">
            <div className="font-ndot bg-titleBgColor shadow-titlebar z-10 w-screen py-1 text-center text-sm font-bold" id="titlebar">
                {titleBar}
            </div>
            <Writing />
        </main>
    );
}

export default App;
