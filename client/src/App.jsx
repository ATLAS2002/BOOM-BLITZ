import { useMemo, useReducer, useState } from 'react';
import './App.css';

import Block from './components/Block'
import generateBoard from './utils/logic'

const App = () => {

  const reducer = (board, action) => {
    if(action.type === 'REFRESH') {
      return generateBoard(action.payload);
    }
    if(action.type === 'REVEAL') {
      const updatedBoard = [...board];
      updatedBoard[action.payload].revealed = true;
      return updatedBoard;
    }
  }

  const [count, setcount] = useState(10);
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(false);
  const [board, dispatch] = useReducer(reducer, []);

  const refreshBoard = (() => {
    dispatch({ type: 'REFRESH', payload: count });
    if(showLoadingAnimation) return;
    setShowLoadingAnimation(true);
    setTimeout(()=>setShowLoadingAnimation(false), 3000);
  })
  
  const revealBlock = pos => dispatch({ type: 'REVEAL', payload: pos });

  const revealWaterStream = pos => {
    
  }

  useMemo(()=>{
    refreshBoard();
  }, [count]);
  
  return (
    <>
      <div className="btn">
        <button className="dcr" onClick={()=>setcount(count-1)}>-</button>
          <h1> {count}x{count} </h1>
        <button className="inc" onClick={()=>setcount(count+1)}>+</button>
      </div>
      <div className="main">
        <div className={`board ${showLoadingAnimation ? 'shine':''}`} style={{'--block-count' : count}}>
          {
            board.map((block, index) => 
              <Block key={index} pos={block.pos} shade={block.shade} type={block.type} bombs={block.neighbours}
              isRevealed={block.revealed} onClick={revealBlock} />)
          }
        </div>
      </div>
      <button className="reset" onClick={refreshBoard}>RESET</button>
    </>
  )
}

export default App
