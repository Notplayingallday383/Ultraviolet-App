export default function Nav() {
    return (
        <div class="nav">
            <h1 class="left bold">Ultraviolet</h1>
            <div class="right">
                <h4 class="clickable" on:click={() => {window.location.href="/"}}>Home</h4>
                <h4 class="clickable" on:click={() => {window.location.href="/settings"}}>Settings</h4>
            </div>
        </div>
    )
}