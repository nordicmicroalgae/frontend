import React from 'react';


const MetadataRow = ({ label, value }) => {
  if (!value) return null;

  const displayValue = Array.isArray(value) ? value.join(', ') : value;

  return (
    <div className="metadata-row">
      <span className="metadata-label">{label}:</span>
      <span className="metadata-value">{displayValue}</span>
    </div>
  );
};

const isSafeUrl = (url) => {
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
};

const TrainingDatasetValue = ({ value }) => {
  const isLink = (
    value.startsWith('http://') ||
    value.startsWith('https://') ||
    value.startsWith('doi:')
  );

  if (!isLink) {
    return <span className="metadata-value">{value}</span>;
  }

  const href = value.startsWith('doi:')
    ? `https://doi.org/${value.slice(4)}`
    : value;

  if (!isSafeUrl(href)) {
    return <span className="metadata-value">{value}</span>;
  }

  return (
    <span className="metadata-value">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="metadata-link"
      >
        {value}
      </a>
    </span>
  );
};


const LightboxMetadata = ({ image }) => {
  const attrs = image.attributes || {};

  return (
    <div className="lightbox-metadata">
      <MetadataRow label="Class name" value={attrs.title} />
      <MetadataRow label="Imaging instrument" value={attrs.imagingInstrument} />
      <MetadataRow label="Contributor" value={attrs.contributor} />
      <MetadataRow label="Institute" value={attrs.institute} />

      {attrs.trainingDataset && (
        <div className="metadata-row">
          <span className="metadata-label">Training dataset DOI:</span>
          <TrainingDatasetValue value={attrs.trainingDataset} />
        </div>
      )}

      <MetadataRow label="Geographic area" value={attrs.geographicArea} />
      <MetadataRow label="Location" value={attrs.location} />
      <MetadataRow label="Latitude" value={attrs.latitudeDegree} />
      <MetadataRow label="Longitude" value={attrs.longitudeDegree} />
      <MetadataRow label="Sampling date" value={attrs.samplingDate} />

      {image.createdAt && (
        <MetadataRow label="Upload date" value={image.createdAt.split('T')[0]} />
      )}

      <MetadataRow label="Copyright holder" value={attrs.copyrightHolder} />
      <MetadataRow label="License" value={attrs.license} />
    </div>
  );
};


export default LightboxMetadata;
