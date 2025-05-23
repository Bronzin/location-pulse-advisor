
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  MapPin, 
  Search,
  Globe,
  Map
} from "lucide-react";

interface LocationMapProps {
  searchData: any;
  updateSearchData: (data: any) => void;
  onNext: () => void;
}

const italianRegions = [
  'Lombardia', 'Lazio', 'Campania', 'Sicilia', 'Veneto', 'Emilia-Romagna',
  'Piemonte', 'Puglia', 'Toscana', 'Calabria', 'Sardegna', 'Liguria',
  'Marche', 'Abruzzo', 'Friuli-Venezia Giulia', 'Trentino-Alto Adige',
  'Umbria', 'Basilicata', 'Molise', "Valle d'Aosta"
];

const majorCities = [
  'Roma', 'Milano', 'Napoli', 'Torino', 'Palermo', 'Genova', 'Bologna',
  'Firenze', 'Bari', 'Catania', 'Venezia', 'Verona', 'Messina', 'Padova',
  'Trieste', 'Brescia', 'Taranto', 'Prato', 'Reggio Calabria', 'Modena'
];

// Italy map coordinates
const italyCoordinates = {
  center: { lat: 41.87194, lng: 12.56738 },
  zoom: 6
};

// Region coordinates (approximated)
const regionCoordinates: Record<string, {lat: number, lng: number, zoom: number}> = {
  'Lombardia': { lat: 45.4773, lng: 9.1815, zoom: 8 },
  'Lazio': { lat: 41.9028, lng: 12.4964, zoom: 8 },
  'Campania': { lat: 40.8522, lng: 14.2681, zoom: 8 },
  'Sicilia': { lat: 37.5990, lng: 14.0154, zoom: 8 },
  'Veneto': { lat: 45.4398, lng: 12.3319, zoom: 8 },
  'Emilia-Romagna': { lat: 44.4949, lng: 11.3426, zoom: 8 },
  'Piemonte': { lat: 45.0703, lng: 7.6869, zoom: 8 },
  'Puglia': { lat: 41.1171, lng: 16.8719, zoom: 8 },
  'Toscana': { lat: 43.7711, lng: 11.2486, zoom: 8 },
  'Calabria': { lat: 38.9098, lng: 16.5876, zoom: 8 },
  'Sardegna': { lat: 39.2238, lng: 9.1217, zoom: 8 },
  'Liguria': { lat: 44.4222, lng: 8.9052, zoom: 9 },
  'Marche': { lat: 43.6211, lng: 13.5177, zoom: 9 },
  'Abruzzo': { lat: 42.3506, lng: 13.3995, zoom: 9 },
  'Friuli-Venezia Giulia': { lat: 46.0693, lng: 13.2365, zoom: 9 },
  'Trentino-Alto Adige': { lat: 46.0747, lng: 11.1217, zoom: 9 },
  'Umbria': { lat: 43.1122, lng: 12.3888, zoom: 9 },
  'Basilicata': { lat: 40.6394, lng: 15.8056, zoom: 9 },
  'Molise': { lat: 41.6005, lng: 14.6588, zoom: 9 },
  "Valle d'Aosta": { lat: 45.7383, lng: 7.3177, zoom: 9 }
};

// City coordinates
const cityCoordinates: Record<string, {lat: number, lng: number, zoom: number}> = {
  'Roma': { lat: 41.9028, lng: 12.4964, zoom: 12 },
  'Milano': { lat: 45.4642, lng: 9.1900, zoom: 12 },
  'Napoli': { lat: 40.8518, lng: 14.2681, zoom: 12 },
  'Torino': { lat: 45.0703, lng: 7.6869, zoom: 12 },
  'Palermo': { lat: 38.1157, lng: 13.3615, zoom: 12 },
  'Genova': { lat: 44.4056, lng: 8.9463, zoom: 12 },
  'Bologna': { lat: 44.4949, lng: 11.3426, zoom: 12 },
  'Firenze': { lat: 43.7696, lng: 11.2558, zoom: 12 },
  'Bari': { lat: 41.1171, lng: 16.8719, zoom: 12 },
  'Catania': { lat: 37.5079, lng: 15.0830, zoom: 12 },
  'Venezia': { lat: 45.4398, lng: 12.3319, zoom: 12 },
  'Verona': { lat: 45.4384, lng: 10.9916, zoom: 12 },
  'Messina': { lat: 38.1938, lng: 15.5540, zoom: 12 },
  'Padova': { lat: 45.4064, lng: 11.8768, zoom: 12 },
  'Trieste': { lat: 45.6495, lng: 13.7768, zoom: 12 },
  'Brescia': { lat: 45.5416, lng: 10.2118, zoom: 12 },
  'Taranto': { lat: 40.4647, lng: 17.2472, zoom: 12 },
  'Prato': { lat: 43.8777, lng: 11.1022, zoom: 12 },
  'Reggio Calabria': { lat: 38.1089, lng: 15.6439, zoom: 12 },
  'Modena': { lat: 44.6471, lng: 10.9253, zoom: 12 }
};

const LocationMap = ({ searchData, updateSearchData, onNext }: LocationMapProps) => {
  const [searchType, setSearchType] = useState<'national' | 'regional' | 'city' | 'custom'>('national');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [customLocation, setCustomLocation] = useState('');
  const mapRef = useRef<HTMLDivElement>(null);
  
  // Map state management
  const [mapImage, setMapImage] = useState('/italia_map.jpg'); // Default Italy map
  const [mapCaption, setMapCaption] = useState('Italia');

  // Update map based on selection
  useEffect(() => {
    if (searchType === 'national') {
      setMapImage('/italia_map.jpg');
      setMapCaption('Italia');
    } else if (searchType === 'regional' && selectedRegion) {
      setMapImage(`/maps/${selectedRegion.toLowerCase().replace(/\s+/g, '_')}_map.jpg`);
      setMapCaption(selectedRegion);
    } else if (searchType === 'city' && selectedCity) {
      setMapImage(`/maps/${selectedCity.toLowerCase().replace(/\s+/g, '_')}_map.jpg`);
      setMapCaption(selectedCity);
    } else if (searchType === 'custom' && customLocation) {
      // For custom location we would use a more complex map solution
      // For now, just show Italy map with caption
      setMapImage('/italia_map.jpg');
      setMapCaption(customLocation);
    }
  }, [searchType, selectedRegion, selectedCity, customLocation]);

  const handleLocationUpdate = () => {
    let location = null;
    
    switch (searchType) {
      case 'national':
        location = { type: 'national', value: 'Italia' };
        break;
      case 'regional':
        location = { type: 'regional', value: selectedRegion };
        break;
      case 'city':
        location = { type: 'city', value: selectedCity };
        break;
      case 'custom':
        location = { type: 'custom', value: customLocation };
        break;
    }
    
    updateSearchData({ location });
  };

  const isLocationSelected = () => {
    switch (searchType) {
      case 'national':
        return true;
      case 'regional':
        return selectedRegion !== '';
      case 'city':
        return selectedCity !== '';
      case 'custom':
        return customLocation.trim() !== '';
      default:
        return false;
    }
  };

  return (
    <div className="space-y-8">
      {/* Current Selection Display */}
      {searchData.location && (
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-md rounded-full px-6 py-3 shadow-lg">
            <MapPin className="h-4 w-4 text-blue-600" />
            <span className="text-sm text-slate-600">Area selezionata:</span>
            <Badge variant="secondary" className="text-sm">
              {searchData.location.value}
            </Badge>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Map */}
        <Card className="bg-white/80 backdrop-blur-md">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Map className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-lg">Mappa Interattiva</CardTitle>
            </div>
            <CardDescription>
              Visualizzazione dell'area di ricerca selezionata
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div 
              ref={mapRef}
              className="aspect-square bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg relative overflow-hidden"
            >
              {/* Map Visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Show a default Italy map or custom map based on selection */}
                <div className="w-full h-full relative">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Italy_topographic_map-blank.svg/2000px-Italy_topographic_map-blank.svg.png" 
                    alt={`Mappa di ${mapCaption}`}
                    className="w-full h-full object-contain p-4"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  
                  {/* Overlay a pin or highlight based on selection */}
                  {searchData.location && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="h-8 w-8 text-red-500 drop-shadow-lg mx-auto animate-bounce" />
                        <div className="bg-white/80 backdrop-blur-md px-3 py-1 rounded-full shadow-lg text-sm font-medium mt-2">
                          {searchData.location.value}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md p-2 text-center text-slate-700 font-medium">
                {searchData.location ? searchData.location.value : 'Seleziona un\'area sulla mappa'}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location Selector */}
        <Card className="bg-white/80 backdrop-blur-md">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-green-600" />
              <CardTitle className="text-lg">Selezione Area</CardTitle>
            </div>
            <CardDescription>
              Scegli l'area geografica per la tua ricerca
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Search Type Selector */}
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant={searchType === 'national' ? 'default' : 'outline'}
                onClick={() => setSearchType('national')}
                className="text-sm"
              >
                Tutta Italia
              </Button>
              <Button 
                variant={searchType === 'regional' ? 'default' : 'outline'}
                onClick={() => setSearchType('regional')}
                className="text-sm"
              >
                Per Regione
              </Button>
              <Button 
                variant={searchType === 'city' ? 'default' : 'outline'}
                onClick={() => setSearchType('city')}
                className="text-sm"
              >
                Per Città
              </Button>
              <Button 
                variant={searchType === 'custom' ? 'default' : 'outline'}
                onClick={() => setSearchType('custom')}
                className="text-sm"
              >
                Personalizzata
              </Button>
            </div>

            {/* Conditional Inputs */}
            {searchType === 'regional' && (
              <div className="space-y-2">
                <Label>Seleziona Regione</Label>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger>
                    <SelectValue placeholder="Scegli una regione..." />
                  </SelectTrigger>
                  <SelectContent>
                    {italianRegions.map((region) => (
                      <SelectItem key={region} value={region}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {searchType === 'city' && (
              <div className="space-y-2">
                <Label>Seleziona Città</Label>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Scegli una città..." />
                  </SelectTrigger>
                  <SelectContent>
                    {majorCities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {searchType === 'custom' && (
              <div className="space-y-2">
                <Label>Cerca Area Specifica</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Es. Centro storico Milano, Quartiere EUR Roma..."
                    value={customLocation}
                    onChange={(e) => setCustomLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            )}

            {/* Update Location Button */}
            <Button 
              onClick={handleLocationUpdate}
              disabled={!isLocationSelected()}
              className="w-full"
              variant="outline"
            >
              Aggiorna Selezione
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Continue Button */}
      {searchData.location && (
        <div className="text-center">
          <Button 
            onClick={onNext}
            size="lg"
            className="px-8 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
          >
            <Search className="w-5 h-5 mr-2" />
            Cerca Opportunità
          </Button>
        </div>
      )}
    </div>
  );
};

export default LocationMap;
