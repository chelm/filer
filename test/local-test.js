var vows   = require('vows'),
  fs = require('node-fs'),
  assert = require('assert');

var Peechee = require('../');

var params = {
  type: 'local',
  dir: './test/output'
};

var data = { peechee: [ 1,2,3,4 ] };

var peechee; 

vows.describe('Local Peechee').addBatch({
  'When saving data to a local file': {
    topic: function () {
      peechee = new Peechee(params);
      peechee.write( JSON.stringify( data ), '', 'local.json', this.callback );
    },
    'It should successfully write the data to a local file': function (err) {
      assert.equal( err, null );
      assert.equal( fs.existsSync('./test/output/local.json'), true );
    }
  },
  'When saving data to a local file in a subdir from the base': {
    topic: function () {
      peechee = new Peechee( params );
      peechee.write( JSON.stringify( data ), 'dir1/dir2', 'local.json', this.callback );
    },
    'It should successfully write the data to a local file': function (err, res) {
      assert.equal(err, null);
      assert.equal( fs.existsSync('./test/output/dir1/dir2/local.json'), true );
    }
  },
  'When reading data from a local file': {
    topic: function () {
      peechee = new Peechee( params );
      var self = this;
      setTimeout(function(){
        peechee.read( '', 'local.json', self.callback );
      }, 100);
    },
    'It should successfully read the data from a local file': function (err, res) {
      assert.equal(err, null);
      var json = JSON.parse( res );
      assert.equal(json.peechee[0], 1);
    }
  },
  'When trying to read data from a non-existant file': {
    topic: function () {
      peechee = new Peechee( params );
      peechee.read( '', 'localZZZZ.json', this.callback );
    },
    'It should err': function (err, res) {
      assert.equal(typeof(err), 'string');
    }
  },

  'When trying to get the path data from a non-existant file': {
    topic: function () {
      peechee = new Peechee( params );
      peechee.path( '', 'localZZZZ.json', this.callback );
    },
    'It should err': function (err, res) {
      assert.equal(typeof(err), 'string');
    }
  },

  'When trying to read data from a file': {
    topic: function () {
      var self = this;
      peechee = new Peechee( params );
      setTimeout(function(){
        peechee.read( '', 'local.json', self.callback );
      }, 100);
    },
    'It should err': function (err, res) {
      assert.equal(err, null);
    }
  }
}).export(module);
