console.log('Character count as been loaded into index.html');

$(document).ready(function() {
  $("#tweet-text").keyup(function() {
    const keyCount = $(this).val().length;
    const counterLog = $(this).parent().find(".counter");
    counterLog.val(140 - keyCount);
    if (keyCount >= 0 && keyCount < 140) {
      counterLog.css({"color": "#545149"});
    } else {
      counterLog.css({"color": "red"});
    }
  })
})