# Shopping Cart API
**Unit 2 Solo Project for General Assembly Software Engineering Immersive**

## Getting Started

### Global Installations Needed
Before installing the app itself, you will need to install the following programs globally on your machine:

#### Node.js
* Node.js is a runtime environment that is used to execute JavaScript outside of the browser.
* If you have "homebrew" installed already, you can just type the command "brew install node" in your Terminal, and that will install node.js for you. To verify node.js is installed, type the command "node -v".
* If you don't have homebrew, you can install the latest version of node.js by navigating to the [node.js website](https://nodejs.org/en) and clicking on the "current" button to download.
* Node.js comes with npm, or node package manager, so you will be able to use the "npm i..." command for the rest of the installations.

#### Nodemon
* Nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected. This will be used when running the shopping cart API in dev mode.
* After you have node.js, you can just type "npm i -g nodemon" anywhere within your terminal, and Nodemon will be installed globally on your machine.
* The package.json file that you will install with the shopping cart API will have the dev mode already coded to be Nodemon, so there is no more work needed on your part.

#### Postman
You will need an app like Postman to manually test the API's routes. You can download Postman [here](https://www.postman.com/downloads/).

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
* In your .env file, type "MONGO_URI=" and then paste the connection string you just copied. Replace <password> with the password you created for your database user. The string should look something like this: ```mongodb+srv://sei:<password>@sei-w0kys.azure.mongodb.net/myFirstDatabase?retryWrites=true```. Instead of myFirstDatabase, you can name your cloned API whatever you would like. Just type the name you want right before the question mark in the string.

#### Secret
* To use this API, you must come up with a secret of your choosing. It can be any word or combination of words.
* Create a hash of you secret using a SHA256 generator like [this one](https://emn178.github.io/online-tools/sha256.html).
* Copy the hash in the output box.
* In your env file, on line 2, type "SECRET=" and then paste your hashed secret. It should look something like this: ```SECRET=2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b```.

## How to Start the App in Dev Mode
* In your terminal, make sure your working directory is the shopping cart API.
* Type "npm run dev" to start the app in dev mode. The server will be looking for your open Port 3000 and a working connection to your MongoDB database.
* You will receive confirmation messages in the terminal when the port is listening successfully (the message will be "3000 points to Ravenclaw") and when your MongoDB database is successfully connected (the message will be "Advance to MonGO. Collect $200"). Feel free to change these messages in the server.js file.

## How to Start the App without Dev Mode
* In your terminal, make sure your working directory is the shopping cart API.
* Type "npm start" to start the app without dev mode. Just like in dev mode, the server will be looking for your open Port 3000 and a working connection to your MongoDB database.
* As in dev mode, you will receive confirmation messages in the terminal when the port is listening successfully  and when your MongoDB database is successfully connected.

## How to Make an API Request in Postman (Manually Test Your Routes)
* To make an API request in Postman, you must first start the app (dev mode or not).
* Open up Postman and make sure you are in a fresh tab.
* Type http://localhost:3000 in the url box, assuming you are using Port 3000.
* You can test each route individually by adding the appropriate text to the end of the url. All routes are listed below, with their respective url appendages, type of request, a template for JSON if needed, and whether or not authentication is required. A ":" before the appendage means that the route is dynamic, and when making the request, you should type the specific id, etc. of whatever you are trying to get, create, change, or delete.

| Route Function                    | Url Appendage        | Type of HTTP Request   | JSON Template                          | Authentication Needed? |
| --------------------------------- | -------------------- | ---------------------- | -------------------------------------- | ---------------------- |
| **Create a User**                 | /users               | Post                   | "name": String (required),<br>                               
                                                                                      "email": String (required and unique),<br> 
                                                                                      "phone": String (required and unique),<br>
                                                                                      "password": String (required),<br>           
                                                                                      "address": String (required)           | No                     |
| **List All Users**                | /users               | Get                    | N/A                                    | No                     |
| **Show a Specific User**          | /users/:id           | Get                    | N/A                                    |                        |
| **Login a User**                  | /users/login         | Post                   | "email": String (required)             | No                     |
                                                                                      "password": String (required)                      
| **Update a User**                 | /users/:id           | Put                    | Can update any part(s) of the user.    | Yes                    |
                                                                                      Ex. "name": "Bob"    
| **Delete a User**                 | /users/:id           | Delete                 | N/A                                    | Yes                    |
| **Logout a User**                 | /users/logout        | Post                   | N/A                                    | Yes                    |
| **Create an Item**                | /items               | Post                   | "name": String (required),             | Yes                    |
                                                                                      "price": Number (required),
                                                                                      "type": String (required)                
| **List All Items**                | /items               | Get                    | N/A                                    | No                     |
| **Show a Specific Item**          | /items/:id           | Get                    | N/A                                    | No                     |
| **Update an Item**                | /items/:id           | Put                    | Can update any part(s) of the item.    | Yes                    |
                                                                                      Ex. "price": 50,
                                                                                          "type": "bow"           
| **Delete an Item**                | /items/:id           | Delete                 | N/A                                    | Yes                    |
| **Add an Item to Your Cart**      | /items/:id           | Post                   | N/A                                    | Yes                    |
| **List All Items in Your Cart**   | /cart                | Get                    | N/A                                    | Yes                    |
| **Update an Item in Your Cart**   | /cart/:id            | Put                    | Can only update quantity.              | Yes                    |
                                                                                      "quantity": Number        
| **Delete an Item from Your Cart** | /cart/:id            | Delete                 | N/A                                     | Yes                    |

* Once your url is typed with the appropriate appendage, select the respective request type in the drop-down menu to the left.
* If the request uses JSON:
    * Under the url bar, click on "Body".
    * You will now see a gray drop-down that says "none". Click on that and change it to "raw".
    * Click on the drop-down that says "Text" and change it to "JSON".
    * Use the respective JSON template for that request and fill out at least the required fields.
* If the request requires authentication:
    * You must create a user before the desired request, which will create a token for you to use for authentication.
    * After you submit the request to create a user, as part of the response, you will receive a string within your token object.
    * Copy the string, minus the quotations.
    * Under the url bar, where "Body" is selected, click on "Auth".
    * Click the Type drop-down that says "No Auth" and select "Bearer Token".
    * In the text box next to "Token", paste the token you copied earlier.
    * You are all set with authentication for this request!
* Press "Send" to submit the request.
* Your response will be shown at the bottom of the window.=

## How to Run Automated Tests
* In your terminal, make sure your working directory is the shopping cart API.
* Type "npm run test" to run the automated tests.
* You will know all tests passed when you see:
    * Test Suites: 3 passed, 3 total
    * Tests:       17 passed, 17 total

## How to Run Artillery Tests
* Artillery can be used to test the latency and throughput of your application.
* In your terminal, you will need two windows open.
* In your first window, start the app (dev mode or not).
* In your second window, make sure your working directory is the shopping cart API.
* Type "npm run load" to run the load test.
* A successful load test will complete 100% of the scenarios launched - in this case, 1200 scenarios. This means throughput is maximized. The results will also give you an idea of how minimal your latency is with the mean response/sec and repsonse time results.

## Project Planning and Future Updates

### Trello
API planning and organization was done with Trello, written in the form of user stories. Here is a screenshot of what my updated Trello board looks like:

<img width="900" alt="Screenshot 2023-07-07 at 22 58 42" src="https://github.com/lcohen730/shopping-cart-api/assets/111040134/980f71f9-0142-4520-8b4a-3bba5685b04f">

### Entity Relationship Diagram
Pseudocode for this API was done using an ERD, or Entity Relationship Diagram, created with Lucidchart.

<img width="600" src="https://github.com/lcohen730/shopping-cart-api/assets/111040134/ee8e05cf-5551-473c-9f7b-83c8c117008b">

### Icebox Items
Additional features I would like to add to the backend functionality of this app:
* Full implementation of a master or admin user, where the admin is the only one that can:
    * View users other than their own
    * Create, update, and delete items from the main part of the app
* Ability to place an order, update or delete/cancel an order, and view past orders

### Wireframes
Here are some wireframes I created to give an idea of what the app would look like on the front end:

**Home Page**
![Home_Page](https://github.com/lcohen730/shopping-cart-api/assets/111040134/da49ace5-bbdc-4894-96e9-127b44333f96)

**Item Page**
![Item_Page_Example](https://github.com/lcohen730/shopping-cart-api/assets/111040134/2c9cb65a-c1d9-4e2e-baec-3f9ba676bd17)

**Cart Page**
![Cart_Page](https://github.com/lcohen730/shopping-cart-api/assets/111040134/800b5f5e-bbde-490e-af9d-a781dae6c3dc)