import Footer from "./components/footer"
import Nav from "./components/nav"
import { loadSettings } from "./utils/settings"

export default function Settings() {
    loadSettings()
    return (
        <div>
            <Nav />
            <h1>Soon :tm:</h1>
            <Footer />
        </div>
    )
}