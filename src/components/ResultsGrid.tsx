
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
  ExternalLink
} from "lucide-react";

interface ResultsGridProps {
  searchData: any;
  updateSearchData: (data: any) => void;
  onNext?: () => void;
}

// Mock data generator
const generateMockResults = (searchData: any) => {
  const baseResults = [
    {
      id: 1,
      title: "Locale Commerciale Via Roma",
      address: "Via Roma 45, Milano",
      price: 2800,
      surface: 85,
      score: 92,
      type: "Locale commerciale",
      description: "Ottima posizione nel centro storico, alta affluenza pedonale",
      demographics: {
        population: 45000,
        averageAge: 35,
        income: "Medio-alto"
      },
      features: ["Vetrina su strada", "Aria condizionata", "Bagno", "Deposito"],
      competition: 3,
      footTraffic: 85,
      accessibility: 90
    },
    {
      id: 2,
      title: "Spazio Commerciale Corso Venezia",
      address: "Corso Venezia 12, Milano",
      price: 3200,
      surface: 120,
      score: 88,
      type: "Open space",
      description: "Moderno locale con grandi vetrate, zona business",
      demographics: {
        population: 38000,
        averageAge: 32,
        income: "Alto"
      },
      features: ["Doppia vetrina", "Parcheggio", "Climatizzato", "Fiber internet"],
      competition: 5,
      footTraffic: 78,
      accessibility: 95
    },
    {
      id: 3,
      title: "Negozio Zona Navigli",
      address: "Via Navigli 8, Milano",
      price: 2200,
      surface: 65,
      score: 85,
      type: "Locale storico",
      description: "Zona movida, ideale per ristorazione e retail giovane",
      demographics: {
        population: 52000,
        averageAge: 28,
        income: "Medio"
      },
      features: ["Atmosfera unica", "Dehors possibile", "Zona pedonale"],
      competition: 8,
      footTraffic: 92,
      accessibility: 75
    },
    {
      id: 4,
      title: "Locale Commerciale Porta Garibaldi",
      address: "Via Garibaldi 23, Milano",
      price: 4500,
      surface: 150,
      score: 94,
      type: "Locale premium",
      description: "Distretto finanziario, clientela business di alto livello",
      demographics: {
        population: 35000,
        averageAge: 38,
        income: "Molto alto"
      },
      features: ["Design moderno", "Sicurezza H24", "Parcheggio riservato"],
      competition: 2,
      footTraffic: 88,
      accessibility: 98
    }
  ];

  return baseResults.map(result => ({
    ...result,
    price: Math.max(searchData.budget.min, Math.min(searchData.budget.max, result.price)),
    surface: Math.max(searchData.surface.min, Math.min(searchData.surface.max, result.surface))
  }));
};

const ResultsGrid = ({ searchData }: ResultsGridProps) => {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      const mockResults = generateMockResults(searchData);
      setResults(mockResults);
      setLoading(false);
    }, 2000);
  }, [searchData]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
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
      {/* Results Summary */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-md rounded-full px-6 py-4 shadow-lg">
          <TrendingUp className="h-5 w-5 text-green-600" />
          <span className="text-lg font-medium text-slate-700">
            Trovate {results.length} opportunità perfette per te
          </span>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid gap-6">
        {results.map((result) => (
          <Card key={result.id} className="bg-white/80 backdrop-blur-md hover:shadow-xl transition-all duration-300">
            <CardContent className="p-0">
              <div className="flex flex-col lg:flex-row">
                {/* Image Placeholder */}
                <div className="lg:w-80 h-48 lg:h-auto bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                  <Building2 className="h-16 w-16 text-blue-400" />
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
                    <Button size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      Vedi Dettagli
                    </Button>
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
