import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface ChartDataPoint {
  year: number;
  actual: number;
  adjusted: number;
}

interface PriceChartProps {
  data: ChartDataPoint[];
  selectedYear: number;
}

export const PriceChart = ({ data, selectedYear }: PriceChartProps) => {
  return (
    <Card className="shadow-lg border-border h-full">
      <CardHeader className="border-b border-border">
        <CardTitle className="text-2xl font-bold text-foreground">
          Evolución de Precios
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Comparación: Precio actual vs Ajustado por inflación
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="year" 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fill: "hsl(var(--foreground))" }}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fill: "hsl(var(--foreground))" }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
                color: "hsl(var(--foreground))"
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
              labelFormatter={(label) => `Año ${label}`}
            />
            <Legend 
              wrapperStyle={{ 
                paddingTop: "20px",
                color: "hsl(var(--foreground))"
              }}
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="hsl(var(--chart-1))"
              strokeWidth={3}
              name="Precio Actual"
              dot={{ fill: "hsl(var(--chart-1))", r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="adjusted"
              stroke="hsl(var(--chart-2))"
              strokeWidth={3}
              name="Ajustado por Inflación"
              dot={{ fill: "hsl(var(--chart-2))", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
