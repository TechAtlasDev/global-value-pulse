import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface Asset {
  name: string;
  symbol: string;
  price: number;
  change: number;
  category: "commodity" | "crypto" | "currency";
}

interface PriceTableProps {
  assets: Asset[];
  year: number;
}

export const PriceTable = ({ assets, year }: PriceTableProps) => {
  const commodities = assets.filter(a => a.category === "commodity");
  const cryptos = assets.filter(a => a.category === "crypto");
  const currencies = assets.filter(a => a.category === "currency");

  const renderAssetRow = (asset: Asset) => {
    const isPositive = asset.change >= 0;
    
    return (
      <div
        key={asset.symbol}
        className="flex items-center justify-between py-3 border-b border-border last:border-0 hover:bg-muted/30 transition-colors px-4 rounded-md"
      >
        <div className="flex-1">
          <div className="font-medium text-foreground">{asset.name}</div>
          <div className="text-sm text-muted-foreground">{asset.symbol}</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="font-semibold text-foreground">
              ${asset.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className={`text-sm flex items-center gap-1 justify-end ${isPositive ? 'text-success' : 'text-destructive'}`}>
              {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {isPositive ? '+' : ''}{asset.change.toFixed(2)}%
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="shadow-lg border-border">
      <CardHeader className="border-b border-border">
        <CardTitle className="text-2xl font-bold text-foreground">Mercados Globales</CardTitle>
        <p className="text-sm text-muted-foreground">Datos del año {year}</p>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3 px-4">Commodities</h3>
          <div className="space-y-1">
            {commodities.map(renderAssetRow)}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3 px-4">Criptomonedas</h3>
          <div className="space-y-1">
            {cryptos.map(renderAssetRow)}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3 px-4">Divisas</h3>
          <div className="space-y-1">
            {currencies.map(renderAssetRow)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
