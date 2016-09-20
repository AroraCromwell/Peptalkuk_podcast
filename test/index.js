import fs from 'fs';
import async from 'async';
import buildFeed from '../src/feed';
import YoutubePodcast from '../src/index';
import config  from '../src/config.json';
import nodeSchedule from "node-schedule";
import {SendMail} from "../src/lib/sendMail";

let sendMail = new SendMail();

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
