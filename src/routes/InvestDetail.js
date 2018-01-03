import React from 'react';
import { connect } from 'dva';

function InvestDetail({ location, match }) {
  return (
    <div>
      {match.params.id}
    </div>
  )
}

export default connect()(InvestDetail);