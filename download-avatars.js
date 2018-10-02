var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb){
    getRepoContributors("jQuery", "jQuery", function(err, result){
        console.log('Error: ', err);
        console.log('Result: ', result);
    });
}