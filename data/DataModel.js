// Import the IEX token from the .gitignored file
import { token, newsApiKey } from "../apiKeys.js"
import ObservableModel from "./ObservableModel";

// General string search helpful in our search
const fundManagerName = "Fidelity";
const fundType = "Index";

import firebase from "../firebaseConfig";
import {dummyFund, dummyQuestion} from "../constants/util";

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
        this.getQuiz();

        this.uid = "iimkZGI01vhAucMmCZN9Z167aK43";

        this.cache = {};
        this.maxCacheSize = 100;

        this.prevScreen = '';
        this.activeScreen = 'Login';
    }

    updateScreen (screenName){
        console.log(this.activeScreen);
        console.log(screenName);

        this.prevScreen = this.activeScreen;
        this.activeScreen = screenName;
    }

    getPrevScreen(){
        return this.prevScreen;
    }

    setActiveScreen(screeName){}

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
        let fetchArg = this.baseUrl + this.version + `/stock/${symbol}/logo` + this.tokenString;
        return this.fetchCache(fetchArg);
    }

    getNews(symbol) {
        let fetchArg = this.baseUrl + this.version + `stock/${symbol}/news/last/1` + this.tokenString;
        return this.fetchCache(fetchArg);
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
         // Read the funds from the portfolio of the current user
        return firebase.database().ref('/users/' + this.getCurrentUser() + "/portfolio").once('value').then(function(snapshot) {
            let portfolio = [];
            for (let fund in snapshot.val()) {
                portfolio.push({
                    symbol: fund,
                    shares: snapshot.val()[fund].shares,
                    currentValue: snapshot.val()[fund].currentValue,
                    originalValue: snapshot.val()[fund].originalValue,
                })
            }
            this._portfolio = portfolio;
            return portfolio;
        });
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

            // Add the fund to the user's portfolio
            firebase.database().ref('users/' + this.getCurrentUser()+ '/portfolio/' + symbol).set({
                shares: shares,
                originalValue: originalValue,
                currentValue: currentValue,
            })
            .catch(() => {
                console.error("Write fund in portfolio error");
            });
        }
        this.notifyObservers("portfolio");
    }

    deleteFundFromPortfolio(symbol="FBIFX") {
        this._portfolio =  this._portfolio.filter(el => el.symbol !== symbol);
        // Add the fund to the user's portfolio

        firebase.database().ref('users/' + this.getCurrentUser()+ '/portfolio/' + symbol).remove()
        .catch(() => {
            console.error("Delete fund from portfolio error");
        });
        this.notifyObservers("portfolio");
    }

    updateFundAmountFromPortfolio(symbol="FBIFX", shares=200, originalValue=100, currentValue=110) {
        const index = this._portfolio.findIndex((el) => {
            return  el.symbol === symbol;
        });
        this._portfolio[index].shares = shares;
        this._portfolio[index].originalValue = originalValue;
        this._portfolio[index].currentValue = currentValue;

        // Update the fund to the user's portfolio
        firebase.database().ref('users/' + this.getCurrentUser()+ '/portfolio/' + symbol).update({
            shares: shares,
            originalValue: originalValue,
            currentValue: currentValue,
        })
        .catch(() => {
            console.error("Update fund in portfolio error");
        });
        this.notifyObservers("portfolio");
    }

    getQuiz() {
        return firebase.database().ref('/quiz').once('value').then(function(snapshot) {
            let totalNumber = (snapshot.val() && snapshot.val().totalNumber) || 0;
            let questions = [];
            for (let i=1; i<=totalNumber; i++) {
                questions.push((snapshot.val() && snapshot.val()[`q${i}`]) || '');
            }
            return {
                totalNumber: totalNumber,
                questions: questions
            }
        });
    }

    computeGain (fund) {
        return (((fund.currentValue - fund.originalValue) / fund.originalValue) * 100).toFixed(2);
    }

    setCurrentUser(uid) {
        this.uid = uid;
    }

    getCurrentUser() {
        return this.uid;
    }

    writeQuizAnswer(answer, questionIndex) {
        let index = "q" + (questionIndex + 1);
        firebase.database().ref('users/' + this.getCurrentUser()+ '/quizAnswers/' + index).set({
            answer: answer
        })
        .catch(() => {
            console.error("Write quiz answer error");
        });
    }

    getPresentationFunds() {
        return firebase.database().ref('/presentation').once('value').then(function(snapshot) {
            let totalNumber = (snapshot.val() && snapshot.val().totalNumber) || 0;
            let funds = [];
            for (let i=1; i<=totalNumber; i++) {
                let fund = (snapshot.val() && snapshot.val()[`f${i}`]) || '';
                funds.push(fund);
            }
            return {
                totalNumber: totalNumber,
                funds: funds
            }
        });
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