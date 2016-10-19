// Copyright IBM Corp. 2016. All Rights Reserved.
// Node module: loopback-connector
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

var composer = require('../lib/model-key-composer');
var expect = require('chai').expect;

describe('ModelKeyComposer', function() {
  describe('compose()', function() {
    it('honours the key', function() {
      var key1 = composer.compose('Car', 'vin');
      var key2 = composer.compose('Car', 'name');
      expect(key1).to.not.equal(key2);
    });

    it('honours the model name', function() {
      var key1 = composer.compose('Product', 'name');
      var key2 = composer.compose('Category', 'name');
      expect(key1).to.not.equal(key2);
    });

    it('encodes values', function() {
      // This test is based on the knowledge that we are using ':' separator
      // when building the composed string
      var key1 = composer.compose('a', 'b:c');
      var key2 = composer.compose('a:b', 'c');
      expect(key1).to.not.equal(key2);
    });
  });

  describe('parse()', function() {
    it('decodes valid value', function() {
      var data = composer.compose('Car', 'vin');
      var parsed = composer.parse(data);
      expect(parsed).to.eql({
        modelName: 'Car',
        key: 'vin',
      });
    });

    it('handles invalid values', function() {
      var parsed = composer.parse('invalid');
      expect(parsed).to.eql({
        modelName: null,
        key: 'invalid',
      });
    });
  });
});
