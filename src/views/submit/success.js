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
        <Link to="/submit" className="btn btn-primary mr-3" role="button">
          Report Another
        </Link>
        {slug && (
          <Link to={'/surveys/' + slug} className="btn btn-light mr-3" role="button">
            View Survey
          </Link>
        )}
      </Banner>
    </div>
  );
};

export default SubmissionSuccessPage;
