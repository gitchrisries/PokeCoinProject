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

import ApiClient from '../ApiClient';

/**
 * The PropertiesWeaknessesItems model module.
 * @module model/PropertiesWeaknessesItems
 * @version 1.5.4
 */
class PropertiesWeaknessesItems {
    /**
     * Constructs a new <code>PropertiesWeaknessesItems</code>.
     * @alias module:model/PropertiesWeaknessesItems
     * @param type {String} 
     * @param value {String} 
     */
    constructor(type, value) { 
        
        PropertiesWeaknessesItems.initialize(this, type, value);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, type, value) { 
        obj['type'] = type;
        obj['value'] = value;
    }

    /**
     * Constructs a <code>PropertiesWeaknessesItems</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/PropertiesWeaknessesItems} obj Optional instance to populate.
     * @return {module:model/PropertiesWeaknessesItems} The populated <code>PropertiesWeaknessesItems</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new PropertiesWeaknessesItems();

            if (data.hasOwnProperty('type')) {
                obj['type'] = ApiClient.convertToType(data['type'], 'String');
            }
            if (data.hasOwnProperty('value')) {
                obj['value'] = ApiClient.convertToType(data['value'], 'String');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>PropertiesWeaknessesItems</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>PropertiesWeaknessesItems</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of PropertiesWeaknessesItems.RequiredProperties) {
            if (!data[property]) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is a string
        if (data['type'] && !(typeof data['type'] === 'string' || data['type'] instanceof String)) {
            throw new Error("Expected the field `type` to be a primitive type in the JSON string but got " + data['type']);
        }
        // ensure the json data is a string
        if (data['value'] && !(typeof data['value'] === 'string' || data['value'] instanceof String)) {
            throw new Error("Expected the field `value` to be a primitive type in the JSON string but got " + data['value']);
        }

        return true;
    }


}

PropertiesWeaknessesItems.RequiredProperties = ["type", "value"];

/**
 * @member {String} type
 */
PropertiesWeaknessesItems.prototype['type'] = undefined;

/**
 * @member {String} value
 */
PropertiesWeaknessesItems.prototype['value'] = undefined;






export default PropertiesWeaknessesItems;

