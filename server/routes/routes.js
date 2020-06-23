var express = require('express');
var router = express.Router();
var Axios = require('axios');
const {google} = require('googleapis');
const MongoClient = require('mongodb').MongoClient;

const oauth2Client = new google.auth.OAuth2(
  process.env.NRL_GAPI_CLIENT_ID,
  process.env.NRL_GAPI_CLIENT_SECRET,
  process.env.NRL_GAPI_CALLBACK_URL
);

const uri = process.env.NRL_MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true });
let collection; 

client.connect(err => {
  if (err) {
    console.error(err);
    console.error(uri)
  }
  collection = client.db("nextrocketlaunch").collection("launches");
  // perform actions on the collection object
});

router.post('/logincomplete', async function(req, res) {
  try {
    let { code } = req.query;
    const { tokens } = await oauth2Client.getToken(code);
    let response = await Axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokens.access_token}`);
    if (process.env.admins.split(' ').contains(response.data.email)) {
      res.json(tokens);
    } else {
      res.status(403).send('Not an admin!');
    }
  }
  catch(error) {
    res.status(500).send();
  }
});

router.get('/launches/next', async function(req, res) {
  let now = Date.now();
  collection.findOne({launchTimeUnix: {$gt: now}})
  .then(launch => {
    console.log(launch);
    res.status(200).send(launch);
  })
  .catch(err => console.error(`Failed to find document: ${err}`));
})

router.get('/launches', async function(req, res) {
  let now = Date.now();
  collection.find({ launchTimeUnix: {$gt: now}})
  .sort({ launchTimeUnix: 1 })
  .skip(1)
  .toArray()
  .then(launches => {
    launches.forEach(console.log);
    res.status(200).send(launches);
  })
  .catch(err => console.error(`Failed to find documents: ${err}`));
})

let getUnixTimestamp = function(input) {
  let timeString = input.split(" - ").map(function (date){
    return Date.parse(date+"+0000");
  }).join(" - ");
  return timeString;
}

router.post('/launches', async function(req, res) {
  try {
    await validateToken(req.query.token);
    res.status(200).send('success adding launch');
  }
  catch {
    res.status(500).send('error adding launch');
  }
})

async function validateToken(token) {
    // Verify the id_token, and access the claims.
    let audience = process.env.NRL_GAPI_CLIENT_ID
    const ticket = await oauth2Client.verifyIdToken({
      idToken: token,
      audience
    });
}

module.exports = router;