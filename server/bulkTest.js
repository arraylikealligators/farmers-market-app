
var data = require('./bulkData.js');
var mongoose = require('mongoose');
mongoose.connect('mongodb://user1:user1@ds117899.mlab.com:17899/fazzar');

var market = new mongoose.Schema({
  Address: String,
  GoogleLink: String,
  Products: String,
  Schedule: String,
  Lat: Number,
  Long: Number,
  Name: String  
}); 

const Market = mongoose.model('market', market);
var Q = require('q');
var createMarket = Q.nbind(Market.create, Market);



function convert(markets){
 
  for(var i=0; i < markets.length; i++){
    var string = markets[i]['marketdetails']['GoogleLink'];
    var newString = "";
    var start = string.indexOf("=");
    var end = string.indexOf("(");
    var coordString = string.slice(start+1,end);
    var scissorIndex =coordString.indexOf("-");
    var latitudeWithPercentages = coordString.slice(0,scissorIndex);
    var longitudeWithPercentages = coordString.slice(scissorIndex);
    var percentLatIndex = latitudeWithPercentages.indexOf("%");
    var percentLongIndex = longitudeWithPercentages.indexOf("%");
    var latitude = latitudeWithPercentages.slice(0,percentLatIndex);
    var longitude = longitudeWithPercentages.slice(0, percentLongIndex);
    markets[i]['marketdetails']['Lat'] = Number(latitude);
    markets[i]['marketdetails']['Long'] = Number(longitude);
    
    if(markets[i]['marketdetails']['Schedule'].includes('<br> <br> <br>')){
      var delIndex = markets[i]['marketdetails']['Schedule'].indexOf("<br> <br> <br>");
      markets[i]['marketdetails']['Schedule']= markets[i]['marketdetails']['Schedule'].slice(0, delIndex-1);
    }
    
    var link = markets[i]['marketdetails']['GoogleLink'];
    link = link.slice(link.indexOf("%22")+3);
    link = link.slice(0, link.indexOf("%22"));
    link = link.split("+").join(" ");
    markets[i]['marketdetails']['Name'] = link;
    
  }
   

  return markets; 

}

 
var dataz= convert(data);

var newdataz = [];

for(var z=0; z < dataz.length; z++){
  newdataz.push(dataz[z]['marketdetails']);
}


Market.collection.insert(newdataz);


// });
// }


// var dummyMark = { marketdetails: 
//      { Address: '18th Ave between 81st & 82nd Streets, Brooklyn, New York, 11214',
//        GoogleLink: 'http://maps.google.com/?q=40.6155350%2C%20-74.0109559%20(%22Bensonhurst%22)',
//        Products: 'Baked goods; Fresh fruit and vegetables; Honey',
//        Schedule: '07/07/2013 to 11/23/2013 Sun: 9:00 AM-4:00 PM',
//        Lat: 40.615535,
//        Long: -74.0109559,
//        Name: 'Bensonhurst' } };








