import React from 'react';
import LocationScreen from './screens/LocationScreen';
import ScheduleScreen from './screens/ScheduleScreen';
import BusinessScreen from './screens/BusinessScreen';
import PingScreen from './screens/PingScreen';
import './FeaturesPhone.css';

export default function FeaturesPhone({ screenType }) {
  let ActiveScreen = LocationScreen;
  if (screenType === "schedule") ActiveScreen = ScheduleScreen;
  else if (screenType === "business") ActiveScreen = BusinessScreen;
  else if (screenType === "ping") ActiveScreen = PingScreen;

  return (
    <div className="features-phone shadow-lg">
      <div className="features-island"></div>
      <div className="features-screen-container">
        <div className="w-100 h-100 position-absolute">
          <ActiveScreen />
        </div>
      </div>
    </div>
  );
}
