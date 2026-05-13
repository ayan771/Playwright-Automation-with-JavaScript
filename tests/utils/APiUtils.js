class APiUtils
{
    constructor(apiCall,loginPayload)
    {
        this.apiCall = apiCall;
        this.loginPayload = loginPayload;
    }

    // async getToken()
    // {
    //     const loginResponse = await this.apiCall.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    //         {
    //             data: this.loginPayload
    //         })
    //     const loginResponseJson = await loginResponse.json();
    //     const token = loginResponseJson.token;
    //     console.log(token);
    //     return token;
    // }

    async getToken() {
    try {
        const loginResponse = await this.apiCall.post(
            "https://rahulshettyacademy.com/api/ecom/auth/login",
            { data: this.loginPayload }
        );
            
        if (!loginResponse.ok) {
                throw new Error(`Authentication failed: ${loginResponse.status}`);
            }
            
            const loginResponseJson = await loginResponse.json();
            const token = loginResponseJson.token;
            return token;
        } catch (error) {
            throw new Error(`Failed to get auth token: ${error.message}`);
        }
    }

    async createOrder(orderPayload)
    {

        let response ={};
        response.token = await this.getToken();
        const orderResponse = await this.apiCall.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayload,
                headers: {
                            'Authorization': response.token,
                            'Content-Type': 'application/json'
                        }
            }
        );
        
        
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
        //Added Validation for orders
        if (!orderResponseJson.orders || orderResponseJson.orders.length === 0) {
            throw new Error("No order created");
        }
        const orderId = orderResponseJson.orders[0];
        response.orderId = orderId;
        return response;
    }

}

module.exports = {APiUtils};


    