"use client";

export const Footer = () => {

  return (
    <div className="h-16 bg-slate-800 w-full flex items-center justify-between px-4 text-white">
    
      <div className="text-sm">
        Made by <strong>Harshit Pareek</strong>
      </div>

      <div className="flex space-x-4">
        <a
          href="https://github.com/Harshitpareek741/assesment"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/harshit-pareek-b601b822a/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
};
