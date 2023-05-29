const express = require("express");
const puppeteer = require("puppeteer");

const imgbbUploader = require("imgbb-uploader");
const toUint8Array = require("base64-to-uint8array");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

import useFirebaseServer from "../assets/firebase/firebaseServer";
import { getAuth } from "firebase-admin/auth";

app.get("/test/*", async function (req, res) {
  try {
    let url = req.params[0];
    const browser = await puppeteer.launch({
      defaultViewport: {
        width: 1200,
        height: 1200,
      },
      headless: true,
      args: [
        "--no-sandbox",
        "--aggressive-cache-discard",
        "--disable-cache",
        "--disable-application-cache",
        "--disable-offline-load-stale-cache",
        "--disable-gpu-shader-disk-cache",
        "--media-cache-size=0",
        "--disk-cache-size=0",
      ],
    });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 5.1; rv:5.0) Gecko/20100101 Firefox/5.0"
    );
    await page.goto(url, {
      waitUntil: "networkidle2",
    });

    let base64 = await page.screenshot({ encoding: "base64" });

    function timeout(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    if (base64.length < 100000) {
      async function makeScreenshot() {
        await timeout(4000);
        base64 = await page.screenshot({ encoding: "base64" });
        await browser.close();

        res.send(base64);
      }
      makeScreenshot();
    } else {
      await browser.close();

      res.send(base64);
    }
  } catch (e) {
    console.log(e);
  }
});

app.get("/logout", async function (req, res) {
  try {
    const cookies = require("cookie-universal")(req, res);
    cookies.remove("session", { path: "/" });
    res.send({
      statusCode: 200,
      body: JSON.stringify({ status: "success" }),
    });
  } catch (e) {
    console.log(e);
  }
});

app.post("/login", async function (req, res) {
  try {
    const { app } = useFirebaseServer();
    const cookies = require("cookie-universal")(req, res);

    const idToken = req.body.idToken;

    const expiresIn = 5 * 24 * 60 * 60 * 1000; // 5 дней
    try {
      const sessionCookie = await getAuth().createSessionCookie(idToken, {
        expiresIn,
      });

      const cookiesOptions = {
        maxAge: expiresIn,
        httpOnly: true,
        secure: true,
        path: "/",
      };
      cookies.set("session", sessionCookie, cookiesOptions);

      res.send({
        statusCode: 200,
        body: JSON.stringify({ status: "success" }),
      });
    } catch (e) {
      console.log("error", e);
      res.status(401);
    }
  } catch (e) {
    console.log(e);
    res.status(401);
  }
});

app.post("/checkauthstatus", async function (req, res) {
  try {
    const { app } = useFirebaseServer();
    const cookies = require("cookie-universal")(req, res);

    const sessionCookie = req.body.sessionCookie;

    try {
      const claim = await getAuth().verifySessionCookie(sessionCookie);
      res.send({
        statusCode: 200,
        claim: claim,
      });
    } catch (e) {
      console.log("error", e);
      res.send({
        statusCode: 401,
      });
    }
  } catch (e) {
    console.log("error", e);
    res.send({
      statusCode: 401,
    });
  }
});

export default {
  path: "/api",
  handler: app,
};
