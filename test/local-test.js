var vows   = require('vows'),
  fs = require('node-fs'),
  assert = require('assert');

var Filer = require('../');

var params = {
  type: 'local',
  dir: './test/output'
};

var data = { filer: [ 1,2,3,4 ] };

var filer; 

vows.describe('Local Filer').addBatch({
  'When saving data to a local file': {
    topic: function () {
      filer = new Filer(params);
      filer.save( JSON.stringify( data ), '', 'local.json', this.callback );
    },
    'It should successfully write the data to a local file': function (err) {
      assert.equal( err, null );
      assert.equal( fs.existsSync('./test/output/local.json'), true );
    }
  },
  'When saving data to a local file in a subdir from the base': {
    topic: function () {
      filer = new Filer( params );
      filer.save( JSON.stringify( data ), 'dir1/dir2', 'local.json', this.callback );
    },
    'It should successfully write the data to a local file': function (err, res) {
      assert.equal(err, null);
      assert.equal( fs.existsSync('./test/output/dir1/dir2/local.json'), true );
    }
  },
  'When reading data from a local file': {
    topic: function () {
      filer = new Filer( params );
      var self = this;
      setTimeout(function(){
        filer.get( '', 'local.json', self.callback );
      }, 100);
    },
    'It should successfully read the data from a local file': function (err, res) {
      assert.equal(err, null);
      var json = JSON.parse( res );
      assert.equal(json.filer[0], 1);
    }
  },
  'When trying to read data from a non-existant file': {
    topic: function () {
      filer = new Filer( params );
      filer.get( '', 'localZZZZ.json', this.callback );
    },
    'It should err': function (err, res) {
      assert.equal(typeof(err), 'object');
    }
  }
}).export(module);
