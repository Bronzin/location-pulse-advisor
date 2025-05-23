
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ShoppingBag, 
  Coffee, 
  Scissors, 
  Wrench, 
  GraduationCap,
  Stethoscope,
  Car,
  Building,
  Palette,
  Utensils
} from "lucide-react";

interface BusinessTypeSelectorProps {
  searchData: any;
  updateSearchData: (data: any) => void;
  onNext: () => void;
}

const businessTypes = [
  {
    id: 'retail',
    title: 'Retail & Shopping',
    description: 'Negozi di abbigliamento, elettronica, accessori',
    icon: ShoppingBag,
    color: 'bg-blue-500',
    examples: ['Abbigliamento', 'Ottica', 'Edicola', 'Elettronica']
  },
  {
    id: 'food',
    title: 'Food & Beverage',
    description: 'Ristoranti, bar, pizzerie, catering',
    icon: Coffee,
    color: 'bg-orange-500',
    examples: ['Bar', 'Ristorante', 'Pizzeria', 'Gelateria']
  },
  {
    id: 'services',
    title: 'Servizi alla Persona',
    description: 'Parrucchieri, centri estetici, wellness',
    icon: Scissors,
    color: 'bg-pink-500',
    examples: ['Parrucchiere', 'Centro Estetico', 'Palestra', 'SPA']
  },
  {
    id: 'professional',
    title: 'Servizi Professionali',
    description: 'Uffici, coworking, consulenze',
    icon: Building,
    color: 'bg-purple-500',
    examples: ['Coworking', 'Studio Legale', 'Agenzia', 'Consultoria']
  },
  {
    id: 'automotive',
    title: 'Automotive',
    description: 'Officine, autolavaggi, concessionarie',
    icon: Car,
    color: 'bg-red-500',
    examples: ['Officina', 'Autolavaggio', 'Parcheggio', 'Autonoleggio']
  },
  {
    id: 'health',
    title: 'Salute & Benessere',
    description: 'Farmacie, cliniche, centri medici',
    icon: Stethoscope,
    color: 'bg-green-500',
    examples: ['Farmacia', 'Poliambulatorio', 'Fisioterapia', 'Dentista']
  },
  {
    id: 'education',
    title: 'Educazione & Formazione',
    description: 'Scuole, corsi, centri formativi',
    icon: GraduationCap,
    color: 'bg-indigo-500',
    examples: ['Scuola Lingue', 'Centro Formazione', 'Tutoring', 'Asilo']
  },
  {
    id: 'creative',
    title: 'Creatività & Arte',
    description: 'Studi artistici, gallerie, laboratori',
    icon: Palette,
    color: 'bg-teal-500',
    examples: ['Studio Fotografico', 'Galleria', 'Laboratorio', 'Atelier']
  }
];

const BusinessTypeSelector = ({ searchData, updateSearchData, onNext }: BusinessTypeSelectorProps) => {
  const handleSelectType = (typeId: string) => {
    updateSearchData({ businessType: typeId });
  };

  return (
    <div className="space-y-8">
      {/* Selected Type Display */}
      {searchData.businessType && (
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-md rounded-full px-6 py-3 shadow-lg">
            <span className="text-sm text-slate-600">Selezionato:</span>
            <Badge variant="secondary" className="text-sm">
              {businessTypes.find(t => t.id === searchData.businessType)?.title}
            </Badge>
          </div>
        </div>
      )}

      {/* Business Types Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businessTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = searchData.businessType === type.id;
          
          return (
            <Card 
              key={type.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                isSelected 
                  ? 'ring-2 ring-blue-500 bg-blue-50/50 border-blue-200' 
                  : 'bg-white/80 backdrop-blur-md hover:bg-white/90'
              }`}
              onClick={() => handleSelectType(type.id)}
            >
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 rounded-full ${type.color} mx-auto mb-4 flex items-center justify-center`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-lg">{type.title}</CardTitle>
                <CardDescription className="text-sm">{type.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {type.examples.map((example, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="text-xs"
                    >
                      {example}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Next Button */}
      {searchData.businessType && (
        <div className="text-center">
          <Button 
            onClick={onNext}
            size="lg"
            className="px-8 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
          >
            Continua con i Filtri
          </Button>
        </div>
      )}
    </div>
  );
};

export default BusinessTypeSelector;
