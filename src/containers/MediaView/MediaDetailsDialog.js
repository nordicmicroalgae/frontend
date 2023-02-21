import React from 'react';
import { useHistory } from 'react-router-dom';

import { useMediaQuery } from './media-context';
import MediaDetailsView from './MediaDetailsView';
import Dialog from 'Components/Dialog';

import './MediaDetailsDialog.scss';

const MediaDetailsDialog= () => {
  const history = useHistory();

  const { selectedMedia } = useMediaQuery();

  const handleClose = () => {
    history.replace({search: null})
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
