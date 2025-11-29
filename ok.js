<iframe
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", borderRadius: "8px" }}
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title="YouTube Trailer"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>

            <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4">
                      {showGptSearch && (
                        <select className="hidden md:block p-2 bg-gray-900/80 text-white text-sm rounded-lg border border-gray-600 focus:outline-none backdrop-blur-md" onChange={handleLanguageChange}>
                          {SUPPORTED_LANGUAGES.map((lang) => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
                        </select>
                      )}
                      
                      <button className="py-1 px-3 md:py-2 bg-red-700 md:px-4 text-white rounded-lg text-xs md:text-sm hover:bg-red-700 transition" onClick={handleHomeClick}>Home</button>
                      <button className="py-1 px-3 md:py-2 bg-indigo-600 md:px-4  text-white rounded-lg text-xs md:text-sm hover:bg-indigo-600 transition shadow-lg" onClick={() => navigate("/features")}>Studio</button>
                      <button className="py-1 px-3 md:py-2 bg-purple-600 md:px-4  text-white rounded-lg text-xs  md:text-sm hover:bg-purple-600 transition whitespace-nowrap shadow-lg" onClick={handleGptSearchClick}>{showGptSearch ? "Exit GPT" : "GPT Search"}</button>
                      
                      <div className="relative ml-2">
                        <div className="flex items-center gap-1 cursor-pointer group" onClick={() => setIsOpen(!isOpen)}>
                            <img className="w-8 h-8 md:w-10 md:h-10 rounded-md border-2 border-transparent group-hover:border-white transition object-cover shadow-md" alt="usericon" src={user?.photoURL} />
                            <KeyboardArrowDown className={`text-white transition-transform duration-200 drop-shadow-md ${isOpen ? 'rotate-180' : ''}`} />
                        </div>
                        {isOpen && (
                            <div className="absolute right-0 mt-2 w-40 md:w-48 bg-black/95 border border-gray-700 rounded-lg shadow-xl backdrop-blur-md overflow-hidden animate-fade z-50">
                                <div className="px-4 py-3 border-b border-gray-700"><p className="text-xs text-gray-400">Signed in as</p><p className="text-sm font-bold text-white truncate">{user.displayName || "User"}</p></div>
                                <button onClick={handleSignOut} className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-gray-800 transition font-bold flex items-center gap-2">
                                    <Logout fontSize="small" /> Log Out
                                </button>
                            </div>