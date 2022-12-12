/**
 * Pokecoin
 * The Pokecoin documentation
 *
 * The version of the OpenAPI document: 1.5.4
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */


import ApiClient from "../ApiClient";
import BalanceResponse from '../model/BalanceResponse';
import UnauthorizedError from '../model/UnauthorizedError';
import UnexpectedError from '../model/UnexpectedError';

/**
* Wallet service.
* @module api/WalletApi
* @version 1.5.4
*/
export default class WalletApi {

    /**
    * Constructs a new WalletApi. 
    * @alias module:api/WalletApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the walletBalanceGet operation.
     * @callback module:api/WalletApi~walletBalanceGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/BalanceResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * @param {module:api/WalletApi~walletBalanceGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/BalanceResponse}
     */
    walletBalanceGet(callback) {
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['token'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = BalanceResponse;
      return this.apiClient.callApi(
        '/wallet/balance', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
