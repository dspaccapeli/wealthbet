import { token } from "IEXToken"


const mutualFundRequest = "/ref-data/mutual-funds/symbols/";
const version = "/beta/";
const tokenString = "?token=" + token;
const baseUrl = "https://cloud.iexapis.com";

let mutualFundList = [];
fetch(baseUrl + version + mutualFundRequest + tokenString)
    .then(response=>response.json())
    .then(data=>{mutualFundList = data});

let fidelityFunds = [];

Array.from(mutualFundList).forEach(
    (fund)=>{
        if(fund.name.includes("Fidelity") && fund.name.includes("Index"))
        {
            fidelityFunds.push(fund);
        }
    });

let getOneFund = fetch(baseUrl + version + "/stock/FBIFX/quote" + token)
    .then(response=>response.json())
    .then(json=>console.log(json));

export default class DataModel {
    constructor(signedToken){
        this.signedToken = signedToken;
    }
}