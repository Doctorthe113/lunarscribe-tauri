import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";

import "../katex.css";

export default function Preview(text_) {
    const text = text_.text_;

    // prettier-ignore
    const parser = (text) => {
        // removes potentially dangerous tags
        const filteredScriptTag = text.replace(
            /<script\s+src="[^"]*"\s*><\/script>/gi,
            "",
        );
        const filteredImgTag = filteredScriptTag.replace(
            /<img\s+src="[^"]*"\s*>/gi,
            "",
        );
        const filterInputTag = filteredImgTag.replace(
            /<input\s+type="text"\s*>/gi,
            "",
        );
        const filterIframeTag = filterInputTag.replace(
            /<iframe\s+src="[^"]*"\s*><\/iframe>/gi,
            "",
        );
        const filterAnchorTag = filterIframeTag.replace(
            /<a\s+href="[^"]*"\s*><\/a>/gi,
            "",
        );

        // turns newlines inside backticks to something placeholder
        const firstNewLineParse = filterAnchorTag.replace(
            /```(?:[^`]*?\n[^`]*?)```\n/g,
            (match) => {
                return match.replace(/\n/g, "<placeholder129321414>");
            },
        );
        // replaces all the other newlines to br tags
        const secondNewLineParse = firstNewLineParse.replace(/\n/g, "<br>\n\n");
        // replaces the <placeholder129321414> back into newlines
        const thirdNewLineParse = secondNewLineParse.replace(
            /<placeholder129321414>/g,
            "\n",
        );

        // why do it like this? i have no fucking clue. This is the simplest way i can think of doing it.
        // If you have a better way of doing this, please tell me.

        // converts {<summary> text} into <details><summary>summary</summary>text</details>
        const collapsedTextConverted = thirdNewLineParse.replace(
            /\{\<\>(.*?)\}|\{\<(.*?)\>(.*?)\}/g,
            (_match, p1, p2, p3) => {
                if (p1 !== undefined) {
                    return `<details><summary></summary><div className="ml-5">${p1}</div></details>`;
                } else if (p2 !== undefined && p3 !== undefined) {
                    return `<details><summary>${p2}</summary><div className="ml-5">${p3}</div></details>`;
                }
                return "<details><summary></summary></details>";
            },
        );

        return collapsedTextConverted;
    };

    return (
        <div
            className="flex w-screen flex-grow justify-center overflow-hidden overflow-y-scroll bg-bgColor p-3 font-sourgummy font-medium shadow-titlebar"
            id="preview"
        >
            <Markdown
                className="w-full h-full resize-none bg-bgColor overflow-scroll outline-none"
                children={parser(text)}
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex, rehypeRaw]}
            />
        </div>
    );
}
