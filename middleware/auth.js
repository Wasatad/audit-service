export default async function (context) {
  if (process.server) {
    let cookieRes = context.$cookies.get("session");
    const cookies = require("cookie-universal")(context.req, context.res);
    // let c = cookies.get("session");
    // console.log(c);
    // console.log("cookieResss: " + cookieRes);
    // console.log('context.$cookies.get("session")' + cookieRes);
    // if (cookieRes) {
    const response = await fetch(
      "http://localhost:3000/api/checkauthstatus",
      // "http://192.168.31.223:3000/api/checkauthstatus", Мой локальный
      // "https://80.87.110.223:3000/api/checkauthstatus",
      {
        method: "POST",
        // body: cookieRes,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionCookie: cookieRes }),
      }
    );
    const data = await response.json();
    if (data.statusCode === 401) {
      console.log("error 401");
      return context.redirect("/login");
    }
    // } else {
    //   return context.redirect("/login");
    // }
  }
}
