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
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

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

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Course API',
      version: '1.0.0',
      description: 'API documentation for course management',
    },
    servers: [{ url: 'http://localhost:3000' }],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [{ BearerAuth: [] }]
  },
  apis: ['./routes/auth.js', './routes/courses.js', './routes/registers.js'],
};


const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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




app.listen(3000, () => console.log("Server running on http://localhost:3000"));