const { test, expect } = require('@playwright/test');

test('Web Automation' , async ({ page }) =>
{
    const products = page.locator(".card-body")
    const productName = "ZARA COAT 3"
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("ayan@example.com");
    await page.locator("#userPassword").type("Ayan@123");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles); 
    const productCount = await products.count();
    for(let i = 0; i < productCount; ++i)
    {
            if (await products.nth(i).locator("b").textContent() == productName)
            {
                await products.nth(i).locator("text = Add To Cart").click();
                break;
            }
    }

    
});