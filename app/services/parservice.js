'use strict';

angular.module('myApp.parseService', []).factory('parseService', function($http) {
    return {
        parsePosts: function(data) {
          //This takes in the array of posts from posts.json and parses which posts needs tobe where
          //This is all done at once and at one time so that re-clicking on the selector won't go through the
          //fetch and parse process again
          var parsed = {
            topPosts: [],
            otherPosts: [],
            summaryPosts: [],
            dailyPost: {}
          }
          data.forEach(function(post) {
            //This iterates through the posts at one time so that there isn't a need to iterate
            //through the posts again to get the different types
            if (parseInt(post.comments) > 9 && parseInt(post.views) > 9000 &&
            post.title.length < 40 && post.privacy == "public") {
              parsed.topPosts.push(post);
            } else {
              parsed.otherPosts.push(post);
            }
            if (!parsed.dailyPost[post.timestamp.slice(0,10)] ||
            parsed.dailyPost[post.timestamp.slice(0,10)].likes < post.likes) {
              parsed.dailyPost[post.timestamp.slice(0,10)] = post;
            }
            parsed.summaryPosts.push(post.id)
          })
          return parsed;
        },
        parseObjToArray: function(obj) {
          // This logic could easily be in either the controller or in the parsePosts function
          // however as this is reuseable code for converting objects to arrays we decided to
          //make it it's own utility function
          var arr = []
          Object.keys(obj).forEach(function(key) {
            arr.push(obj[key]);
          })
          return arr
        }

    };
});
