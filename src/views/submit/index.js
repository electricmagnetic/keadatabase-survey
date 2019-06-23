import React from 'react';
import Helmet from 'react-helmet';

import Banner from '../../components/presentation/Banner';
import SubmissionForm from '../../components/submit/SubmissionForm';

const SubmissionPage = props => {
  return (
    <div className="SubmissionPage">
      <Helmet title="Survey Submission" />
      <section className="mb-4">
        <Banner size="small">
          <h1>Survey Submission</h1>
        </Banner>
      </section>
      <section className="mb-4">
        <div className="container">
          <SubmissionForm />
        </div>
      </section>
    </div>
  );
};

export default SubmissionPage;
