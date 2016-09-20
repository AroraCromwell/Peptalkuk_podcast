import fs from 'fs';
import async from 'async';
import buildFeed from '../src/feed';
import YoutubePodcast from '../src/index';

let yp = new YoutubePodcast(
{
	buildURLFunction: (videoId) => 'http://podsync.net/download/youtube/' + videoId ,
	apiKey: 'AIzaSyAcIv3VxVE1n61pW-WrN5iTbW8yfkx-5TY',
	maxVideos: 30,
	cacheTTL: 1800
});

yp.feedForChannel('UCdiSVEfN3qg0VeZO3t4vueA', function(err, xml)
{
	console.log(err || xml);

fs.writeFile( __dirname + "/../output.xml", xml, function(err) {

    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});
   // process.exit();
});
