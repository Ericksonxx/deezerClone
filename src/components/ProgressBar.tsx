interface ProgressBarProps {
    currentTime: number;
    duration: number;
    audioRef: React.RefObject<HTMLAudioElement | null>;
  }
  
  export function ProgressBar({ audioRef, currentTime }: ProgressBarProps) {
      return (
        <div className="flex items-center w-[80%] m-auto">
          <span className="mr-2 text-sm text-gray-500">{formatDuration(currentTime)}</span>
          <div className="w-full h-2 bg-[#ffdee2] rounded-full">
            <div
              className="w-[50%] h-2 bg-[#EF5466] rounded-full"
              style={{ width: `${(currentTime / (audioRef.current!.duration || 1)) * 100}%` }}
            ></div>
          </div>
          <span className="ml-2 text-sm text-gray-500">{formatDuration(audioRef.current!.duration)}</span>
        </div>
      );
    }
  
  // format into mm:ss format
  function formatDuration(duration: number): string {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }