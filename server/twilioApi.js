var twilio = require('twilio')
var accountSID = process.env.sid
var token = process.env.token
var client = new twilio.RestClient(accountSID, token);
var phone = '9175950033'
client.sendSms({
    to: phone,
    from: '3479348362',
    body: 'buhahahaha'
}, function (err, message) {
    if(err) {
        'Houstan we have a problem'
    } else {
        console.log(message.dateCreated)
    }
})