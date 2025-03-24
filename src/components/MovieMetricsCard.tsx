
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { cn } from '@/lib/utils';

interface MovieMetric {
  name: string;
  value: number;
  color: string;
}

interface MovieMetricsCardProps {
  title: string;
  data: MovieMetric[];
  className?: string;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 shadow-md border border-border/40 rounded-md">
        <p className="text-sm font-medium">{`${payload[0].name}: ${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

const CustomLegend = (props: any) => {
  const { payload } = props;
  
  return (
    <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs pt-2">
      {payload.map((entry: any, index: number) => (
        <li key={`item-${index}`} className="flex items-center gap-1">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: entry.color }}
          />
          <span>{entry.value}</span>
        </li>
      ))}
    </ul>
  );
};

const MovieMetricsCard = ({ title, data, className }: MovieMetricsCardProps) => {
  return (
    <div className={cn("dashboard-card h-full", className)}>
      <div className="p-3 border-b border-border/40">
        <h3 className="font-medium text-sm">{title}</h3>
      </div>
      <div className="p-3 flex flex-col items-center justify-center h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              paddingAngle={2}
              dataKey="value"
              animationDuration={1000}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MovieMetricsCard;
