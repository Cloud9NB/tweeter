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

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function (data) {
  const $tweet =
    `<article class="tweet">
  <header>
    <div class="user">
      <p><img src="${escape(data.user.avatars)}" alt="">${escape(data.user.name)}</p>
    </div>
    <h4>${escape(data.user.handle)}</h4>
  </header>
  <p>${escape(data.content.text)}</p>
  <footer>
    <span>${escape(timeago.format(data.created_at))}</span>
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
      return $('.errors').text('Please enter a valid tweet.').slideDown();
    }
    if ($('#tweet-text').val().length > 140) {

      return $('.errors').text('Your Tweet exceeds the maximum characters').slideDown();
    }
    $('.errors').hide()
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