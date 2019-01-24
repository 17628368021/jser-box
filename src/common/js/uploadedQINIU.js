import {genUpToken} from './uploadToken.js'

var getToken =function () {
  var token;
  var policy = {};
  var bucket = 'purchase';
  var AK ='gawZjtk00TrJ9Di6AkTOSQluYytRdPgW-y8F1T5L';
  var SK = 'wpA9kYSwIU3aTWABLXRQ3rAaK3vTTYTcz8uzFn7b';
  var deadline = Math.round(new Date().getTime() / 1000) + 3600;
  policy.scope = bucket;
  policy.deadline = deadline;
  token=genUpToken(AK, SK, policy);
  return token
  // console.log('token',this.postData)
}
export default getToken;
