
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, MapPin, TrendingUp, Users, Brain, Target } from "lucide-react";

interface HeroProps {
  onGetStarted: () => void;
}

const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Effects - Subtle light patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-indigo-50/30" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-100/20 rounded-full blur-3xl" />
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <header className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Building2 className="h-16 w-16 text-blue-600 mr-4" />
              <h1 className="text-5xl font-bold text-slate-800">
                Business<span className="text-blue-600">Finder</span> AI
              </h1>
            </div>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              L'intelligenza artificiale che trova la location perfetta per la tua nuova attività. 
              Analizza dati immobiliari, demografici e di mercato per massimizzare il tuo successo.
            </p>
          </header>

          {/* Main CTA */}
          <div className="text-center mb-20">
            <Button 
              onClick={onGetStarted}
              size="lg"
              className="px-12 py-6 text-lg bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <Target className="w-6 h-6 mr-2" />
              Trova la Tua Location Ideale
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-8 text-center">
                <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-800 mb-3">AI Intelligence</h3>
                <p className="text-slate-600">
                  Algoritmi avanzati analizzano migliaia di dati per calcolare il potenziale di ogni location
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-8 text-center">
                <MapPin className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-800 mb-3">Dati Territoriali</h3>
                <p className="text-slate-600">
                  Informazioni dettagliate su demografia, traffico, concorrenza e opportunità di mercato
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-8 text-center">
                <TrendingUp className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-800 mb-3">ROI Predictions</h3>
                <p className="text-slate-600">
                  Stime di redditività e analisi del rischio per ogni opportunità immobiliare
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-slate-600">Location Analizzate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
              <div className="text-slate-600">Successo Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-slate-600">Tipi di Business</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-slate-600">Monitoraggio</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
