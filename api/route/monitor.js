'use strict';
const express = require('express');
const router = express.Router();
const os = require('os');

const registerRoutes = () => {
    router.route('/health')
        .get((req, res, next) => {
            // logger(req.get('host'));
            let freeMem = os.freemem();
            let totalMem = os.totalmem();
            let averageLoad = os.loadavg();
            let totalCPUs = os.cpus();
            let uptime = os.uptime();
            let healthString = `free mem: ${freeMem}<br>total mem: ${totalMem}<br>used mem: ${totalMem - freeMem}<br>used mem ratio: ${(totalMem - freeMem)/totalMem}<br>average load: ${averageLoad}<br>cpus: ${totalCPUs.length}<br>uptime: ${uptime}`;
            //res.send('alive!!!');
            //console.log(healthString.replace(/<br>/g,'\n'));
            res.send(healthString);
        });

    return router;
}

module.exports = {
    registerRoutes
}