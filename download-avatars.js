var request = require('request');
var secrets = require('./secrets')
var fs = require('fs');
var input1 = process.argv[2];
var input2 = process.argv[3];

console.log('Welcome to the GitHub Avatar Downloader!');

function downloadImageByURL(url, filePath){
    //requests the url with a file path
    request.get(url)
    .on('error', function(err) {
        console.log('Try different url')
    }) 
    .on('response', function(response){
        console.log('Response status: ', response.statusCode);
    })
    .pipe(fs.createWriteStream(filePath));
    
}

function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
        url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
          'User-Agent': 'request',
          //joining secrets folder and accessing GITHUB TOKEN from secret folder
          token: secrets.GITHUB_TOKEN
        }
    };
      request(options, function(err, res, body){
          var allData = JSON.parse(body);
          cb(err, allData)
      });
};
getRepoContributors(input1, input2, function(err, result) {
    console.log("Errors:", err);
    //itirating through avatar_url using forEach function.
    result.forEach(function(element){
        downloadImageByURL(element.avatar_url, './avatarImages/' + element.id + '.jpg');
        //console.log(element.avatar_url);
    })
});