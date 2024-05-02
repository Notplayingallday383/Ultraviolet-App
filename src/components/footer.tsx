export default function Footer() {
    return (
        <div class="footer">
            <div class="left">
                <h2>Powered by UV-App</h2>
                <ul>
                    <li class="clickable" on:click={() => {window.location.href="/credits"}}>View Credits</li>
                    <li class="clickable" on:click={() => {window.location.href="/license"}}>View License</li>
                </ul>
            </div>
            <div class="right">
                <h3>&copy; Copyright 2024 Titanium Network</h3>
            </div>
        </div>
    )
}