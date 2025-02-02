import React from 'react';

const VectorShiftChatbot = () => {
    return (
        <div className="chatbot-container">
            <iframe 
                src="https://app.vectorshift.ai/chatbots/embedded/679f527e0cf40518b77e3364?openChatbot=true"
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    width: '450px',
                    height: '700px',
                    border: 'none',
                    borderRadius: '10px',
                    zIndex: 9999,
                    backgroundColor: 'transparent'
                }}
                allow="clipboard-read; clipboard-write; microphone"
                title="Customer Support Chat"
                frameBorder="0"
            />
            <style jsx>{`
                .chatbot-container {
                    position: fixed;
                    bottom: 0;
                    right: 0;
                    z-index: 9999;
                }

                @media (max-width: 768px) {
                    .chatbot-container iframe {
                        width: 90vw;
                        height: 80vh;
                        bottom: 10px;
                        right: 10px;
                    }
                }
            `}</style>
        </div>
    );
};

export default VectorShiftChatbot;