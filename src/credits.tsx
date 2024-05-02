import Footer from "./components/footer";
import Nav from "./components/nav";

export default function Credits() {
    return (
        <div>
            <Nav />
            <div class="home">
                <h1>Ultraviolet-App</h1>
                <hr></hr>
                <h3>Ultraviolet-App is made possible with the following Open Source software: </h3>
                <ul>
                    <li>bare-as-module3</li>
                    <li>bare-mux</li>
                    <li>libcurl-transport</li>
                    <li>epoxy-transport</li>
                    <li>Vite</li>
                    <li>AliceJS</li>
                </ul>
                <p class="clickable" on:click={() => {window.location.href="/license"}}>Licensed Under the MIT License. Click this to read it.</p>
                <p>&copy; Copyright 2024 Titanium Network</p>
            </div>
            <Footer />
        </div>
    )
}