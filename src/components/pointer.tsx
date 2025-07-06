import Lottie from 'lottie-react';
import animationData from '../components/pointer';

export default function MyComponent() {
  return (
    <div>
      <Lottie 
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ width: 400, height: 400 }}
      />
    </div>
  );
}