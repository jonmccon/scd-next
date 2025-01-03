// Centralized function to filter listings based on selected filters

type Tag = {
  id: string;
  name: string;
};

interface Listing {
  id: string;
  title: string;
  category: string;
  size: string;
  neighborhood: string;
  city: string;
  website: string;
  episodeURL: string;
  episodePromo: string;
  latitude: number;
  longitude: number;
  color: string;
  tags: Tag[];
}

export const filterListings = (listings: Listing[], selectedSizes: string[], selectedNeighborhoods: string[], selectedCities: string[], selectedTags: Tag[]) => {
    return listings.filter(listing =>
      (selectedSizes.length === 0 || selectedSizes.includes(listing.size)) &&
      (selectedNeighborhoods.length === 0 || selectedNeighborhoods.includes(listing.neighborhood)) &&
      (selectedCities.length === 0 || selectedCities.includes(listing.city)) &&
      (selectedTags.length === 0 || listing.tags.some(listingTag => selectedTags.some(tag => tag.id === listingTag.id)))
    );
  };
