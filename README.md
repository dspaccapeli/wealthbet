# Wealthbet
_Final project for the Interaction Programming class_

This app is developed under a course at KTH. It is an app that let you search for investment opportunities after a small quiz and presents way of adding them to your virtual portfolio.

## How to run the app

There are two ways of trying this app:
- Via Expo
- Build and run on your own

### Via Expo

1. Navigate to the [Wealthbet app page](https://expo.io/@community/native-component-list) where our demo is hosted:

2. If you have Android 🤖

    1. Download th Expo Client on your device ([Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www))
    2. Open the Expo Client app and scan the QR Code on the page
3. To run it on the browser 🌍, click "__Open project in the browser__" and use the browser simulator. You may have to wait some time in the queue since it is a free service.
4. If you want to run it on iOS 🍎, you can build the project and run it (_see the next section_).

### Build and run on your own
 
 1. Clone the repository.
 2. Install Expo with ↦ 'npm install expo-cli --global'.
 3. Execute ↦ 'npm install' in the root folder.
 4. Create one file called '_IEXToken.js_' with the following content (for the TAs ask us if necessary):
 
        export const token = "YOUR_IEX_CLOUD_TOKEN_HERE";
 5. Execute ↦ 'npm install' in the root folder.
 6. Execute ↦ 'expo start' in the root folder.
 7. Follow the instructions and run it either in the simulator or your Expo Client app after you have logged in on both:
    
    1. Login on the smartphone app by creating an account on [Expo](expo.io).
    1. Login on the command line tool by executing ↦ 'expo login'.


## Next steps to do

- Make all the content from the fund appear from API calls
- Style the app to make it look nicer
- Refine the UX and user journey

### Implemented layouts

- The layout for the proposed screen is there, but not styled beside small tweaks.
- There's one API call from the Fund screen.

## Project structure

The following is the structure for the component we developed:

    components
    |
    --- DevNavigationFooter.js
    |
    screens
    |
    --- CalculatorScreen.js
    |
    --- FundScreen.js
    |
    --- PortfolioScreen.js
    |
    --- PresentationScreen.js
    |
    --- QuizScreen.js
    |
    styles
    |
    --- util.js
    |
    App.js
    DataModel.js
    (IEXToken.js)
    
🗺 DevNavigationFooter.js is an helpful components that lets you test all the screens of the app without navigating to each of them one by one.

📱 The 'screens' folder contains the code for each of the individual screens/views of the app.

🎨 The 'styles' tab contains common styling resources.

🧠 'App.js' is the entrance point of the app and is where the routing is instantiated.

📈 'DataModel.js' contains the data model for the app and manages API call on behalf of the components.