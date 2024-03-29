import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { PORT, mongoDBURL } from './config.js';
import employeeRoute from './routes/employeeRoute.js';


const app = express();

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
  console.log(req);
  return res.status(200).send('Welcome to the Supplier Management System');
});


app.use('/employees', employeeRoute);


mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('Connected to the database successfully');
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log('Failed to connect to the database', error);
  });
