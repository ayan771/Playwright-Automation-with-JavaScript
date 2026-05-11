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
};