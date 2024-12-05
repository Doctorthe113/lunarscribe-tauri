import { useState } from "react";
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import { open, save } from "@tauri-apps/api/dialog";
import { readTextFile, writeTextFile } from "@tauri-apps/api/fs";

const ExcalidrawTauriComponent = (pathProps) => {
    const [excalidrawAPI, setExcalidrawAPI] = useState(null);
    const [elements, setElements] = useState([]);
    const [appState, setAppState] = useState({});
    const [files, setFiles] = useState({});
    const filePath = pathProps.path;

    const handleSave = async () => {
        try {
            if (filePath) {
                // Prepare save data
                const saveData = JSON.stringify({
                    type: "excalidraw",
                    version: 2,
                    source: "Tauri React App",
                    elements: elements,
                    appState: appState,
                    files: files,
                });

                // Write file
                await writeTextFile(filePath, saveData);
                console.log("Drawing saved successfully");
            }
        } catch (error) {
            console.error("Error saving drawing:", error);
        }
    };

    const handleLoad = async () => {
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
                // Read file
                const fileContents = await readTextFile(filePath);
                const loadedData = JSON.parse(fileContents);

                // Restore drawing state
                if (excalidrawAPI) {
                    excalidrawAPI.updateScene({
                        elements: loadedData.elements,
                        appState: loadedData.appState,
                        files: loadedData.files,
                    });

                    // Update local state (optional, but can be useful)
                    setElements(loadedData.elements);
                    setAppState(loadedData.appState);
                    setFiles(loadedData.files);
                }
            }
        } catch (error) {
            console.error("Error loading drawing:", error);
        }
    };

    return (
        <div className="h-screen w-full">
            <div className="flex justify-between bg-gray-100 p-2">
                <button
                    onClick={handleSave}
                    className="rounded bg-blue-500 px-4 py-2 text-white"
                >
                    Save Drawing
                </button>
                <button
                    onClick={handleLoad}
                    className="rounded bg-green-500 px-4 py-2 text-white"
                >
                    Load Drawing
                </button>
            </div>

            <Excalidraw
                ref={(api) => setExcalidrawAPI(api)}
                onChange={(elements, state, files) => {
                    setElements(elements);
                    setAppState(state);
                    setFiles(files);
                }}
            >
                <MainMenu>
                    <MainMenu.DefaultItems.LoadScene onSelect={handleLoad} />
                    <MainMenu.DefaultItems.SaveScene onSelect={handleSave} />
                </MainMenu>
                <WelcomeScreen>
                    <WelcomeScreen.Hints.ToolbarHint />
                    <WelcomeScreen.Hints.MenuHint />
                    <WelcomeScreen.Center>
                        <WelcomeScreen.Center.Logo />
                        <WelcomeScreen.Center.Heading>
                            Welcome to Excalidraw in Tauri
                        </WelcomeScreen.Center.Heading>
                    </WelcomeScreen.Center>
                </WelcomeScreen>
            </Excalidraw>
        </div>
    );
};

export default ExcalidrawTauriComponent;
