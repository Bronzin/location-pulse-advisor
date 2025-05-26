
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Key, ExternalLink, CheckCircle } from "lucide-react";
import { propertyService } from '@/services/PropertyService';
import { toast } from "@/components/ui/use-toast";

interface ApiKeyConfigProps {
  onApiKeySet?: () => void;
}

const ApiKeyConfig = ({ onApiKeySet }: ApiKeyConfigProps) => {
  const [apiKey, setApiKey] = useState('');
  const [isConfigured, setIsConfigured] = useState(!!propertyService.getApiKey());
  const [isTesting, setIsTesting] = useState(false);

  const handleSaveApiKey = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "Errore",
        description: "Inserisci una API key valida",
        variant: "destructive",
      });
      return;
    }

    setIsTesting(true);
    
    try {
      propertyService.setApiKey(apiKey);
      setIsConfigured(true);
      setApiKey('');
      
      toast({
        title: "API Key Configurata",
        description: "La tua API key è stata salvata con successo",
      });
      
      onApiKeySet?.();
    } catch (error) {
      toast({
        title: "Errore",
        description: "Errore durante il salvataggio della API key",
        variant: "destructive",
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleRemoveApiKey = () => {
    localStorage.removeItem('rapidapi_key');
    setIsConfigured(false);
    toast({
      title: "API Key Rimossa",
      description: "La configurazione è stata rimossa",
    });
  };

  if (isConfigured) {
    return (
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-800">
                API Key configurata - Utilizzo dati reali
              </span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRemoveApiKey}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              Rimuovi
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Key className="h-5 w-5 text-blue-600" />
          <CardTitle className="text-lg text-blue-800">Configurazione Dati Reali</CardTitle>
        </div>
        <CardDescription>
          Per ottenere risultati reali da Idealista, configura la tua API key di RapidAPI
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-white p-4 rounded-lg border border-blue-200">
          <h4 className="font-medium mb-2">Come ottenere la API key:</h4>
          <ol className="text-sm text-slate-600 space-y-1 list-decimal list-inside">
            <li>Registrati su <a href="https://rapidapi.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center">RapidAPI <ExternalLink className="h-3 w-3 ml-1" /></a></li>
            <li>Cerca "Idealista" nell'API marketplace</li>
            <li>Sottoscrivi il piano gratuito o a pagamento</li>
            <li>Copia la tua API key dal dashboard</li>
          </ol>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="api-key">API Key RapidAPI</Label>
          <Input
            id="api-key"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Incolla qui la tua API key"
          />
        </div>
        
        <div className="flex space-x-2">
          <Button 
            onClick={handleSaveApiKey}
            disabled={!apiKey.trim() || isTesting}
            className="flex-1"
          >
            {isTesting ? "Verifica..." : "Salva API Key"}
          </Button>
          <Button 
            variant="outline" 
            onClick={() => onApiKeySet?.()}
            className="px-4"
          >
            Usa Demo
          </Button>
        </div>
        
        <div className="text-xs text-slate-500">
          <Badge variant="outline" className="mr-2">Sicuro</Badge>
          La tua API key viene salvata solo localmente nel browser
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiKeyConfig;
