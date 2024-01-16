import React, { useRef, useState, useEffect } from 'react';
import { useSearchContext } from '../context/SearchContext';

// Components
import { ProgressBar } from './ProgressBar';
import { VolumeControl } from './VolumeControl';

//images
import Pause from '../img/pause.png'

export function Player() {
  const { playing, setPlaying, volume, setVolume } = useSearchContext();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, [playing]);
 

 const handleVolumeChange = (volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  };


  const pauseAudio = () => {
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current?.pause();
    }
  };
  

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  useEffect(() => {
    if (playing && typeof playing.duration === 'number' && !isNaN(playing.duration)) {
      setDuration(playing.duration);
    } else {
      setDuration(null);
    }

    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, [playing]);

  return (
    <div>
      {playing && (
        <div className="fixed z-50 bottom-0 w-full bg-white shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
          <div className="md:flex px-8 py-4 w-full">
            <div className="flex items-center w-full md:w-3/12">
              <img className="h-10 md:h-20 w-10 md:w-20 rounded-md shadow-md" src={playing?.album.cover_medium} alt={playing?.title} />
              <div className="text-left ml-4">
                <p className="font-semibold text-lg">{playing.title}</p>
                <p className="font-light text-lg">{playing.artist.name}</p>
              </div>
            </div>
            <div className="items-center md:w-7/12">
              <div className="flex items-center justify-center">
                <button onClick={pauseAudio} className="text-white font-bold text-2xl">
                  <img className='w-8' src={Pause} />
                </button>
              </div>
              <audio ref={audioRef} src={playing.preview} />
              {duration !== null && !isNaN(duration) && (
                <ProgressBar audioRef={audioRef} currentTime={currentTime} duration={duration} />
              )}
            </div>
            <VolumeControl onVolumeChange={handleVolumeChange} />
          </div>
        </div>
      )}
    </div>
  );
}
