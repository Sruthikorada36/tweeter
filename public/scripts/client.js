/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from initial-tweets.json
// const data = [
//     {
//       "user": {
//         "name": "Newton",
//         "avatars": "https://i.imgur.com/73hZDYK.png"
//         ,
//         "handle": "@SirIsaac"
//       },
//       "content": {
//         "text": "If I have seen further it is by standing on the shoulders of giants"
//       },
//       "created_at": 1461116232227
//     },
//     {
//       "user": {
//         "name": "Descartes",
//         "avatars": "https://i.imgur.com/nlhLi3I.png",
//         "handle": "@rd" },
//       "content": {
//         "text": "Je pense , donc je suis"
//       },
//       "created_at": 1461113959088
//     }
//   ]
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (let tweet of tweets) {
      let $tweet =createTweetElement(tweet);
      $(document).ready(function() {
        $('.tweets-container').prepend($tweet);
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
    <h6>${moment(tweet['created_at']).fromNow()}</h6>
    </div>
    <div>
    <i class="fas fa-flag"></i>
    <i class="fas fa-retweet"></i>
    <i class="fas fa-heart"></i>
       </div>    
 </footer>
</article>`).addClass('tweet');
  // ...
  return $tweet;
}
 //function for load all tweets.
function loadTweets() {
  $.ajax({
    url: '/tweets',
    method: 'GET',
    dataType: "json",
    success: function (tweetsArray) {
      //console.log('Success POST : ', tweetsArray);
      renderTweets(tweetsArray);
    }
  });
}
// loadTweets();
$(document).ready(function() {
  $(function() {
    //get the form.
   const $form = $('#submit');
    //get the session of article.
    const $tweets = $('.container-tweets');
    const $textarea = $('#tweet-area');
    let $errSpan = $('.err-message');
    let $errSht = $('.shrterr');
    // Set up an event listener for the contact form.
    $form.submit( function(event) {
       $errSpan.slideUp(300);
       $errSht.slideUp(300);
      // Stop the browser from submitting the form.
      event.preventDefault();
      // if tweent is empty or more than 140 just display span with proper msg for 1500ms time.
      var text = $textarea.val();
      if(text === '' || text === null) {
        $errSht.text("Say sumthing guyssss !!!!!!")
        .slideToggle(400);

      } else if(text.length > 140) {
        $errSpan.text("Tweet length more than 140 characters")
        .slideToggle(400);
      } else {
        // Submit the form using AJAX.
        $.ajax({
            type: 'POST',
            url: '/tweets',
            data: $form.serialize(),
            success: function() {
              loadTweets();
            }
        })
        //empty the tweet textarea after tweet submits the post.
        $textarea.val("");
      }
    });
  });
  //when we click compose button it slideDown newtweet and with the return value of slideToggle
    // we are changing the toggle button appearance.
  $(".toggle-btn").click(() => {
    $(".new-tweet").slideToggle("slow");
    $(".new-tweet textarea").focus();
  });
  //The new tweet area is hidden until called upon
  $(".new-tweet").hide();
  
});
 
