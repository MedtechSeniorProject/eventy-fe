import { useTimer } from 'react-timer-hook';

interface TimerProps{
    expiryTimestamp: Date;
}

function MyTimer({ expiryTimestamp } : TimerProps) {

  const {
    seconds,
    minutes,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

  return (
    <div>
      <div className='font-medium text-lg'>
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>
    </div>
  );
}

function Timer(){
    const time= new Date();
    time.setSeconds(time.getSeconds() + 120);

    return <MyTimer expiryTimestamp={time} />
}

export default Timer;