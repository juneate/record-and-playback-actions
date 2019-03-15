// **** HIGH-LEVEL STEPS TO COMPLETE ****
// When you press ENTER start recording mouse movements every X ms
// When you press ENTER again, stop recording
// Hit a "playback button" to start playing it back again
    // Disable recording option during this time
// Hit "pause" during playback to stop the playback
// Now can it be any event?
    // Keep a running clock of the recording, add events at the timestamp, minus the last event timestamp?
// Create an array of recordings, each recording gets added to a playlist in the top right

let movements = [
  // {x: 100, y: 200, dur:500},
  // {x: 160, y: 100, dur:1000},
  // {x: 180, y: 120, dur:800},
  // {x: 200, y: 150, dur:1200},
];

let i = 0;
let recording = false;
let recordingspeed = 200; //ever X ms (lower means more recordings)
const mousePos = {x: 0, y: 0};

function doAMove(left, top, dur) {
  document.getElementById('mouse').style.left = left + `px`;
  document.getElementById('mouse').style.top = top + `px`;
  document.getElementById('mouse').style.transitionDuration = dur + `ms`;
  
  setTimeout(() => {

    if (i < movements.length-1)
      i++;
    //else  //loop
    //  i = 0;
    
    doAMove(movements[i].x, movements[i].y, movements[i].dur)
  }, dur)
}

function mousePosition(event) {
  mousePos.x = event.x;
  mousePos.y = event.y;
}

function startNewRecording(event) {
  if (!recording && event.key == 'Enter') {
    console.log( "Start recording" );
    document.getElementById('mouse').classList.remove('show');
    document.getElementById('replay').classList.remove('show');
    movements = [];
    addEventListener('mousemove', mousePosition);
    recording = setInterval(() => {  // Instead of setInterval, tie it to the framerate
      console.log(recording);
      movements.push({x: mousePos.x, y: mousePos.y, dur:100})
      
    }, 100)
  }
  else if (recording && event.key == 'Enter') {
    console.log( "Stop recording" );
    document.getElementById('replay').classList.add('show');
    removeEventListener('mousemove', mousePosition)
    clearInterval(recording);
    recording = false;
  }
}

document.addEventListener('keyup', startNewRecording)


document.getElementById('replay').addEventListener('click', event => {
  i = 0;
  document.getElementById('mouse').classList.add('show');
  doAMove(movements[i].x, movements[i].y, movements[i].dur)
})