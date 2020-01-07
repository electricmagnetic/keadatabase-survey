import React, { Component } from 'react';
import Helmet from 'react-helmet';

import SubmissionForm from '../../components/submit/SubmissionForm';

class SubmissionPage extends Component {
  render() {
    return (
      <div className="SubmissionPage">
        <Helmet title="Submit Survey" />
        <SubmissionForm />
      </div>
    );
  }
}

export default SubmissionPage;
