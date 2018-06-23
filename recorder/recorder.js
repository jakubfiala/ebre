window.AudioContext = window.AudioContext || window.webkitAudioContext;

const recordButton = document.getElementById('record-button');
const UPLOAD_BASE_PATH = '/upload-recording';

const getUploadURL = ({ timestamp, lat, lng }) => {
  return `${UPLOAD_BASE_PATH}?timestamp=${timestamp}&lat=${lat}&lng=${lng}`;
};

const saveBlobAtPosition = blob => position => {
  console.log(blob, position);

  const metadata = {
    timestamp: position.timestamp,
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };

  fetch(getUploadURL(metadata), { method: 'PUT', body: blob, mode: 'same-origin' })
    .then(response => response.ok && console.log('upload successful'))
    .catch(err => console.error(`Upload error: ${err}`));
};

const saveRecording = (recorder, blob) => {
  navigator.geolocation
    .getCurrentPosition(
      saveBlobAtPosition(blob),
      err => console.error(err),
      { enableHighAccuracy: true });
};

const stopRecording = recorder => {
  return function stopHandler(e) {
    recorder.onComplete = saveRecording;
    recorder.finishRecording();

    const button = e.target;
    button.innerText = 'Start Recording';
    button.removeEventListener('click', stopHandler);
    button.addEventListener('click', startRecording(recorder));
  };
};

const startRecording = recorder => {
  return function startHandler(e) {
    const button = e.target;
    recorder.startRecording();
    button.innerText = 'Stop Recording';

    button.removeEventListener('click', startHandler);
    button.addEventListener('click', stopRecording(recorder));
  };
};

const initialiseRecorder = audio => stream => {
  recordButton.hidden = false;

  const source = audio.createMediaStreamSource(stream);

  const recorder = new WebAudioRecorder(source, { workerDir: "lib/web-audio-recorder/" });
  recorder.setEncoding('mp3');

  recordButton.addEventListener('click', startRecording(recorder));
};


const startButton = document.getElementById('start-button');
startButton.addEventListener('click', e => {
  const audio = new AudioContext();

  navigator.mediaDevices
    .getUserMedia({ audio: true, video: false })
    .then(initialiseRecorder(audio));
})
