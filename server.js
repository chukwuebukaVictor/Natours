const mongoose = require('mongoose');

const dotenv = require('dotenv');

//Uncaught error like using an undefined value
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION! Shutting down ...');
  process.exit(1);
});

dotenv.config({ path: './config.env' });
// console.log(process.env)
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
//******LOCAL DB*********
// mongoose
//   .connect(process.env.DATABASE_LOCAL)
//   .then(() => console.log('DB connections successful!'));

mongoose.connect(DB).then(() => console.log('DB connections successful!'));

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on port ${port}...`);
});

//Unhandled rejections like wrong pw in mongodp
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! Shutting down ...');
  server.close(() => {
    process.exit(1);
  });
});
