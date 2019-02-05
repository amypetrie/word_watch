import $ from 'jquery'

const getTopWord = () => {
  $('#topWord').html('');

  fetch('https://wordwatch-api.herokuapp.com/api/v1/top_word')
    .then(response => response.json())
    .then(word_returned => setTopWord(word_returned))
    .catch(error => console.error({ error }));
};

function setTopWord(top_word){
  var word_obj = top_word.word;
  var word = Object.keys(word_obj);
  var count = Object.values(word_obj);
  $("#topWord").append(`<b>${word}</b> ${count} times`);
}


$(document).ready(() => {
  $( window ).on( "load", getTopWord );

  $("#breakdownButton").on('click', e => {
    e.preventDefault();
    var text_input = $.trim($("#inputText").val());
    console.log(`${text_input}`);
  });

})
