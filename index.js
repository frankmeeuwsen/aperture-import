if (process.env.NODE_ENV !== 'production') {
	const env = require('dotenv').config();
  }
const fs = require("fs");
const request = require("request");
const opmlRead = require("daveopml");

const timeOutSecs = 30;
const opmlTestfeed = "./data/feeds.opml";


function readOPML(TheOPMLFeed){
		opmlRead.readOpmlFile(TheOPMLFeed, function(opmlFeed){
		if (opmlFeed == undefined) {
			console.log(err);
			}
		else {
			for (var i = 0; i < opmlFeed.subs.length; i++) {
			request
				.post(process.env.ApertureURL)
				.auth(null, null, true, process.env.bearerToken)
				.form({action: 'follow', channel: process.env.defaultChannel, url: opmlFeed.subs[i].xmlurl})
				.on('response', function(response){
					console.log("============================================");
					// console.log ("URL: " + opmlFeed.subs[i].xmlurl + ".");
					console.log(response.statusCode)
					console.log(response.statusMessage)
					console.log("============================================");
				})


			}
		}
	});
}



function removeFeed(TheFile){
	fs.stat(TheFile, function(err,stat){
		if(err == null){
			//als bestand bestaat
			console.log('File exists', TheFile);
			//gooi het dan weg
			fs.unlink(TheFile, (err) => {
  			if (err) throw err;
  			console.log(TheFile, 'was deleted');
				});
		} else if(err.code == 'ENOENT') {
			//bestand bestaat niet
		} else {
				console.log('Some error:', err.code);
		}
	})
	//doe anders niets
}

// removeFeed(itemsToPostFile);
readOPML(opmlTestfeed);