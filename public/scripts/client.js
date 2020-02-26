/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from initial-tweets.json
const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (let tweet of tweets) {
      let $tweet =createTweetElement(tweet);
      $(document).ready(function() {
        $('.container').append($tweet);
      });
    }
  };
const createTweetElement = function(tweet) {
  let $tweet = $(`<article class=“tweet”>
  <header>	
  <div>	
     <img src=${tweet.user.avatars}>      
     <h4>${tweet.user.name}</h4>
  </div>	 
   <div class="tweet-handle">	
     <h3>${tweet.user.handle}</h3>	
   </div>
 </header>	
 <span class="tweet-text">${tweet.content.text}</span>
 <footer>	
    <div>
         <h6>${tweet.created_at}</h6> 
    </div>
    <div>
         🏳️🔁💙
       </div>    
 </footer>
</article>`).addClass('tweet');
  // ...
  return $tweet;
}

renderTweets(data);