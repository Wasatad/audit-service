export default async function (context) {
  if (process.server) {
    let cookieRes = context.$cookies.get("session");
    const cookies = require("cookie-universal")(context.req, context.res);

    const response = await fetch("http://localhost:3000/api/checkauthstatus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionCookie: cookieRes }),
    });
    const data = await response.json();
    if (data.statusCode === 401) {
      console.log("error 401");
      return context.redirect("/login");
    }
  }
}
