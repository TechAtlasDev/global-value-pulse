import { useState, useMemo } from "react";
import { PriceTable } from "@/components/PriceTable";
import { PriceChart } from "@/components/PriceChart";
import { YearSelector } from "@/components/YearSelector";

// Mock data - En producción, esto vendría de una API
const generateMockData = () => {
  const years = [2020, 2021, 2022, 2023, 2024, 2025];
  const inflationRates = [1.0, 1.05, 1.12, 1.18, 1.23, 1.28]; // Inflación acumulada

  const baseAssets = [
    // Commodities
    { name: "Petróleo Brent", symbol: "BRENT", category: "commodity" as const, basePrice: 70 },
    { name: "Oro", symbol: "XAU", category: "commodity" as const, basePrice: 1800 },
    { name: "Plata", symbol: "XAG", category: "commodity" as const, basePrice: 24 },
    { name: "Cobre", symbol: "HG", category: "commodity" as const, basePrice: 4.2 },
    
    // Criptomonedas
    { name: "Bitcoin", symbol: "BTC", category: "crypto" as const, basePrice: 35000 },
    { name: "Ethereum", symbol: "ETH", category: "crypto" as const, basePrice: 2200 },
    { name: "Tether", symbol: "USDT", category: "crypto" as const, basePrice: 1.0 },
    { name: "Binance Coin", symbol: "BNB", category: "crypto" as const, basePrice: 310 },
    
    // Divisas (precio en USD)
    { name: "Sol Peruano", symbol: "PEN", category: "currency" as const, basePrice: 0.27 },
    { name: "Libra Esterlina", symbol: "GBP", category: "currency" as const, basePrice: 1.27 },
    { name: "Euro", symbol: "EUR", category: "currency" as const, basePrice: 1.09 },
    { name: "Yen Japonés", symbol: "JPY", category: "currency" as const, basePrice: 0.0067 },
  ];

  const historicalData: { [key: number]: any } = {};
  
  years.forEach((year, index) => {
    const volatility = Math.random() * 0.3 + 0.85; // 0.85 - 1.15
    const inflationFactor = inflationRates[index];
    
    const avgBasePrice = baseAssets.reduce((sum, a) => sum + a.basePrice, 0) / baseAssets.length;
    
    historicalData[year] = {
      assets: baseAssets.map(asset => ({
        ...asset,
        price: asset.basePrice * volatility * (1 + (index * 0.15)),
        change: (Math.random() - 0.5) * 10, // -5% a +5%
      })),
      chartData: {
        actual: Math.round(avgBasePrice * volatility * (1 + (index * 0.15))),
        adjusted: Math.round((avgBasePrice * volatility * (1 + (index * 0.15))) / inflationFactor),
      }
    };
  });

  return { years, historicalData };
};

const Index = () => {
  const { years, historicalData } = useMemo(() => generateMockData(), []);
  const [selectedYear, setSelectedYear] = useState(2024);

  const chartData = years.map(year => ({
    year,
    actual: Math.round(15000 + Math.random() * 10000 + (year - 2020) * 2000),
    adjusted: Math.round(15000 + Math.random() * 8000 + (year - 2020) * 1000),
  }));

  const currentAssets = historicalData[selectedYear]?.assets || [];

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-[1800px] mx-auto space-y-6">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Dashboard Financiero
          </h1>
          <p className="text-muted-foreground text-lg">
            Análisis de mercados globales con ajuste por inflación
          </p>
        </div>

        <YearSelector
          selectedYear={selectedYear}
          availableYears={years}
          onYearChange={setSelectedYear}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="w-full">
            <PriceTable assets={currentAssets} year={selectedYear} />
          </div>
          
          <div className="w-full">
            <PriceChart data={chartData} selectedYear={selectedYear} />
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground mt-8">
          <p>Los datos mostrados son simulados con fines demostrativos</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
