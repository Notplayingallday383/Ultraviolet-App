import "./main.css";
import { loadSettings } from "./utils/settings.ts";
import Nav from "./components/nav.tsx"
import Footer from "./components/footer.tsx";

export default function Home() {
    loadSettings()
    return (
        <div>
            <Nav />
            <div class="home">
                <img src="uv.png" width="150" height="150"></img>
                <h1 class="bold">Ultraviolet</h1>
                <input id="search" class="search" placeholder="Search the web"></input>
            </div>
            <Footer />
        </div>
    )
}

window.addEventListener("load", () => {
    document.body.appendChild(<Home />);
    // inline svg namespace workaround. breaks click events but whatever
    const svgs = document.getElementsByTagName("svg")
    for (let i = 0; i < svgs.length; i++) {
        // eslint-disable-next-line no-self-assign
        svgs[i].outerHTML = svgs[i].outerHTML
    }
});