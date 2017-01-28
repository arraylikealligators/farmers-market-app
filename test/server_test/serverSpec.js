// Here is the file to perform unit tests on the server
var expect = require('chai').expect;
var rp = require('request-promise');

describe('googleapi geocode', function() {

  it('should return a results object with correct longitude and latitude when input a valid US address', function(done) {
    var replaceSpaceInAddress = function(address) {
      return address.split(' ').join('+');
    }

    var validAddress = replaceSpaceInAddress('1216 Broadway New York, NY');
    var actual = rp.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${validAddress}`)
    .then(function(data) {
      var coordinates = JSON.parse(data).results[0].geometry.location;

      expect(coordinates).to.eql({lat: 40.7462746, lng: -73.98824909999999});
      done();
    })
    .catch(function(err) {
      throw {
        type: 'request error',
        message: `failed request: ${err}`
      }
    });

  });
});
