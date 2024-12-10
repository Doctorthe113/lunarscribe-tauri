import { useEffect, useState } from "react";
import { open } from "@tauri-apps/plugin-dialog";
import { readTextFile, writeTextFile } from "@tauri-apps/plugin-fs";
import { getCurrentWindow } from "@tauri-apps/api/window";

import "./App.css";

// component imports
import Writing from "./components/writing";
import Preview from "./components/preview";
import CustomExcalidraw from "./components/customExcalidraw";

// icons
import {
    CheckMark,
    Circle,
    Draw,
    EditBox,
    Menu,
    Open,
    Save,
    TextIcon,
    Visible,
} from "./icons/icons";

// for handling window dragging
const appWindow = getCurrentWindow();
const handle_dragging_window = (e) => {
    if (e.buttons === 1) {
        e.detail === 2
            ? appWindow.toggleMaximize() // Maximize on double click
            : appWindow.startDragging(); // Else start dragging
    }
};

export default function App() {
    const [titleBar, setTitleBar] = useState("unsaved"); // title of the window
    const [text, setText] = useState(""); // the text
    const [path, setPath] = useState(""); // location of the directory
    const [isPreview, setIsPreview] = useState(false);
    const [isExcalidraw, setIsExcalidraw] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState("");

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
            await open_dir();
        } else {
            await writeTextFile(`${path}/text.md`, text_);
        }
    };

    // reads from a file
    const read_text = async (path_) => {
        const readText = await readTextFile(path_);
        setText(readText);
    };

    // opens a directory
    const open_dir = async () => {
        const openedPath = await open({
            directory: true,
            multiple: false,
        });
        localStorage.setItem("currentFilePath", openedPath);
        setTitleBar(openedPath.split("/").pop());
        setPath(openedPath);
        try {
            await read_text(`${openedPath}/text.md`);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const currentFilePath = localStorage.getItem("currentFilePath");
        const wasPreview = localStorage.getItem("wasPreview");

        if (currentFilePath !== null) {
            const fetchText = async () => {
                try {
                    await read_text(`${currentFilePath}/text.md`);
                    setPath(currentFilePath);
                    setTitleBar(currentFilePath.split("/").pop());
                } catch (error) {
                    localStorage.removeItem("currentFilePath");
                    console.log(error);
                }
            };
            fetchText();
        }

        if (wasPreview == "true") {
            setIsPreview(true);
        }
    }, []);

    //TODO
    useEffect(() => {
        localStorage.setItem("wasPreview", isPreview);
    }, [isPreview]);

    return (
        <main className="flex h-screen w-screen flex-col items-center justify-start text-fontColor bg-opacity-100">
            <div
                data-tauri-drag-region
                className="sticky z-5 flex h-7 w-screen items-center justify-between bg-titleBgColor px-1 text-center font-montserrat shadow-titlebar"
                id="titlebar"
                onMouseDown={handle_dragging_window}
            >
                <span
                    className="flex h-full flex-1 items-center justify-start"
                    id="nav-btn"
                >
                    <button title="Open the menu" className="btn">
                        <Menu />
                    </button>
                    <button
                        title="Open a directory"
                        className="btn"
                        onClick={open_dir}
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
                <span
                    className="mx-auto flex h-full items-center justify-center text-titleBarColor select-none"
                    id="title"
                >
                    {titleBar}
                </span>
                <span
                    className="flex h-full flex-1 items-center justify-end"
                    id="window-btn"
                >
                    <button
                        title="Minimizes the window"
                        className="btn text-green hover:bg-green"
                        onClick={() => appWindow.minimize()}
                    >
                        <Circle />
                    </button>
                    <button
                        title="Maximizes the window"
                        className="btn text-peach hover:bg-peach"
                        onClick={() => appWindow.maximize()}
                    >
                        <Circle />
                    </button>
                    <button
                        title="Close the window"
                        className="btn text-red hover:bg-red"
                        onClick={() => appWindow.close()}
                    >
                        <Circle />
                    </button>
                </span>
            </div>
            {isExcalidraw
                ? <CustomExcalidraw path={path} />
                : isPreview
                ? <Preview text_={text} />
                : <Writing text_={text} update_text_={update_text} />}
            {/* <div className="w-screen sticky h-4 bg-titleBgColor border-t-[1px] px-3 border-accent" id="statusbar">
                <span className="text-xs"> {isSaving ? "Saving..." : "Saved successfully"}</span>
            </div> */}
        </main>
    );
}
