/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { request, response } from "express";
import { createServer } from "node:http";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import cookieParser from "cookie-parser";
import wisp from "wisp-server-node";
// @ts-expect-error no thank you TS
import { libcurlPath } from "@mercuryworkshop/libcurl-transport"
// @ts-expect-error no thank you TS
import { baremuxPath } from "@mercuryworkshop/bare-mux";
// @ts-expect-error no thank you TS
import { epoxyPath } from "@mercuryworkshop/epoxy-transport";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { Socket, Head } from "ws";
import config from "dotenv";

config.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(cookieParser());

const masqrCheck = process.env.MASQR && process.env.MASQR.toLowerCase() === "true";
if (masqrCheck) {
  console.log(`Masqr is Enabled`);
} else {
  console.log(`Masqr is Disabled`);
}

async function MasqFail(req, res) {
  if (!req.headers.host) {
    return;
  }
  const unsafeSuffix = req.headers.host + ".html";
  const safeSuffix = path.normalize(unsafeSuffix).replace(/^(\.\.(\/|\\|$))+/, "");
  const safeJoin = path.join(process.cwd() + "/Masqrd", safeSuffix);
  try {
    await fs.promises.access(safeJoin);
    const failureFileLocal = await fs.promises.readFile(safeJoin, "utf8");
    res.setHeader("Content-Type", "text/html");
    res.send(failureFileLocal);
    return;
  } catch (e) {
    res.setHeader("Content-Type", "text/html");
    res.send(fs.readFileSync("fail.html", "utf8"));
    return;
  }
}

if (masqrCheck) {
  app.use(async (req, res, next) => {
    // @ts-expect-error stfu
    if (req.headers.host && process.env.WHITELISTED_DOMAINS.includes(req.headers.host)) {
      next();
      return;
    }
    if (req.url.includes("/wisp")) {
      next();
      return;
    }
    const authheader = req.headers.authorization;
    if (req.cookies["authcheck"]) {
      next();
      return;
    }
    if (req.cookies['refreshcheck'] != "true") {
      res.cookie("refreshcheck",  "true",  {maxAge: 10000})
      MasqFail(req, res) 
      return;
    }
    if (!authheader) {   
      res.setHeader('WWW-Authenticate', 'Basic');
      res.status(401);
      MasqFail(req, res) 
      return;
    }

    const auth = Buffer.from(authheader.split(' ')[1],'base64').toString().split(':');
    const user = auth[0];
    const pass = auth[1];
    const licenseCheck = ((await (await fetch(process.env.LICENSE_SERVER_URL + pass + "&host=" + req.headers.host)).json()))["status"]
    console.log(`\x1b[0m${process.env.LICENSE_SERVER_URL}${pass}&host=${req.headers.host} ` + `returned: ${licenseCheck}`)
    if (licenseCheck == "License valid") {
        res.cookie("authcheck", "true", {expires: new Date((Date.now()) + (365*24*60*60 * 1000))})
        res.send(`<script> window.location.href = window.location.href </script>`)
        return;
    }  
    MasqFail(req, res)
    return; 
  });
}

app.use(
  express.static("dist", {
    setHeaders: (res, path) => {
      if (path.endsWith(".cjs")) {
        res.setHeader("Content-Type", "text/javascript");
      }
    }
  })
);
app.use("/libcurl/", express.static(libcurlPath));
app.use("/baremux/", express.static(baremuxPath));
app.use("/epoxy/", express.static(epoxyPath));
app.use("/uv/", express.static(uvPath))
const server = createServer();

server.on("request", (req: Request, res: Response) => {
  app(req, res);
});

server.on("upgrade", (req: Request, socket: Socket, head: Head) => {
  if (req.url.endsWith("/wisp/")) {
    wisp.routeRequest(req, socket, head);
  }
});

const port = parseInt(process.env.PORT || "8080");
server.listen(port, () => {
  console.log('Welcome to Ultraviolet!')
  console.log(`Ultraviolet is running on port: ${port}`)
});

process.on("SIGINT", () => {
  console.log("\x1b[0m");
  process.exit();
});