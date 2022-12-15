To run this service, rename the `.env-example` file to `.env`
Run the commands `npm install` and `docker-compose up --build`
Open browser and go to `localhost:5000`
Play around with the api

You can get all photos, get photos by topic, description or user if the search finds a matching term.
You can also get photos by id.

Rate limiting and caching were implemented to add a layer of protection for the db during increased load
