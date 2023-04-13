import { Glider } from './Glider/Glider';
import { GliderSlide } from './Glider/GliderSlide';

function App() {
  return (
    <div
      style={{
        width: 700,
        height: 280,
        backgroundColor: '#eee',
        margin: 'auto',
      }}
    >
      <Glider spaceBetween={20}>
        <GliderSlide>Slide 1</GliderSlide>
        <GliderSlide>Slide 2</GliderSlide>
        <GliderSlide>Slide 3</GliderSlide>
      </Glider>
    </div>
  );
}

export default App;
