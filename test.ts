const {By, Key, Builder} = require("selenium-webdriver")
require ("chromedriver")

async function main(){
  let driver = await new Builder().forBrowser('chrome').build();
  await driver.get('https://www.royalcaribbean.com/sgp/en/cruises/?departureCode_SIN=true')
  
  
  // Fetch a list of cards
  const list =  await driver.findElements(By.tagName('itinerary-card'));
  const CATERGORIES = ['interior', 'Outside View', 'Balcony', 'Suites'];
  
  // Loop though item in the list of cards 
  for(let n of list){
    let text = await n.getText()
    text = text.split("\n")
    let nights = text[0]
    let destination = text[1]
    let ship = text[3].split(' onboard ')[1]
    console.log(`${nights} - ${destination} - ${ship}`)
    n.click()
    
    CATERGORIES.forEach((category)=>{
      // get element for 
    })
    
  }
  

  // Closes Driver 
  setInterval(() => {driver.quit()}, 3000 )
  
  
}
main();