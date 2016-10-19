// Copyright IBM Corp. 2016. All Rights Reserved.
// Node module: loopback-connector
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

var debug = require('debug')('loopback:connector:model-key-composer');

/**
 * Build a single key string from a tuple (modelName, key).
 *
 * This method is typically used by KeyValue connectors to build a single
 * key string for a given modelName+key tuple.
 *
 * @param {String} modelName
 * @param {String} key
 * @returns {String}
 */
exports.compose = function composeKeyFromModelNameAndKey(modelName, key) {
  // Escape model name to prevent collision
  //  'model' + 'foo:bar' --vs-- 'model:foo' + 'bar'
  return encodeURIComponent(modelName) + ':' + key;
};

var PARSE_KEY_REGEX = /^([^:]*):(.*)/;

/**
 * Parse a composed key string into a tuple (modelName, key).
 *
 * This method is typically used by KeyValue connectors to parse a composed
 * key string returned by SCAN/ITERATE method back to the expected
 * modelName+tuple key.
 *
 * @param {String} composed The composed key as returned by `composeKey`
 * @returns {Object} Parsed result with properties `modelName` and `key`.
 */
exports.parse = function(composed) {
  var m = composed.match(PARSE_KEY_REGEX);
  if (m) {
    return {
      modelName: m[1],
      key: m[2],
    };
  }

  debug('Invalid key - missing model-name prefix: %s', composed);
  return {
    modelName: null,
    key: composed,
  };
};
