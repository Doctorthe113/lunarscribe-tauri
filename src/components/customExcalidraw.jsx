import { useState } from "react";
import { Excalidraw, MainMenu } from "@excalidraw/excalidraw";
import { open } from "@tauri-apps/plugin-dialog";
import { readTextFile, writeTextFile } from "@tauri-apps/plugin-fs";

export default function CustomExcalidraw(pathProps) {
    const [excalidrawAPI, setExcalidrawAPI] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const filePath = `${pathProps.path}/drawing.excalidraw`;

    // this is to get rid of empty objects inside of appState
    const prep_app_state = (appState) => {
        const copyAppState = { ...appState };

        Object.keys(appState).forEach((key) => {
            if (typeof copyAppState[key] != "object") {
                //
            } else if (copyAppState[key] === null) {
                delete copyAppState[key];
            } else if (Object.keys(copyAppState[key]).length === 0) {
                delete copyAppState[key];
            }
        });
        return copyAppState;
    };

    const save_file = async () => {
        try {
            if (filePath) {
                // preps the appState
                const appState = prep_app_state(excalidrawAPI.getAppState());
                const saveData = JSON.stringify({
                    type: "excalidraw",
                    version: 2,
                    source: "Lunarscribe - Tauri",
                    elements: excalidrawAPI.getSceneElements(),
                    appState: appState,
                    files: excalidrawAPI.getFiles(),
                });

                await writeTextFile(filePath, saveData);
                console.log("Drawing saved successfully");
            }
        } catch (error) {
            console.log("Error saving drawing:", error);
        }
    };

    // reads the .excalidraw file and updates the scene
    const read_file = async (path_) => {
        const readExcaliJson = await readTextFile(path_);
        excalidrawAPI.updateScene({
            elements: JSON.parse(readExcaliJson).elements,
            appState: JSON.parse(readExcaliJson).appState,
            files: JSON.parse(readExcaliJson).files,
        });
    };

    // for opening any new documents
    const open_file = async () => {
        try {
            // Open file dialog
            const filePath = await open({
                filters: [
                    {
                        name: "Excalidraw",
                        extensions: ["excalidraw"],
                    },
                ],
            });

            if (filePath) {
                await read_file(filePath);
            }
        } catch (error) {
            console.error("Error loading drawing:", error);
        }
    };

    // for some reason the excalidraw api won't update the scene immidiately hence the delay
    if (excalidrawAPI && !isLoaded) {
        setIsLoaded(true);
        setTimeout(() => read_file(filePath), 10);
    }

    return (
        <div
            className="flex w-screen flex-grow justify-center overflow-y-scroll bg-bgColor p-3 font-montserrat shadow-titlebar"
            onFocus={save_file}
            onBlur={save_file}
        >
            <Excalidraw
                excalidrawAPI={(api) => setExcalidrawAPI(api)}
                theme="dark"
            >
                <MainMenu>
                    <MainMenu.Item onClick={open_file}>Open</MainMenu.Item>
                    <MainMenu.Item onClick={save_file}>Save</MainMenu.Item>
                </MainMenu>
            </Excalidraw>
        </div>
    );
}
