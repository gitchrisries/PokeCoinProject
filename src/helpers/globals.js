import {ApiClient} from "../clients/pokecoin/src";

const _apiClient = new ApiClient("https://webeng.mi.hs-rm.de/")
_apiClient.authentications['token'].apiKey = localStorage.getItem('token');

const rarityColor = {Rare: 'purple', Uncommon: 'blue', Common: 'white'};

const feedbackStr = {unknownError: 'An unexpected Error occured', accessError: 'You need to be logged in to access this page',
                    tryReload:'Try reloading this page'}

export {_apiClient, rarityColor, feedbackStr}