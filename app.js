const express = require('express'); // Express web server framework
const app = express();
const request = require('request'); // "Request" library
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.load();

const client_id = process.env.CLIENT_ID; // Your client id
const client_secret = process.env.CLIENT_SECRET; // Your secret
const redirect_uri = process.env.REDIRECT_URI // Your redirect uri

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = function(length) {
  const text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (const i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = 'spotify_auth_state';

app.set('view engine', 'pug')


app.use(express.static(__dirname + '/public'))
   .use(cookieParser());

app.get('/', function(request, response) {
  response.render('index')
})

// app.get('/login', function(request, response) {
//
//   const state = generateRandomString(16);
//   response.cookie(stateKey, state);
//
//   // your application requests authorization
//   const scope = 'user-read-private user-read-email';
//   response.redirect('https://accounts.spotify.com/authorize?' +
//     querystring.stringify({
//       response_type: 'code',
//       client_id: client_id,
//       scope: scope,
//       redirect_uri: redirect_uri,
//       state: state
//     }));
// });
//
// app.get('/callback', function(req, res) {
//
//   // your application requests refresh and access tokens
//   // after checking the state parameter
//
//   const code = req.query.code || null;
//   const state = req.query.state || null;
//   const storedState = req.cookies ? req.cookies[stateKey] : null;
//
//   if (state === null || state !== storedState) {
//     res.redirect('/#' +
//       querystring.stringify({
//         error: 'state_mismatch'
//       }));
//   } else {
//     res.clearCookie(stateKey);
//     const authOptions = {
//       url: 'https://accounts.spotify.com/api/token',
//       form: {
//         code: code,
//         redirect_uri: redirect_uri,
//         grant_type: 'authorization_code'
//       },
//       headers: {
//         'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
//       },
//       json: true
//     };
//
//     request.post(authOptions, function(error, response, body) {
//       if (!error && response.statusCode === 200) {
//
//         const access_token = body.access_token,
//             refresh_token = body.refresh_token;
//
//         const options = {
//           url: 'https://api.spotify.com/v1/me',
//           headers: { 'Authorization': 'Bearer ' + access_token },
//           json: true
//         };
//
//         // use the access token to access the Spotify Web API
//         request.get(options, function(error, response, body) {
//           console.log(body);
//         });
//
//         // we can also pass the token to the browser to make requests from there
//         res.redirect('/#' +
//           querystring.stringify({
//             access_token: access_token,
//             refresh_token: refresh_token
//           }));
//       } else {
//         res.redirect('/#' +
//           querystring.stringify({
//             error: 'invalid_token'
//           }));
//       }
//     });
//   }
// });
//
// app.get('/refresh_token', function(req, res) {
//
//   // requesting access token from refresh token
//   const refresh_token = req.query.refresh_token;
//   const authOptions = {
//     url: 'https://accounts.spotify.com/api/token',
//     headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
//     form: {
//       grant_type: 'refresh_token',
//       refresh_token: refresh_token
//     },
//     json: true
//   };
//
//   request.post(authOptions, function(error, response, body) {
//     if (!error && response.statusCode === 200) {
//       const access_token = body.access_token;
//       res.send({
//         'access_token': access_token
//       });
//     }
//   });
// });

console.log('Listening on 8888');
app.listen(process.env.PORT);
