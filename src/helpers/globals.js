import {ApiClient} from "../clients/pokecoin/src";

const _apiClient = new ApiClient("https://webeng.mi.hs-rm.de/")
_apiClient.authentications['token'].apiKey = localStorage.getItem('token');

const rarityColor = {Rare: 'purple', Uncommon: 'blue', Common: 'white'};

const defaultErrorText = 'An unexpected error occured.'

export {_apiClient, rarityColor, defaultErrorText}