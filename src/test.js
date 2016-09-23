import fs from 'fs';
import async from 'async';
import buildFeed from './feed';
import YoutubePodcast from './index';
import config  from './config.json';
import nodeSchedule from "node-schedule";
import {SendMail} from "./lib/sendMail";
var connect = require('connect');
var serveStatic = require('serve-static');
import express from "express";

let sendMail = new SendMail();
var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


nodeSchedule.scheduleJob(config.runTime, function () {
    let yp = new YoutubePodcast(
        {
            buildURLFunction: (videoId) => 'http://podsync.net/download/youtube/' + videoId,
            apiKey: 'AIzaSyAcIv3VxVE1n61pW-WrN5iTbW8yfkx-5TY',
            maxVideos: 30,
            cacheTTL: 1800
        });

    yp.feedForChannel('UCdiSVEfN3qg0VeZO3t4vueA', function (err, xml) {
        console.log(err || xml);

        fs.writeFile(__dirname + "/../output.xml", xml, function (err) {

            if (err) {
                return console.log(err);
            }

            console.log("The file was saved!");

            // setup e-mail data with unicode symbols
            var mailOptions = {
                from: "Pep Talk<peptalkukpodcast@gmail.com>", // sender address
                to: "shibi.arora@gmail.com", // list of receivers
                subject: "Podcast: Podcast status", // Subject line
                text: 'Podcast running successfully ', // plaintext body
            };

            console.log("sending mail");
            sendMail.mail(mailOptions);
        });
        // process.exit();
    });
});


app.get('/index', function (req, res) {
    res.set('Content-Type', 'text/xml');
    res.send(fs.readFileSync('./output.xml', {encoding: 'utf-8'}))
});

app.listen(7000);
console.log('Server running on 7000...');
// connect().use(serveStatic(__dirname)).listen(7000, function(){
//     console.log('Server running on 7000...');
// });
