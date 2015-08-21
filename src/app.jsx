import React from 'react'
import Home from './components/Home'
import AirbrakeClient from 'airbrake-js'

var airbrake = new AirbrakeClient({
  projectId: 114790,
  projectKey: '9800ebbd946202b161db66954a1a3db0'
});

var start = function () {
  React.render(<Home />, document.getElementById('app-body'))
}

if (config.env === 'production') {
  start = airbrake.wrap(start)
}

start()