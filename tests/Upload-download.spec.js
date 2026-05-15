const ExcelJs = require('exceljs');
const { test, expect } = require('@playwright/test')

async function writeExcel(searchText,replaceText,change,filePath) {
    
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = readExcel(worksheet,searchText);
    const cell = worksheet.getCell(output.row, output.column + change.colChange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);
}

function readExcel(worksheet,searchText)
{   
    let output = { row: -1, column: -1 }
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                output = {row : rowNumber , column : colNumber};
            }
        })
    })
    return output;
}

// writeExcel("Iphone",45000,{rowChange:0,colChange:2},"C:/Users/AyBhat/Desktop/ExcelJS/exceldownloadTest.xlsx");

test('Upload Download Excel Validation', async ({page}) => {
    const textSearch = 'Mango';
    const updateValue = '350';


    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const download = page.waitForEvent('download');
    await page.getByRole('button', {name:'Download'}).click();
    const dl = await download;
    const filePath = await dl.path();
    await writeExcel(textSearch,updateValue,{rowChange:0,colChange:2},filePath);
    await page.locator("#fileinput").setInputFiles(filePath);
    await expect(page.getByText("Updated Excel Data Successfully.")).toBeVisible();
    const desiredRow = await page.getByRole('row').filter({ has: page.getByText(textSearch) });
    await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updateValue);
});