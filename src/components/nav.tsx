import LoadPage from "../utils/router";

export default function Nav() {
    return (
        <div class="nav">
            <h1 class="left bold">Ultraviolet</h1>
            <div class="right">
                <h4 class="clickable" on:click={() => {LoadPage("home")}}>Home</h4>
                <h4 class="clickable" on:click={() => {LoadPage("settings")}}>Settings</h4>
            </div>
        </div>
    )
}