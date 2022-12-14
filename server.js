const server = require('./app')

const connectDatabase = require('./src/database/connect');
const populateDatabase = require('./src/database/populate');

connectDatabase().then(() => {
  console.log('Connected to mongodb...');
  populateDatabase();
});

server.listen(5000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
