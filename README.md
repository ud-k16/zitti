Node version = v19.5.0 [install node if not already installed]

Steps to reproduce :

1. type in command line of this project folder : 'npm install' , this will install required dependencies
2. open 2 command lines with this project folder.
3. run the server in one cmd by typing 'node server/server.js'
4. run the client in another cmd by typing 'node index.js'

//Note:

1. input can be altered in the file named userInput.js under input folder
2. server need not be turned on all time unless it is shut down of error[database used is not persistent once server shuts down data is lost.rxdb is used for db]
3. change port number in server.js if default given port is not available
4. client ends once inputs are executed. run the client all time if userInput is changed.
