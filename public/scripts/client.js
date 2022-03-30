/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
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
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

const renderTweet = function (data) {
  for (const tweet of data) {
    const exampleTweets = createTweetElement(tweet);
    $('#tweets-container').append(exampleTweets);
  }
};

const createTweetElement = function (data) {
  const $tweet =
    `<article class="tweet">
  <header>
    <div class="user">
      <p><img src="${data.user.avatars}" alt="">${data.user.name}</p>
    </div>
    <h4>${data.user.handle}</h4>
  </header>
  <p>${data.content.text}</p>
  <footer>
    <span>${data.created_at}</span>
    <div>
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </div>
  </footer>
</article>`

  return $tweet;
};

$(document).ready(function () {
  $('form.submit').on('submit', function (event) {
    console.log('Submitting tweet.');
    event.preventDefault();
    $.ajax('/tweets', {
      method: 'POST',
      data: $(this).serialize()
    })
      .then(function (tweet) {
        console.log('Tweet sent.');
        $('#tweet-text').val('')
      })
  });
  renderTweet(data);
}); 