if ("webkitSpeechRecognition" in window) {
  let speechRecognition = new webkitSpeechRecognition();

  speechRecognition.continuous = true;
  speechRecognition.interimResults = true;
  speechRecognition.lang = document.querySelector("#select_dialect").value;

  speechRecognition.onstart = () => {
    document.documentElement.classList.add('sr-running')
    document.querySelector("#status").style.display = "block";
  };
  speechRecognition.onerror = () => {
    document.querySelector("#status").style.display = "none";
    console.log("Speech Recognition Error");
  };
  speechRecognition.onend = () => {
    document.querySelector("#status").style.display = "none";
    document.documentElement.classList.remove('sr-running')
    console.log("Speech Recognition Ended");
  };

  speechRecognition.onresult = (event) => {
    let interim_transcript = "";
    let final_transcript = "";

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }

    const textNode = document.createTextNode(final_transcript);
    const paragraph = document.createElement("p");
    paragraph.appendChild(textNode);
    document.querySelector("#final").appendChild(paragraph);
    paragraph.scrollIntoView();

    document.querySelector("#interim").innerHTML = interim_transcript;
  };

  document.querySelector("#start").onclick = () => {
    speechRecognition.lang = document.querySelector("#select_dialect").value;
    speechRecognition.start();
  };
  document.querySelector("#stop").onclick = () => {
    speechRecognition.stop();
  };
  document.querySelector("#clear").onclick = () => {
    document.querySelector("#final").innerHTML = '';
    document.querySelector("#interim").innerHTML = '';
  };
} else {
  console.log("Speech Recognition Not Available");
}
