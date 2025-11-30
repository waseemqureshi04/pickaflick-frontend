import { useState } from "react";
import Header from "./Header";
import MarathonView from "./MarathonView";
import VPNScout from "./VPNScout";
import CollabFinder from "./CollabFinder";
import { BG_URL } from "../utils/constants";

const Features = () => {
  const [activeTab, setActiveTab] = useState("marathon");

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-black relative">
      <Header />
      
      {/* Global Background */}
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <img 
            className="h-full w-full object-cover opacity-50" 
            src={BG_URL} 
            alt="background" 
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="pt-48 md:pt-32 px-4 md:px-12 pb-10 relative z-10">
        
        <h1 className="text-white text-3xl md:text-5xl font-bold mb-8 text-center drop-shadow-lg">
          The Studio
        </h1>
        
        {/* Tabs - Black Accent Style */}
        <div className="grid grid-cols-1 md:flex md:justify-center gap-2 md:gap-4 mb-8 border-b border-gray-800 pb-4">
          <button 
            className={`px-6 py-3 rounded-lg font-bold border transition-all ${
              activeTab === 'marathon' 
                ? 'bg-red-700 border-red-700 text-white shadow-[0_0_15px_rgba(185,28,28,0.5)] scale-105' 
                : 'bg-black/50 border-gray-700 text-gray-400 hover:text-white hover:border-gray-500'
            }`}
            onClick={() => setActiveTab("marathon")}
          >
            Marathon Calculator
          </button>
          <button 
            className={`px-6 py-3 rounded-lg font-bold border transition-all ${
              activeTab === 'vpn' 
                ? 'bg-blue-700 border-blue-700 text-white shadow-[0_0_15px_rgba(29,78,216,0.5)] scale-105' 
                : 'bg-black/50 border-gray-700 text-gray-400 hover:text-white hover:border-gray-500'
            }`}
            onClick={() => setActiveTab("vpn")}
          >
            VPN Scout
          </button>
          <button 
            className={`px-6 py-3 rounded-lg font-bold border transition-all ${
              activeTab === 'collab' 
                ? 'bg-green-700 border-green-700 text-white shadow-[0_0_15px_rgba(21,128,61,0.5)] scale-105' 
                : 'bg-black/50 border-gray-700 text-gray-400 hover:text-white hover:border-gray-500'
            }`}
            onClick={() => setActiveTab("collab")}
          >
            Dynamic Duo
          </button>
        </div>

        {/* Content Area - True Black with Borders */}
        <div className="bg-black/85 backdrop-blur-md p-4 md:p-8 rounded-xl min-h-[500px] shadow-2xl border border-gray-800">
          {activeTab === "marathon" && <MarathonView />}
          {activeTab === "vpn" && <VPNScout />}
          {activeTab === "collab" && <CollabFinder />}
        </div>
      </div>
    </div>
  );
};

export default Features;