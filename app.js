import express from 'express';
import { signupRoute } from './routes/index.js';
const app = express();

// settings
app.use(express.json());

// routes
app.use('/signup', signupRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Express app - listening on port ${PORT}!`);
});
