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
  $("#topWord").append(`${word}`);
}

$(document).ready(() => {
  $( window ).on( "load", getTopWord );
})
