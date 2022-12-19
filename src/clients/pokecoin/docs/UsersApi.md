# Pokecoin.UsersApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**authChangePasswordPost**](UsersApi.md#authChangePasswordPost) | **POST** /auth/changePassword | 
[**authLoginPost**](UsersApi.md#authLoginPost) | **POST** /auth/login | 
[**authMeGet**](UsersApi.md#authMeGet) | **GET** /auth/me | 
[**authRegisterPost**](UsersApi.md#authRegisterPost) | **POST** /auth/register | 



## authChangePasswordPost

> Object authChangePasswordPost(opts)



### Example

```javascript
import Pokecoin from 'pokecoin';
let defaultClient = Pokecoin.ApiClient.instance;
// Configure API key authorization: token
let token = defaultClient.authentications['token'];
token.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//token.apiKeyPrefix = 'Token';

let apiInstance = new Pokecoin.UsersApi();
let opts = {
  'body': new Pokecoin.ChangePasswordBody() // ChangePasswordBody | 
};
apiInstance.authChangePasswordPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**ChangePasswordBody**](ChangePasswordBody.md)|  | [optional] 

### Return type

**Object**

### Authorization

[token](../README.md#token)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## authLoginPost

> LoginResponse authLoginPost(opts)



### Example

```javascript
import Pokecoin from 'pokecoin';

let apiInstance = new Pokecoin.UsersApi();
let opts = {
  'body': new Pokecoin.LoginBody() // LoginBody | 
};
apiInstance.authLoginPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**LoginBody**](LoginBody.md)|  | [optional] 

### Return type

[**LoginResponse**](LoginResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## authMeGet

> User authMeGet()



### Example

```javascript
import Pokecoin from 'pokecoin';
let defaultClient = Pokecoin.ApiClient.instance;
// Configure API key authorization: token
let token = defaultClient.authentications['token'];
token.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//token.apiKeyPrefix = 'Token';

let apiInstance = new Pokecoin.UsersApi();
apiInstance.authMeGet().then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters

This endpoint does not need any parameter.

### Return type

[**User**](User.md)

### Authorization

[token](../README.md#token)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## authRegisterPost

> RegisterResponse authRegisterPost(opts)



### Example

```javascript
import Pokecoin from 'pokecoin';

let apiInstance = new Pokecoin.UsersApi();
let opts = {
  'body': new Pokecoin.RegisterBody() // RegisterBody | 
};
apiInstance.authRegisterPost(opts).then((data) => {
  console.log('API called successfully. Returned data: ' + data);
}, (error) => {
  console.error(error);
});

```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**RegisterBody**](RegisterBody.md)|  | [optional] 

### Return type

[**RegisterResponse**](RegisterResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

