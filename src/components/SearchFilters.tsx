
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Euro, 
  Maximize2, 
  Users, 
  Building2
} from "lucide-react";

interface SearchFiltersProps {
  searchData: any;
  updateSearchData: (data: any) => void;
  onNext: () => void;
}

const SearchFilters = ({ searchData, updateSearchData, onNext }: SearchFiltersProps) => {
  const handleBudgetChange = (values: number[], type: 'min' | 'max') => {
    const newBudget = { ...searchData.budget };
    if (type === 'min') newBudget.min = values[0];
    if (type === 'max') newBudget.max = values[0];
    updateSearchData({ budget: newBudget });
  };

  const handleSurfaceChange = (values: number[], type: 'min' | 'max') => {
    const newSurface = { ...searchData.surface };
    if (type === 'min') newSurface.min = values[0];
    if (type === 'max') newSurface.max = values[0];
    updateSearchData({ surface: newSurface });
  };

  const handlePopulationChange = (values: number[]) => {
    updateSearchData({ population: values[0] });
  };

  const handleCompetitorsChange = (checked: boolean) => {
    updateSearchData({ competitors: checked });
  };

  return (
    <div className="space-y-8">
      {/* Filter Summary */}
      <div className="text-center">
        <div className="inline-flex flex-wrap items-center gap-2 bg-white/80 backdrop-blur-md rounded-full px-6 py-3 shadow-lg">
          <span className="text-sm text-slate-600">Filtri attivi:</span>
          <Badge variant="outline">
            €{searchData.budget.min} - €{searchData.budget.max}
          </Badge>
          <Badge variant="outline">
            {searchData.surface.min}m² - {searchData.surface.max}m²
          </Badge>
          <Badge variant="outline">
            {searchData.population.toLocaleString()} abitanti
          </Badge>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Budget Filter */}
        <Card className="bg-white/80 backdrop-blur-md">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Euro className="h-5 w-5 text-green-600" />
              <CardTitle className="text-lg">Budget Mensile</CardTitle>
            </div>
            <CardDescription>
              Imposta il range di affitto mensile che puoi sostenere
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Budget Minimo: €{searchData.budget.min}</Label>
                <Slider
                  value={[searchData.budget.min]}
                  onValueChange={(values) => handleBudgetChange(values, 'min')}
                  max={10000}
                  min={0}
                  step={100}
                  className="mt-2"
                />
              </div>
              <div>
                <Label className="text-sm font-medium">Budget Massimo: €{searchData.budget.max}</Label>
                <Slider
                  value={[searchData.budget.max]}
                  onValueChange={(values) => handleBudgetChange(values, 'max')}
                  max={10000}
                  min={searchData.budget.min}
                  step={100}
                  className="mt-2"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Surface Filter */}
        <Card className="bg-white/80 backdrop-blur-md">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Maximize2 className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-lg">Superficie</CardTitle>
            </div>
            <CardDescription>
              Definisci la metratura del locale che ti serve
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Superficie Minima: {searchData.surface.min}m²</Label>
                <Slider
                  value={[searchData.surface.min]}
                  onValueChange={(values) => handleSurfaceChange(values, 'min')}
                  max={1000}
                  min={0}
                  step={10}
                  className="mt-2"
                />
              </div>
              <div>
                <Label className="text-sm font-medium">Superficie Massima: {searchData.surface.max}m²</Label>
                <Slider
                  value={[searchData.surface.max]}
                  onValueChange={(values) => handleSurfaceChange(values, 'max')}
                  max={1000}
                  min={searchData.surface.min}
                  step={10}
                  className="mt-2"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Demographics */}
        <Card className="bg-white/80 backdrop-blur-md">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-600" />
              <CardTitle className="text-lg">Demografia</CardTitle>
            </div>
            <CardDescription>
              Target demografico per la tua attività
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-sm font-medium">
                Popolazione Minima nell'Area: {searchData.population.toLocaleString()} abitanti
              </Label>
              <Slider
                value={[searchData.population]}
                onValueChange={handlePopulationChange}
                max={500000}
                min={1000}
                step={1000}
                className="mt-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Competition */}
        <Card className="bg-white/80 backdrop-blur-md">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-orange-600" />
              <CardTitle className="text-lg">Concorrenza</CardTitle>
            </div>
            <CardDescription>
              Preferenze sulla presenza di competitors
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-sm font-medium">
                  Accetta zone con concorrenti
                </Label>
                <p className="text-xs text-slate-600">
                  Includere aree con attività simili nelle vicinanze
                </p>
              </div>
              <Switch
                checked={searchData.competitors}
                onCheckedChange={handleCompetitorsChange}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SearchFilters;
