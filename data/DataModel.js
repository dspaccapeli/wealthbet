// Import the IEX token from the .gitignored file
import { token } from "../IEXToken.js"
import ObservableModel from "./ObservableModel";

// General string search helpful in our search
const fundManagerName = "Fidelity";
const fundType = "Index";

class DataModel extends ObservableModel {
    constructor(){
        super();
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

        // Attributes for the portfolio
        this._portfolio = [dummyFund];
        this.getPortfolioFunds();
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

    //////////////////////////     Functions for portfolio ///////////////////////
    getPortfolioFunds () {
         return this._portfolio;
    }

    getPortfolioValue () {
         let value = 0;
         this._portfolio.forEach(fund => {
             value += fund.currentValue;
         });
         return value;
    }

    getMonthlyGrowth () {
         // Wild function that computes the average growth from the portfolio
        let growth = 0;
        this._portfolio.forEach(fund => {
            growth += (fund.currentValue - fund.originalValue) / fund.originalValue;
        });
        growth /= this._portfolio.length;
        return growth * 100;
    }

    addFundToPortfolio(symbol="FBIFX", shares=100, originalValue=100,currentValue=110) {
        this._portfolio.add({
            symbol: symbol,
            shares: shares,
            originalValue: originalValue,
            currentValue: currentValue,

        });
        this.notifyObservers("portfolio");
    }

    deleteFundFromPortfolio(symbol="FBIFX") {
        this._portfolio =  this._portfolio.filter(el => el.symbol !== symbol);
        this.notifyObservers("portfolio");
    }

    updateFundAmountFromPortfolio(symbol="FBIFX", shares="200") {
        const index = this._portfolio.findIndex((el) => {
            return  el.symbol === symbol;
        });
        this._portfolio[index].shares = shares;
        this.notifyObservers("portfolio");
    }

    //////////////////////////  END Functions for portfolio ///////////////////////

}

// // Utility function to extract _n_ random item from an array
// function getRandomElements(arr, n) {
//     let result = new Array(n),
//         len = arr.length,
//         taken = new Array(len);
//     if (n > len)
//         throw new RangeError("getRandomElements: more elements taken than available");
//     while (n--) {
//         let x = Math.floor(Math.random() * len);
//         result[n] = arr[x in taken ? taken[x] : x];
//         taken[x] = --len in taken ? taken[len] : len;
//     }
//     return result;
// }

const dummyFund = {
    symbol: "FBIFX" ,
    shares: 100,
    originalValue: 100,
    currentValue: 110,

};

const apiManager = new DataModel();
export default apiManager;