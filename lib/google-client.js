/*
@exportId F27x9o81SQKunXWbmDUWNw
*/
module.exports = (function() {
return function(ellipsis) {
  const { JWT } = ellipsis.require('google-auth-library@2.0.2');
  return new JWT({
    email: ellipsis.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: ellipsis.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
    scopes: ['https://www.googleapis.com/auth/drive'],
    subject: ellipsis.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  });
};

})()
     