import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import Banner from '../../components/presentation/Banner';

const SubmissionSuccessPage = ({ match }) => {
  const slug = match.params.slug;

  return (
    <div className="SubmissionSuccessPage">
      <Helmet title="Survey Submitted" />
      <Banner size="small" additionalClasses="mb-3">
        <h1 className="mb-3">Thanks!</h1>
        <p className="lead">Your survey {slug && `(#${slug})`} has been successfully submitted.</p>
        <Link to="/submit" className="btn btn-primary" role="button">
          Report Another
        </Link>
      </Banner>
    </div>
  );
};

export default SubmissionSuccessPage;
