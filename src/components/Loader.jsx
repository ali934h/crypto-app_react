// Loader.jsx

import { LuLoader2 } from "react-icons/lu";

function Loader() {
  return (
    <>
      {/* Background overlay to indicate loading state */}
      <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-slate-400 opacity-60"></div>

      {/* Loader icon positioned at the center */}
      <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
        <LuLoader2 className="animate-spin text-5xl text-red-600" />
      </div>
    </>
  );
}

export default Loader;
