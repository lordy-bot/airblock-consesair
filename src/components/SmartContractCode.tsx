import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Download, FileCode } from "lucide-react";
import { toast } from "sonner";

const SmartContractCode = () => {
  const [selectedFile, setSelectedFile] = useState("main");

  const contracts = {
    main: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title AirlineReservationSystem
 * @dev Main contract for blockchain-based airline ticket booking with Consesair consensus
 * @author Consesair Research Team
 */
contract AirlineReservationSystem {
    
    struct Ticket {
        uint256 id;
        address passenger;
        string passengerName;
        string flightNumber;
        string from;
        string to;
        string date;
        uint256 price;
        TicketStatus status;
        uint256 timestamp;
        string consensusUsed;
    }
    
    enum TicketStatus { Active, Cancelled, Transferred }
    
    struct Validator {
        address validatorAddress;
        string name;
        uint256 stake;
        bool isActive;
        uint256 reputation;
    }
    
    struct ConsensusMetrics {
        uint256 latency;        // milliseconds
        uint256 throughput;     // transactions per second
        uint256 energyScore;    // 0-100 (lower is better)
        uint256 securityScore;  // 0-100
        uint256 decentralizationIndex; // 0-100
        uint256 finalityTime;   // seconds
        uint256 roundsExecuted;
    }
    
    // State variables
    mapping(uint256 => Ticket) public tickets;
    mapping(address => Validator) public validators;
    mapping(string => ConsensusMetrics) public consensusMetrics;
    
    address[] public validatorList;
    uint256 public ticketCounter;
    address public owner;
    
    // Events
    event TicketBooked(uint256 indexed ticketId, address indexed passenger, string flightNumber);
    event TicketCancelled(uint256 indexed ticketId);
    event TicketTransferred(uint256 indexed ticketId, address from, address to);
    event ValidatorRegistered(address indexed validator, uint256 stake);
    event ConsensusRoundCompleted(string mechanism, uint256 latency);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }
    
    constructor() {
        owner = msg.sender;
        initializeConsensusMetrics();
    }
    
    /**
     * @dev Initialize default consensus metrics for comparison
     */
    function initializeConsensusMetrics() private {
        // PoW metrics
        consensusMetrics["PoW"] = ConsensusMetrics({
            latency: 600,
            throughput: 7,
            energyScore: 95,
            securityScore: 95,
            decentralizationIndex: 85,
            finalityTime: 3600,
            roundsExecuted: 0
        });
        
        // PoS metrics
        consensusMetrics["PoS"] = ConsensusMetrics({
            latency: 400,
            throughput: 1000,
            energyScore: 15,
            securityScore: 80,
            decentralizationIndex: 70,
            finalityTime: 384,
            roundsExecuted: 0
        });
        
        // BFT metrics
        consensusMetrics["BFT"] = ConsensusMetrics({
            latency: 200,
            throughput: 3000,
            energyScore: 10,
            securityScore: 88,
            decentralizationIndex: 60,
            finalityTime: 2,
            roundsExecuted: 0
        });
        
        // Consesair hybrid metrics
        consensusMetrics["Consesair"] = ConsensusMetrics({
            latency: 120,
            throughput: 4500,
            energyScore: 5,
            securityScore: 92,
            decentralizationIndex: 75,
            finalityTime: 1, // 1.2 seconds
            roundsExecuted: 0
        });
    }
    
    /**
     * @dev Create a new flight reservation
     */
    function createReservation(
        string memory _passengerName,
        string memory _flightNumber,
        string memory _from,
        string memory _to,
        string memory _date
    ) public payable returns (uint256) {
        require(msg.value >= 0.01 ether, "Minimum booking fee required");
        
        ticketCounter++;
        
        tickets[ticketCounter] = Ticket({
            id: ticketCounter,
            passenger: msg.sender,
            passengerName: _passengerName,
            flightNumber: _flightNumber,
            from: _from,
            to: _to,
            date: _date,
            price: msg.value,
            status: TicketStatus.Active,
            timestamp: block.timestamp,
            consensusUsed: "Consesair"
        });
        
        emit TicketBooked(ticketCounter, msg.sender, _flightNumber);
        return ticketCounter;
    }
    
    /**
     * @dev Cancel a reservation
     */
    function cancelReservation(uint256 _ticketId) public {
        Ticket storage ticket = tickets[_ticketId];
        require(ticket.passenger == msg.sender, "Not your ticket");
        require(ticket.status == TicketStatus.Active, "Ticket not active");
        
        ticket.status = TicketStatus.Cancelled;
        
        // Refund 80% (20% cancellation fee)
        uint256 refund = (ticket.price * 80) / 100;
        payable(msg.sender).transfer(refund);
        
        emit TicketCancelled(_ticketId);
    }
    
    /**
     * @dev Transfer ticket to another address
     */
    function transferTicket(uint256 _ticketId, address _to) public {
        Ticket storage ticket = tickets[_ticketId];
        require(ticket.passenger == msg.sender, "Not your ticket");
        require(ticket.status == TicketStatus.Active, "Ticket not active");
        
        ticket.passenger = _to;
        ticket.status = TicketStatus.Transferred;
        
        emit TicketTransferred(_ticketId, msg.sender, _to);
    }
    
    /**
     * @dev Register a new validator node
     */
    function registerValidator(
        address _validator,
        string memory _name,
        uint256 _stake
    ) public onlyOwner {
        require(!validators[_validator].isActive, "Already registered");
        
        validators[_validator] = Validator({
            validatorAddress: _validator,
            name: _name,
            stake: _stake,
            isActive: true,
            reputation: 100
        });
        
        validatorList.push(_validator);
        emit ValidatorRegistered(_validator, _stake);
    }
    
    /**
     * @dev Simulate a consensus round (for demonstration)
     * In production, this would be actual distributed consensus
     */
    function runConsensusRound(string memory _mechanism, uint256 _txCount) 
        public 
        onlyOwner 
        returns (bool) 
    {
        ConsensusMetrics storage metrics = consensusMetrics[_mechanism];
        
        // Simulate processing with metrics update
        metrics.roundsExecuted++;
        
        // Emit event with simulated latency
        emit ConsensusRoundCompleted(_mechanism, metrics.latency);
        
        return true;
    }
    
    /**
     * @dev Get metrics for a specific consensus mechanism
     */
    function getMetrics(string memory _mechanism) 
        public 
        view 
        returns (ConsensusMetrics memory) 
    {
        return consensusMetrics[_mechanism];
    }
    
    /**
     * @dev Get all consensus metrics for comparison
     */
    function getAllMetrics() 
        public 
        view 
        returns (
            ConsensusMetrics memory pow,
            ConsensusMetrics memory pos,
            ConsensusMetrics memory bft,
            ConsensusMetrics memory consesair
        ) 
    {
        return (
            consensusMetrics["PoW"],
            consensusMetrics["PoS"],
            consensusMetrics["BFT"],
            consensusMetrics["Consesair"]
        );
    }
    
    /**
     * @dev Generate ASCII bar chart (simplified for on-chain)
     */
    function getASCIIChart() public pure returns (string memory) {
        return string(abi.encodePacked(
            "Throughput Comparison:\\n",
            "PoW       [====] 7 tx/s\\n",
            "PoS       [============] 1000 tx/s\\n",
            "BFT       [================] 3000 tx/s\\n",
            "Consesair [==================] 4500 tx/s"
        ));
    }
    
    /**
     * @dev Get ticket details
     */
    function getTicket(uint256 _ticketId) 
        public 
        view 
        returns (Ticket memory) 
    {
        return tickets[_ticketId];
    }
    
    /**
     * @dev Get total number of validators
     */
    function getValidatorCount() public view returns (uint256) {
        return validatorList.length;
    }
}`,
    
    statistical: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title StatisticalReports
 * @dev Library for generating statistical reports and comparisons
 */
library StatisticalReports {
    
    struct MetricComparison {
        string name;
        uint256 value;
        uint256 percentile;
    }
    
    /**
     * @dev Calculate percentile rank for a value in an array
     */
    function calculatePercentile(
        uint256 value,
        uint256[] memory dataset
    ) internal pure returns (uint256) {
        if (dataset.length == 0) return 0;
        
        uint256 count = 0;
        for (uint256 i = 0; i < dataset.length; i++) {
            if (dataset[i] <= value) {
                count++;
            }
        }
        
        return (count * 100) / dataset.length;
    }
    
    /**
     * @dev Generate a simple ASCII bar for visualization
     */
    function generateBar(
        uint256 value,
        uint256 maxValue,
        uint256 barLength
    ) internal pure returns (string memory) {
        uint256 filledLength = (value * barLength) / maxValue;
        
        bytes memory bar = new bytes(barLength);
        for (uint256 i = 0; i < barLength; i++) {
            bar[i] = i < filledLength ? bytes1(0xE2) : bytes1(0x91); // Unicode blocks
        }
        
        return string(bar);
    }
    
    /**
     * @dev Calculate average of an array
     */
    function average(uint256[] memory values) 
        internal 
        pure 
        returns (uint256) 
    {
        if (values.length == 0) return 0;
        
        uint256 sum = 0;
        for (uint256 i = 0; i < values.length; i++) {
            sum += values[i];
        }
        
        return sum / values.length;
    }
    
    /**
     * @dev Find maximum value in array
     */
    function max(uint256[] memory values) 
        internal 
        pure 
        returns (uint256) 
    {
        if (values.length == 0) return 0;
        
        uint256 maxValue = values[0];
        for (uint256 i = 1; i < values.length; i++) {
            if (values[i] > maxValue) {
                maxValue = values[i];
            }
        }
        
        return maxValue;
    }
    
    /**
     * @dev Find minimum value in array
     */
    function min(uint256[] memory values) 
        internal 
        pure 
        returns (uint256) 
    {
        if (values.length == 0) return 0;
        
        uint256 minValue = values[0];
        for (uint256 i = 1; i < values.length; i++) {
            if (values[i] < minValue) {
                minValue = values[i];
            }
        }
        
        return minValue;
    }
}`,

    config: `// Hardhat configuration file
// hardhat.config.js

require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    hardhat: {
      chainId: 1337
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
};`
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const downloadFile = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card className="p-6 shadow-md">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FileCode className="w-6 h-6 text-primary" />
          <div>
            <h2 className="text-xl font-bold text-foreground">Smart Contracts</h2>
            <p className="text-sm text-muted-foreground">Solidity implementation</p>
          </div>
        </div>
        <Badge variant="outline">Solidity 0.8.20</Badge>
      </div>

      <Tabs value={selectedFile} onValueChange={setSelectedFile}>
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="main">Main Contract</TabsTrigger>
          <TabsTrigger value="statistical">Stats Library</TabsTrigger>
          <TabsTrigger value="config">Hardhat Config</TabsTrigger>
        </TabsList>

        {Object.entries(contracts).map(([key, code]) => (
          <TabsContent key={key} value={key} className="space-y-4">
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(code)}
              >
                <Copy className="w-3 h-3 mr-2" />
                Copy
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => downloadFile(
                  key === "main" ? "AirlineReservationSystem.sol" :
                  key === "statistical" ? "StatisticalReports.sol" :
                  "hardhat.config.js",
                  code
                )}
              >
                <Download className="w-3 h-3 mr-2" />
                Download
              </Button>
            </div>

            <div className="bg-night-blue text-cloud-white p-4 rounded-lg overflow-x-auto max-h-[600px] overflow-y-auto">
              <pre className="text-xs font-mono leading-relaxed">
                <code>{code}</code>
              </pre>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  );
};

export default SmartContractCode;
