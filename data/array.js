fs = require("fs");
var myArray ={
	'items':[]
};

function loopOverItems(){
  console.log("Let's go");
  for (var i = 0; i < 3; i++) {
    console.log("=========1S========");
    console.log("loop "+i);
     MakeArray(i);
    }
  console.log("========1E==========");
}

function MakeArray(res){
  console.log("========2S==========");
  console.log("In the second loop");
  for (var j = 0; j < 4; j++) {
    console.log("second loop "+j);
     myArray.items.push({
       'loop number':res,
       'inside item':j
     })
    }
    console.log(myArray);
}

function WriteTheFile(res){
  fs.appendFileSync('./myArray.json',JSON.stringify(res, undefined, 4));
  console.log("File written");
  console.log("========Fw==========");
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
			console.log("No such file");

		} else {
				console.log('Some error:', err.code);
		}
	})
	//doe anders niets
}
console.log("Remove Feed");
removeFeed('./myArray.json');
console.log("Loop over items");
loopOverItems();
console.log("Write the file");
WriteTheFile(myArray);
console.log("End of story");
