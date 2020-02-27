$(document).ready(function() {
  // --- our code goes here ---
  $(".new-tweet textarea").keyup(function() {
    //console logging this within your callback function
    let value = $(this).val();
    let count = value.length;
    let counter = $(this).closest('.new-tweet').find('.counter');
    counter.text(140 - count);// reduce the count when we type text
    counter.css('color',(count > 140) ? "red" : "black"); // condition stating that if count
  });                                                       //is more that 140 turn into negative and red
});