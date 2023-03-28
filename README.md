# Movie Zilla

Movie Zilla is a React Native movie app that allows users to explore, search, and add their favorite movies to a personal list. This app was developed as the final assignment for the React Native course "React Mobile App Development" (RMAD). It utilizes the TMDB API to fetch movie data and integrates Redux, a popular state management library, for seamless state handling.

### Android app overview 


![1](https://user-images.githubusercontent.com/102714819/228210991-83bfec1a-22d5-4cad-9cf0-e8348f04a454.png)&nbsp;&nbsp;![2](https://user-images.githubusercontent.com/102714819/228211026-0c8f46d2-bb91-4122-8ca2-df26dce83a21.png)&nbsp;&nbsp;![3](https://user-images.githubusercontent.com/102714819/228211039-ed9a3420-196f-422d-89b2-61487425f691.png)&nbsp;&nbsp;![4](https://user-images.githubusercontent.com/102714819/228211053-f0e2d101-d8d0-4050-8793-5a656663ac9f.png)

### iOS app overview 

![1ios-removebg-preview](https://user-images.githubusercontent.com/102714819/228270005-182ae779-1c92-4dbc-806c-fd74b9380fde.png)&nbsp;&nbsp;![2ios-removebg-preview](https://user-images.githubusercontent.com/102714819/228270055-f93971e9-3158-4087-9b3e-23d0c60f1bcd.png)&nbsp;&nbsp;![3ios-removebg-preview](https://user-images.githubusercontent.com/102714819/228270239-74df0c7c-163d-401e-9d92-03d7176efbf7.png)&nbsp;&nbsp;![4ios-removebg-preview](https://user-images.githubusercontent.com/102714819/228270260-c3a55a35-6d06-44c8-b2a0-f8e2f60fcb12.png)


### Table of Contents
1. [Features](#features)
2. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
3. [Usage](#usage)
4. [Acknowledgements](#acknowledgements)

## Features
* Compatible with both iOS & Android platforms.
* Browse popular, top-rated, and latest movies.
* Search for movies by title.
* View detailed information about a movie, including its poster, release date, rating, and overview.
* Add and remove movies from a personal favorites list.
* Responsive design that adapts to different screen sizes and orientations.

## Getting Started
Follow these instructions to set up the project on your local machine for development and testing purposes.

### Prerequisites
* [Node.js](https://nodejs.org/) (version 14.x or later)
* [npm](https://www.npmjs.com/) (version 6.x or later)
* [React Native](https://reactnative.dev/) (version 0.71.4 or later)
* [Android Studio](https://developer.android.com/studio) or [Xcode](https://developer.apple.com/xcode/) for running the app on an emulator or physical device

### Installation
 - Clone this repo\
  ```git clone https://github.com/mishenThakshana/movie-zilla-app.git```
 - Navigate to the project directory\
  ```cd movie-zilla-app```
 - Install dependencies\
  ```npm i or yarn install```
 - Create a .env file in the root directory of the project and add your TMDB API key\
 ```TMDB_API_KEY=your_api_key_here```
 - Run the app on an emulator or physical device\
   - For Android\
    ```npx react-native run-android```
   - For iOS\
    ```npx react-native run-ios```

## Usage
* On the home screen, browse through popular, action, and fanatasy movies etc.
* Use the search bar to find movies by title.
* Tap on a movie to view detailed information, such as rating, overview and related movies.
* Add movies to your favorites by tapping the heart icon.
* Access your favorite movies from the "Favorites" tab.

## Acknowledgements
* [The Movie Database (TMDB) API](https://developers.themoviedb.org/3/getting-started/)
* [React Native](https://reactnative.dev/)
* [Redux](https://redux.js.org/)
    
