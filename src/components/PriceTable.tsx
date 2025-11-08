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

  const renderAssetCard = (asset: Asset) => {
    const isPositive = asset.change >= 0;
    
    return (
      <div
        key={asset.symbol}
        className="p-3 border border-border rounded-lg hover:bg-muted/30 transition-colors flex items-center justify-between"
      >
        <div className="flex-1 min-w-0">
          <div className="font-medium text-foreground text-sm truncate">{asset.name}</div>
          <div className="text-xs text-muted-foreground">{asset.symbol}</div>
        </div>
        <div className="text-right ml-2">
          <div className="font-semibold text-foreground text-sm">
            ${asset.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className={`text-xs flex items-center gap-1 justify-end ${isPositive ? 'text-success' : 'text-destructive'}`}>
            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {isPositive ? '+' : ''}{asset.change.toFixed(2)}%
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
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Commodities</h3>
            <div className="space-y-3">
              {commodities.map(renderAssetCard)}
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Divisas</h3>
            <div className="space-y-3">
              {currencies.map(renderAssetCard)}
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Criptomonedas</h3>
            <div className="space-y-3">
              {cryptos.map(renderAssetCard)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
