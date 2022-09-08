const mongoose = require('mongoose');

const dotenv = require('dotenv');

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
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on port ${port}...`);
});
