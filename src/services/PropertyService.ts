
import axios from 'axios';

export interface PropertyListing {
  id: string;
  title: string;
  address: string;
  price: number;
  surface: number;
  description: string;
  images: string[];
  propertyType: string;
  url: string;
  source: string;
  location: {
    latitude: number;
    longitude: number;
    city: string;
    region: string;
  };
  features: string[];
}

export interface SearchParams {
  location: string;
  maxPrice: number;
  minSurface: number;
  maxSurface: number;
  propertyType: string;
}

class PropertyService {
  private rapidApiKey: string | null = null;
  
  constructor() {
    this.rapidApiKey = localStorage.getItem('rapidapi_key');
  }

  setApiKey(apiKey: string) {
    this.rapidApiKey = apiKey;
    localStorage.setItem('rapidapi_key', apiKey);
  }

  getApiKey(): string | null {
    return this.rapidApiKey || localStorage.getItem('rapidapi_key');
  }

  async searchProperties(params: SearchParams): Promise<PropertyListing[]> {
    console.log('Searching properties with params:', params);
    
    if (!this.rapidApiKey) {
      console.log('No API key found, returning mock data');
      return this.getMockData(params);
    }

    try {
      // Utilizziamo RapidAPI per Idealista
      const response = await axios.get('https://idealista2.p.rapidapi.com/properties', {
        headers: {
          'X-RapidAPI-Key': this.rapidApiKey,
          'X-RapidAPI-Host': 'idealista2.p.rapidapi.com'
        },
        params: {
          locationName: params.location,
          maxPrice: params.maxPrice,
          minSize: params.minSurface,
          maxSize: params.maxSurface,
          propertyType: 'commercial',
          operation: 'rent',
          locale: 'it',
          numPage: 1,
          maxItems: 10
        }
      });

      console.log('API Response:', response.data);

      if (response.data && response.data.elementList) {
        return response.data.elementList.map((item: any) => ({
          id: item.propertyCode || Math.random().toString(),
          title: item.address || 'Locale Commerciale',
          address: `${item.address}, ${item.municipality}`,
          price: item.price || 0,
          surface: item.size || 0,
          description: item.description || 'Ottima opportunità commerciale',
          images: item.multimedia?.images?.map((img: any) => img.url) || [
            'https://images.unsplash.com/photo-1564419320461-6870880221ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'
          ],
          propertyType: 'Locale commerciale',
          url: item.url || '',
          source: 'Idealista',
          location: {
            latitude: item.latitude || 0,
            longitude: item.longitude || 0,
            city: item.municipality || params.location,
            region: item.province || ''
          },
          features: this.extractFeatures(item)
        }));
      }

      return this.getMockData(params);
    } catch (error) {
      console.error('Error fetching properties:', error);
      return this.getMockData(params);
    }
  }

  private extractFeatures(item: any): string[] {
    const features = [];
    if (item.hasAirConditioning) features.push('Aria condizionata');
    if (item.hasParking) features.push('Parcheggio');
    if (item.hasLift) features.push('Ascensore');
    if (item.hasSwimmingPool) features.push('Piscina');
    if (item.hasTerrace) features.push('Terrazza');
    if (item.hasGarden) features.push('Giardino');
    return features.length > 0 ? features : ['Buona posizione', 'Spazi funzionali'];
  }

  private getMockData(params: SearchParams): PropertyListing[] {
    // Dati mock basati sulla location
    const mockListings: PropertyListing[] = [];
    
    // Generiamo risultati diversi basati sulla location
    const basePrice = params.location.toLowerCase().includes('milano') ? 3000 : 
                      params.location.toLowerCase().includes('roma') ? 2800 : 2000;

    for (let i = 1; i <= 3; i++) {
      mockListings.push({
        id: `mock_${i}_${Date.now()}`,
        title: `Locale Commerciale ${params.location} ${i}`,
        address: `Via Esempio ${i * 10}, ${params.location}`,
        price: basePrice + (i * 200),
        surface: Math.max(params.minSurface, 70 + (i * 15)),
        description: `Ottima opportunità nel centro di ${params.location}. Locale commerciale ideale per ${params.propertyType}.`,
        images: [
          'https://images.unsplash.com/photo-1564419320461-6870880221ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'
        ],
        propertyType: 'Locale commerciale',
        url: '',
        source: 'Demo Data',
        location: {
          latitude: 45.4642 + (Math.random() - 0.5) * 0.1,
          longitude: 9.1900 + (Math.random() - 0.5) * 0.1,
          city: params.location,
          region: 'Italia'
        },
        features: ['Vetrina su strada', 'Aria condizionata', 'Bagno', 'Deposito']
      });
    }

    return mockListings;
  }
}

export const propertyService = new PropertyService();
