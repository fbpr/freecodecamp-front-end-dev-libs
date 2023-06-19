import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(1);
  const [timerType, setTimerType] = useState('Session');
  const [timer, setTimer] = useState(10);
  const [timerStatus, setTimerStatus] = useState(false);
  const audioRef = useRef(null);


  useEffect(() => {
    const switchTimer = () => {
      audioRef.current.play();
      timerType === 'Session' ? setTimerType('Break')  || setTimer(breakLength * 60) : setTimerType('Session') || setTimer(sessionLength * 60);
    }
    
    const t = setTimeout(() => {
      if (timer && timerStatus) {
        setTimer(time => time - 1);
      } else if (timer === 0) {
        switchTimer();
      }
  }, 1000);
  return () => clearTimeout(t);
}, [breakLength, sessionLength, timer, timerStatus, timerType]);




  const handleLengthControl = (e, t) => {
    const v = e.currentTarget.value;
    if (t === 'break') {
      v === '-' && breakLength !== 1
        ? setBreakLength(breakLength - 1)
        : v === '+' && breakLength !== 60 && setBreakLength(breakLength + 1);
    }
    
    if (t === 'session') {
      v === '-' && sessionLength !== 1
        ? setSessionLength(sessionLength - 1) || setTimer(timer - 60)
        : v === '+' && sessionLength !== 60 && (setSessionLength(sessionLength + 1) || setTimer(timer + 60));
    }
  }

  const handleStartStop = () => {
    setTimerStatus(prev => !prev);
  }

  const handleReset = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTimerType('Session');
    setTimer(1500);
    setTimerStatus(false);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  }



  const timerDisplay = () => {
    if (timer < 0) return "0:00";
    let minTime = Math.floor(timer / 60), secTime = timer % 60;
    return `${minTime < 10 ? "0" + minTime : minTime}:${secTime < 10 ? "0" + secTime : secTime}`
  }

  return (
    <>
      <div className="main-title">
        <h1>25 + 5 Clock</h1>
      </div>
      <div className="length-control">
        <div id="break-label">Break Length</div>
        <button className='btn-level' id="break-decrement" onClick={(e) => handleLengthControl(e, 'break')} value="-">
          <i className="fa fa-minus"></i>
        </button>
        <div className='btn-level' id="break-length">{breakLength}</div>
        <button className='btn-level' id="break-increment" onClick={(e) => handleLengthControl(e, 'break')} value="+">
          <i className="fa fa-plus"></i>
        </button>
      </div>
      <div className="length-control">
        <div id="session-label">Session Length</div>
        <button className='btn-level' id="session-decrement" onClick={(e) => handleLengthControl(e, 'session')} value="-">
          <i className="fa fa-minus"></i>
        </button>
        <div className='btn-level' id="session-length">{sessionLength}</div>
        <button className='btn-level' id="session-increment" onClick={(e) => handleLengthControl(e, 'session')} value="+">
          <i className="fa fa-plus"></i>
        </button>
      </div>
      <div className="timer">
        <div className="timer-wrapper">
          <div id="timer-label">{timerType}</div>
          <div id="time-left">{timerDisplay()}</div>
        </div>
        <div className="timer-control">
          <button id="start_stop" onClick={handleStartStop}>
            {timerStatus ? <i className="fa fa-pause"></i> : <i className="fa fa-play"></i>}
          </button>
          <button id="reset" onClick={handleReset}>
            <i className="fa fa-refresh"></i>
          </button>
        </div>
        <audio id="beep" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" ref={audioRef}></audio>
      </div>
    </>
  );
}

export default App;
