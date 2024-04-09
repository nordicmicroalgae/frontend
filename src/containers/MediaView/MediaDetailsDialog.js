import React from 'react';
import { useHistory } from 'react-router-dom';

import { useMediaQuery } from './media-context';
import MediaDetailsView from './MediaDetailsView';
import Dialog from 'Components/Dialog';
import buildQueryString from 'Utilities/buildQueryString';

import './MediaDetailsDialog.scss';

const MediaDetailsDialog= () => {
  const history = useHistory();

  const { selectedMedia, params } = useMediaQuery();

  const handleClose = () => {
    history.replace({
      search: buildQueryString(
        Object.fromEntries(
          Object.entries(params).filter(
            ([key, _val]) => key != 'media',
          )
        )
      ),
    });
  };

  return (selectedMedia && (
    <Dialog
      id="media-details-dialog"
      title={selectedMedia.attributes.title}
      onClose={handleClose}
    >
      <MediaDetailsView expandable={false} />
    </Dialog>
  ));

};

export default MediaDetailsDialog;
