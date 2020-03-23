import React, { useReducer } from 'react';
import { useSampleState, useSampleDispatch } from './SampleContext';

function ReducerSample() {
  const state = useSampleState();
  const dispatch = useSampleDispatch();

  const setCount = () => dispatch({ type: 'SET_COUNT', count: 5 });
  const setText = () => dispatch({ type: 'SET_TEXT', text: 'bye' });
  const setColor = () => dispatch({ type: 'SET_COLOR', color: 'orange' });
  const toggleGood = () => dispatch({ type: 'TOGGLE_GOOD' });

  return (
    <div>
      <p><code>count: </code>{state.count}</p>
      <p><code>text: </code>{state.text}</p>
      <p><code>color: </code>{state.color}</p>
      <p><code>good: </code>{state.isGood?'true':'false'}</p>
      <div>
        <button onClick={setCount}>count</button>
        <button onClick={setText}>text</button>
        <button onClick={setColor}>color</button>
        <button onClick={toggleGood}>good</button>
      </div>
    </div>
  )
}

export default ReducerSample;