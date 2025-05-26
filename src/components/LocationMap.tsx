
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

const LocationMap = ({ searchData, updateSearchData, onNext }: LocationMapProps) => {
  const [searchType, setSearchType] = useState<'national' | 'regional' | 'city' | 'custom'>('national');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [customLocation, setCustomLocation] = useState('');
  const mapRef = useRef<HTMLDivElement>(null);

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

  // Auto-update location when selections change
  useEffect(() => {
    if (isLocationSelected()) {
      handleLocationUpdate();
    }
  }, [searchType, selectedRegion, selectedCity, customLocation]);

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
              className="aspect-square bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg relative overflow-hidden border-2 border-blue-200"
            >
              {/* Italy SVG Map */}
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="w-full h-full relative">
                  {/* Simple Italy shape using CSS */}
                  <div className="w-full h-full relative bg-white rounded-lg shadow-inner border">
                    <svg viewBox="0 0 400 500" className="w-full h-full">
                      {/* Simplified Italy map outline */}
                      <path
                        d="M200 50 L180 80 L160 120 L140 160 L130 200 L120 240 L130 280 L140 320 L160 360 L180 400 L200 450 L220 420 L240 380 L260 340 L280 300 L290 260 L300 220 L280 180 L260 140 L240 100 L220 70 Z"
                        fill="#e3f2fd"
                        stroke="#1976d2"
                        strokeWidth="2"
                        className="drop-shadow-md"
                      />
                      {/* Sicily */}
                      <circle cx="200" cy="420" r="15" fill="#e3f2fd" stroke="#1976d2" strokeWidth="2" />
                      {/* Sardinia */}
                      <ellipse cx="120" cy="280" rx="12" ry="25" fill="#e3f2fd" stroke="#1976d2" strokeWidth="2" />
                    </svg>
                    
                    {/* Location pin overlay */}
                    {searchData.location && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center animate-bounce">
                          <MapPin className="h-8 w-8 text-red-500 drop-shadow-lg mx-auto" />
                          <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg text-xs font-medium mt-1 border">
                            {searchData.location.value}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md p-3 text-center text-slate-700 font-medium border-t">
                {searchData.location ? `Area selezionata: ${searchData.location.value}` : 'Seleziona un\'area geografica'}
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

            {/* Location Status */}
            {searchData.location && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2 text-green-700">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    Area selezionata: {searchData.location.value}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LocationMap;
