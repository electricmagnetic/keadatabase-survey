import React from 'react';
import { connect } from 'react-refetch';
import PropTypes from 'prop-types';

import Loader from '../helpers/Loader';
import Error from '../helpers/Error';

const API_URL = `https://public-api.wordpress.com/wp/v2/sites/blog.keadatabase.nz/pages/`;

/**
  Gets a page from the WordPress API
 */
const Page = ({ id, pageFetch, showTitle }) => {
  if (pageFetch.pending) {
    return <Loader />;
  } else if (pageFetch.rejected) {
    return <Error message="Page invalid" />;
  } else if (pageFetch.fulfilled) {
    const page = pageFetch.value;
    return (
      <div className="Page">
        <div className="Page-content" key={page.id}>
          {showTitle && <h2 dangerouslySetInnerHTML={{ __html: page.title.rendered }} />}
          <p dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
        </div>
      </div>
    );
  } else return null;
};

Page.propTypes = {
  id: PropTypes.number.isRequired,
  showTitle: PropTypes.bool.isRequired,
};

Page.defaultProps = {
  showTitle: false,
};

export default connect(props => ({
  pageFetch: `${API_URL}${props.id}/`,
}))(Page);
