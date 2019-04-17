// Import the IEX token from the .gitignored file
import { token, newsApiKey } from "../apiKeys.js"
import ObservableModel from "./ObservableModel";

// General string search helpful in our search
const fundManagerName = "Fidelity";
const fundType = "Index";

const dummyFund = {
    symbol: "FBIFX" ,
    shares: 100,
    originalValue: 100,
    currentValue: 110,

};

const dummyQuestion = {
    question: "Are you interested in hardware?",
    answers: ["Yes", "No"]
};

class DataModel extends ObservableModel {
    constructor(){
        super();
        this.currentFundSymbol = dummyFund.symbol;

        // Initialize API request elements
        this.mutualFundRequest = "ref-data/mutual-funds/symbols/";
        this.version = "/beta/";
        this.tokenString = "?token=" + token;
        this.baseUrl = "https://cloud.iexapis.com";

        // Initializing mutual fund array
        this.mutualFundList = [];

        // Attributes for the portfolio
        this._portfolio = [dummyFund];
        this.getPortfolioFunds();

        // Attributes for the quiz
        this._quiz = [dummyQuestion];
        this.getQuiz();

        this.cache = {};
        this.maxCacheSize = 100;
    }

    cacheLookup(fetchArg){
        return !!this.cache[fetchArg];
    }

    async fetchCache(fetchArg){
       if(this.cacheLookup(fetchArg)){
           console.log('Saved you some API call: ' + fetchArg);
           return this.cache[fetchArg];
       } else {
           let fetchResponse = fetch(fetchArg)
               .then(this.processResponse);
           this.cacheSave(fetchArg, fetchResponse);
           return fetchResponse;
       }
    }

    cacheSave(fetch, response){
        if(Object.keys(this.cache).length > this.maxCacheSize){
            let keys = Object.keys(this.cache);

            delete this.cache[keys[getRandomInt(0, keys.length-1)]]
        }

        if(!this.cacheLookup(fetch)){
            this.cache[fetch] = response;
        }
    }

    getFund(symbol= "FBIFX") {
        let fetchArg = this.baseUrl + this.version + `stock/${symbol}/quote` + this.tokenString;
        return this.fetchCache(fetchArg);
    }

    getCurrentFund() {
        return this.getFund(this.currentFundSymbol);
    }

    setCurrentFund(symbol) {
        this.currentFundSymbol = symbol;
        this.notifyObservers("fund");
    }

    getFundLogo(symbol= "FBIFX"){
        let selectedFundJson;
        let fetchArg = this.baseUrl + this.version + `stock/${symbol}/quote` + this.tokenString;
        this.fetchCache(fetchArg)
            .then(json => {selectedFundJson = json});
    }

    getNews(fundCompanyName) {
        let url = 'https://newsapi.org/v2/everything?' +
            'q=' + fundCompanyName + '&' +
            'from=2019-04-15&' + // TODO: replace this with TODAY
            'sortBy=popularity&' +
            'apiKey=' + newsApiKey;
        let req = new Request(url);

        return this.fetchCache(req);
    }

    getDescription(fundSymbol) {
        let fetchArg = this.baseUrl + this.version + `stock/${fundSymbol}/company` + this.tokenString;
        return this.fetchCache(fetchArg);
    }

    /*
        Refer to path parameters here : https://iexcloud.io/docs/api/#historical-prices
        range = max, 5y, 2y, 1y, ytd, 6m, 3m, 1m, 1d
     */
     getHistoricalData(symbol = "FBIFX", range = "3m", order = "ascending"){
         let interval = 3;
         switch (range) {
             case '3m':
                 break;
             case '6m':
                 interval *= interval*2;
                 break;
             case '1y':
                 interval *= interval*4;
                 break;
             case 'max':
                 interval *= interval*20;
                 break;
         }
         const filter = "&chartInterval=" + interval;

         let fetchArg = this.baseUrl + this.version + `stock/${symbol}/chart/${range}` + this.tokenString + filter;

         return this.fetchCache(fetchArg)
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

    /**
     * Add fund to portfolio, if the fund is already in the portfolio, the fund is updated.
     */
    addFundToPortfolio(symbol="FBIFX", shares=100, originalValue=100, currentValue=110) {
        const index = this._portfolio.findIndex((fund) => {return fund.symbol === symbol;});
        if (index !== -1) {
            this.updateFundAmountFromPortfolio(symbol, shares, originalValue, currentValue);
        } else {
            this._portfolio.push({
                symbol: symbol,
                shares: shares,
                originalValue: originalValue,
                currentValue: currentValue,

            });
        }
        this.notifyObservers("portfolio");
    }

    deleteFundFromPortfolio(symbol="FBIFX") {
        this._portfolio =  this._portfolio.filter(el => el.symbol !== symbol);
        this.notifyObservers("portfolio");
    }

    updateFundAmountFromPortfolio(symbol="FBIFX", shares=200, originalValue=100, currentValue=110) {
        const index = this._portfolio.findIndex((el) => {
            return  el.symbol === symbol;
        });
        this._portfolio[index].shares = shares;
        this._portfolio[index].originalValue = originalValue;
        this._portfolio[index].currentValue = currentValue;
        this.notifyObservers("portfolio");
    }

    getQuiz() {
         return this._quiz;
    }

    computeGain(fund) {
        return ((fund.currentValue - fund.originalValue) / fund.originalValue) * 100;
    }
}

const apiManager = new DataModel();
export default apiManager;

//
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}