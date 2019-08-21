import app from 'index';

const SERVER_PORT = process.env.PORT || 8080; // heroku setup

const server = app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));
