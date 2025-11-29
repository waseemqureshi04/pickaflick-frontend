import Header from "./Header";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="pt-32 px-6 md:px-24 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold mb-6">Terms of Service</h1>
        <p className="text-gray-400 mb-4">Last updated: November 2025</p>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-300 leading-relaxed">
            By accessing and using Pickaflick, you accept and agree to be bound by the terms and provision of this agreement. 
            In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">2. Use License</h2>
          <p className="text-gray-300 leading-relaxed">
            Permission is granted to temporarily download one copy of the materials (information or software) on Pickaflick's website for personal, 
            non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul className="list-disc pl-6 mt-2 text-gray-300 space-y-2">
            <li>modify or copy the materials;</li>
            <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
            <li>attempt to decompile or reverse engineer any software contained on Pickaflick's website;</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">3. Disclaimer</h2>
          <p className="text-gray-300 leading-relaxed">
            The materials on Pickaflick's website are provided on an 'as is' basis. Pickaflick makes no warranties, expressed or implied, 
            and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, 
            fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
        </section>

        <p className="text-gray-500 text-sm mt-12 pb-12">
          These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;