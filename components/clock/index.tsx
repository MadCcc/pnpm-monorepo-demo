import { FC, useEffect, useState } from 'react';
import moment from 'moment';

const getFormattedTime = () => moment().format('hh:mm:ss');

const Clock: FC = () => {
  const [time, setTime] = useState<string>(getFormattedTime())

  useEffect(() => {
    const timer = () => {
      setTime(getFormattedTime());
      requestAnimationFrame(timer);
    }
    timer();
  }, [])

  return (
    <div
      style={{
        width: 200,
        height: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '80px',
        fontWeight: 'bold'
      }}
    >
      {time}
    </div>
  )
}

export default Clock;