import React from 'react';
import Counter from './Counter';
import ReducerSample from './ReducerSample';
import { SampleProvider } from './SampleContext';

const App: React.FC = () => {
  return (
    // <Counter />
    <SampleProvider>
      <ReducerSample />
    </SampleProvider>
  );
}

export default App;
