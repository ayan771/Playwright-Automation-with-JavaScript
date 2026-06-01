require('dotenv').config();

const required = (name) => {
    const value = process.env[name];

    if (!value) {
        throw new Error(`${name} is not defined`);
    }

    return value;
};

module.exports = {
    API_BASE_URL:
        process.env.API_BASE_URL ??
        "https://rahulshettyacademy.com/api/ecom",

    WEB_BASE_URL:
        process.env.WEB_BASE_URL ??
        "https://rahulshettyacademy.com/client",

    TEST_CREDENTIALS: {
        email: required("TEST_EMAIL"),
        password: required("TEST_PASSWORD"),
    },
    TEST_COUNTRY: 
        process.env.TEST_COUNTRY ??
        "India",

    TEST_PRODUCT_ID:
        process.env.TEST_PRODUCT_ID ??
        "6960eae1c941646b7a8b3ed3",

    WEB_ORDER_URL:
        process.env.WEB_ORDER_URL ??
        "https://rahulshettyacademy.com/api/ecom/order/create-order",

    TEST_PRODUCT:
        process.env.TEST_PRODUCT ??
        "ADIDAS ORIGINAL",

    TEST_PRODUCT:
        process.env.TEST_PRODUCT ??
        "ZARA COAT 3"

};