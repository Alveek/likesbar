import styled from 'styled-components';
import { useState } from 'react';
import { useStore } from '../store';

const StyledProgressBarContainer = styled.div`
  position: relative;
  margin-top: 40px;
  height: 50px;
  width: 350px;
  overflow: hidden;
  color: ${(props) => props.$inputColor || '#BF4F74'};
  background: ${(props) => props.$barBgChroma};
  border: ${(props) => props.$borderIsVisible && '2px solid #555'};
`;

const StyledProgressBar = styled.div`
  height: 50px;
  width: 0%;
  background: ${(props) => props.$barBgColor};
  width: ${(props) => (parseInt(props.$likesCount) * 100) / props.$goal + '%'};
  transition: all 0.7s ease;
`;

export default function ProgressBar() {
  const { goal, likesCount, shimmer } = useStore();

  const [barBgColor, setBarBgColor] = useState('#62a0ea');
  const [barBgChroma, setBarBgChroma] = useState('#04FF00');
  const [borderIsVisible, setBorderIsVisible] = useState(true);

  return (
    <>
      <StyledProgressBarContainer $barBgChroma={barBgChroma} $borderIsVisible={borderIsVisible}>
        <StyledProgressBar $barBgColor={barBgColor} $likesCount={likesCount} $goal={goal} />
        {shimmer && <div className="shimmer"></div>}
      </StyledProgressBarContainer>

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
