# bimsua Answers
This is the updated version of the original bimsua Answers with a new UI.

# Development
You may want to populate your own Firebase configuration info
in a file called .env at the root directory of the project, Vite will
automatically insert your config into the ```src/firebase.ts``` file.

The contents of the .env file is:
```
VITE_API_KEY=<your value>
VITE_AUTH_DOMAIN=<your value>
VITE_DATABASE_URL=<your value>
VITE_PROJECT_ID=<your value>
VITE_STORAGE_BUCKET=<your value>
VITE_MESSAGING_SENDER_ID=<your value>
VITE_APP_ID=<your value>
```
This file is in ```.gitignore``` so it won't appear in the respository.