import React from 'react';

const ActivityIcon = ({ activity }) => {
  const icon = (function(activity) {
    switch (activity) {
      case 'W':
        return 'walking';
      case 'S':
        return 'street-view';
      case 'C':
        return 'campground';
      case 'H':
        return 'home';
      case 'X':
        return 'ban';
      default:
        return 'question-circle';
    }
  })(activity);

  return <i className={`fa-fw fas fa-${icon} mr-2`}></i>;
};

export default ActivityIcon;
