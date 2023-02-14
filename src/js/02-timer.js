import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix';

let userDate = null;
const start = document.querySelector('button[data-start]');
start.setAttribute('disabled', true);

const input = document.querySelector('#datetime-picker');
const timerElement = document.querySelector('.timer');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notify.failure('Please choose a date in the future');
      userDate = new Date();
    } else {
      start.removeAttribute('disabled');
      userDate = selectedDates[0];
    }
  },
};

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

class Timer {
  constructor() {
    this.isActive = false;
    this.timerId = null;
  }
  timerStart() {
    this.isActive = true;
    this.timerId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = userDate - currentTime;
      const numbers = convertMs(deltaTime);

      seconds.textContent = numbers.seconds;
      minutes.textContent = numbers.minutes;
      hours.textContent = numbers.hours;
      days.textContent = numbers.days;
      if (deltaTime <= 0) {
        this.timerStop();
        timerElement.innerHTML = 'Time is over!';
      }
    }, 1000);
  }
  timerStop() {
    clearInterval(this.timerId);
  }
}

const timer = new Timer();
flatpickr(input, options);
start.addEventListener('click', () => timer.timerStart());
