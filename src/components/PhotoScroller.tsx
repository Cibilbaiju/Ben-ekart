
import React from "react";

interface Photo {
  src: string;
  alt: string;
}

interface PhotoScrollerProps {
  photos: Photo[];
}

export const PhotoScroller: React.FC<PhotoScrollerProps> = ({ photos }) => (
  <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-primary animate-fade-in mb-10">
    <div className="flex space-x-6 min-w-max px-2">
      {photos.map((photo, idx) => (
        <img
          key={idx}
          src={photo.src}
          alt={photo.alt}
          className="h-48 w-auto rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
          draggable={false}
        />
      ))}
    </div>
  </div>
);
