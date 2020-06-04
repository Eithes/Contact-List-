import React from 'react';
import { connect } from 'react-redux';

const Alerts = ({alerts}) => {
  let alertsToShow = alerts || [];
  return (
    alertsToShow.length > 0 && alerts.map(alert => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        <i className='fas fa-info-circle'></i> {alert.msg}
      </div>
    ))
  )
};


const mapStateToProps = state => ({
  alerts: state.alert.alerts 
});

export default connect(mapStateToProps, {})(Alerts);
