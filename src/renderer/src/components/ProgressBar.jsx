import { useState } from 'react';
import { useStore } from '../store';

export default function ProgressBar() {
  const { goal, likesCount, shimmer } = useStore();

  const [barBgColor, setBarBgColor] = useState('#62a0ea');
  const [barBgChroma, setBarBgChroma] = useState('#04FF00');
  const [borderIsVisible, setBorderIsVisible] = useState(true);

  return (
    <>
      <div
        className="container"
        style={{
          backgroundColor: barBgChroma,
          border: borderIsVisible && '2px solid #555'
        }}
      >
        <div
          className="custom-bar"
          style={{
            backgroundColor: barBgColor,
            border: borderIsVisible,
            width: (parseInt(likesCount) * 100) / goal + '%'
          }}
        ></div>
        {shimmer && <div className="shimmer"></div>}
      </div>

      <div className="color-controls">
        <div className="control-unit">
          <span>Цвет прогресс-бара: </span>{' '}
          <input
            style={{ height: 20, width: 20, padding: 0, border: 0 }}
            type="color"
            onChange={(e) => setBarBgColor(e.target.value)}
            value={barBgColor}
          />
        </div>

        <div className="control-unit">
          <span>Цвет фона: </span>{' '}
          <input
            style={{
              height: 20,
              width: 20,
              padding: 0,
              border: 0
            }}
            type="color"
            onChange={(e) => setBarBgChroma(e.target.value)}
            value={barBgChroma}
          />
        </div>

        <div className="control-unit">
          <span>Граница прогресс-бара: </span>{' '}
          <input
            type="checkbox"
            onChange={() => setBorderIsVisible((prev) => !prev)}
            checked={borderIsVisible}
          />
        </div>
      </div>
    </>
  );
}
