import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetImageLabelingImagesQuery, useGetImageLabelingSummaryQuery, useGetImageLabelingFirstPerTaxonQuery } from 'Slices/labeling';
import { useGetFactsQuery } from 'Slices/facts';
import { selectById } from 'Slices/taxa';

import ImageLabelingGallery from 'Components/ImageLabeling/ImageLabelingGallery';
import ImageLabelingTaxonomy from './ImageLabelingTaxonomy';
import TaxonHeader from './TaxonHeader';
import LandingHeader from './LandingHeader';
import UnknownTaxonHeader from './UnknownTaxonHeader';
import AttributeFilters from './AttributeFilters';
import { useAttributeFilters, applyAttributeFilters } from './useAttributeFilters';
import './ImageLabelingPage.scss';

const MAX_LABELING_IMAGES = 1000;

const ImageLabelingPage = ({ location, history }) => {
  const taxonFromUrl = new URLSearchParams(location.search).get('taxon');
  const [selectedTaxon, setSelectedTaxon] = React.useState(taxonFromUrl);
  const [filtersExpanded, setFiltersExpanded] = React.useState(false);

  const {
    selectedInstruments,
    selectedInstitutes,
    selectedGeographicAreas,
    hasActiveFilters,
    handleInstrumentToggle,
    handleInstituteToggle,
    handleGeographicAreaToggle,
    handleResetFilters,
  } = useAttributeFilters();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedTaxon]);

  React.useEffect(() => {
    if (filtersExpanded) {
      document.body.classList.add('has-expanded-attribute-filters');
    } else {
      document.body.classList.remove('has-expanded-attribute-filters');
    }
    return () => {
      document.body.classList.remove('has-expanded-attribute-filters');
    };
  }, [filtersExpanded]);

  React.useEffect(() => {
    const urlTaxon = new URLSearchParams(location.search).get('taxon');
    if (urlTaxon !== selectedTaxon) {
      setSelectedTaxon(urlTaxon);
    }
  }, [location.search, selectedTaxon]);

  const isLandingPage = selectedTaxon === null;

  const { data: summary } = useGetImageLabelingSummaryQuery();

  const { data: landingImages = [], isLoading: landingLoading } = useGetImageLabelingFirstPerTaxonQuery(
    undefined,
    { skip: !isLandingPage || hasActiveFilters }
  );

  const { data: allImages = [] } = useGetImageLabelingImagesQuery(
    {
      limit: MAX_LABELING_IMAGES,
      fields: ['slug', 'renditions', 'related_taxon', 'taxon', 'attributes', 'file', 'priority', 'created_at'],
    },
    { skip: !hasActiveFilters }
  );

  const params = React.useMemo(() => {
    const p = {
      limit: MAX_LABELING_IMAGES,
      fields: ['slug', 'renditions', 'related_taxon', 'taxon', 'attributes', 'file', 'priority', 'created_at'],
    };
    if (selectedTaxon && selectedTaxon !== 'unknown') {
      p.taxon = selectedTaxon;
    }
    return p;
  }, [selectedTaxon]);

  const { data: images = [], isLoading, error, isFetching } = useGetImageLabelingImagesQuery(
    params,
    { skip: isLandingPage }
  );

  const filteredAllImages = React.useMemo(() => {
    if (!hasActiveFilters) return [];
    return applyAttributeFilters(allImages, { selectedInstruments, selectedInstitutes, selectedGeographicAreas });
  }, [allImages, selectedInstruments, selectedInstitutes, selectedGeographicAreas, hasActiveFilters]);

  const filteredTaxaMap = React.useMemo(() => {
    if (!hasActiveFilters) return [];

    const map = new Map();
    filteredAllImages.forEach((img) => {
      const taxonObj = img.relatedTaxon || img.taxon || null;
      let slug = null;
      let name = null;

      if (taxonObj) {
        if (typeof taxonObj === 'object') {
          slug = taxonObj.id || taxonObj.slug || String(taxonObj);
          name = taxonObj.text || taxonObj.name || taxonObj.scientificName || taxonObj.slug || slug;
        } else {
          slug = taxonObj;
          name = taxonObj;
        }
      } else {
        slug = 'unknown';
        name = 'Unknown taxon';
      }

      const entry = map.get(slug) || { slug, name, count: 0 };
      map.set(slug, { ...entry, count: entry.count + 1 });
    });

    return Array.from(map.values()).sort((a, b) => {
      if (a.slug === 'unknown') return 1;
      if (b.slug === 'unknown') return -1;
      return String(a.name).localeCompare(String(b.name));
    });
  }, [filteredAllImages, hasActiveFilters]);

  const taxaList = React.useMemo(() => {
    if (hasActiveFilters) {
      return filteredTaxaMap;
    }

    return [...(summary?.taxa || [])].sort((a, b) => {
      if (a.slug === 'unknown') return 1;
      if (b.slug === 'unknown') return -1;
      return String(a.name).localeCompare(String(b.name));
    });
  }, [hasActiveFilters, filteredTaxaMap, summary]);

  const instrumentsMap = summary?.instruments || [];
  const institutesMap = summary?.institutes || [];
  const geographicAreasMap = summary?.geographic_areas || [];

  const filteredImages = React.useMemo(() => {
    let result = images;

    if (selectedTaxon === 'unknown') {
      result = result.filter((img) => !img.relatedTaxon && !img.taxon);
    }

    return applyAttributeFilters(result, { selectedInstruments, selectedInstitutes, selectedGeographicAreas });
  }, [images, selectedTaxon, selectedInstruments, selectedInstitutes, selectedGeographicAreas]);

  const firstImagePerTaxon = React.useMemo(() => {
    if (!isLandingPage) return null;

    const sourceImages = hasActiveFilters ? filteredAllImages : landingImages;

    const taxaCounts = new Map();
    taxaList.forEach(t => {
      taxaCounts.set(t.slug, t.count || 0);
    });

    const taxonImages = new Map();
    sourceImages.forEach((img) => {
      let slug, name;

      if (img.taxonSlug) {
        slug = img.taxonSlug;
        name = img.taxonName;
      } else {
        const taxonObj = img.relatedTaxon || img.taxon || null;
        if (taxonObj) {
          if (typeof taxonObj === 'object') {
            slug = taxonObj.slug || String(taxonObj.id || taxonObj);
            name = taxonObj.scientific_name || taxonObj.scientificName || taxonObj.name || slug;
          } else {
            slug = taxonObj;
            name = taxonObj;
          }
        } else {
          slug = 'unknown';
          name = 'Unknown taxon';
        }
      }

      const existing = taxonImages.get(slug);

      if (!existing) {
        taxonImages.set(slug, {
          ...img,
          taxonSlug: slug,
          taxonName: name,
          imageCount: taxaCounts.get(slug) || 0,
        });
      } else if (img.priority != null && (existing.priority == null || img.priority < existing.priority)) {
        taxonImages.set(slug, {
          ...img,
          taxonSlug: slug,
          taxonName: name,
          imageCount: taxaCounts.get(slug) || 0,
        });
      }
    });

    return Array.from(taxonImages.values()).sort((a, b) => {
      if (a.taxonSlug === 'unknown') return 1;
      if (b.taxonSlug === 'unknown') return -1;
      return String(a.taxonName).localeCompare(String(b.taxonName));
    });
  }, [isLandingPage, hasActiveFilters, filteredAllImages, landingImages, taxaList]);

  const handleTaxonSelect = (slug) => {
    setSelectedTaxon(slug);
    setFiltersExpanded(false);

    const newParams = new URLSearchParams();
    if (slug) {
      newParams.set('taxon', slug);
      history.push({ search: newParams.toString() });
    } else {
      history.push({ search: '' });
    }
  };

  const handleToggleFilters = () => {
    setFiltersExpanded((prev) => !prev);
  };

  const showLoading = isLandingPage ? landingLoading : (isLoading || isFetching);

  const relatedTaxonFromImages = !isLandingPage && images.length > 0 ? images[0].relatedTaxon : null;
  const selectedTaxonFromStore = useSelector(state => selectById(state, selectedTaxon));

  const relatedTaxon = relatedTaxonFromImages || (
    !isLandingPage && selectedTaxon && selectedTaxon !== 'unknown'
      ? selectedTaxonFromStore
      : null
  );

  const { data: facts, isFetching: factsFetching } = useGetFactsQuery(relatedTaxon?.slug || selectedTaxon, {
    skip: !relatedTaxon?.slug && !selectedTaxon,
  });

  const aphiaId = React.useMemo(() => {
    if (!facts) return null;
    const wormsLink = facts.find(
      (fact) => fact.provider === 'WoRMS' && fact.collection === 'External Links'
    );
    return wormsLink?.attributes?.[0]?.externalId || null;
  }, [facts]);

  const displayImages = isLandingPage ? firstImagePerTaxon : filteredImages;

  const hasAttributeFilters = instrumentsMap.length > 0 || institutesMap.length > 0 || geographicAreasMap.length > 0;

  return (
    <div className="container image-labeling-page">
      <ImageLabelingTaxonomy
        selectedTaxon={selectedTaxon}
        onTaxonSelect={handleTaxonSelect}
        imageLabelingTaxa={taxaList}
      />

      <main className="image-labeling-main">
        {isLandingPage ? (
          <LandingHeader />
        ) : selectedTaxon === 'unknown' ? (
          <UnknownTaxonHeader />
        ) : (
          <TaxonHeader
            taxon={relatedTaxon}
            aphiaId={aphiaId}
            factsFetching={factsFetching}
          />
        )}

        {hasAttributeFilters && (
          <AttributeFilters
            filtersExpanded={filtersExpanded}
            onToggleFilters={handleToggleFilters}
            hasActiveFilters={hasActiveFilters}
            onResetFilters={handleResetFilters}
            instrumentsMap={instrumentsMap}
            institutesMap={institutesMap}
            geographicAreasMap={geographicAreasMap}
            selectedInstruments={selectedInstruments}
            selectedInstitutes={selectedInstitutes}
            selectedGeographicAreas={selectedGeographicAreas}
            onInstrumentToggle={handleInstrumentToggle}
            onInstituteToggle={handleInstituteToggle}
            onGeographicAreaToggle={handleGeographicAreaToggle}
          />
        )}

        <section className="image-labeling-status">
          {showLoading && <div>Loading images&hellip;</div>}
          {error && <div className="image-labeling-error">{String(error)}</div>}
          {!showLoading && !isLandingPage && displayImages.length === 0 && (
            <div>
              {hasActiveFilters
                ? 'No images found matching the selected filters.'
                : images.length === 0
                  ? 'No images available for this taxon yet.'
                  : 'No images found matching the selected filters.'
              }
            </div>
          )}
          {!showLoading && isLandingPage && displayImages.length === 0 && (
            <div>No images found matching the selected filters.</div>
          )}

          {!showLoading && displayImages.length > 0 && (
            <ImageLabelingGallery
              images={displayImages}
              isLandingPage={isLandingPage}
              onTaxonClick={isLandingPage ? handleTaxonSelect : null}
            />
          )}
        </section>
      </main>
    </div>
  );
};

export default withRouter(ImageLabelingPage);
