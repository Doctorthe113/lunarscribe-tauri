import { useEffect } from "react";

export default function Writing(textProps) {
    const text = textProps.text_;
    const update_text = textProps.update_text_;

    useEffect(() => {
        document.getElementById("writer").value = text;
    }, []);

    useEffect(() => {
        document.getElementById("writer").value = text;
    }, [text]);

    return (
        <div
            className="flex w-screen flex-grow justify-center bg-bgColor p-3 font-jetBrainsMonoNerd shadow-titlebar"
            id="writing"
        >
            <textarea
                id="writer"
                className="w-full resize-none bg-bgColor outline-none"
                spellCheck="false"
                autoComplete="off"
                onFocus={(e) => update_text(e.target.value)}
                onBlur={(e) => update_text(e.target.value)}
            />
        </div>
    );
}
