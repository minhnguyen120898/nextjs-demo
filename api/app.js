const express = require('express')
const app = express();
const fs = require('fs');
const i18n = require('i18n');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const configCommon = require('./shared/helpers/configCommon.helper')
const error = require('./shared/helpers/errorHandle.helper');
// const listener = require('./shared/helpers/listener.helper');
const monitorRouter = require('./route/monitor');
const routes = require('./route');
const swaggerTools = require('./doc')
const middlewares = require('./middleware');
const dotenv = require('dotenv')
const firebaseAdmin = require('firebase-admin');

dotenv.config()
/**
 * Initialize
 */
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use('/images', express.static(configCommon.getImageDir()))
// Monitoring endpoint
app.use('/_ah', monitorRouter.registerRoutes());
// SwaggerRouter configuration
swaggerTools.initSwaggerTools(app)
// configure middlewares
middlewares.configureMiddlewares(app);
// router
routes.registerRoutes(app)
// error
app.use(error.handleError);
// multi language
i18n.configure({
    locales: ['en', 'ja'],
    directory: `${__dirname}/config/locales`,
});

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(configCommon.getGoogleCloud().keyfile),
    databaseURL: configCommon.getGoogleCloud().databaseURL
  });
  
// read mail
// listener.onHandlerReadEmail()
// mongoose
mongoose.Promise = global.Promise;
mongoose.connect(configCommon.getMongoDb().url, configCommon.getMongoDb().options);
mongoose.connection.on('error', function (err) {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
});

mongoose.connection.on('connected',async () => {
    console.log('MongoDB connected');
    // init db
    const initDB = require('./shared/helpers/initdb.helper')
    initDB.init()
    const cronJob=require("./shared/helpers/cronjob.helper")
    cronJob.init()
    /**
     * Run app
     */
    let server
    // if (process.env.MODE_BUILD == 'prod') {
    //     var https = require('https');
    //     var options = {
    //         key: fs.readFileSync('/etc/letsencrypt/live/rionlab.com/privkey.pem'),
    //         cert: fs.readFileSync('/etc/letsencrypt/live/rionlab.com/fullchain.pem'),
    //         //  requestCert: true,
    //         // rejectUnauthorized: false
    //     };
    //     server = https.createServer(options, app)
    // } else {
        server = require('http').Server(app)
        
    // }

    const io = require('socket.io')(server, {
        cors: {
          origin: "http://localhost:4200",
          methods: ["GET", "POST"]
        }
    });
    const socket = require('./shared/helpers/socketUtils.helper');
    socket.startSocket(io);
    
    server.listen(process.env.PORT, () => {
        console.log(`Server running at http://:${process.env.PORT}/`)
    });
    console.log(`Api doc is available on http://localhost:${process.env.PORT}/docs`);
});

module.exports = app;
