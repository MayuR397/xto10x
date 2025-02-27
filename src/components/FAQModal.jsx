import React, { useState } from 'react';
import './FAQModal.css';

function FAQModal({ onClose }) {
  const faqs = [
    {
      id: 1,
      question: "How do I update my profile?",
      answer: "You can update your profile by clicking on your avatar in the top right corner and selecting 'Edit Profile'."
    },
    {
      id: 2,
      question: "How is the leaderboard calculated?",
      answer: "The leaderboard is calculated based on your total points earned from completing challenges and activities."
    },
    {
      id: 3,
      question: "Can I change my username?",
      answer: "Yes, you can change your username once every 30 days from the account settings page."
    },
    {
      id: 4,
      question: "How do I contact support?",
      answer: "You can contact support by clicking on the 'Help' button in the footer and filling out the support form."
    },
    {
      id: 5,
      question: "Are there any shortcuts to navigate the site?",
      answer: "Yes, press '?' at any time to see a list of keyboard shortcuts available."
    },
    {
      id: 6,
      question: "Can I export my data?",
      answer: "Yes, you can export your data from the account settings page under 'Privacy and Data'."
    },
    {
      id: 7,
      question: "How do I reset my password?",
      answer: "You can reset your password by clicking on 'Forgot Password' on the login page and following the instructions sent to your email."
    }
  ];

  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="faq-modal-overlay">
      <div className="faq-modal">
        <div className="faq-header">
          <h2>Frequently Asked Questions</h2>
          <button className="close-modal-button" onClick={onClose}>✕</button>
        </div>
        <div className="faq-content">
          {faqs.map((faq) => (
            <div className="faq-item" key={faq.id}>
              <div 
                className={`faq-question ${openFaq === faq.id ? 'open' : ''}`}
                onClick={() => toggleFaq(faq.id)}
              >
                {faq.question}
                <span className="toggle-icon">{openFaq === faq.id ? '−' : '+'}</span>
              </div>
              {openFaq === faq.id && (
                <div className="faq-answer">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FAQModal;