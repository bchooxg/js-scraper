const { By, Key, Builder } = require("selenium-webdriver");
require("chromedriver");

async function main() {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get(
    "https://www.royalcaribbean.com/sgp/en/cruises/?departureCode_SIN=true"
  );

  // Fetch a list of cards
  const list = await driver.findElements(By.tagName("itinerary-card"));
  const CATERGORIES = ["Interior", "Outside View", "Balcony", "Suites"];

  // Loop though item in the list of cards
  try {
    for (let n of list) {
      let text = await n.getText();
      text = text.split("\n");
      let nights = text[0];
      let destination = text[1];
      let ship = text[3].split(" onboard ")[1];
      await n.click();

      console.log(`${nights} - ${destination} - ${ship}`);

      let categoryMap = {};

      CATERGORIES.forEach((category) => {
        // If not the first option click on the relevant link
        if (category != "Interior") {
          let elementIndex = 0;

          switch (category) {
            case "Outside View":
              elementIndex = 1;
              break;
            case "Balcony":
              elementIndex = 2;
              break;
            case "Suites":
              elementIndex = 3;
              break;
          }

          let labels = driver.findElement(By.className("mat-tab-labels"));
          let labelList = labels.findElement(By.tagName("div"));

          labelList[elementIndex].click();
        }

        let priceMap = {};
        let cards = driver.findElements(
          By.className("itinerary-panel-sailings-list-item")
        );
        for (let c of cards) {
          let cardText = c.getText();
          cardText = cardText.split("\n");
          let price = cardText[cardText.length - 2];
          let date = cardText[cardText.length - 3];
          priceMap[date] = price;
        }

        categoryMap[category] = priceMap;
      });
    }
  } catch (err) {
    console.log(err);
  }

  // Closes Driver
  setInterval(() => {
    driver.quit();
  }, 3000);
}
main();
