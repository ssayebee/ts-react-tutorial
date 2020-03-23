import React from 'react';

type GreetingsProps = {
  name: string;
  mark?: string;
  onClick: (name: string) => void
};

function Greetings({ name, mark = '!', onClick }: GreetingsProps) {
  const handleClick = () => onClick(name);
  return <div>
    Hello, {name} {mark}
    <div>
      <button onClick={handleClick}>Click Me</button>
    </div>
  </div>
}

export default Greetings;