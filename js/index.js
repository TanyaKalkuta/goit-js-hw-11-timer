import refs from './refs.js'


class CountdownTimer{
  constructor({onTick}, date) {
    this.intervalId = null;
    this.isActive = false;
    this.onTick = onTick;
    this.date = date;
    this.init();
  }

  init() {
    const time = this.getTimeComponents(0);
    this.onTick(time);
  }

  start() {
    if (this.isActive) {
      return;
    }

    const targetDate = new Date(this.date);
    this.isActive = true;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now()
      const deltaTime = targetDate - currentTime;
      const time = this.getTimeComponents(deltaTime);
     // updateTimer(time);
      this.onTick(time);
      console.log(time);
    }, 1000);
  }

  
  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
    const time = this.getTimeComponents(0);
    this.onTick(time);
  }

  getTimeComponents(time) {
  const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
  const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }

}


const timer = new CountdownTimer({
  onTick: updateTimer,
}, 'Jul 04 2021');


refs.startBtn.addEventListener('click', timer.start.bind(timer));

refs.stoptBtn.addEventListener('click', timer.stop.bind(timer));



function updateTimer({days, hours, mins, secs }) {
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.mins.textContent = mins;
    refs.secs.textContent = secs;
}
