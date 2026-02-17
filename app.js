import express from 'express';
import { loginRoute, signupRoute, postRoute, tagRoute } from './routes/index.js';
import { errorHandlerMiddleware } from './middlewares/index.js';
import { passport } from './config/passport.js';
const app = express();

// settings
app.use(express.json());
app.use(passport.initialize());

// routes
app.use('/', postRoute);
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
