import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './route/user.route.js'
import companyROute from './route/company.route.js'
import profileRoute from './route/profile.route.js'
import applicationRoute from './route/application.route.js'
import jobRoute from './route/job.route.js'

dotenv.config(); 

const app = express(); 

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send("API is working");
});

app.use('/api/auth',userRoutes);
app.use('/api/auth',companyROute);
app.use('/api/auth',profileRoute);
app.use('/api/auth',applicationRoute);
app.use('/api/auth',jobRoute);

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGODB_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Mongo connection error:", err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
