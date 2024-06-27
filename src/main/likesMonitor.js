import { getMainWindow } from './window.js';

let likes = 0;
let url = '';
let timer = 0;
let timerCountInterval;
let interval;

const timerInterval = () => {
  timerCountInterval = setInterval(() => {
    timer++;
    console.log(timer);
  }, 1000);
};

function getRandomNum() {
  return 10 + Number((Math.random() * 5).toFixed(1));
}

export const getLikes = async (url, prevCount) => {
  try {
    const mainWindow = getMainWindow();
    const response = await fetch(url);
    const data = await response.text();

    const reLikes = /"iconName":"LIKE",[^}]*"onTap"/g;
    const parsedContent = data.match(reLikes);
    const likesCount = parseInt(String(parsedContent[0]).match(/\d/g).join(''), 10);

    if (likesCount !== prevCount) {
      likes = likesCount;
      mainWindow.webContents.send('update-likes', likesCount);

      console.log('got new likes count: ', likesCount);
    } else {
      console.log('random number is: ', getRandomNum());
      console.log('got old likes count');
    }
  } catch (error) {
    console.error(error);
  }
};

const startInterval = () => {
  interval = setInterval(() => {
    const startTime = Date.now();
    getLikes(url, likes);

    const endTime = Date.now();
    const executionTime = endTime - startTime;
    timer = 0;
    if (executionTime > getRandomNum()) {
      console.warn('getLikes function took longer than 10 seconds to execute');
    }
  }, getRandomNum() * 1000);
};

export function startMonitoring(newUrl) {
  clearInterval(interval);
  clearInterval(timerCountInterval);

  url = newUrl;
  getLikes(newUrl, likes);

  startInterval();
  timerInterval();

  return { status: 'Monitoring started', url: newUrl };
}

export function stopMonitoring() {
  clearInterval(interval);
  clearInterval(timerCountInterval);
  console.log('Monitoring stopped');

  return { status: 'Monitoring stopped' };
}

export function getLikesCount() {
  return likes;
}
