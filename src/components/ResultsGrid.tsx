
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  MapPin, 
  Euro, 
  Maximize2, 
  Users, 
  TrendingUp,
  Building2,
  Star,
  Eye,
  Heart,
  ExternalLink,
  X,
  Settings
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { propertyService, PropertyListing } from '@/services/PropertyService';
import ApiKeyConfig from './ApiKeyConfig';

interface ResultsGridProps {
  searchData: any;
  updateSearchData: (data: any) => void;
  onNext?: () => void;
}

const ResultsGrid = ({ searchData }: ResultsGridProps) => {
  const [results, setResults] = useState<PropertyListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedResult, setSelectedResult] = useState<PropertyListing | null>(null);
  const [showApiConfig, setShowApiConfig] = useState(false);

  useEffect(() => {
    fetchProperties();
  }, [searchData]);

  const fetchProperties = async () => {
    setLoading(true);
    
    try {
      const searchParams = {
        location: searchData.location?.value || 'Milano',
        maxPrice: searchData.budget.max,
        minSurface: searchData.surface.min,
        maxSurface: searchData.surface.max,
        propertyType: searchData.businessSubtype || 'commerciale'
      };

      console.log('Fetching properties with params:', searchParams);
      const properties = await propertyService.searchProperties(searchParams);
      setResults(properties);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const viewDetails = (result: PropertyListing) => {
    setSelectedResult(result);
  };

  const getScoreFromPrice = (price: number): number => {
    // Calcola un punteggio basato sul rapporto qualità/prezzo
    const maxBudget = searchData.budget.max;
    const priceRatio = price / maxBudget;
    return Math.round(Math.max(60, 100 - (priceRatio * 40)));
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-800';
    if (score >= 80) return 'bg-blue-100 text-blue-800';
    if (score >= 70) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-md rounded-full px-6 py-4 shadow-lg">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="text-lg font-medium text-slate-700">
              Caricamento opportunità in {searchData.location?.value || 'Italia'}...
            </span>
          </div>
        </div>
        
        <div className="grid gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="bg-white/60 backdrop-blur-md animate-pulse">
              <CardContent className="p-6">
                <div className="flex space-x-4">
                  <div className="w-32 h-24 bg-slate-200 rounded"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                    <div className="h-3 bg-slate-200 rounded w-2/3"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* API Configuration */}
      <div className="mb-6">
        <ApiKeyConfig onApiKeySet={() => fetchProperties()} />
        {!showApiConfig && (
          <div className="text-center mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowApiConfig(!showApiConfig)}
              className="text-slate-600"
            >
              <Settings className="h-4 w-4 mr-2" />
              Configura Dati Reali
            </Button>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-md rounded-full px-6 py-4 shadow-lg">
          <TrendingUp className="h-5 w-5 text-green-600" />
          <span className="text-lg font-medium text-slate-700">
            Trovate {results.length} opportunità per {searchData.businessSubtype || "la tua attività"} in {searchData.location?.value || 'Italia'}
          </span>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid gap-6">
        {results.map((result) => {
          const score = getScoreFromPrice(result.price);
          return (
            <Card key={result.id} className="bg-white/80 backdrop-blur-md hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row">
                  {/* Image */}
                  <div className="lg:w-80 h-48 lg:h-auto overflow-hidden">
                    <img 
                      src={result.images[0] || "https://images.unsplash.com/photo-1564419320461-6870880221ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"} 
                      alt={result.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://images.unsplash.com/photo-1564419320461-6870880221ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80";
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 space-y-4">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-slate-800">{result.title}</h3>
                        <div className="flex items-center text-slate-600 mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="text-sm">{result.address}</span>
                        </div>
                        <Badge className="mt-2">{result.propertyType}</Badge>
                        <Badge variant="outline" className="mt-2 ml-2 text-xs bg-blue-50">
                          <span className="opacity-70 mr-1">Fonte:</span> {result.source}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={`${getScoreBadgeColor(score)}`}>
                          <Star className="h-3 w-3 mr-1" />
                          {score}/100
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFavorite(result.id)}
                          className={favorites.includes(result.id) ? 'text-red-500' : 'text-slate-400'}
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center text-green-600 mb-1">
                          <Euro className="h-4 w-4 mr-1" />
                          <span className="font-bold">€{result.price}</span>
                        </div>
                        <span className="text-xs text-slate-600">al mese</span>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center text-blue-600 mb-1">
                          <Maximize2 className="h-4 w-4 mr-1" />
                          <span className="font-bold">{result.surface}m²</span>
                        </div>
                        <span className="text-xs text-slate-600">superficie</span>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center text-purple-600 mb-1">
                          <Building2 className="h-4 w-4 mr-1" />
                          <span className="font-bold">{result.location.city}</span>
                        </div>
                        <span className="text-xs text-slate-600">località</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {result.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2">
                      {result.features.map((feature: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2 pt-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" className="flex-1" onClick={() => viewDetails(result)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Vedi Dettagli
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="flex justify-between items-center">
                              {result.title}
                              <DialogClose>
                                <Button variant="ghost" size="sm">
                                  <X className="h-4 w-4" />
                                </Button>
                              </DialogClose>
                            </DialogTitle>
                            <DialogDescription className="flex items-center text-slate-600">
                              <MapPin className="h-4 w-4 mr-1" />
                              {result.address}
                              <Badge className="ml-2">{result.propertyType}</Badge>
                              <Badge variant="outline" className="ml-2">
                                Fonte: {result.source}
                              </Badge>
                            </DialogDescription>
                          </DialogHeader>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            <div>
                              <img 
                                src={result.images[0] || "https://images.unsplash.com/photo-1564419320461-6870880221ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"} 
                                alt={result.title}
                                className="w-full h-64 object-cover rounded-lg mb-4"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = "https://images.unsplash.com/photo-1564419320461-6870880221ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80";
                                }}
                              />
                              <div className="bg-slate-50 p-4 rounded-lg">
                                <h4 className="text-lg font-medium mb-2">Descrizione</h4>
                                <p className="text-slate-600">{result.description}</p>
                              </div>
                            </div>
                            
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="bg-blue-50 p-4 rounded-lg text-center">
                                  <span className="text-slate-600 text-sm">Prezzo Mensile</span>
                                  <div className="text-xl font-bold text-blue-700">€{result.price}</div>
                                </div>
                                <div className="bg-green-50 p-4 rounded-lg text-center">
                                  <span className="text-slate-600 text-sm">Superficie</span>
                                  <div className="text-xl font-bold text-green-700">{result.surface}m²</div>
                                </div>
                              </div>
                              
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead colSpan={2} className="text-center">Informazioni Località</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell className="font-medium">Città</TableCell>
                                    <TableCell>{result.location.city}</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Regione</TableCell>
                                    <TableCell>{result.location.region}</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell className="font-medium">Tipo Proprietà</TableCell>
                                    <TableCell>{result.propertyType}</TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                              
                              <div>
                                <h4 className="text-lg font-medium mb-2">Caratteristiche</h4>
                                <div className="flex flex-wrap gap-2">
                                  {result.features.map((feature: string, index: number) => (
                                    <Badge key={index} variant="outline">
                                      {feature}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              
                              {result.url && (
                                <Button className="w-full" asChild>
                                  <a href={result.url} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    Vedi Annuncio Originale
                                  </a>
                                </Button>
                              )}
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button size="sm" variant="outline">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Contatta
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button 
          variant="outline" 
          size="lg"
          className="px-8"
          onClick={fetchProperties}
        >
          Aggiorna Risultati
        </Button>
      </div>
    </div>
  );
};

export default ResultsGrid;
