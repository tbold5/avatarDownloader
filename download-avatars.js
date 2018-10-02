var request = require('request');
var secrets = require('./secrets')
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');
// request()

function downloadImageByURL(url, filePath){
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
          token: secrets.GITHUB_TOKEN
        }
    };
      request(options, function(err, res, body){
          var allData = JSON.parse(body);
          cb(err, allData)
      });
};
getRepoContributors("jquery", "jquery", function(err, result) {
    console.log("Errors:", err);
    result.forEach(function(element){
        downloadImageByURL(element.avatar_url, './avatarImages/' + element.id + '.jpg');
        //console.log(element.avatar_url);
    })
});


//  1. getRepoContributors makes a request for JSON, getting back an array of contributors.
// getRepoContributors passes this data to cb, an anonymous callback function that it is given.
// 2. cb loops through each item in the array:
// 3. It constructs a file path using the login value (e.g., "avatars/dhh.jpg")
// 4. It then passes the avatar_url value and the file path to downloadImageByURL
// downloadImageByURL fetches the desired avatar_url and saves this information to the given filePath