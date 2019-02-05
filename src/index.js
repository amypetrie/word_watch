import $ from 'jquery'

const getTopWord = () => {
  $('#topWord').html('');
  fetch('https://wordwatch-api.herokuapp.com/api/v1/top_word')
    .then(response => response.json())
    .then(word_returned => setTopWord(word_returned))
    .catch(error => console.error({ error }));
}

function setTopWord(top_word){
  var word_obj = top_word.word;
  var word = Object.keys(word_obj);
  var count = Object.values(word_obj);
  $("#topWord").append(`<b>${word}</b> ${count} times`);
}

function addNewWords(input){
  var wordArray = String(`${input}`).split(" ");
  $.each(wordArray, function(index, value) {
    addSingleWord(value);
  });
}

function addSingleWord(single_word){
  var data = {};
  var wordNew = {"value": `${single_word}`};
  data.word = wordNew;

  var json = JSON.stringify(data);
  var xhr = new XMLHttpRequest();
  xhr.open("POST", 'https://wordwatch-api.herokuapp.com/api/v1/words', true);
  xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
  xhr.onload = function () {
     if (xhr.readyState == 4 && xhr.status == "201") {
       alert(`Add successful for ${single_word}`);
     } else {
       alert(`Add failed for ${single_word}`);
     }
  }
  xhr.send(json);
}

$(document).ready(() => {
  $( window ).on( "load", getTopWord );

  $("#breakdownButton").on('click', e => {
    e.preventDefault();
    var text_input = $.trim($("#inputText").val());
    addNewWords(text_input);
  });
});
