function flipTo(digit, n) {
  var current = digit.getAttribute('data-num');

  digit.setAttribute('data-num', n);
  digit.querySelector('.front').setAttribute('data-content', current);
  digit.querySelector('.back, .under').setAttribute('data-content', n);
  digit.querySelector('.flap').style.display = 'block';

  setTimeout(function () {
    var digitText = document.createTextNode(n);
    digit.querySelector('.base').appendChild(digitText);
    digit.querySelector('.flap').style.display = 'none';
  }, 350);
}

function jumpTo(digit, n) {
  var digitText = document.createTextNode(n);
  digit.setAttribute('data-num', digitText);
  digit.querySelector('.base').appendChild(digitText);
}

function updateGroup(group, n, flip) {
  var digit1 = document.querySelector('.ten' + group);
  var digit2 = document.querySelector('.' + group);
  n = String(n);

  if (n.length == 1) n = '0' + n;

  var num1 = n.substr(0, 1);
  var num2 = n.substr(1, 1);

  if (digit1.getAttribute('data-num') != num1) {
    if (flip) flipTo(digit1, num1);
    else jumpTo(digit1, num1);
  }

  if (digit2.getAttribute('data-num') != num2) {
    if (flip) flipTo(digit2, num2);
    else jumpTo(digit2, num2);
  }
}

function setTime(flip) {
  var t = new Date();
  updateGroup('hour', t.getHours(), flip);
  updateGroup('min', t.getMinutes(), flip);
  updateGroup('sec', t.getSeconds(), flip);
}

document.addEventListener("DOMContentLoaded", function () {
  setTime(false);
  setInterval(function () {
    setTime(true);
  }, 1000);
});

//Countdown function https://codepen.io/shshaw/pen/vKzoLL
/*
function CountdownTracker(label, value){

  var el = document.createElement('span');

  el.className = 'flip-clock__piece';
  el.innerHTML = '<b class="flip-clock__card card"><b class="card__top"></b><b class="card__bottom"></b><b class="card__back"><b class="card__bottom"></b></b></b>' +
    '<span class="flip-clock__slot">' + label + '</span>';

  this.el = el;

  var top = el.querySelector('.card__top'),
      bottom = el.querySelector('.card__bottom'),
      back = el.querySelector('.card__back'),
      backBottom = el.querySelector('.card__back .card__bottom');

  this.update = function(val){
    val = ( '0' + val ).slice(-2);
    if ( val !== this.currentValue ) {

      if ( this.currentValue >= 0 ) {
        back.setAttribute('data-value', this.currentValue);
        bottom.setAttribute('data-value', this.currentValue);
      }
      this.currentValue = val;
      top.innerText = this.currentValue;
      backBottom.setAttribute('data-value', this.currentValue);

      this.el.classList.remove('flip');
      void this.el.offsetWidth;
      this.el.classList.add('flip');
    }
  }

  this.update(value);
}

// Calculation adapted from https://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/

function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  return {
    'Total': t,
    'Days': Math.floor(t / (1000 * 60 * 60 * 24)),
    'Hours': Math.floor((t / (1000 * 60 * 60)) % 24),
    'Minutes': Math.floor((t / 1000 / 60) % 60),
    'Seconds': Math.floor((t / 1000) % 60)
  };
}

function getTime() {
  var t = new Date();
  return {
    'Total': t,
    'Hours': t.getHours() % 12,
    'Minutes': t.getMinutes(),
    'Seconds': t.getSeconds()
  };
}

function Clock(countdown,callback) {

  countdown = countdown ? new Date(Date.parse(countdown)) : false;
  callback = callback || function(){};

  var updateFn = countdown ? getTimeRemaining : getTime;

  this.el = document.createElement('div');
  this.el.className = 'flip-clock';

  var trackers = {},
      t = updateFn(countdown),
      key, timeinterval;

  for ( key in t ){
    if ( key === 'Total' ) { continue; }
    trackers[key] = new CountdownTracker(key, t[key]);
    this.el.appendChild(trackers[key].el);
  }

  var i = 0;
  function updateClock() {
    timeinterval = requestAnimationFrame(updateClock);

    // throttle so it's not constantly updating the time.
    if ( i++ % 10 ) { return; }

    var t = updateFn(countdown);
    if ( t.Total < 0 ) {
      cancelAnimationFrame(timeinterval);
      for ( key in trackers ){
        trackers[key].update( 0 );
      }
      callback();
      return;
    }

    for ( key in trackers ){
      trackers[key].update( t[key] );
    }
  }

  setTimeout(updateClock,500);
}

var deadline = new Date(Date.parse(new Date()) + 12 * 24 * 60 * 60 * 1000);
var c = new Clock(deadline, function(){ alert('countdown complete') });
document.body.appendChild(c.el);

var clock = new Clock();
document.body.appendChild(clock.el);

*/