import React, { useState, useEffect } from 'react';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add the script to the document
    const script = document.createElement('script');
    script.src = 'https://app.vectorshift.ai/chatWidget.js';
    script.id = 'vectorshift-chat-widget';
    script.async = true;
    script.setAttribute('chatbot-id', '679f527e0cf40518b77e3364');
    script.setAttribute('chatbot-height', isMobile ? '100vh' : '600px');
    script.setAttribute('chatbot-width', isMobile ? '100vw' : '400px');
    document.body.appendChild(script);

    // Handle cleanup
    return () => {
      document.body.removeChild(script);
    };
  }, [isMobile]);

  // Check for mobile devices and update state
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className={`fixed z-50 ${isMobile ? 'inset-0' : 'bottom-4 right-4'}`}>
      {/* Chat toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed ${
          isMobile ? 'bottom-4 right-4' : 'bottom-6 right-6'
        } bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50`}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          )}
        </svg>
      </button>

      {/* Chat container */}
      {isOpen && (
        <div
          className={`${
            isMobile ? 'fixed inset-0' : 'fixed bottom-24 right-6'
          } bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300`}
        >
          <iframe
            src="https://app.vectorshift.ai/chatbots/embedded/679f527e0cf40518b77e3364?openChatbot=true"
            width={isMobile ? '100%' : '400px'}
            height={isMobile ? '100%' : '600px'}
            className="border-none"
            allow="clipboard-read; clipboard-write; microphone"
          />
        </div>
      )}
    </div>
  );
};

export default ChatWidget;