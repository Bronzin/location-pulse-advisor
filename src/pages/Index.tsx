
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BusinessTypeSelector from "@/components/BusinessTypeSelector";
import SearchFilters from "@/components/SearchFilters";
import LocationMap from "@/components/LocationMap";
import ResultsGrid from "@/components/ResultsGrid";
import Hero from "@/components/Hero";
import { Building2, MapPin, TrendingUp, Users } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [searchData, setSearchData] = useState({
    businessType: '',
    businessSubtype: '',
    budget: { min: 0, max: 5000 },
    surface: { min: 0, max: 500 },
    population: 10000,
    location: null,
    competitors: true
  });
  const [searchInitiated, setSearchInitiated] = useState(false);

  const steps = [
    { title: "Tipo di Business", component: BusinessTypeSelector },
    { title: "Filtri di Ricerca", component: SearchFilters },
    { title: "Area Geografica", component: LocationMap },
    { title: "Risultati", component: ResultsGrid }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } 
    // When moving from step 3 (map) to step 4 (results)
    if (currentStep === 2) {
      setSearchInitiated(true);
      toast({
        title: "Ricerca avviata!",
        description: `Ricerca per ${searchData.businessSubtype} con budget fino a €${searchData.budget.max}`,
        duration: 3000
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateSearchData = (newData: any) => {
    setSearchData({ ...searchData, ...newData });
  };

  // Function to explicitly start the search and move to results
  const handleSearchOpportunities = () => {
    setSearchInitiated(true);
    setCurrentStep(4); // Move directly to the results step
    toast({
      title: "Ricerca avviata!",
      description: `Ricerca per ${searchData.businessSubtype} con budget fino a €${searchData.budget.max}`,
      duration: 3000
    });
  };

  // Function to return to home
  const goToHome = () => {
    setCurrentStep(0);
  };

  if (currentStep === 0) {
    return <Hero onGetStarted={() => setCurrentStep(1)} />;
  }

  const CurrentComponent = steps[currentStep - 1].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center space-x-2 cursor-pointer" 
              onClick={goToHome}
              title="Torna alla home"
            >
              <Building2 className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                BusinessFinder AI
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-slate-600">
                Step {currentStep} di {steps.length - 1}
              </div>
              <div className="w-32 h-2 bg-slate-200 rounded-full">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Step Title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              {steps[currentStep - 1].title}
            </h2>
            <p className="text-slate-600 text-lg">
              {currentStep === 1 && "Seleziona il tipo di attività che vuoi aprire"}
              {currentStep === 2 && "Imposta i parametri di ricerca per la tua location ideale"}
              {currentStep === 3 && "Scegli l'area geografica dove cercare"}
              {currentStep === 4 && "Ecco le migliori opportunità trovate per te"}
            </p>
          </div>

          {/* Current Step Component */}
          <div className="mb-8">
            <CurrentComponent 
              searchData={searchData} 
              updateSearchData={updateSearchData}
              onNext={handleNext}
            />
          </div>

          {/* Navigation */}
          {currentStep < steps.length && (
            <div className="flex justify-between items-center">
              <Button 
                variant="outline" 
                onClick={handleBack}
                disabled={currentStep === 1}
                className="px-8"
              >
                Indietro
              </Button>
              {currentStep === 3 && (
                <Button 
                  onClick={handleSearchOpportunities}
                  className="px-8 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                >
                  Cerca Opportunità
                </Button>
              )}
              {currentStep < 3 && (
                <Button 
                  onClick={handleNext}
                  disabled={currentStep === steps.length || 
                          (currentStep === 1 && (!searchData.businessType || !searchData.businessSubtype))}
                  className="px-8 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                >
                  {currentStep === steps.length - 1 ? "Completa" : "Avanti"}
                </Button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
