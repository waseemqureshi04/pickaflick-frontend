import Header from "./Header";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="pt-32 px-6 md:px-24 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-gray-400 mb-4">Last updated: November 2025</p>
        
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
          <p className="text-gray-300 leading-relaxed">
            Welcome to Pickaflick. We respect your privacy and are committed to protecting your personal data. 
            This privacy policy will inform you as to how we look after your personal data when you visit our website 
            (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">2. Data We Collect</h2>
          <p className="text-gray-300 leading-relaxed">
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
          </p>
          <ul className="list-disc pl-6 mt-2 text-gray-300 space-y-2">
            <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong>Contact Data:</strong> includes email address.</li>
            <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">3. How We Use Your Data</h2>
          <p className="text-gray-300 leading-relaxed">
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul className="list-disc pl-6 mt-2 text-gray-300 space-y-2">
            <li>To register you as a new customer.</li>
            <li>To provide personalized movie recommendations via OpenAI GPT.</li>
            <li>To manage our relationship with you.</li>
          </ul>
        </section>
        
        <p className="text-gray-500 text-sm mt-12 pb-12">
          If you have any questions about this privacy policy, please contact us at support@pickaflick.live.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;