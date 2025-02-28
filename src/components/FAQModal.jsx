import React, { useState } from "react";
import "./FAQModal.css";

function FAQModal({ onClose }) {
  const faqs = [
    {
      id: 1,
      question: "How should we divide our work?",
      answer:
        "As a team, start by identifying each member's strengths. If someone excels in backend development, assign them backend tasks. Likewise, let the frontend expert handle frontend work. For junior members, provide guidance by giving them manageable tasks that help them learn. Additionally, designate a team leader to coordinate efforts and keep the project on track. This approach ensures that responsibilities are distributed effectively, and everyone gets a chance to contribute.",
    },
    {
      id: 2,
      question: "What is the judging criteria?",
      answer:
        "Your work will be evaluated based on the following factors:\n\nRelevance:\nHow well does your solution address the problem?\nHow impactful is your approach?\nExperience, Design, and Quality:\nFor applications or websites: Visual appeal and usability.\nFor data analytics: Quality and clarity of data visualizations.\nFor testing: Thoroughness, attention to detail, and use of automation tools.\nOriginality & Creativity:\nDoes your solution offer a fresh perspective?\nDoes it introduce an innovative approach?\nPresentation:\nHow well is the project presented?",
    },
    {
      id: 3,
      question: "Is this hackathon optional or mandatory?",
      answer:
        "Yes, participation is optional.\nHowever, for Masai One students, especially those in:\n\nSoftware Development: Unit 3 (WEB205-B43 Non-SAL batch) & above\nData Analytics: Unit 3 & above\nSDET: Unit 4 & above\nIf you participate in the hackathon, you will be exempt from evaluations and your contribution in hackathon will be considered instead. Otherwise, you must complete evaluations as usual—failure to do so will affect your unit movement.",
    },
    {
      id: 4,
      question:
        "What is the lock-in period, and can I change my team after it starts?",
      answer:
        "The lock-in period begins at 10:00 PM. Before this, you can:\n\nCreate a team.\nJoin another team.\nDelete and recreate your team.\nRemove yourself from a team.\nOnce the lock-in period starts, no further team modifications (adding/removing members, deleting teams, etc.) are allowed. Whatever your team looks like after this period is considered final.",
    },
    {
      id: 5,
      question: "How do I select and submit my project for review?",
      answer:
        "Submit your project through our website using the designated form, which will be active starting at 08:00 PM. Ensure you provide the following details:\n\nTeam Name\nGitHub Repository: Must be named after your team (case-sensitive)\nGitHub Repository Owner's User ID\nProject Selected\nTeam Captain's Contact Number\nMake sure all details are accurate to complete the submission process successfully.",
    },
    {
      id: 6,
      question: "What will the winners receive in this hackathon?",
      answer:
        "It's a surprise! But we have a prize pool worth over ₹90,000 for the hackathon and related activities. 🎉",
    },
    {
      id: 7,
      question:
        "What are the various sessions and activities listed in my hackathon schedule?",
      answer:
        "It's not all about work—we know you'd love to have some fun along the way! We've got something exciting in store for everyone. These sessions will be worth your time, packed with fun activities that are super cool and engaging. And the best part? You can win prizes! However, the exact details of the activities will remain a surprise until launch. Stay tuned! 🎉",
    },
    {
      id: 8,
      question:
        "What's the deadline? Will I get an extension if I miss the submission?",
      answer:
        "The submission window opens on March 2, 2024, at 7:00 PM. You must submit everything as per the guidelines outlined in your problem statement.\nThe deadline is March 2, 2024, at 8:00 PM. After this, no further submissions will be accepted, and there will be no deadline extensions.",
    },
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
          <button className="close-modal-button" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="faq-content">
          {faqs.map((faq) => (
            <div className="faq-item" key={faq.id}>
              <div
                className={`faq-question ${openFaq === faq.id ? "open" : ""}`}
                onClick={() => toggleFaq(faq.id)}
              >
                {faq.question}
                <span className="toggle-icon">
                  {openFaq === faq.id ? "−" : "+"}
                </span>
              </div>
              {openFaq === faq.id && (
                <div className="faq-answer">
                  {faq.answer.split("\n").map((item, index) => (
                    <React.Fragment key={index}>
                      {item}
                      <br />
                    </React.Fragment>
                  ))}
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
