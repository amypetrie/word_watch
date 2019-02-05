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

function addSingleNewWord(single_word){
  var wordInput = $.trim($("#inputText").val());

  var data = {};
  var wordNew = {"value": `${wordInput}`};
  data.word = wordNew;

  var json = JSON.stringify(data);
  var xhr = new XMLHttpRequest();
  xhr.open("POST", 'https://wordwatch-api.herokuapp.com/api/v1/words', true);
  xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
  xhr.onload = function () {
     if (xhr.readyState == 4 && xhr.status == "201") {
       console.log("cool");
     } else {
       console.log(`Add failed`);
     }
  }
  xhr.send(json);
}
//   fetch('https://wordwatch-api.herokuapp.com/api/v1/words'), {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       name: `${document.getElementById("name").value}`,
//       hoglets: `${document.getElementById("hoglets").value}`,
//       allergies: `${document.getElementById("allergies").value}`
//     })
//     .then((response) => response.json())
//     .then(successMsg => alert(`${successMsg}`)
//     .catch(error => console.error({ error }));
//   }
// }

$(document).ready(() => {
  $( window ).on( "load", getTopWord );

  $("#breakdownButton").on('click', e => {
    e.preventDefault();
    var text_input = $.trim($("#inputText").val());
    addNewWord(text_input)
  });
});
