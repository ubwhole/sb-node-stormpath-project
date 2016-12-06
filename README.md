# Simple Node Web App
This is a simple Node web app using Stormpath, Express, and Bootstrap.  I am using this to
learn how to get my CI working.  I am playing to use both Travis CI and Shippable.

## Running the App
Before you can run the app, the following environment variables need to be exported out first
then we can run the app.
```
  $ export STORMPATH_CLIENT_APIKEY_ID=xxxx
  $ export STORMPATH_CLIENT_APIKEY_SECRET=xxxx
  $ export STORMPATH_APPLICATION_HREF=xxxx
  $ npm server.js
```

## CI
Setup to use either Travis CI or Shippable.

