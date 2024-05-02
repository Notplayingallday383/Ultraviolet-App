import Footer from "./components/footer";
import Nav from "./components/nav";

export default function NotFound() {
    return (
        <div>
            <Nav />
            <div class="home">
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <button class="clickable" on:click={() => {window.location.href="/"}}>Back to Home?</button>
            </div>
            <Footer />
        </div>
    )
}