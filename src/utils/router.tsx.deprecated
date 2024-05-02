// @ts-nocheck erors here are just issues with types. If you truely have a syntax error report **AND YOU HAVE NOT TOUCHED THE CODE AT ALL** it in issues
import "dreamland/dev"
import Home from "../index";
import Settings from "../settings";
import NotFound from "../404";
import Credits from "../credits";

export default function LoadPage(page: string) {
    console.log(`Rendering: ${page}`);
    document.body.innerHTML = "";
    if (page === "home") {
        document.body.appendChild(<Home />);
    } else if (page === "settings") {
        document.body.appendChild(<Settings />);
    } else if (page === "credits") {
        document.body.appendChild(<Credits />);
    } else {
        document.body.appendChild(<NotFound />);
    }
    const svgs = document.getElementsByTagName("svg")
    for (let i = 0; i < svgs.length; i++) {
        svgs[i].outerHTML = svgs[i].outerHTML
    }
}