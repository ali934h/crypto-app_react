// Layout.jsx

import { IoMdHeart } from "react-icons/io";

function Layout({ children }) {
  return (
    <div className="flex flex-col items-center justify-center bg-slate-900 text-white">
      <div className="container flex h-full min-h-screen flex-col gap-y-3 py-4">
        {/* Header section */}
        <header className="flex items-center justify-between rounded-md bg-violet-800 px-3 py-2 text-lg font-bold text-white">
          <h1 className="text-xl font-bold">Crypto App</h1>
          {/* External link to the developer's website */}
          <a target="_blank" href="https://alihosseini.dev" rel="noreferrer">
            alihosseini.dev
          </a>
        </header>

        {/* Main content section */}
        {children}

        {/* Footer section */}
        <footer className="flex items-center justify-center gap-x-1 rounded-md bg-violet-800 py-2 text-center text-xs font-medium text-white">
          <span>
            © 2024 Ali Hosseini. All rights reserved. Designed and developed by
            Ali Hosseini.
          </span>
        </footer>
      </div>
    </div>
  );
}

export default Layout;
