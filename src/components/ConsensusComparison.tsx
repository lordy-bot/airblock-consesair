import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Zap, Shield, Database, Clock, Leaf, Users } from "lucide-react";

const consensusData = [
  {
    name: "PoW (Proof of Work)",
    color: "bg-destructive",
    metrics: {
      latency: { value: 600, max: 600, unit: "ms", icon: Clock, inverted: true },
      throughput: { value: 7, max: 5000, unit: "tx/s", icon: Zap, inverted: false },
      energy: { value: 95, max: 100, unit: "high", icon: Leaf, inverted: true },
      security: { value: 95, max: 100, unit: "%", icon: Shield, inverted: false },
      decentralization: { value: 85, max: 100, unit: "%", icon: Users, inverted: false },
      finality: { value: 3600, max: 3600, unit: "s", icon: Clock, inverted: true }
    }
  },
  {
    name: "PoS (Proof of Stake)",
    color: "bg-warning",
    metrics: {
      latency: { value: 400, max: 600, unit: "ms", icon: Clock, inverted: true },
      throughput: { value: 1000, max: 5000, unit: "tx/s", icon: Zap, inverted: false },
      energy: { value: 15, max: 100, unit: "low", icon: Leaf, inverted: true },
      security: { value: 80, max: 100, unit: "%", icon: Shield, inverted: false },
      decentralization: { value: 70, max: 100, unit: "%", icon: Users, inverted: false },
      finality: { value: 384, max: 3600, unit: "s", icon: Clock, inverted: true }
    }
  },
  {
    name: "BFT (Byzantine Fault Tolerance)",
    color: "bg-primary-light",
    metrics: {
      latency: { value: 200, max: 600, unit: "ms", icon: Clock, inverted: true },
      throughput: { value: 3000, max: 5000, unit: "tx/s", icon: Zap, inverted: false },
      energy: { value: 10, max: 100, unit: "low", icon: Leaf, inverted: true },
      security: { value: 88, max: 100, unit: "%", icon: Shield, inverted: false },
      decentralization: { value: 60, max: 100, unit: "%", icon: Users, inverted: false },
      finality: { value: 2, max: 3600, unit: "s", icon: Clock, inverted: true }
    }
  },
  {
    name: "Consesair (Hybrid)",
    color: "bg-success",
    metrics: {
      latency: { value: 120, max: 600, unit: "ms", icon: Clock, inverted: true },
      throughput: { value: 4500, max: 5000, unit: "tx/s", icon: Zap, inverted: false },
      energy: { value: 5, max: 100, unit: "very low", icon: Leaf, inverted: true },
      security: { value: 92, max: 100, unit: "%", icon: Shield, inverted: false },
      decentralization: { value: 75, max: 100, unit: "%", icon: Users, inverted: false },
      finality: { value: 1.2, max: 3600, unit: "s", icon: Clock, inverted: true }
    }
  }
];

const MetricBar = ({ 
  label, 
  value, 
  max, 
  unit, 
  icon: Icon, 
  inverted = false 
}: { 
  label: string; 
  value: number; 
  max: number; 
  unit: string; 
  icon: any; 
  inverted?: boolean 
}) => {
  const percentage = (value / max) * 100;
  const displayPercentage = inverted ? 100 - percentage : percentage;
  
  const getColor = () => {
    if (inverted) {
      if (displayPercentage >= 80) return "bg-success";
      if (displayPercentage >= 50) return "bg-warning";
      return "bg-destructive";
    } else {
      if (displayPercentage >= 80) return "bg-success";
      if (displayPercentage >= 50) return "bg-warning";
      return "bg-destructive";
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium text-foreground">{label}</span>
        </div>
        <span className="text-muted-foreground">
          {value} {unit}
        </span>
      </div>
      <div className="relative">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className={`h-full ${getColor()} transition-all duration-500 ease-out rounded-full`}
            style={{ width: `${displayPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

const ConsensusComparison = () => {
  return (
    <div className="space-y-6">
      <Card className="p-8 shadow-md">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Consensus Mechanism Comparison</h2>
            <p className="text-muted-foreground mt-1">
              Statistical analysis of different consensus algorithms for aviation ticketing
            </p>
          </div>
          <Badge variant="outline" className="text-sm">
            Simulation Data
          </Badge>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {consensusData.map((consensus) => (
            <Card key={consensus.name} className="p-6 border-2 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-4 h-4 rounded-full ${consensus.color}`} />
                <h3 className="text-lg font-bold text-foreground">{consensus.name}</h3>
              </div>

              <div className="space-y-4">
                <MetricBar
                  label="Latency"
                  value={consensus.metrics.latency.value}
                  max={consensus.metrics.latency.max}
                  unit={consensus.metrics.latency.unit}
                  icon={consensus.metrics.latency.icon}
                  inverted={consensus.metrics.latency.inverted}
                />
                <MetricBar
                  label="Throughput"
                  value={consensus.metrics.throughput.value}
                  max={consensus.metrics.throughput.max}
                  unit={consensus.metrics.throughput.unit}
                  icon={consensus.metrics.throughput.icon}
                />
                <MetricBar
                  label="Energy"
                  value={consensus.metrics.energy.value}
                  max={consensus.metrics.energy.max}
                  unit={consensus.metrics.energy.unit}
                  icon={consensus.metrics.energy.icon}
                  inverted={consensus.metrics.energy.inverted}
                />
                <MetricBar
                  label="Security"
                  value={consensus.metrics.security.value}
                  max={consensus.metrics.security.max}
                  unit={consensus.metrics.security.unit}
                  icon={consensus.metrics.security.icon}
                />
                <MetricBar
                  label="Decentralization"
                  value={consensus.metrics.decentralization.value}
                  max={consensus.metrics.decentralization.max}
                  unit={consensus.metrics.decentralization.unit}
                  icon={consensus.metrics.decentralization.icon}
                />
                <MetricBar
                  label="Finality Time"
                  value={consensus.metrics.finality.value}
                  max={consensus.metrics.finality.max}
                  unit={consensus.metrics.finality.unit}
                  icon={consensus.metrics.finality.icon}
                  inverted={consensus.metrics.finality.inverted}
                />
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* ASCII Bar Chart Visualization */}
      <Card className="p-8 shadow-md bg-night-blue text-cloud-white font-mono">
        <h3 className="text-lg font-bold mb-4">ASCII Consensus Comparison Chart</h3>
        <pre className="text-xs leading-relaxed overflow-x-auto">
{`
Throughput (tx/s):
PoW        [▓▓░░░░░░░░░░░░░░░░░░] 7
PoS        [▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░] 1000
BFT        [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░] 3000
Consesair  [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░] 4500

Finality Time (lower is better):
PoW        [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 3600s
PoS        [▓▓▓▓▓▓░░░░░░░░░░░░░░] 384s
BFT        [░░░░░░░░░░░░░░░░░░░░] 2s
Consesair  [░░░░░░░░░░░░░░░░░░░░] 1.2s

Energy Efficiency (lower is better):
PoW        [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] Very High
PoS        [▓▓▓░░░░░░░░░░░░░░░░░] Low
BFT        [▓▓░░░░░░░░░░░░░░░░░░] Low
Consesair  [▓░░░░░░░░░░░░░░░░░░░] Very Low

Security Score:
PoW        [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░] 95%
PoS        [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░] 80%
BFT        [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░] 88%
Consesair  [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░] 92%
`}
        </pre>
      </Card>
    </div>
  );
};

export default ConsensusComparison;
