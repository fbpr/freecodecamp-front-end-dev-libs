import { useState, useEffect } from 'react';
import { audios } from './drum-pad.jsx';
import './App.css';

function DrumPad({ audio: { keyCode, key, id, url }, play, i }) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.keyCode === keyCode) {
        play(key, id);
        setIsActive((current) => !current);
        setTimeout(function () {
          return setIsActive((current) => !current);
        }, 100);
      }
    };

    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [id, key, keyCode, play]);

  return (
    <div
      className="drum-pad"
      id={id}
      key={i}
      onClick={() => (
        play(audios[i].key, audios[i].id),
        setIsActive((current) => !current),
        setTimeout(() => setIsActive((current) => !current), 100)
      )}
      style={{
        backgroundColor: isActive ? 'orange' : 'grey',
        marginTop: '10px',
        boxShadow: 'black 3px 3px 5px',
      }}
    >
      <audio src={url} className="clip" id={key}></audio>
      {audios[i].key}
    </div>
  );
}

function DrumControl({ name }) {
  return <p id="display">{name}</p>;
}

function App() {
  const [audioName, setAudioName] = useState('');

  const play = (key, audioName) => {
    const audio = document.getElementById(key);
    if (audio) {
      audio.currentTime = 0;
      audio.play();
      setAudioName(audioName);
    }
  };

  return (
    <>
      <div className="inner-container" id="drum-machine">
        <div className="pad-bank">
          {audios.map((audio, i) => (
            <DrumPad audio={audio} play={play} key={i} i={i} />
          ))}
        </div>
        <div className="controls-container">
          <DrumControl name={audioName} />
        </div>
      </div>
    </>
  );
}

export default App;
