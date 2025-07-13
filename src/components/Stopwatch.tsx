import { useEffect, useState } from 'react';

export function Stopwatch() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTime((prev) => prev + 1), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <p>
      Elapsed Time: <strong>{time}</strong> seconds
    </p>
  );
}
