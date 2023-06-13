import React from 'react';

export default function Loading() {
  const [text, setText] = React.useState('.');
  let intrvl = null;

  React.useEffect(() => {
    intrvl = setInterval(() => {
      setText((t) => {
        if (t.length === 100)
          return '.'
        return t + '.';
      })
    }, 5);

    return () => clearInterval(intrvl);
  }, [])

  return (
    <h2>{text}</h2>
  );
}