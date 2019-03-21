// Import the IEX token from the .gitignored file
import { token } from "./IEXToken.js"

// General string search helpful in our search
const fundManagerName = "Fidelity";
const fundType = "Index";

class DataModel {
    constructor(){
        // Initialize API request elements
        this.mutualFundRequest = "ref-data/mutual-funds/symbols/";
        this.version = "/beta/";
        this.tokenString = "?token=" + token;
        this.baseUrl = "https://cloud.iexapis.com";

        // Initializing mutual fund array
        this.mutualFundList = [];

        // Fetching the funds list
        /*
        fetch(this.baseUrl + this.version + this.mutualFundRequest + this.tokenString)
            .then(response => response.json())
            .then(data => {this.mutualFundList = data});

        // Filtering the funds
        this.shownFunds = [];

        Array.from(this.mutualFundList).forEach(
            (fund) => {
                if(fund.name.includes(fundManagerName) && fund.name.includes(fundType)) {
                    this.shownFunds.push(fund);
                }
            });
            */
    }

    getFund(symbol= "FBIFX"){
        return fetch(this.baseUrl + this.version + `stock/${symbol}/quote` + this.tokenString)
            .then(this.processResponse);
    }

    getFundLogo(symbol= "FBIFX"){
        let selectedFundJson;
        fetch(this.baseUrl + this.version + `stock/${symbol}/quote` + this.tokenString)
            .then(response => response.json())
            .then(json => {selectedFundJson = json});
    }

    /*
        Refer to path parameters here : https://iexcloud.io/docs/api/#historical-prices
        range = max, 5y, 2y, 1y, ytd, 6m, 3m, 1m, 1d
     */
     getHistoricalData(symbol = "FBIFX", range = "3m", order = "ascending"){
         return fetch(this.baseUrl + this.version + `stock/${symbol}/chart/${range}` + this.tokenString)
            .then(this.processResponse)
            .then(historicalDataJson => {
                if (order === "ascending") {
                    return historicalDataJson.map(discretePoint => {
                        return {value: discretePoint.close}
                    });
                } else {
                    return historicalDataJson.reverse().map(discretePoint => {
                        return {value: discretePoint.close}
                    });
                }
            });
    }

    processResponse(response) {
        if (response.ok) {
            return response.json();
        }
        throw response;
    }
}

// Utility function to extract _n_ random item from an array
function getRandomElements(arr, n) {
    let result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandomElements: more elements taken than available");
    while (n--) {
        let x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

const apiManager = new DataModel();
export default apiManager;