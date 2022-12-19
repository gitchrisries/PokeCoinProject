# Pokecoin.BlockchainApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**blockchainBlocksPost**](BlockchainApi.md#blockchainBlocksPost) | **POST** /blockchain/blocks | 
[**blockchainCurrentDifficultyGet**](BlockchainApi.md#blockchainCurrentDifficultyGet) | **GET** /blockchain/currentDifficulty | 
[**blockchainLastBlockGet**](BlockchainApi.md#blockchainLastBlockGet) | **GET** /blockchain/lastBlock | 



## blockchainBlocksPost

> AddBlockResponse blockchainBlocksPost(opts)



### Example

```javascript
import Pokecoin from 'pokecoin';
let defaultClient = Pokecoin.ApiClient.instance;
// Configure API key authorization: token
let token = defaultClient.authentications['token'];
token.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//token.apiKeyPrefix = 'Token';

let apiInstance = new Pokecoin.BlockchainApi();
let opts = {
  'body': new Pokecoin.AddBlockBody() // AddBlockBody | 
};
apiInstance.blockchainBlocksPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**AddBlockBody**](AddBlockBody.md)|  | [optional] 

### Return type

[**AddBlockResponse**](AddBlockResponse.md)

### Authorization

[token](../README.md#token)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## blockchainCurrentDifficultyGet

> Number blockchainCurrentDifficultyGet()



### Example

```javascript
import Pokecoin from 'pokecoin';

let apiInstance = new Pokecoin.BlockchainApi();
apiInstance.blockchainCurrentDifficultyGet().then((data) => {
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


## blockchainLastBlockGet

> Block blockchainLastBlockGet()



### Example

```javascript
import Pokecoin from 'pokecoin';

let apiInstance = new Pokecoin.BlockchainApi();
apiInstance.blockchainLastBlockGet().then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

This endpoint does not need any parameter.

### Return type

[**Block**](Block.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

