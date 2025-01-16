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

const App = () => {
  return (
    <div className='bg-gray-50'>
      <HackathonHeader />
      <TenXSection/>
      {/* <Dashboard/> */}
      {/* <ProblemStatements/> */}
      {/* <NewLeaderBoard/> */}
      <ProfessionalImageComponent/>
      <FindTeam/>
      <EventSchedule/>
      {/* <Footer/> */}
      {/* <SimpleAccordion/> */}
    </div>
  );
};

export default App;
