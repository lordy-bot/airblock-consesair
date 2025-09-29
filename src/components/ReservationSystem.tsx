import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plane, User, Calendar, CreditCard, Check, X } from "lucide-react";
import { toast } from "sonner";

interface Reservation {
  id: string;
  passenger: string;
  flight: string;
  from: string;
  to: string;
  date: string;
  status: "confirmed" | "pending" | "cancelled";
  consensusUsed: string;
  timestamp: number;
}

const ReservationSystem = () => {
  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: "0x1a2b3c",
      passenger: "Alice Johnson",
      flight: "AA101",
      from: "NYC",
      to: "LAX",
      date: "2025-10-15",
      status: "confirmed",
      consensusUsed: "Consesair",
      timestamp: Date.now() - 3600000
    },
    {
      id: "0x4d5e6f",
      passenger: "Bob Smith",
      flight: "UA202",
      from: "SFO",
      to: "ORD",
      date: "2025-10-20",
      status: "confirmed",
      consensusUsed: "Consesair",
      timestamp: Date.now() - 7200000
    }
  ]);

  const [formData, setFormData] = useState({
    passenger: "",
    flight: "",
    from: "",
    to: "",
    date: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newReservation: Reservation = {
      id: "0x" + Math.random().toString(16).substr(2, 6),
      passenger: formData.passenger,
      flight: formData.flight,
      from: formData.from,
      to: formData.to,
      date: formData.date,
      status: "confirmed",
      consensusUsed: "Consesair",
      timestamp: Date.now()
    };

    setReservations([newReservation, ...reservations]);
    setFormData({ passenger: "", flight: "", from: "", to: "", date: "" });
    
    toast.success("Reservation confirmed!", {
      description: `Ticket booked using Consesair consensus (1.2s finality)`,
    });
  };

  const handleCancel = (id: string) => {
    setReservations(reservations.map(r => 
      r.id === id ? { ...r, status: "cancelled" as const } : r
    ));
    toast.info("Reservation cancelled", {
      description: "Cancellation processed on blockchain",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-success text-success-foreground";
      case "pending": return "bg-warning text-warning-foreground";
      case "cancelled": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="grid lg:grid-cols-5 gap-6">
      {/* Booking Form */}
      <Card className="lg:col-span-2 p-6 shadow-md">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-primary p-2 rounded-lg">
            <Plane className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">New Reservation</h2>
            <p className="text-sm text-muted-foreground">Book a flight on blockchain</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="passenger">Passenger Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                id="passenger"
                placeholder="John Doe"
                value={formData.passenger}
                onChange={(e) => setFormData({ ...formData, passenger: e.target.value })}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="flight">Flight Number</Label>
            <div className="relative">
              <Plane className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                id="flight"
                placeholder="AA101"
                value={formData.flight}
                onChange={(e) => setFormData({ ...formData, flight: e.target.value })}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="from">From</Label>
              <Input
                id="from"
                placeholder="NYC"
                value={formData.from}
                onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="to">To</Label>
              <Input
                id="to"
                placeholder="LAX"
                value={formData.to}
                onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Departure Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="pl-10"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            <CreditCard className="w-4 h-4 mr-2" />
            Book Flight with Consesair
          </Button>

          <div className="text-xs text-center text-muted-foreground">
            Transaction finality: ~1.2 seconds • Gas optimized
          </div>
        </form>
      </Card>

      {/* Reservations List */}
      <Card className="lg:col-span-3 p-6 shadow-md">
        <h2 className="text-xl font-bold text-foreground mb-6">Active Reservations</h2>
        
        <div className="space-y-4">
          {reservations.map((reservation) => (
            <Card key={reservation.id} className="p-4 border-2 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Plane className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{reservation.passenger}</h3>
                    <p className="text-sm text-muted-foreground">Flight {reservation.flight}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(reservation.status)}>
                  {reservation.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-xs text-muted-foreground">Route</p>
                  <p className="text-sm font-medium text-foreground">
                    {reservation.from} → {reservation.to}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="text-sm font-medium text-foreground">{reservation.date}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {reservation.consensusUsed}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    ID: {reservation.id}
                  </span>
                </div>
                {reservation.status === "confirmed" && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCancel(reservation.id)}
                  >
                    <X className="w-3 h-3 mr-1" />
                    Cancel
                  </Button>
                )}
              </div>
            </Card>
          ))}

          {reservations.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Plane className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No reservations yet. Book your first flight!</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ReservationSystem;
