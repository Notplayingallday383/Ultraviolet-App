import { Route } from "dreamland-router"; 
import Notfound from "./404";
import Home from "./index"
import Settings from "./settings"
import Credits from "./credits";

export const router = (
    <Route path="/">
        <Route path="" show={<Home />} />
        <Route path="settings" show={<Settings />} />
        <Route path="credits" show={<Credits />} />
        <Route regex path=".*" show={<Notfound />} />
    </Route>
).$
  
router.render(document.querySelector('.app'));