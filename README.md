# Coffee Connoisseur Frontend

# Summary
Coffee connoisseur is a react expo app designed to enable people to find the best coffee shops closest to them.
The idea is to enable to anyone to have access to coffee shops in various cities as recommended members.

This front-end app utilises a back-end API built using Mongo DB to access application data.

<img src="https://i.imgur.com/scLUhik.gif" width="150"/>
<img src="https://i.imgur.com/VnVe4jh.gif" width="150"/>
<img src="https://i.imgur.com/PqehL2P.gif" width="150"/>
<img src="https://i.imgur.com/sS5a6SJ.gif" width="150"/>
<img src="https://i.imgur.com/AMhuamc.gif" width="150"/>

# Using the app
The front end application satisfies the following user needs:

- displays maps with markers for coffee shops in the city the user is in
- users can see a list of coffee shops with more up-front information
- users can see a full page of information about a coffee shop
- users can see the coffee shops of a city of their choice
- users can filter the coffee shop list by preferences
- users can order the coffee shop list by distance or price
- users can submit a photo of their favourite coffee at each coffee shop
- users can leave a review for each coffee shop
- when users upload a photo of their coffee, they receive progress towards their coffee counter
- users can create an account
- users can log in to their account and see their profile

As a Guest user - the default user for the Home page - you can search for coffee shops in your local area, filter and sort results, and view further details of individual coffee shops. You will not be able to leave reviews, access personlised profile page, or access rewards without registering as a member. 

To access member benefits, select the menu in the top right corner, and then the login button to register first.

# Requirements

- Node v18.7.0 or higher

# Cloning the repo

Clone the repo and enter the directory using the following commands:
```bash
git clone https://github.com/Status-200-Coffee/Coffee-Connoisseur-app.git
cd Coffee-Connoisseur-app
```

# Set-up instructions

Install all of the required packages:
```
npm install
```

# Using the app

We use Expo to develop and test the app. Start the development server with:
```
npm run start
```

If you receive errors when connecting to the server, try running this instead:
```
npm run tunnel
```

## Android Emulator

If you have the Android Studio emulator running on your machine, you can open the app
by pressing `a` in the terminal where the development server is running.

## Physical Device

Download the Expo Go app on your device: https://docs.expo.dev/get-started/installation/
The, scan the QR code that appears in the terminal after running the development server.

## Reloading the app

If you need to reload the app, you can do so by pressing `r` in the terminal where
the development server is running.

# Tech Stack
React Native, Expo, Typescript, Axios, Node.JS, Tailwind, 

