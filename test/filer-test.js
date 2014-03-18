var vows   = require('vows');
var assert = require('assert');

var Filer = require('../');

var params = {
  type: 'local',
  dir: './'
};

var s3params = {
  type: 's3',
  dir: 'test-bucket'
};

vows.describe('Filer').addBatch({
  'When creating a local filesystem filer': {
    topic: function () {
      new Filer(params, this.callback);
    },
    'It should return the filer instance of type local': function (err, filer) {
      assert.equal(err, null);
      assert.notEqual(filer, null);
      assert.equal( filer.type, params.type );
      assert.equal( filer.dir, params.dir );
    }
  },
  'When creating a s3 filesystem filer': {
    topic: function () {
      new Filer(s3params, this.callback);
    },
    'It should return the filer instance of type s3': function (err, filer) {
      assert.equal(err, null);
      assert.notEqual(filer, null);
      assert.equal( filer.type, s3params.type );
      assert.equal( filer.dir, s3params.dir );
    }
  }
}).export(module);
