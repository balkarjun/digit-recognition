# Digit Recognition
A handwritten digit recognition web app using Convolutional Neural Networks. Built with Keras and Tensorflow.js

The model was built and trained in python using the Keras library. The model was saved using the Tensorflow.js converter.

The backend, built using Node.js and express, serves the saved model files (present in the static directory) to be used by Tensorflow.js

Check out the [demo here](https://www.youtube.com/watch?v=3SGc7YDmzME)
## Usage Instructions
```
npm install
node server.js
```
Go to http://localhost:3000/index.html in your browser to use the app.

![screenshot 1](https://user-images.githubusercontent.com/23068820/43353830-8e2c9548-925e-11e8-894a-5d9409516df1.png)
![screenshot 2](https://user-images.githubusercontent.com/23068820/43353832-8ee95c14-925e-11e8-9677-54080beb4e2c.png)

This project is licensed under the terms of the MIT license.
