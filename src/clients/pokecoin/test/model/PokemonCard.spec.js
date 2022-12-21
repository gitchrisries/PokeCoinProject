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

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD.
    define(['expect.js', process.cwd()+'/src/index'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    factory(require('expect.js'), require(process.cwd()+'/src/index'));
  } else {
    // Browser globals (root is window)
    factory(root.expect, root.Pokecoin);
  }
}(this, function(expect, Pokecoin) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new Pokecoin.PokemonCard();
  });

  var getProperty = function(object, getter, property) {
    // Use getter method if present; otherwise, get the property directly.
    if (typeof object[getter] === 'function')
      return object[getter]();
    else
      return object[property];
  }

  var setProperty = function(object, setter, property, value) {
    // Use setter method if present; otherwise, set the property directly.
    if (typeof object[setter] === 'function')
      object[setter](value);
    else
      object[property] = value;
  }

  describe('PokemonCard', function() {
    it('should create an instance of PokemonCard', function() {
      // uncomment below and update the code to test PokemonCard
      //var instance = new Pokecoin.PokemonCard();
      //expect(instance).to.be.a(Pokecoin.PokemonCard);
    });

    it('should have the property id (base name: "id")', function() {
      // uncomment below and update the code to test the property id
      //var instance = new Pokecoin.PokemonCard();
      //expect(instance).to.be();
    });

    it('should have the property name (base name: "name")', function() {
      // uncomment below and update the code to test the property name
      //var instance = new Pokecoin.PokemonCard();
      //expect(instance).to.be();
    });

    it('should have the property imageUrl (base name: "imageUrl")', function() {
      // uncomment below and update the code to test the property imageUrl
      //var instance = new Pokecoin.PokemonCard();
      //expect(instance).to.be();
    });

    it('should have the property subtype (base name: "subtype")', function() {
      // uncomment below and update the code to test the property subtype
      //var instance = new Pokecoin.PokemonCard();
      //expect(instance).to.be();
    });

    it('should have the property supertype (base name: "supertype")', function() {
      // uncomment below and update the code to test the property supertype
      //var instance = new Pokecoin.PokemonCard();
      //expect(instance).to.be();
    });

    it('should have the property number (base name: "number")', function() {
      // uncomment below and update the code to test the property number
      //var instance = new Pokecoin.PokemonCard();
      //expect(instance).to.be();
    });

    it('should have the property artist (base name: "artist")', function() {
      // uncomment below and update the code to test the property artist
      //var instance = new Pokecoin.PokemonCard();
      //expect(instance).to.be();
    });

    it('should have the property rarity (base name: "rarity")', function() {
      // uncomment below and update the code to test the property rarity
      //var instance = new Pokecoin.PokemonCard();
      //expect(instance).to.be();
    });

    it('should have the property series (base name: "series")', function() {
      // uncomment below and update the code to test the property series
      //var instance = new Pokecoin.PokemonCard();
      //expect(instance).to.be();
    });

    it('should have the property set (base name: "set")', function() {
      // uncomment below and update the code to test the property set
      //var instance = new Pokecoin.PokemonCard();
      //expect(instance).to.be();
    });

    it('should have the property setCode (base name: "setCode")', function() {
      // uncomment below and update the code to test the property setCode
      //var instance = new Pokecoin.PokemonCard();
      //expect(instance).to.be();
    });

    it('should have the property imageUrlHiRes (base name: "imageUrlHiRes")', function() {
      // uncomment below and update the code to test the property imageUrlHiRes
      //var instance = new Pokecoin.PokemonCard();
      //expect(instance).to.be();
    });

    it('should have the property text (base name: "text")', function() {
      // uncomment below and update the code to test the property text
      //var instance = new Pokecoin.PokemonCard();
      //expect(instance).to.be();
    });

    it('should have the property level (base name: "level")', function() {
      // uncomment below and update the code to test the property level
      //var instance = new Pokecoin.PokemonCard();
      //expect(instance).to.be();
    });

    it('should have the property evolvesFrom (base name: "evolvesFrom")', function() {
      // uncomment below and update the code to test the property evolvesFrom
      //var instance = new Pokecoin.PokemonCard();
      //expect(instance).to.be();
    });

    it('should have the property ability (base name: "ability")', function() {
      // uncomment below and update the code to test the property ability
      //var instance = new Pokecoin.PokemonCard();
      //expect(instance).to.be();
    });

    it('should have the property hp (base name: "hp")', function() {
      // uncomment below and update the code to test the property hp
      //var instance = new Pokecoin.PokemonCard();
      //expect(instance).to.be();
    });

    it('should have the property retreatCost (base name: "retreatCost")', function() {
      // uncomment below and update the code to test the property retreatCost
      //var instance = new Pokecoin.PokemonCard();
      //expect(instance).to.be();
    });

    it('should have the property convertedRetreatCost (base name: "convertedRetreatCost")', function() {
      // uncomment below and update the code to test the property convertedRetreatCost
      //var instance = new Pokecoin.PokemonCard();
      //expect(instance).to.be();
    });

    it('should have the property types (base name: "types")', function() {
      // uncomment below and update the code to test the property types
      //var instance = new Pokecoin.PokemonCard();
      //expect(instance).to.be();
    });

    it('should have the property attacks (base name: "attacks")', function() {
      // uncomment below and update the code to test the property attacks
      //var instance = new Pokecoin.PokemonCard();
      //expect(instance).to.be();
    });

    it('should have the property weaknesses (base name: "weaknesses")', function() {
      // uncomment below and update the code to test the property weaknesses
      //var instance = new Pokecoin.PokemonCard();
      //expect(instance).to.be();
    });

    it('should have the property nationalPokedexNumber (base name: "nationalPokedexNumber")', function() {
      // uncomment below and update the code to test the property nationalPokedexNumber
      //var instance = new Pokecoin.PokemonCard();
      //expect(instance).to.be();
    });

  });

}));