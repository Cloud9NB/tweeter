/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function (data) {
  const container = $('#tweets-container');
  container.empty();
  for (const tweet of data) {
    const $exampleTweets = createTweetElement(tweet);
    container.prepend($exampleTweets);
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
    <span>${timeago.format(data.created_at)}</span>
    <div>
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </div>
  </footer>
</article>`

  return $tweet;
};

const loadTweets = function () {
  $.ajax('/tweets', {
    method: 'GET'
  })
    .then((tweets) => {
      renderTweets(tweets);
    })
};

$(document).ready(function () {
  $('form.submit').on('submit', function (event) {
    event.preventDefault();
    
    if ($('#tweet-text').val() === null || $('#tweet-text').val() === '') {
      return alert('You cannot post an empty tweet');
    }
    if ($('#tweet-text').val().length > 140) {
      return alert("Your tweet exceeds the maximum characters");
    }

    console.log('Submitting tweet.');
    $.ajax('/tweets', {
      method: 'POST',
      data: $(this).serialize()
    })
      .then(function (tweet) {
        $('#tweet-text').val('')
        loadTweets();
        console.log('Tweet sent.');
      })
  });
  loadTweets();
}); 