import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {
    const [titleBar, settitleBar] = useState("Hello");

    async function greet() {
        // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
        setGreetMsg(await invoke("greet", { name }));
    }

    return (
        <main className="flex justify-center">
            <div className="font-montserrat container block bg-white text-center font-bold" id="titlebar">
                {titleBar}
            </div>
        </main>
    );
}

export default App;
