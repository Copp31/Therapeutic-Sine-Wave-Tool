import { useState } from 'react';
import SliderSoundWave from './components/SlideSoundWave/sliderSoundWave';
import TextDescription from './components/TextDescription/textDescription';
import LanguageSelector from './components/LanguageSelector/languageSelector';

function App() {
  const [language, setLanguage] = useState('fr');

  return (
    <>
      <LanguageSelector language={language} onChange={setLanguage} />
      <SliderSoundWave language={language} />
      <TextDescription language={language} />
    </>
  );
}

export default App;
