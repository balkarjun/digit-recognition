# Digit Recognition
A handwritten digit recognition web app using Convolutional Neural Networks. Built with Keras and Tensorflow.js

The model was built and trained in python using the Keras library. The model was saved using the Tensorflow.js converter.

The backend, built using Node.js and express, serves the saved model files (present in the static directory) to be used by Tensorflow.js

## Dependencies
With Node.js installed, navigate to the local-server directory and run the following command on the terminal:
```
npm install
```
## Usage
Navigate to the local-server directory and run the following command on the terminal:
```
node server.js
```
Go to http://localhost:3000/index.html in your browser to use the app.

![screenshot 1](https://user-images.githubusercontent.com/23068820/43353713-44ea00e8-925c-11e8-9159-5d74fb75f278.png)

![screenshot 2](https://user-images.githubusercontent.com/23068820/43353714-457997a8-925c-11e8-9fde-3e22d9c4e504.png)

This project is licensed under the terms of the MIT license.
