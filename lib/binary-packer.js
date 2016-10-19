// Copyright IBM Corp. 2014,2016. All Rights Reserved.
// Node module: loopback-connector
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

var msgpack = require('msgpack5');

module.exports = BinaryPacker;

/**
 * Create a new Packer instance that can be used to convert between JavaScript
 * objects and a binary representation in a Buffer.
 *
 * Compared to JSON, this encoding preserves the following JavaScript types:
 *  - Date
 */
function BinaryPacker() {
  this._packer = msgpack({ forceFloat64: true });
  this._packer.register(1, Date, encodeDate, decodeDate);
}

/**
 * Encode the provided value to a `Buffer`.
 *
 * @param {*} value Any value (string, number, object)
 * @returns {Buffer} The encoded value.
 */
BinaryPacker.prototype.encode = function(value) {
  // msgpack5 returns https://www.npmjs.com/package/bl instead of Buffer
  // use .slice() to convert to a Buffer
  return this._packer.encode(value).slice();
};

/**
 * Decode the binary value back to a JavaScript value.
 * @param {Buffer} binary The binary input.
 * @returns {*} Decoded value.
 */
BinaryPacker.prototype.decode = function(binary) {
  return this._packer.decode(binary);
};

function encodeDate(obj) {
  return new Buffer(obj.toISOString(), 'utf8');
}

function decodeDate(buf) {
  return new Date(buf.toString('utf8'));
}
