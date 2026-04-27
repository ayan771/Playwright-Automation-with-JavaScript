const { test, expect } = require('@playwright/test');

test.only('Web Automation' , async ({ page }) =>
{
    const products = page.locator(".card-body")
    const productName = "ZARA COAT 3"
    const email = "ayan@example.com"
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").type("Ayan@123");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
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
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('Zara Coat 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
    await page.locator('.field input.txt').nth(0).fill("");
    await page.locator('.field input.txt').nth(0).fill("7894 1234 2245 9696");
    await page.locator('.input.ddl').nth(0).selectOption({ label: '04' });
    await page.locator('.input.ddl').nth(1).selectOption({ label: '30' });
    await page.locator('.field input.txt').nth(1).fill("ABC");
    await page.locator('.field input.txt').nth(2).fill("Ayan");
    await page.locator('.field input.txt').nth(3).fill("rahulshettyacademy");
    await page.locator('.btn.btn-primary.mt-1').click();
    await page.locator("[placeholder*='Select Country']").click();
    await page.locator("[placeholder*='Select Country']").pressSequentially("ind");
    const dropdown = page.locator('.ta-results');
    await dropdown.waitFor();
    const optionCount = await dropdown.locator("button").count();
    for(let i = 0; i < optionCount; ++i)
    {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text === " India")
        {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator('.btnn').click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const rawOrderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    const cleanOrderId = rawOrderId.match(/[a-z0-9]+/i)[0];
    console.log(cleanOrderId);
    await page.locator(".btn.btn-custom[routerlink='/dashboard/myorders']").click();

    await page.locator("[scope='row']").first().waitFor();
    const orders = await page.locator("[scope='row']");
    const orderIdPrint = await page.locator("[scope='row']").allTextContents();
    console.log(orderIdPrint);


    const orderCount = await orders.count();
    for (let j = 0; j < orderCount; ++j)
    {
        if( await orders.nth(j).textContent() === cleanOrderId)
        {
            await page.locator("tbody .ng-star-inserted .btn").nth(j).click();
            break;
        }
    };   
    await page.pause();
});