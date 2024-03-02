import React, { useEffect, useState } from 'react'
import './App.css'

function App() {
const [brk, setBrk] = useState(5)
const [sessionlength, setSessionLength] = useState(25)
const [play, setPlay] = useState(false)
const [timetype, setTimetype] = useState("Session")
const [timeLeft, setTimeLeft] = useState(1500)

const timeout = setTimeout(() => {
  if(timeLeft && play){
    setTimeLeft(timeLeft - 1)
  }
}, 1000);

const increaseBreak = () =>{
  if(brk < 60){
    setBrk(brk + 1)
  }
}

const decreaseBreak = () =>{
  if(brk > 1){
    setBrk(brk - 1)
  }
}

const increaseSessionLen = () => {
  if(sessionlength < 60){
    setSessionLength(sessionlength + 1)
    setTimeLeft(timeLeft + 60)
  }
}

const decreaseSessionLen = () => {
  if(sessionlength > 1){
  setSessionLength(sessionlength - 1)
  setTimeLeft(timeLeft - 60)
  }
}


const resetHandle = () => {
  clearTimeout(timeout);
  setPlay(false);
  setTimeLeft(1500);
  setBrk(5);
  setSessionLength(25);
  setTimetype("Session");
  const audio = document.getElementById("beep");
  audio.pause()
  audio.currentTime = 0;
}

const playHandle = () => {
  clearTimeout(timeout)
  setPlay(!play)
}

const resetTimerType = () => {
  const audio = document.getElementById("beep");
  if(!timeLeft && timetype === "Session"){
    setTimeLeft(brk * 60)
    setTimetype("Break")
    audio.play()
  }
  if(!timeLeft && timetype === "Break"){
    setTimeLeft(sessionlength * 60)
    setTimetype("Session")
    audio.pause();
    audio.currentTime = 0;
  }
}

const timerDisplay = () => {
  if(play){
    timeout
    resetTimerType()
  }else{
    clearTimeout(timeout)
  }
}


useEffect(() =>{
timerDisplay()

}, [play, timeLeft, timeout])


const formatedTime = () => {
  const min = Math.floor(timeLeft / 60)
  const secs = timeLeft - min * 60
  const formatedMin = min < 10 ? "0" + min : min
  const formatedSecs = secs  < 10 ? "0" + secs : secs
  return `${formatedMin}:${formatedSecs}`
}  



  return (
  <main>
    <h1>25 + 5 O'Clock</h1> 
    <div className="break-session-cover">
    <div id="break">
    <h2 id='break-label'>Break length</h2>
    <div className="btn">
    <button id='break-decrement' disabled={play} onClick={decreaseBreak}>-</button><span id='break-length'>{brk}</span><button id='break-increment' onClick={increaseBreak} disabled={play}>+</button>
    </div>
    </div>
    <div id='Session length'>
    <h2 id='session-label'>Session Length</h2>
    <div className="btn">
    <button id='session-decrement' onClick={decreaseSessionLen} disabled={play}>-</button><span id='session-length'>{sessionlength}</span><button id='session-increment' onClick={increaseSessionLen} disabled={play}>+</button> 
    </div>
    </div>    
    </div>
    <div id='timer'>
    <h1 id='timer-label'>{timetype}</h1>
    <h1 id='time-left'>{formatedTime()}</h1>
    <audio id='beep' src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"></audio>
    <div className="btn">
    <button id='start_stop' onClick={playHandle}>Pause/Play</button><button id='reset' onClick={resetHandle}>Reset</button>
    </div>
    </div>    

  </main>
  )
}

export default App
