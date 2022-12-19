# Pokecoin.WalletApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**walletBalanceGet**](WalletApi.md#walletBalanceGet) | **GET** /wallet/balance | 



## walletBalanceGet

> BalanceResponse walletBalanceGet()



### Example

```javascript
import Pokecoin from 'pokecoin';
let defaultClient = Pokecoin.ApiClient.instance;
// Configure API key authorization: token
let token = defaultClient.authentications['token'];
token.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//token.apiKeyPrefix = 'Token';

let apiInstance = new Pokecoin.WalletApi();
apiInstance.walletBalanceGet().then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

This endpoint does not need any parameter.

### Return type

[**BalanceResponse**](BalanceResponse.md)

### Authorization

[token](../README.md#token)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

