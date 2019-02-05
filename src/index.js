import $ from 'jquery'

const getTopWord = () => {
  $('#topWord').html('');

  fetch('https://wordwatch-api.herokuapp.com/api/v1/top_word')
    .then(response => response.json())
    .then(word_returned => setTopWord(word_returned))
    .catch(error => console.error({ error }));
};

function setTopWord(top_word){
  let word = top_word.word;
  $("#topWord").append(`${word}`);
}

$(document).ready(() => {
  $( window ).on( "load", getTopWord );
})
