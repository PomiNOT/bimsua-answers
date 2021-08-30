# bimsua Answers
Simple app to share multiple choice answers, in real time\
Powered by [Firebase](https://firebase.google.com).

# Configuration

### Step 1
Install the **Firebase CLI** and go through the steps, make sure to enable
```Firestore```, ```Authentication``` and optionally ```Emulator``` for the
emulator suite.

### Step 2
Populate your own Firebase configuration info
in a file called .env at the root directory of the project, Vite will
automatically insert your config into the ```src/firebaseApp.ts``` file.

The contents of the .env file is:
```
VITE_API_KEY=<your value>
VITE_AUTH_DOMAIN=<your value>
VITE_DATABASE_URL=<your value>
VITE_PROJECT_ID=<your value>
VITE_STORAGE_BUCKET=<your value>
VITE_MESSAGING_SENDER_ID=<your value>
VITE_APP_ID=<your value>
VITE_ENABLE_GOOGLE_ANALYTICS=<1 or 0>
VITE_ENABLE_PERF_MONITORING=<1 or 0>
CERT_FILE=<path to cert file>
KEY_FILE=<path to key file>
```
```CERT_FILE``` and ```KEY_FILE``` option are for enabling https on your local development server.