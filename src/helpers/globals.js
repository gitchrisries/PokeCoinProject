import {ApiClient} from "../clients/pokecoin/src";

const _apiClient = new ApiClient("https://webeng.mi.hs-rm.de/")
_apiClient.authentications['token'].apiKey = localStorage.getItem('token');

const rarityColor = {Rare: 'purple', Uncommon: 'blue', Common: 'white'};

export {_apiClient, rarityColor}