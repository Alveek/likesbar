import { useStore } from './store';
import { useEffect, useState } from 'react';
import ProgressBar from './components/ProgressBar';

const { ipcRenderer } = window.electron;

function App() {
  const { setShimmer, likesCount, setLikesCount, goal, setGoal } = useStore();
  const [url, setUrl] = useState('');

  useEffect(() => {
    setShimmer(true);

    const handleUpdateLikes = (event, newCount) => {
      setLikesCount(newCount);
    };

    ipcRenderer.on('update-likes', handleUpdateLikes);

    const shimmerTimeout = setTimeout(() => {
      setShimmer(false);
    }, 700);

    return () => {
      ipcRenderer.off('update-likes', handleUpdateLikes);
      clearInterval(shimmerTimeout);
    };
  }, [likesCount, setShimmer]);

  const onStart = async (e) => {
    e.preventDefault();
    const response = await ipcRenderer.invoke('start-monitoring', url);
    console.log(response);
    setGoal(goal);
  };

  const onStop = async () => {
    const response = await ipcRenderer.invoke('stop-monitoring');
    console.log(response);
  };

  return (
    <div className="App">
      <p className="goal-counter-text">
        Количество лайков: {likesCount} / {goal}
        {likesCount >= goal && <span className=""> - Цель достигнута!</span>}
      </p>

      <form onSubmit={onStart}>
        <div className="input-fields">
          <input
            className="goal-input"
            type="number"
            placeholder="Цель"
            onChange={(e) => {
              setGoal(e.target.value);
            }}
            value={goal}
            required
          />

          <input
            style={{ width: '400px' }}
            type="url"
            placeholder="Ссылка на стрим"
            onChange={(e) => {
              setUrl(e.target.value);
            }}
            value={url || ''}
            required
          />
        </div>

        <div className="button-group">
          <button type="submit">Старт</button>
          <button type="button" onClick={onStop}>
            Стоп
          </button>
        </div>
      </form>

      <ProgressBar />
    </div>
  );
}

export default App;
