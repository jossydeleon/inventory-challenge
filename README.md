<p align="center">
  <a href="https://myinventorytracker.vercel.app">
    <img alt="JdL" src="public/favicon.png" width="200" />
  </a>
</p>
<h1 align="center">
  Inventory Tracker App
</h1>

### <p align="center"> ReactJS app challenge for Code the Dream organization <a href="https://myinventorytracker.vercel.app"> </a>https://myinventorytracker.vercel.app</p>

## About project

This project is a challenge requested by Code the Dream. It is an small app that serve as a inventory system.
End user must be capable of:

- Keep track of at least one product. Let’s start with bananas.
- Manage the quantities of the product(s). There should be a way to increase and decrease the number of items of the product(s) in the inventory.
- Send an email if the quantity of a product hits zero.

## What is using?

- Typescript
- ReactJS
- Context API
- React Hooks
- Firebase (database and authentication)
- MaterialUI (User interface)
- Axios (to communicate with email backend: https://github.com/jossydeleon/nodemailer-express-app)
- React-hook-form (Form Validation Api)

## Login credentials

For simplicity, I created an admin user to access to the app. Login using this credentials

```javascript
email: johnsmith@inventory.com
pass: 123456
```

## Receive email notifications

In order to receive notifications when products hits zero:

- Login with credentials
- Go to settings
- Add the email where you want to receive notifications

### Note

- Emails will take time to arrive since the backend is hosted in Heroku free version account.
- You need to check Spam folder in your email in case notification is not received in inbox folder.

## Run it locally

1. Clone repository

2. Add a **.env.local** file with the follow enviroment variables.

```javascript
REACT_APP_FIREBASE_API_KEY =
REACT_APP_FIREBASE_AUTH_DOMAIN =
REACT_APP_FIREBASE_PROJECT_ID =
REACT_APP_FIREBASE_STORAGE_BUCKET =
REACT_APP_FIREBASE_MESSAGING_SENDER =
REACT_APP_FIREBASE_APP_ID =
REACT_APP_MAIL_SERVER =
```

3. Then, start the development server:

```bash
npm run start
# or
yarn start
```
