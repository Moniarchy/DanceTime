  class Timer {
  constructor( timeLeft ) {
    this.timeLeft = timeLeft
  }

  displayTimeLeft(num=15) {
    document.getElementsByClassName('timer-body')[0].innerHTML = num + ":00"
    // get the element by its id and update the div
    // first hardcode something in
    // then allow the user to give input to change the time.
    // the above comes later
  }

  // reset timeLeft
  //
  // start timer
  //
  // stop timer
  //
  // pause timer

}

document.addEventListener("DOMContentLoaded", function(event) {
  new Timer().displayTimeLeft();
});
