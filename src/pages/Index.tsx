import { useState } from "react";
import { Plane, Shield, Zap, Database, BarChart3, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import ConsensusComparison from "@/components/ConsensusComparison";
import ReservationSystem from "@/components/ReservationSystem";
import DocumentationPanel from "@/components/DocumentationPanel";
import SmartContractCode from "@/components/SmartContractCode";

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2.5 rounded-xl shadow-lg">
                <Plane className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Consesair</h1>
                <p className="text-xs text-muted-foreground">Blockchain Aviation Ticketing</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-success/10 rounded-lg border border-success/20">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-success">Network Active</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 gap-2 bg-card p-2 rounded-xl shadow-md">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="consensus"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Shield className="w-4 h-4 mr-2" />
              Consensus
            </TabsTrigger>
            <TabsTrigger 
              value="reservation"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Database className="w-4 h-4 mr-2" />
              Reservation
            </TabsTrigger>
            <TabsTrigger 
              value="documentation"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <FileText className="w-4 h-4 mr-2" />
              Docs & Code
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 bg-gradient-to-br from-primary to-primary-light text-primary-foreground shadow-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm opacity-90 mb-1">Consensus Algorithms</p>
                    <h3 className="text-3xl font-bold">4</h3>
                    <p className="text-xs opacity-75 mt-2">PoW, PoS, BFT, Consesair</p>
                  </div>
                  <Shield className="w-10 h-10 opacity-80" />
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-success to-success/80 text-success-foreground shadow-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm opacity-90 mb-1">Avg Finality Time</p>
                    <h3 className="text-3xl font-bold">1.2s</h3>
                    <p className="text-xs opacity-75 mt-2">Consesair mechanism</p>
                  </div>
                  <Zap className="w-10 h-10 opacity-80" />
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-accent to-accent-light text-accent-foreground shadow-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm opacity-90 mb-1">Energy Efficiency</p>
                    <h3 className="text-3xl font-bold">95%</h3>
                    <p className="text-xs opacity-75 mt-2">vs Traditional PoW</p>
                  </div>
                  <Database className="w-10 h-10 opacity-80" />
                </div>
              </Card>
            </div>

            <Card className="p-8 shadow-md">
              <h2 className="text-2xl font-bold text-foreground mb-4">About Consesair</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Consesair</strong> is a hybrid consensus mechanism specifically designed 
                  for aviation ticket booking systems. It combines the best aspects of Proof of Stake, Byzantine Fault Tolerance, 
                  and a novel voting layer tailored for regulatory compliance and low-latency finality.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      Key Features
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Sub-2-second transaction finality</li>
                      <li>Regulatory-compliant validator whitelist</li>
                      <li>Energy-efficient compared to PoW</li>
                      <li>Built-in dispute resolution</li>
                      <li>Auditability for aviation authorities</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <Zap className="w-4 h-4 text-accent" />
                      Use Cases
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Real-time ticket reservations</li>
                      <li>Secure ticket transfers</li>
                      <li>Instant cancellation processing</li>
                      <li>Multi-airline interoperability</li>
                      <li>Fraud prevention & traceability</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="consensus">
            <ConsensusComparison />
          </TabsContent>

          <TabsContent value="reservation">
            <ReservationSystem />
          </TabsContent>

          <TabsContent value="documentation">
            <div className="grid lg:grid-cols-2 gap-6">
              <DocumentationPanel />
              <SmartContractCode />
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Consesair Research Project. Blockchain-based Aviation Ticketing.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Solidity 0.8.x</span>
              <span>•</span>
              <span>Hardhat</span>
              <span>•</span>
              <span>Ethers.js</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
