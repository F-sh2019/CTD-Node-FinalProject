require('dotenv').config();
require('express-async-errors');

const helmet= require('helmet') ;
const cors = require('cors') ;
const xss = require('xss-clean') ;
const rateLimiter = require('express-rate-limit')

const express = require('express');
const app = express();

const connectDB = require('./db/connect');
const authenticateUser = require('./middleware/authentication');
const uploads=require('./middleware/upload')

// routers
const authRouter = require('./routes/auth');
const coursesRouter = require('./routes/courses');
const registersRouter = require('./routes/Registers');
const path = require('path');

// Serve static files from the uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


app.set('trust proxy',1) ;


app.use(rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes in milliseconds
  max: 100,
}));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());



// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/courses', authenticateUser, coursesRouter);
app.use('/api/v1/registers', authenticateUser, registersRouter);
app.use(express.static("public"));

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3200;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
