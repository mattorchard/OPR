# OPR System

## View Online
* View the app online (with data) at http://online-property-rental.herokuapp.com
* Please give the dyno time to boot when you first visit the page (30 seconds or so).
* If you get a 404, or a Heroku error page we have probably run out of credit.

## Setup to Run Locally
1. Install MongoDB (and ensure it is running)
1. Clone the repository
1. Open the directory in command line and run the following
    1. Install the server dependencies `npm install`
    1. Enter the client folder `cd client`
    1. Install the client dependencies `npm install`
    1. Build the client side `npm run build`
    1. Return to the upper project `cd ..`
1. Set the environment variables:
    1. `MONGO_URL=<Your mongo connection string>` (often takes the form mongodb://localhost/opr)
    1. `JWT_SECRET=<Some random secret text>`
1. Run the server: `npm start`  
    * These last two steps can be performed in one line by entering
    * `set MONGO_URL=<Your mongo connection string>&&set JWT_SECRET=<Random text>&&npm start`  
1. Tada! now it is running,
1. To create an Agent you will need to use Postman to `post` to `/users/agent` with a valid agent object such as:
```
{
	"email": "agent@example.com",
	"username": "agent",
	"password": "123456",
	"givenName": "Timothy",
	"lastName": "Olyphant"
}
```  