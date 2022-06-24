let gpxParser = require('gpxparser');
var gpx = new gpxParser()
let fs = require("fs")
let xml = fs.readFileSync("./source.gpx", { encoding: "utf8", flag: "r" });
let data = fs.readFileSync("./head.gpx", { encoding: "utf8", flag: "r" });

fs.unlink('./result.gpx',function(err){

  fs.appendFileSync('result.gpx', data, function (err) {
    if (err) throw err;
  });
  
  gpx.parse(xml)
  gpx.tracks[0].points.forEach((element, index) => {
    var str = `<wpt lat="${element.lat}" lon="${element.lon}"><name>WP${index}</name></wpt>`
    fs.appendFileSync('result.gpx', str)
    console.log(index , gpx.tracks[0].points.length)
    if (index+1 >= gpx.tracks[0].points.length){
      fs.appendFileSync('result.gpx', "</gpx>")
    }
  });
});  