# Shopping Cart API
**Unit 2 Solo Project for General Assembly Software Engineering Immersive**

## Getting Started

### Global Installations Needed

#### Node.js
Before installing the app itself, you will need to install node.js globally on your machine:
* Node.js is a runtime environment that is used to execute JavaScript outside of the browser
* If you have "homebrew" installed already, you can just type the command "brew install node" in your Terminal, and that will install node.js for you. To verify node.js is installed, type the command "node -v".
* If you don't have homebrew, you can install the latest version of node.js by navigating to the [node.js website](https://nodejs.org/en) and clicking on the "current" button to download.

### Other Steps Needed Before Cloning

#### MongoDB Atlas
You will also need a MongoDB Atlas account to store your API databases. If you don't have one, you can sign up [here](https://www.mongodb.com/cloud/atlas/register). Follow the steps to create your free cluster, database user, and project.

## Installing the App on Your Local Machine

### Clone this Repository
* Near the top of this page, click the green button that says "Code".
* Copy the HTTPS link shown by clicking on the two overlapping squares.
* Open your terminal, and make sure your current working directory is where you want the cloned directory to be.
* Type “git clone “ then paste the link copied earlier.
* Press enter to create your local clone.

### Install Dependencies
* In your terminal, type the "cd" command to move into the newly cloned directory.
* To make sure the clone was successful, you can type the “ls” command to view all of the directories and files.
* Type “npm i” to install all dependencies needed.

## A Few More Steps...

### Open the Cloned Repository

Open the Shopping Cart app in your code editor of choice. If you are using Visual Studio Code and you have the shortcut set up, just type "code ." in your terminal.

### Add a .env File

#### Create the file
In your terminal (your working directory should still be the shopping cart API), create a .env file by typing "touch .env".

#### Mongo Connection String
* When logged in to your MongoDB Atlas account, within your selected project, make sure you are on the Database Deployments page.
* Click on Connect, then Drivers.
* Copy the connection string given in Step 3.
* In your .env file, type "MONGO_URI=" and then paste the connection string you just copied. Replace <password> with the password you created for your database user. The string should look something like this: mongodb+srv://sei:<password>@sei-w0kys.azure.mongodb.net/myFirstDatabase?retryWrites=true . Instead of myFirstDatabase, you can name your cloned API whatever you would like. Just type the name you want right before the question mark in the string.

#### Secret
* To use this API, you must come up with a secret of your choosing. It can be any word or combination of words.
* Create a hash of you secret using a SHA256 generator like [this one](https://emn178.github.io/online-tools/sha256.html).
* Copy the hash in the output box.
* In your env file, on line 2, type "SECRET=" and then paste your hashed secret. It should look something like this: SECRET=2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b .


### How to Start the App in Dev Mode
### How to Make an API Request in Postman (i.e what port, what url etc)
### How to Run Automated Tests
### How to Start the App without Dev Mode