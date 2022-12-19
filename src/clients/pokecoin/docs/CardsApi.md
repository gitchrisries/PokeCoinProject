# Pokecoin.CardsApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**cardsCardIdGet**](CardsApi.md#cardsCardIdGet) | **GET** /cards/{cardId} | 
[**cardsGet**](CardsApi.md#cardsGet) | **GET** /cards/ | 
[**cardsPackagesCardPackNameBuyDefaultPackageGet**](CardsApi.md#cardsPackagesCardPackNameBuyDefaultPackageGet) | **GET** /cards/packages/{cardPackName}/buyDefaultPackage | 
[**cardsPackagesCardPackNameGet**](CardsApi.md#cardsPackagesCardPackNameGet) | **GET** /cards/packages/{cardPackName} | 
[**cardsPackagesCurrentPackageCostGet**](CardsApi.md#cardsPackagesCurrentPackageCostGet) | **GET** /cards/packages/currentPackageCost | 
[**cardsPackagesGet**](CardsApi.md#cardsPackagesGet) | **GET** /cards/packages | 
[**cardsUsercardsGet**](CardsApi.md#cardsUsercardsGet) | **GET** /cards/usercards | 



## cardsCardIdGet

> CardResponse cardsCardIdGet(cardId)



### Example

```javascript
import Pokecoin from 'pokecoin';

let apiInstance = new Pokecoin.CardsApi();
let cardId = "cardId_example"; // String | card id
apiInstance.cardsCardIdGet(cardId).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **cardId** | **String**| card id | 

### Return type

[**CardResponse**](CardResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## cardsGet

> CardsResponse cardsGet(opts)



### Example

```javascript
import Pokecoin from 'pokecoin';

let apiInstance = new Pokecoin.CardsApi();
let opts = {
  'page': 56 // Number | Page starting by index 0
};
apiInstance.cardsGet(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **page** | **Number**| Page starting by index 0 | [optional] 

### Return type

[**CardsResponse**](CardsResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## cardsPackagesCardPackNameBuyDefaultPackageGet

> BuyDefaultPackageSchemaResponse cardsPackagesCardPackNameBuyDefaultPackageGet(cardPackName)



### Example

```javascript
import Pokecoin from 'pokecoin';
let defaultClient = Pokecoin.ApiClient.instance;
// Configure API key authorization: token
let token = defaultClient.authentications['token'];
token.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//token.apiKeyPrefix = 'Token';

let apiInstance = new Pokecoin.CardsApi();
let cardPackName = "cardPackName_example"; // String | name of the cardpack
apiInstance.cardsPackagesCardPackNameBuyDefaultPackageGet(cardPackName).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **cardPackName** | **String**| name of the cardpack | 

### Return type

[**BuyDefaultPackageSchemaResponse**](BuyDefaultPackageSchemaResponse.md)

### Authorization

[token](../README.md#token)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## cardsPackagesCardPackNameGet

> CardPack cardsPackagesCardPackNameGet(cardPackName)



### Example

```javascript
import Pokecoin from 'pokecoin';

let apiInstance = new Pokecoin.CardsApi();
let cardPackName = "cardPackName_example"; // String | name of the cardpack
apiInstance.cardsPackagesCardPackNameGet(cardPackName).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **cardPackName** | **String**| name of the cardpack | 

### Return type

[**CardPack**](CardPack.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## cardsPackagesCurrentPackageCostGet

> Number cardsPackagesCurrentPackageCostGet()



### Example

```javascript
import Pokecoin from 'pokecoin';

let apiInstance = new Pokecoin.CardsApi();
apiInstance.cardsPackagesCurrentPackageCostGet().then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

This endpoint does not need any parameter.

### Return type

**Number**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## cardsPackagesGet

> [String] cardsPackagesGet()



### Example

```javascript
import Pokecoin from 'pokecoin';

let apiInstance = new Pokecoin.CardsApi();
apiInstance.cardsPackagesGet().then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

This endpoint does not need any parameter.

### Return type

**[String]**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## cardsUsercardsGet

> [UserCard] cardsUsercardsGet()



### Example

```javascript
import Pokecoin from 'pokecoin';
let defaultClient = Pokecoin.ApiClient.instance;
// Configure API key authorization: token
let token = defaultClient.authentications['token'];
token.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//token.apiKeyPrefix = 'Token';

let apiInstance = new Pokecoin.CardsApi();
apiInstance.cardsUsercardsGet().then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

This endpoint does not need any parameter.

### Return type

[**[UserCard]**](UserCard.md)

### Authorization

[token](../README.md#token)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

