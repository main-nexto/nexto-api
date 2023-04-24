# Nexto Courses API

## Overview

Nexto Courses is a RESTful API built with NodeJS + Express + Swagger + Firebase + Google Cloud for Nexto aplication.

## Getting Started


### Prerequisites
- Node.js 10+
- NPM
- Firebase project setup
- Google Cloud setup

#### Firebase project setup
1. If you haven't already, create a Firebase project: In the Firebase console, click Add project, then follow the on-screen instructions to create a Firebase project or to add Firebase services to an existing GCP project.

2. Navigate to the Database section of the Firebase console. You'll be prompted to select an existing Firebase project. Follow the database creation workflow.

3. Select a starting mode for your Firebase Security Rules

4. Click Done.

5. In the Firebase console, open Settings > Service Accounts.

6. Click Generate New Private Key, then confirm by clicking Generate Key.

7. Securely store the JSON file containing the key.

8. Open JSON file and copy its content with Ctrl + C.

9. Export the variable environment   In my project the service account file is `server/service-account-file.json`
2. Firebase configurations are under `server/services/firebaseService.js`


### How to run
1. Start the node server

```
npm start
```

2. View the api documentation (Swagger UI):

```
http://localhost:8080/docs
```

## Author

[Labrador team](https://github.com/masterdegree-labrador/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENCE.md) file for details


