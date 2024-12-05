import { useEffect, useState } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import { open, save } from "@tauri-apps/plugin-dialog";
import {
    BaseDirectory,
    readTextFile,
    writeTextFile,
} from "@tauri-apps/plugin-fs";

import "./App.css";

// component imports
import Writing from "./components/writing";
import Preview from "./components/preview";

// icons
import {
    Draw,
    EditBox,
    Menu,
    Open,
    Save,
    TextIcon,
    Visible,
} from "./icons/icons";

export default function App() {
    const [titleBar, setTitleBar] = useState("unsaved");
    const [text, setText] = useState("");
    const [path, setPath] = useState("");
    const [isPreview, setIsPreview] = useState(false);
    const [isExcalidraw, setIsExcalidraw] = useState(false);

    // updates the text and saves in the state hook here
    const update_text = (text_) => {
        if (path) {
            save_text(text_);
        }
        setText(text_);
    };

    // saves the text
    const save_text = async (text_) => {
        if (titleBar === "unsaved") {
            const savedPath = await save({
                filters: [
                    {
                        name: "Markdown",
                        extensions: ["md"],
                    },
                ],
                defaultPath: BaseDirectory.Document + "/" + titleBar,
            });
            localStorage.setItem("currentFilePath", savedPath);
            await writeTextFile(savedPath, text_);

            setTitleBar(savedPath.split("/").pop());
            setPath(savedPath);
        } else {
            await writeTextFile(path, text_);
        }
    };

    // reads from a file
    const read_file = async (path_) => {
        const readText = await readTextFile(path_);
        return readText;
    };

    // opens a file
    const open_file = async () => {
        const openedPath = await open({
            filters: [
                {
                    name: "Markdown",
                    extensions: ["md"],
                },
            ],
            multiple: false,
        });
        const readFile = await read_file(openedPath);
        localStorage.setItem("currentFilePath", openedPath);

        setText(readFile);
        setTitleBar(openedPath.split("/").pop());
        setPath(openedPath);
    };

    useEffect(() => {
        const currentFilePath = localStorage.getItem("currentFilePath");
        if (currentFilePath !== null) {
            const fetchText = async () =>
                setText(await read_file(currentFilePath));
            setTitleBar(currentFilePath.split("/").pop());
            setPath(currentFilePath);
            fetchText();
        }
    }, []);

    return (
        <main className="flex h-screen w-screen flex-col items-center justify-start text-fontColor">
            <div
                className="sticky z-10 flex h-max w-screen max-w-4xl items-center justify-between bg-bgColor px-1 text-center font-montserrat shadow-titlebar"
                id="titlebar"
            >
                <span className="flex h-full flex-1 items-center justify-start">
                    <button title="Open the menu" className="btn">
                        <Menu />
                    </button>
                    <button
                        title="Open a file"
                        className="btn"
                        onClick={open_file}
                    >
                        <Open />
                    </button>
                    <button
                        title="Save this unsaved file"
                        className="btn"
                        onClick={() => save_text(text)}
                    >
                        <Save />
                    </button>
                </span>
                <span className="mx-auto flex h-full items-center justify-center text-titleBarColor">
                    {titleBar}
                </span>
                <span className="flex h-full flex-1 items-center justify-end">
                    <button
                        title="Toggle excalidraw"
                        className="btn"
                        onClick={() => setIsExcalidraw(!isExcalidraw)}
                    >
                        {isExcalidraw ? <Draw /> : <TextIcon />}
                    </button>
                    <button
                        title="Toggle preview/edit mode"
                        className="btn"
                        onClick={() => setIsPreview(!isPreview)}
                    >
                        {isPreview ? <Visible /> : <EditBox />}
                    </button>
                </span>
            </div>
            {isExcalidraw
                ? (
                    <div className="flex w-screen max-w-4xl flex-grow justify-center bg-bgColor p-3 shadow-titlebar">
                        <Excalidraw theme="dark" />
                    </div>
                )
                : isPreview
                ? <Preview text_={text} />
                : <Writing text_={text} update_text_={update_text} />}
        </main>
    );
}
