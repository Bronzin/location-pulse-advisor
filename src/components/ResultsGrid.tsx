
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
  X
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

interface ResultsGridProps {
  searchData: any;
  updateSearchData: (data: any) => void;
  onNext?: () => void;
}

// Mock data generator - now with subtype filtering
const generateMockResults = (searchData: any) => {
  console.log("Generating results for:", searchData.businessType, searchData.businessSubtype);
  
  const baseResults = [
    {
      id: 1,
      title: "Locale Commerciale Via Roma",
      address: "Via Roma 45, Milano",
      price: 2800,
      surface: 85,
      score: 92,
      type: "Locale commerciale",
      subtype: "Ristorante",
      description: "Ottima posizione nel centro storico, alta affluenza pedonale",
      demographics: {
        population: 45000,
        averageAge: 35,
        income: "Medio-alto"
      },
      features: ["Vetrina su strada", "Aria condizionata", "Bagno", "Deposito"],
      competition: 3,
      footTraffic: 85,
      accessibility: 90,
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      source: "Immobiliare.it"
    },
    {
      id: 2,
      title: "Spazio Commerciale Corso Venezia",
      address: "Corso Venezia 12, Milano",
      price: 3200,
      surface: 120,
      score: 88,
      type: "Open space",
      subtype: "Bar",
      description: "Moderno locale con grandi vetrate, zona business",
      demographics: {
        population: 38000,
        averageAge: 32,
        income: "Alto"
      },
      features: ["Doppia vetrina", "Parcheggio", "Climatizzato", "Fiber internet"],
      competition: 5,
      footTraffic: 78,
      accessibility: 95,
      image: "https://images.unsplash.com/photo-1622127922040-13cab637ee78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      source: "Idealista.it"
    },
    {
      id: 3,
      title: "Negozio Zona Navigli",
      address: "Via Navigli 8, Milano",
      price: 2200,
      surface: 65,
      score: 85,
      type: "Locale storico",
      subtype: "Pizzeria",
      description: "Zona movida, ideale per ristorazione e retail giovane",
      demographics: {
        population: 52000,
        averageAge: 28,
        income: "Medio"
      },
      features: ["Atmosfera unica", "Dehors possibile", "Zona pedonale"],
      competition: 8,
      footTraffic: 92,
      accessibility: 75,
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      source: "Casa.it"
    },
    {
      id: 4,
      title: "Locale Commerciale Porta Garibaldi",
      address: "Via Garibaldi 23, Milano",
      price: 4500,
      surface: 150,
      score: 94,
      type: "Locale premium",
      subtype: "Ristorante",
      description: "Distretto finanziario, clientela business di alto livello",
      demographics: {
        population: 35000,
        averageAge: 38,
        income: "Molto alto"
      },
      features: ["Design moderno", "Sicurezza H24", "Parcheggio riservato"],
      competition: 2,
      footTraffic: 88,
      accessibility: 98,
      image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      source: "Subito.it"
    },
    {
      id: 5,
      title: "Spazio Commerciale Via Montenapoleone",
      address: "Via Montenapoleone 8, Milano",
      price: 7500,
      surface: 90,
      score: 96,
      type: "Luxury retail",
      subtype: "Abbigliamento e Accessori",
      description: "Prestigiosa via dello shopping di lusso, clientela internazionale",
      demographics: {
        population: 25000,
        averageAge: 45,
        income: "Molto alto"
      },
      features: ["Vetrina prestigiosa", "Contesto esclusivo", "Alta visibilità"],
      competition: 4,
      footTraffic: 75,
      accessibility: 85,
      image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      source: "Immobiliare.it"
    },
    {
      id: 6,
      title: "Studio Medico Città Studi",
      address: "Viale Romagna 22, Milano",
      price: 2100,
      surface: 75,
      score: 89,
      type: "Studio professionale",
      subtype: "Studio Dentistico",
      description: "Zona universitaria e residenziale, ottimo per studi medici",
      demographics: {
        population: 42000,
        averageAge: 32,
        income: "Medio-alto"
      },
      features: ["Ampia sala d'attesa", "Reception", "3 stanze separate", "Accessibile"],
      competition: 2,
      footTraffic: 65,
      accessibility: 90,
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1168&q=80",
      source: "Case&Uffici"
    },
    {
      id: 7,
      title: "Capannone Commerciale Zona Sud",
      address: "Via dell'Industria 15, Milano",
      price: 3800,
      surface: 350,
      score: 82,
      type: "Capannone",
      subtype: "Officina",
      description: "Area industriale ben collegata, ampi spazi di manovra",
      demographics: {
        population: 18000,
        averageAge: 42,
        income: "Medio"
      },
      features: ["Ampio cortile", "Zona carico/scarico", "Uffici interni", "Parcheggi"],
      competition: 1,
      footTraffic: 45,
      accessibility: 80,
      image: "https://images.unsplash.com/photo-1581578017093-cd30fce4eeb7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      source: "Capannoni.it"
    },
    {
      id: 8,
      title: "Negozio Centro Commerciale",
      address: "Centro Commerciale Milano Est, Milano",
      price: 3200,
      surface: 65,
      score: 87,
      type: "Corner commerciale",
      subtype: "Elettronica",
      description: "Elevato passaggio nel principale centro commerciale della zona",
      demographics: {
        population: 120000,
        averageAge: 35,
        income: "Medio"
      },
      features: ["Grande visibilità", "Spazi personalizzabili", "Area food court vicina"],
      competition: 6,
      footTraffic: 95,
      accessibility: 100,
      image: "https://images.unsplash.com/photo-1580654843061-8c90a9585faf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      source: "MallSpaces.it"
    }
  ];

  // Filter by subtype if specified
  let filteredResults = baseResults;
  if (searchData.businessSubtype) {
    filteredResults = baseResults.filter(result => 
      result.subtype === searchData.businessSubtype
    );
  }

  // If no results found or less than 2, return first 3 items to avoid empty results
  if (filteredResults.length < 2) {
    filteredResults = baseResults.slice(0, 3);
  }

  // Apply budget and surface filters
  return filteredResults.map(result => ({
    ...result,
    price: Math.max(searchData.budget.min, Math.min(searchData.budget.max, result.price)),
    surface: Math.max(searchData.surface.min, Math.min(searchData.surface.max, result.surface))
  }));
};

const ResultsGrid = ({ searchData }: ResultsGridProps) => {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedResult, setSelectedResult] = useState<any>(null);

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    const timer = setTimeout(() => {
      const mockResults = generateMockResults(searchData);
      setResults(mockResults);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [searchData]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const viewDetails = (result: any) => {
    setSelectedResult(result);
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
              Analizzando opportunità immobiliari...
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
      {/* Results Summary - Now including business subtype */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-md rounded-full px-6 py-4 shadow-lg">
          <TrendingUp className="h-5 w-5 text-green-600" />
          <span className="text-lg font-medium text-slate-700">
            Trovate {results.length} opportunità per {searchData.businessSubtype || "la tua attività"}
          </span>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid gap-6">
        {results.map((result) => (
          <Card key={result.id} className="bg-white/80 backdrop-blur-md hover:shadow-xl transition-all duration-300">
            <CardContent className="p-0">
              <div className="flex flex-col lg:flex-row">
                {/* Image */}
                <div className="lg:w-80 h-48 lg:h-auto overflow-hidden">
                  <img 
                    src={result.image} 
                    alt={result.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://images.unsplash.com/photo-1564419320461-6870880221ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80";
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
                      {/* Display the subtype */}
                      <Badge className="mt-2">{result.subtype}</Badge>
                      {/* Display the source */}
                      <Badge variant="outline" className="mt-2 ml-2 text-xs bg-blue-50">
                        <span className="opacity-70 mr-1">Fonte:</span> {result.source}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={`${getScoreBadgeColor(result.score)}`}>
                        <Star className="h-3 w-3 mr-1" />
                        {result.score}/100
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
                        <Users className="h-4 w-4 mr-1" />
                        <span className="font-bold">{result.demographics.population.toLocaleString()}</span>
                      </div>
                      <span className="text-xs text-slate-600">abitanti</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {result.description}
                  </p>

                  {/* Performance Indicators */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Traffico Pedonale</span>
                        <span>{result.footTraffic}%</span>
                      </div>
                      <Progress value={result.footTraffic} className="h-2" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Accessibilità</span>
                        <span>{result.accessibility}%</span>
                      </div>
                      <Progress value={result.accessibility} className="h-2" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Concorrenza</span>
                        <span>{result.competition} locali</span>
                      </div>
                      <Progress value={Math.max(0, 100 - (result.competition * 10))} className="h-2" />
                    </div>
                  </div>

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
                            <Badge className="ml-2">{result.type}</Badge>
                            <Badge variant="outline" className="ml-2">
                              Fonte: {result.source}
                            </Badge>
                          </DialogDescription>
                        </DialogHeader>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                          <div>
                            <img 
                              src={result.image} 
                              alt={result.title}
                              className="w-full h-64 object-cover rounded-lg mb-4"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "https://images.unsplash.com/photo-1564419320461-6870880221ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80";
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
                                  <TableHead colSpan={2} className="text-center">Dati Demografici</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell className="font-medium">Popolazione</TableCell>
                                  <TableCell>{result.demographics.population.toLocaleString()}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="font-medium">Età Media</TableCell>
                                  <TableCell>{result.demographics.averageAge} anni</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="font-medium">Reddito Medio</TableCell>
                                  <TableCell>{result.demographics.income}</TableCell>
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
                            
                            <Button className="w-full">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Contatta per Maggiori Informazioni
                            </Button>
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
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button 
          variant="outline" 
          size="lg"
          className="px-8"
        >
          Carica Altri Risultati
        </Button>
      </div>
    </div>
  );
};

export default ResultsGrid;
