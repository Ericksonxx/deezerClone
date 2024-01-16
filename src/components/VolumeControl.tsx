import React, { useEffect } from 'react';
import { useSearchContext } from '../context/SearchContext';

//images
import Speaker from '../img/speaker.png';

interface VolumeControlProps {
  onVolumeChange: (volume: number) => void;
}

export const VolumeControl: React.FC<VolumeControlProps> = ({ onVolumeChange }) => {
  const { volume, setVolume } = useSearchContext();

  //set volume to 80 by default
  useEffect(() => {
    setVolume(80);
  },[])

  //handle volume change
  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(event.target.value);
    setVolume(newVolume);
    onVolumeChange(newVolume);
  };

  //mask to color the % of selected volume
  const volumeMaskStyle = {
    background: `linear-gradient(to right, #EF5466 ${Number(volume ?? 0)}%, #ffdee2 ${Number(volume ?? 0)}%)`,
  };
  

  return (
    <div className='items-center m-auto p-2 hidden md:flex relative'>
      <img className='mr-2' src={Speaker} alt='speaker' />
      <input
        type="range"
        id="volumeSlider"
        name="volume"
        min={0}
        max={100}
        onChange={handleVolumeChange}
        className='appearance-none rounded-full w-full z-0 appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:red-100 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:w-[10px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#EF5466]'
        style={volumeMaskStyle}
      />
      <div className='absolute top-0 left-0 right-0 bottom-0 z-10 pointer-events-none'></div>
    </div>
  );
};
