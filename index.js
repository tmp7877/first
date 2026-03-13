const express = require("express");
const puppeteer = require("puppeteer");

const app = express();
const PORT = 3000;

const EMAIL = "ronicyt69@gmail.com";
const PASSWORD = "Welight%45";

let browser;
let page;

// health route
app.get("/", (req, res) => {
  res.send("server running");
});

async function startTask() {

  console.log("⛏️ Starting Task...");

  try {

    console.log("🚀 Launching browser");

    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu"
      ]
    });

    page = await browser.newPage();

    console.log("🌐 Opening page");

    await page.goto("https://rhinocoin.app/miner", {
      waitUntil: "networkidle2",
      timeout: 60000
    });

    console.log("⌛ Waiting for login");

    await page.waitForSelector("#input-v-5");

    console.log("🔑 Typing credentials");

    await page.type("#input-v-5", EMAIL, { delay: 50 });
    await page.type("#input-v-8", PASSWORD, { delay: 50 });

    await page.keyboard.press("Enter");

    console.log("✅ Login submitted");

    await new Promise(resolve => setTimeout(resolve, 5000));

    console.log("🔍 Searching button");

    await page.evaluate(() => {

      const span = [...document.querySelectorAll("span")]
        .find(el => el.textContent && el.textContent.includes("Start Miner"));

      if (span) span.click();

    });

    console.log("⛏️ Task started");

  } catch (err) {

    console.log("❌ Task error:", err);

    if (browser) await browser.close();

  }
}

app.listen(PORT, async () => {

  console.log(`🚀 Server running on port ${PORT}`);

  // start automatically
  startTask();

});
//manual auto deploy trigger commit
