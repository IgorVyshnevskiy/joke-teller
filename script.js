const btnEl = document.getElementById('btn');
const audioElement = document.getElementById('audio');

function toggleBtn() {
  btnEl.disabled = !btnEl.disabled;
}

function tellMeJoke(joke) {
  VoiceRSS.speech({
    key: 'f89b093068ec444b88b7d86c996ecb3b',
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
}

async function getJokesFromApi() {
  const API_URL = 'https://v2.jokeapi.dev/joke/Programming';
  let joke = '';
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    tellMeJoke(joke);
    toggleBtn();
  } catch (err) {
    console.error(err);
  }
}

btnEl.addEventListener('click', getJokesFromApi);
audioElement.addEventListener('ended', toggleBtn);
