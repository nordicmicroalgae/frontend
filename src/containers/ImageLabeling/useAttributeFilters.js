import { useState, useCallback } from 'react';


/**
 * Shared filter logic for image attributes (instruments, institutes, geographic areas).
 * Used by both the landing page (all images) and taxon page (per-taxon images).
 */
export function useAttributeFilters() {
  const [selectedInstruments, setSelectedInstruments] = useState([]);
  const [selectedInstitutes, setSelectedInstitutes] = useState([]);
  const [selectedGeographicAreas, setSelectedGeographicAreas] = useState([]);

  const hasActiveFilters = (
    selectedInstruments.length > 0 ||
    selectedInstitutes.length > 0 ||
    selectedGeographicAreas.length > 0
  );

  const handleInstrumentToggle = useCallback((instrument) => {
    setSelectedInstruments((prev) =>
      prev.includes(instrument)
        ? prev.filter((i) => i !== instrument)
        : [...prev, instrument]
    );
  }, []);

  const handleInstituteToggle = useCallback((institute) => {
    setSelectedInstitutes((prev) =>
      prev.includes(institute)
        ? prev.filter((i) => i !== institute)
        : [...prev, institute]
    );
  }, []);

  const handleGeographicAreaToggle = useCallback((area) => {
    setSelectedGeographicAreas((prev) =>
      prev.includes(area)
        ? prev.filter((a) => a !== area)
        : [...prev, area]
    );
  }, []);

  const handleResetFilters = useCallback(() => {
    setSelectedInstruments([]);
    setSelectedInstitutes([]);
    setSelectedGeographicAreas([]);
  }, []);

  return {
    selectedInstruments,
    selectedInstitutes,
    selectedGeographicAreas,
    hasActiveFilters,
    handleInstrumentToggle,
    handleInstituteToggle,
    handleGeographicAreaToggle,
    handleResetFilters,
  };
}


/**
 * Apply attribute filters to a list of images.
 * Shared between filteredAllImages and filteredImages to eliminate duplication.
 */
export function applyAttributeFilters(images, { selectedInstruments, selectedInstitutes, selectedGeographicAreas }) {
  let result = images;

  if (selectedInstruments.length > 0) {
    result = result.filter((img) => {
      const instruments = img.attributes?.imagingInstrument || [];
      const instrumentArray = Array.isArray(instruments) ? instruments : [instruments];
      return instrumentArray.some((inst) => selectedInstruments.includes(inst));
    });
  }

  if (selectedInstitutes.length > 0) {
    result = result.filter((img) => {
      const institutes = img.attributes?.institute || [];
      const instituteArray = Array.isArray(institutes) ? institutes : [institutes];

      if (selectedInstitutes.includes('__not_specified__') && (!img.attributes?.institute || instituteArray.length === 0)) {
        return true;
      }

      return instituteArray.some((inst) => selectedInstitutes.includes(inst));
    });
  }

  if (selectedGeographicAreas.length > 0) {
    result = result.filter((img) => {
      const area = img.attributes?.geographicArea;

      if (selectedGeographicAreas.includes('__not_specified__') && !area) {
        return true;
      }

      return area && selectedGeographicAreas.includes(area);
    });
  }

  return result;
}
