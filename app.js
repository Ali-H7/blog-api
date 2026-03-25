import express from 'express';
import { loginRoute, signupRoute, postRoute, tagRoute, adminRoute } from './routes/index.js';
import { errorHandlerMiddleware } from './middlewares/index.js';
import { passport } from './config/passport.js';
import cors from 'cors';
const app = express();

// settings
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// routes
app.use('/admin', adminRoute);
app.use('/posts', postRoute);
app.use('/tags', tagRoute);
app.use('/login', loginRoute);
app.use('/signup', signupRoute);

// error handler
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Express app - listening on port ${PORT}!`);
});
