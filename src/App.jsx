import React from 'react';
import HackathonHeader from './firstDeploy/HackathonHeader';

import TenXSection from './firstDeploy/TenXSection';
import FindTeam from './components/FindTeam';
import ProfessionalImageComponent from './firstDeploy/ProfessionalImageComponent';
import SimpleAccordion from './firstDeploy/FAQAccordion';
import EventSchedule from './firstDeploy/EventSchedule';
import Dashboard from './components/Dashboard';
import NewLeaderBoard from './components/NewLeaderBoard';
import ProblemStatements from './components/ProblemStatements';
import Footer from './components/Footer';
import FAQAccordion from './firstDeploy/FAQAccordion';
import GoogleFormButton from './components/GoogleFormButton';
import CheckpointApp from './components/LeaderCheckpoint';

const App = () => {
  return (
    <div className='bg-gray-50'>
      <HackathonHeader />
      <TenXSection/>
      {/* <Dashboard/> */}
      <CheckpointApp/>
      <GoogleFormButton/>
      <ProblemStatements/>
      {/* <NewLeaderBoard/> */}
      <ProfessionalImageComponent/>
      <FindTeam/>
      <EventSchedule/>
      <FAQAccordion/>
      {/* <Footer/> */}
      
    </div>
  );
};

export default App;
