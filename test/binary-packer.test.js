// Copyright IBM Corp. 2016. All Rights Reserved.
// Node module: loopback-connector
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

var BinaryPacker = require('../lib/binary-packer');
var expect = require('chai').expect;

describe('BinaryPacker', function() {
  var packer;

  beforeEach(function createPacker() {
    packer = new BinaryPacker();
  });

  describe('roundtrip', function() {
    var TEST_CASES = {
      String: 'a-value',
      Object: { a: 1, b: 2 },
      Buffer: new Buffer([1, 2, 3]),
      Date: new Date('2016-08-03T11:53:03.470Z'),
      Integer: 12345,
      Float: 12.345,
      Boolean: false,
    };

    Object.keys(TEST_CASES).forEach(function(tc) {
      it('works for ' + tc + ' values', function() {
        var value = TEST_CASES[tc];
        var binary = packer.encode(value);
        var result = packer.decode(binary);
        expect(result).to.eql(value);
      });
    });

    it('works for nested properties', function() {
      var binary = packer.encode(TEST_CASES);
      var result = packer.decode(binary);
      expect(result).to.eql(TEST_CASES);
    });
  });
});
