// var cookieParser = require("cookie-parser");
// const csrf = require("csrf");

// const bodyParser = require("body-parser");
const express = require("express");
// const admin = require("firebase-admin");

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
    // let imageURL = "";
    let url = req.params[0];
    // let url = `http://${req.params[0]}`;
    // let url = `http://${req.params[0].replace("-", ".")}`;
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
    // await page.setDefaultNavigationTimeout(0);
    await page.goto(url, {
      waitUntil: "networkidle2",
    });
    // await page.screenshot({
    //   path: "assets/img/screenshots/screenshot.png",
    // });
    let base64 = await page.screenshot({ encoding: "base64" });
    // console.log(base64);
    // const arr = toUint8Array(base64);
    // console.log(base64.length);

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

    // imgbbUploader(
    //   "5870fc99c75bf9d9dcb06e4ac0790e85",
    //   "assets/img/screenshots/screenshot.png"
    // )
    //   .then((response) => {
    //     console.log(response);
    //     console.log(`Handle success: ${response.url}`);
    //     res.send(response.url);
    //     return response.url;
    //   })

    //   .catch((error) => console.error(error));

    // res.send(imageURL);
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
    // console.log("hi from server");
    const { app } = useFirebaseServer();
    const cookies = require("cookie-universal")(req, res);
    // cookies.parseJSON = false;

    // console.log(req.body.idToken);
    // const idToken = cookies.get("Authorization");
    const idToken = req.body.idToken;
    // console.log(idToken);

    const expiresIn = 5 * 24 * 60 * 60 * 1000; // 5 дней
    try {
      const sessionCookie = await getAuth().createSessionCookie(idToken, {
        expiresIn,
      });

      // console.log("2222");
      // console.log(sessionCookie);

      const cookiesOptions = {
        maxAge: expiresIn,
        httpOnly: true,
        secure: true,
        path: "/",
      };

      // console.log(sessionCookie);
      // cookies.set("test", "test message", cookiesOptions);
      cookies.set("session", sessionCookie, cookiesOptions);
      // cookies.set("session", sessionCookie);
      // cookies.set("test", "test-body");
      // cookies.set("test2", "test-test-body", {
      //   httpOnly: true,
      //   secure: true,
      // });
      // cookies.set("test3", "test-test-body");
      // console.log("куки-ключ :" + cookies.get("session"));
      // console.log("куки-тест :" + cookies.get("test"));

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
    // console.log("req");
    // console.log(req.body);

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
