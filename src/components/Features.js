import { useState } from "react";
import Header from "./Header";
import MarathonView from "./MarathonView";
import VPNScout from "./VPNScout";
import CollabFinder from "./CollabFinder";
import { BG_URL } from "../utils/constants"; // ✅ Import BG_URL

const Features = () => {
  const [activeTab, setActiveTab] = useState("marathon");

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-black relative">
      <Header />
      
      {/* ✅ NEW: Global Background Image (Fixed behind everything) */}
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <img 
            className="h-full w-full object-cover opacity-50" 
            src={BG_URL} 
            alt="background" 
        />
        <div className="absolute inset-0"></div> {/* Dark overlay for readability */}
      </div>

      <div className="pt-48 md:pt-32 px-4 md:px-12 pb-10 relative z-10">
        
        <h1 className="text-white text-3xl md:text-5xl font-bold mb-8 text-center drop-shadow-lg">
          The Studio
        </h1>
        
        {/* Tabs */}
        <div className="grid grid-cols-1 md:flex md:justify-center gap-2 md:gap-4 mb-8 border-b border-gray-700 pb-4">
          <button 
            className={`px-4 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'marathon' 
                ? 'bg-red-700 text-white shadow-lg scale-105' 
                : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
            onClick={() => setActiveTab("marathon")}
          >
            Marathon Calculator
          </button>
          <button 
            className={`px-4 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'vpn' 
                ? 'bg-blue-600 text-white shadow-lg scale-105' 
                : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
            onClick={() => setActiveTab("vpn")}
          >
            VPN Scout
          </button>
          <button 
            className={`px-4 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'collab' 
                ? 'bg-green-600 text-white shadow-lg scale-105' 
                : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
            onClick={() => setActiveTab("collab")}
          >
            Dynamic Duo
          </button>
        </div>

        {/* Content Area with Glassmorphism */}
        <div className="bg-gray-900/80 backdrop-blur-sm p-4 md:p-8 rounded-xl min-h-[500px] shadow-2xl border border-gray-800">
          {activeTab === "marathon" && <MarathonView />}
          {activeTab === "vpn" && <VPNScout />}
          {activeTab === "collab" && <CollabFinder />}
        </div>
      </div>
    </div>
  );
};

export default Features;