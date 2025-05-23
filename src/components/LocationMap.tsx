
import React, { useState } from 'react';
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

const LocationMap = ({ searchData, updateSearchData, onNext }: LocationMapProps) => {
  const [searchType, setSearchType] = useState<'national' | 'regional' | 'city' | 'custom'>('national');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [customLocation, setCustomLocation] = useState('');

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
        {/* Map Placeholder */}
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
            <div className="aspect-square bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
              <div className="text-center text-slate-600">
                <Map className="h-16 w-16 mx-auto mb-4 text-blue-400" />
                <p className="text-lg font-medium">Mappa Italia</p>
                <p className="text-sm">
                  {searchData.location ? `Area: ${searchData.location.value}` : 'Seleziona un\'area per visualizzarla'}
                </p>
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
