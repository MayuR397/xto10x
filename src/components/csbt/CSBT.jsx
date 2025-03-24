import React, { useState } from "react";
import {
  Users,
  Target,
  Brain,
  ArrowRight,
  MessageSquare,
  Mic,
  Video,
  PlayCircle,
  CheckCircle2,
  Timer,
  UserCircle2,
  Menu,
  X,
  UploadCloud,
  Award,
  BarChart3,
  Home,
} from "lucide-react";

function CSBT() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="flex items-center text-red-500 font-bold text-2xl">
                  <span className="text-red-500">10x</span>
                  <span className="text-black">Communication</span>
                </span>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:ml-10 md:flex md:space-x-8">
                <a
                  href="#"
                  className="text-slate-800 font-medium hover:text-red-500 px-3 py-2 flex items-center"
                >
                  <Home className="w-4 h-4 mr-1" />
                  Home
                </a>
                <a
                  href="#practice"
                  className="text-slate-800 font-medium hover:text-red-500 px-3 py-2 flex items-center"
                >
                  <PlayCircle className="w-4 h-4 mr-1" />
                  Practice
                </a>
                <a
                  href="#assessment"
                  className="text-slate-800 font-medium hover:text-red-500 px-3 py-2 flex items-center"
                >
                  <Award className="w-4 h-4 mr-1" />
                  Assessment
                </a>
                <a
                  href="#skills"
                  className="text-slate-800 font-medium hover:text-red-500 px-3 py-2 flex items-center"
                >
                  <Target className="w-4 h-4 mr-1" />
                  Skills
                </a>
                <a
                  href="#progress"
                  className="text-slate-800 font-medium hover:text-red-500 px-3 py-2 flex items-center"
                >
                  <BarChart3 className="w-4 h-4 mr-1" />
                  Progress
                </a>
              </div>
            </div>

            {/* User Profile */}
            <div className="hidden md:flex items-center">
              <div className="bg-red-100 rounded-full p-2">
                <UserCircle2 className="w-6 h-6 text-red-500" />
              </div>
              <span className="ml-2 text-slate-700 font-medium">
                Student Portal
              </span>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-700 hover:text-red-500 focus:outline-none"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4">
              <div className="py-2 space-y-1">
                <a
                  href="#"
                  className="block px-3 py-2 text-slate-700 hover:bg-red-50 hover:text-red-500 rounded-md"
                >
                  Home
                </a>
                <a
                  href="#practice"
                  className="block px-3 py-2 text-slate-700 hover:bg-red-50 hover:text-red-500 rounded-md"
                >
                  Practice
                </a>
                <a
                  href="#assessment"
                  className="block px-3 py-2 text-slate-700 hover:bg-red-50 hover:text-red-500 rounded-md"
                >
                  Assessment
                </a>
                <a
                  href="#skills"
                  className="block px-3 py-2 text-slate-700 hover:bg-red-50 hover:text-red-500 rounded-md"
                >
                  Skills
                </a>
                <a
                  href="#progress"
                  className="block px-3 py-2 text-slate-700 hover:bg-red-50 hover:text-red-500 rounded-md"
                >
                  Progress
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center md:text-left md:flex md:items-center md:justify-between">
            <div className="md:max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 tracking-tight">
                Step Up Your{" "}
                <span className="text-red-500">Communication Game</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mb-8 leading-relaxed">
                Get ready to challenge yourself! Take part in evaluations,
                discover where you stand, and push your limits. It’s your time
                to shine.
              </p>
              <div className="flex justify-center md:justify-start gap-4">
                <button className="bg-red-500 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 hover:bg-red-600 transition-colors">
                  Start Your Evaluation
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="border border-slate-300 text-slate-700 px-6 py-3 rounded-lg font-medium hover:bg-slate-100 transition-colors">
                  See Evaluation Criteria
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Practice Modes Section */}
      <section id="practice" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-3">
              Choose Your Challenge
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Step into the spotlight and build unstoppable communication
              skills. Practice solo or with a group — your journey starts here!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Group Practice Card */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="bg-red-500 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">
                Group Practice
              </h3>
              <p className="text-slate-600 mb-6">
                Join your peers for lively discussions, collaborate on
                presentations, and grow together through interactive challenges.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-slate-600">
                  <CheckCircle2 className="w-5 h-5 text-red-500 flex-shrink-0" />{" "}
                  Engage in dynamic conversations
                </li>
                <li className="flex items-center gap-3 text-slate-600">
                  <CheckCircle2 className="w-5 h-5 text-red-500 flex-shrink-0" />{" "}
                  Practice real-world scenarios
                </li>
              </ul>
            </div>

            {/* Individual Practice Card */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="bg-red-500 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <UserCircle2 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">
                Solo Practice
              </h3>
              <p className="text-slate-600 mb-6">
                Take the mic and practice on your own. Build confidence, refine
                your style, and track your growth at your own pace.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-slate-600">
                  <CheckCircle2 className="w-5 h-5 text-red-500 flex-shrink-0" />{" "}
                  Push your personal best
                </li>
                <li className="flex items-center gap-3 text-slate-600">
                  <CheckCircle2 className="w-5 h-5 text-red-500 flex-shrink-0" />{" "}
                  Sharpen your delivery skills
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Assessment Section - New */}
<section id="assessment" className="py-16 bg-slate-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-slate-800 mb-3">
        Assessment Process
      </h2>
      <p className="text-slate-600 max-w-2xl mx-auto">
        Take the stage, record your performance, and submit your work for evaluation. Every recording is a step towards becoming a confident communicator.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-6">
      {[
        {
          icon: <PlayCircle className="w-6 h-6 text-white" />,
          title: "Record Presentation",
          description:
            "Complete assigned speaking tasks that are recorded for evaluation.",
        },
        {
          icon: <UploadCloud className="w-6 h-6 text-white" />,
          title: "Submit Solo Recording",
          description:
            "Upload your individual presentation for assessment. Show your personal growth and mastery.",
        },
        {
          icon: <Users className="w-6 h-6 text-white" />,
          title: "Submit Group Recording",
          description:
            "Work together with your peers, record your collaborative presentations, and submit for evaluation.",
        },
      ].map((element, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow-sm border border-slate-200"
        >
          <div className="bg-red-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            {element.icon}
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-3">
            {element.title}
          </h3>
          <p className="text-slate-600 text-sm">{element.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Communication Skills Section */}
      <section id="skills" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-3">
              Core Communication Competencies
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Focus on developing these essential skills during your practice
              sessions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Mic className="w-6 h-6 text-white" />,
                title: "Vocal Delivery",
                tips: [
                  "Speaking pace and rhythm",
                  "Volume and projection techniques",
                  "Clear pronunciation and articulation",
                ],
              },
              {
                icon: <MessageSquare className="w-6 h-6 text-white" />,
                title: "Content Structure",
                tips: [
                  "Logical organization of ideas",
                  "Supporting evidence and examples",
                  "Effective introductions and conclusions",
                ],
              },
              {
                icon: <Video className="w-6 h-6 text-white" />,
                title: "Non-verbal Communication",
                tips: [
                  "Appropriate eye contact",
                  "Effective gestures and movements",
                  "Confident posture and presence",
                ],
              },
            ].map((element, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm border border-slate-200"
              >
                <div className="bg-red-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  {element.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">
                  {element.title}
                </h3>
                <ul className="space-y-2">
                  {element.tips.map((tip, tipIndex) => (
                    <li
                      key={tipIndex}
                      className="flex items-start gap-2 text-slate-600 text-sm"
                    >
                      <CheckCircle2 className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practice Methodology Section */}
<section id="progress" className="py-16 bg-slate-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-6">
          Your Path to Communication Mastery
        </h2>
        <p className="text-slate-600 mb-8">
          Ready to level up your speaking skills? Follow a clear and effective process that keeps you on track and boosts your confidence. Every session brings you closer to your goals.
        </p>
        <div className="space-y-5">
          {[
            {
              icon: <PlayCircle className="w-5 h-5 text-white" />,
              text: "Record your practice sessions and own your progress",
            },
            {
              icon: <Timer className="w-5 h-5 text-white" />,
              text: "Stay consistent with structured exercises designed for growth",
            },
            {
              icon: <Brain className="w-5 h-5 text-white" />,
              text: "Challenge yourself and unlock your communication potential",
            },
            {
              icon: <Target className="w-5 h-5 text-white" />,
              text: "Track your journey as you conquer new milestones",
            },
          ].map((step, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="bg-red-500 p-2 rounded-md mt-0.5">
                {step.icon}
              </div>
              <p className="text-slate-700">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-lg overflow-hidden shadow-md">
        <img
          src="https://st3.depositphotos.com/10638998/15140/i/450/depositphotos_151402790-stock-photo-businesspeople-discussing-and-brainstorming.jpg"
          alt="Students mastering presentation skills"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
</section>


      {/* CTA Section - Modified for Education */}
      <section className="py-16 bg-red-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Ready to Improve Your Communication Skills?
          </h2>
          <p className="text-slate-600 mb-8">
            Begin your practice sessions today and prepare for your upcoming
            assessments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600 transition-colors">
              Start Practice Session
            </button>
            <button className="border border-slate-300 bg-white text-slate-700 px-6 py-3 rounded-lg font-medium hover:bg-slate-100 transition-colors">
              View Assessment Criteria
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CSBT;
