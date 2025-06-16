"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ThemeToggle } from "@/components/theme-toggle";
import { Scale, Truck, Package, Calculator, Save, RotateCcw, Printer, CheckCircle, AlertCircle } from "lucide-react";
import { dummyItems, dummyVendors, dummyVehicles } from "@/lib/dummy-data";

interface WeighingData {
    firstWeight: number | null;
    secondWeight: number | null;
    grossWeight: number | null;
    tareWeight: number | null;
    netWeight: number | null;
    ticketNumber: string;
    vehicleId: string;
    itemId: string;
    vendorId: string;
    type: 'incoming' | 'outgoing' | '';
    driverName: string;
    itemDescription: string;
    notes: string;
}

export default function ClientPage() {
    const [weighingData, setWeighingData] = useState<WeighingData>({
        firstWeight: null,
        secondWeight: null,
        grossWeight: null,
        tareWeight: null,
        netWeight: null,
        ticketNumber: "",
        vehicleId: "",
        itemId: "",
        vendorId: "",
        type: "",
        driverName: "",
        itemDescription: "",
        notes: "",
    });

    const [currentStep, setCurrentStep] = useState<1 | 2>(1);
    const [isWeighing, setIsWeighing] = useState(false);

    // Helper functions to get selected names
    const getSelectedVehicle = () => dummyVehicles.find(v => v.id === weighingData.vehicleId);
    const getSelectedItem = () => dummyItems.find(i => i.id === weighingData.itemId);
    const getSelectedVendor = () => dummyVendors.find(v => v.id === weighingData.vendorId);

    // Validation helper
    const getValidationMessage = () => {
        const missing = [];
        if (!weighingData.grossWeight) missing.push("Complete weighing process");
        if (!weighingData.ticketNumber) missing.push("Ticket Number");
        if (!weighingData.vehicleId) missing.push("Vehicle");
        if (!weighingData.itemId) missing.push("Item");
        if (!weighingData.vendorId) missing.push("Vendor");
        if (!weighingData.type) missing.push("Transaction Type");

        return missing.length > 0 ? `Missing: ${missing.join(", ")}` : "";
    };

    // Simulate weighing scale reading
    const simulateWeightReading = (): number => {
        // Simulate weight between 500kg and 50000kg
        return Math.floor(Math.random() * (50000 - 500) + 500);
    };

    const captureWeight = async () => {
        setIsWeighing(true);

        // Simulate delay for scale reading
        await new Promise(resolve => setTimeout(resolve, 2000));

        const weight = simulateWeightReading();

        if (currentStep === 1) {
            setWeighingData(prev => ({ ...prev, firstWeight: weight }));
            setCurrentStep(2);
        } else {
            setWeighingData(prev => {
                const secondWeight = weight;
                const firstWeight = prev.firstWeight!;

                // Calculate gross, tare, and net weights
                const grossWeight = Math.max(firstWeight, secondWeight);
                const tareWeight = Math.min(firstWeight, secondWeight);
                const netWeight = grossWeight - tareWeight;

                return {
                    ...prev,
                    secondWeight,
                    grossWeight,
                    tareWeight,
                    netWeight,
                };
            });
        }

        setIsWeighing(false);
    };

    const resetWeighing = () => {
        setWeighingData(prev => ({
            ...prev,
            firstWeight: null,
            secondWeight: null,
            grossWeight: null,
            tareWeight: null,
            netWeight: null,
        }));
        setCurrentStep(1);
    };

    const saveRecord = () => {
        // Here you would typically save to a database
        console.log("Saving weighing record:", weighingData);
        alert("Weighing record saved successfully!");        // Reset for next weighing
        setWeighingData({
            firstWeight: null,
            secondWeight: null,
            grossWeight: null,
            tareWeight: null,
            netWeight: null,
            ticketNumber: "",
            vehicleId: "",
            itemId: "",
            vendorId: "",
            type: "",
            driverName: "",
            itemDescription: "",
            notes: "",
        });
        setCurrentStep(1);
    }; const canProceedToSave = weighingData.grossWeight !== null &&
        weighingData.ticketNumber &&
        weighingData.vehicleId &&
        weighingData.itemId &&
        weighingData.vendorId &&
        weighingData.type;

    // Print functionality
    const printWeighingTicket = () => {
        const selectedVehicle = getSelectedVehicle();
        const selectedItem = getSelectedItem();
        const selectedVendor = getSelectedVendor();

        const printContent = `
            <div style="padding: 20px; font-family: Arial, sans-serif;">
                <h2 style="text-align: center; margin-bottom: 20px;">WEIGHING TICKET</h2>
                <div style="border: 1px solid #000; padding: 15px; margin-bottom: 20px;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                        <div><strong>Ticket Number:</strong> ${weighingData.ticketNumber}</div>
                        <div><strong>Date:</strong> ${new Date().toLocaleDateString()}</div>
                        <div><strong>Type:</strong> ${weighingData.type.toUpperCase()}</div>
                        <div><strong>Time:</strong> ${new Date().toLocaleTimeString()}</div>
                    </div>
                </div>
                
                <div style="border: 1px solid #000; padding: 15px; margin-bottom: 20px;">
                    <h3>Vehicle Information</h3>
                    <div><strong>Plate Number:</strong> ${selectedVehicle?.plateNumber}</div>
                    <div><strong>Vehicle Type:</strong> ${selectedVehicle?.type}</div>
                    <div><strong>Driver:</strong> ${weighingData.driverName}</div>
                </div>
                
                <div style="border: 1px solid #000; padding: 15px; margin-bottom: 20px;">
                    <h3>Material Information</h3>
                    <div><strong>Item:</strong> ${selectedItem?.name}</div>
                    <div><strong>Category:</strong> ${selectedItem?.category}</div>
                    <div><strong>Vendor:</strong> ${selectedVendor?.name} (${selectedVendor?.code})</div>
                </div>
                
                <div style="border: 2px solid #000; padding: 15px; margin-bottom: 20px; background-color: #f5f5f5;">
                    <h3>Weight Information</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 16px;">
                        <div><strong>First Weight:</strong> ${weighingData.firstWeight?.toLocaleString()} kg</div>
                        <div><strong>Second Weight:</strong> ${weighingData.secondWeight?.toLocaleString()} kg</div>
                        <div><strong>Gross Weight:</strong> ${weighingData.grossWeight?.toLocaleString()} kg</div>
                        <div><strong>Tare Weight:</strong> ${weighingData.tareWeight?.toLocaleString()} kg</div>
                        <div style="grid-column: 1/-1; font-size: 20px; font-weight: bold; text-align: center; padding: 10px; border: 2px solid #000; background-color: #fff;">
                            <strong>NET WEIGHT: ${weighingData.netWeight?.toLocaleString()} kg</strong>
                        </div>
                    </div>
                </div>
                
                ${weighingData.notes ? `
                <div style="border: 1px solid #000; padding: 15px; margin-bottom: 20px;">
                    <h3>Notes</h3>
                    <div>${weighingData.notes}</div>
                </div>
                ` : ''}
                
                <div style="text-align: center; margin-top: 40px;">
                    <div>____________________</div>
                    <div>Operator Signature</div>
                </div>
            </div>
        `;

        const printWindow = window.open('', '_blank');
        printWindow?.document.write(printContent);
        printWindow?.document.close();
        printWindow?.print();
    };

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            // Space bar to capture weight (when not typing in inputs)
            if (event.code === 'Space' && !isWeighing &&
                (event.target as HTMLElement).tagName !== 'INPUT' &&
                (event.target as HTMLElement).tagName !== 'TEXTAREA') {
                event.preventDefault();
                if ((currentStep === 1 && !weighingData.firstWeight) ||
                    (currentStep === 2 && !weighingData.secondWeight)) {
                    captureWeight();
                }
            }

            // Ctrl+P to print (when ready)
            if (event.ctrlKey && event.key === 'p' && canProceedToSave) {
                event.preventDefault();
                printWeighingTicket();
            }

            // Ctrl+S to save (when ready)
            if (event.ctrlKey && event.key === 's' && canProceedToSave) {
                event.preventDefault();
                saveRecord();
            }

            // Escape to reset weighing
            if (event.key === 'Escape' && (weighingData.firstWeight || weighingData.secondWeight)) {
                resetWeighing();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [currentStep, weighingData.firstWeight, weighingData.secondWeight, isWeighing, canProceedToSave]);

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b bg-card/50 backdrop-blur-sm">          <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Scale className="h-8 w-8 text-primary" />
                        <div>
                            <h1 className="text-2xl font-bold">Weighing Station</h1>
                            <p className="text-sm text-muted-foreground">Client Interface</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <nav className="flex items-center gap-2">
                            <a
                                href="/"
                                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                            >
                                Dashboard
                            </a>
                            <a
                                href="/client"
                                className="px-4 py-2 text-sm font-medium text-foreground bg-primary/10 rounded-md hover:bg-primary/20 transition-colors"
                            >
                                Weighing Station
                            </a>
                        </nav>
                        <ThemeToggle />
                    </div>
                </div>
            </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Weighing Control Panel */}
                    <Card className="lg:col-span-1">
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Scale className="h-6 w-6" />
                                <span>Weighing Control</span>
                            </CardTitle>
                            <CardDescription>
                                Capture weights from the weighing scale
                            </CardDescription>
                        </CardHeader>                        <CardContent className="space-y-6">
                            {/* Current Status */}
                            <div className="text-center">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20">
                                    <Scale className="h-4 w-4" />
                                    {currentStep === 1 && !weighingData.firstWeight && "Ready for First Weighing"}
                                    {currentStep === 1 && weighingData.firstWeight && "First Weight Captured"}
                                    {currentStep === 2 && !weighingData.secondWeight && "Ready for Second Weighing"}
                                    {currentStep === 2 && weighingData.secondWeight && "Weighing Complete"}
                                </div>
                            </div>

                            {/* Step Indicator */}
                            <div className="flex items-center space-x-4">
                                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all ${weighingData.firstWeight ? 'bg-green-500 text-white' :
                                        currentStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                                    }`}>
                                    {weighingData.firstWeight ? <CheckCircle className="h-4 w-4" /> : '1'}
                                </div>
                                <div className={`h-px flex-1 transition-all ${weighingData.firstWeight ? 'bg-green-500' : 'bg-muted'}`} />
                                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all ${weighingData.secondWeight ? 'bg-green-500 text-white' :
                                        currentStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                                    }`}>
                                    {weighingData.secondWeight ? <CheckCircle className="h-4 w-4" /> : '2'}
                                </div>
                            </div>

                            {/* Weight Display */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center">
                                    <p className="text-sm font-medium text-muted-foreground mb-2">First Weight</p>
                                    <div className="text-3xl font-bold">
                                        {weighingData.firstWeight ? `${weighingData.firstWeight.toLocaleString()} kg` : '--'}
                                    </div>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-medium text-muted-foreground mb-2">Second Weight</p>
                                    <div className="text-3xl font-bold">
                                        {weighingData.secondWeight ? `${weighingData.secondWeight.toLocaleString()} kg` : '--'}
                                    </div>
                                </div>
                            </div>                            {/* Capture Button */}
                            <div className="text-center">
                                <Button
                                    onClick={captureWeight}
                                    disabled={isWeighing || (currentStep === 2 && weighingData.secondWeight !== null)}
                                    size="lg"
                                    className="w-full"
                                >
                                    {isWeighing ? (
                                        <>
                                            <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                                            Reading Scale...
                                        </>
                                    ) : (
                                        <>
                                            <Scale className="h-4 w-4 mr-2" />
                                            Capture {currentStep === 1 ? 'First' : 'Second'} Weight
                                        </>
                                    )}
                                </Button>

                                {/* Keyboard Shortcut Hint */}
                                {!isWeighing && ((currentStep === 1 && !weighingData.firstWeight) || (currentStep === 2 && !weighingData.secondWeight)) && (
                                    <p className="text-xs text-muted-foreground mt-2">
                                        Press <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Space</kbd> to capture weight
                                    </p>
                                )}
                            </div>

                            {/* Reset Button */}
                            {(weighingData.firstWeight || weighingData.secondWeight) && (
                                <div className="text-center">
                                    <Button
                                        onClick={resetWeighing}
                                        variant="outline"
                                        size="sm"
                                    >
                                        <RotateCcw className="h-4 w-4 mr-2" />
                                        Reset Weighing
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Calculated Results */}
                    <Card className="lg:col-span-1">
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Calculator className="h-6 w-6" />
                                <span>Calculated Results</span>
                            </CardTitle>
                            <CardDescription>
                                Automatically calculated weights
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 gap-4">
                                <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                                    <span className="font-medium">Gross Weight:</span>
                                    <span className="text-xl font-bold">
                                        {weighingData.grossWeight ? `${weighingData.grossWeight.toLocaleString()} kg` : '--'}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                                    <span className="font-medium">Tare Weight:</span>
                                    <span className="text-xl font-bold">
                                        {weighingData.tareWeight ? `${weighingData.tareWeight.toLocaleString()} kg` : '--'}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center p-3 rounded-lg bg-primary/10 border border-primary/20">
                                    <span className="font-medium text-primary">Net Weight:</span>
                                    <span className="text-2xl font-bold text-primary">
                                        {weighingData.netWeight ? `${weighingData.netWeight.toLocaleString()} kg` : '--'}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Transaction Details */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Truck className="h-6 w-6" />
                                <span>Transaction Details</span>
                            </CardTitle>
                            <CardDescription>
                                Enter transaction information
                            </CardDescription>
                        </CardHeader>                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Ticket Number *</label>
                                    <Input
                                        placeholder="Enter ticket number"
                                        value={weighingData.ticketNumber}
                                        onChange={(e) => setWeighingData(prev => ({ ...prev, ticketNumber: e.target.value }))}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Type *</label>
                                    <Select value={weighingData.type} onValueChange={(value) => setWeighingData(prev => ({ ...prev, type: value as 'incoming' | 'outgoing' }))}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select transaction type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="incoming">Incoming</SelectItem>
                                            <SelectItem value="outgoing">Outgoing</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Vehicle *</label>
                                    <Select value={weighingData.vehicleId} onValueChange={(value) => {
                                        const selectedVehicle = dummyVehicles.find(v => v.id === value);
                                        setWeighingData(prev => ({
                                            ...prev,
                                            vehicleId: value,
                                            driverName: selectedVehicle?.driver || prev.driverName
                                        }));
                                    }}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select vehicle" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {dummyVehicles.map((vehicle) => (
                                                <SelectItem key={vehicle.id} value={vehicle.id}>
                                                    {vehicle.plateNumber} - {vehicle.type} ({vehicle.driver})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Item *</label>
                                    <Select value={weighingData.itemId} onValueChange={(value) => setWeighingData(prev => ({ ...prev, itemId: value }))}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select item" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {dummyItems.map((item) => (
                                                <SelectItem key={item.id} value={item.id}>
                                                    {item.name} ({item.category})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Vendor *</label>
                                    <Select value={weighingData.vendorId} onValueChange={(value) => setWeighingData(prev => ({ ...prev, vendorId: value }))}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select vendor" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {dummyVendors.map((vendor) => (
                                                <SelectItem key={vendor.id} value={vendor.id}>
                                                    {vendor.name} ({vendor.code}) - {vendor.type}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Driver Name</label>
                                    <Input
                                        placeholder="Enter driver name"
                                        value={weighingData.driverName}
                                        onChange={(e) => setWeighingData(prev => ({ ...prev, driverName: e.target.value }))}
                                    />
                                </div>
                            </div>                            <div className="space-y-2">
                                <label className="text-sm font-medium">Notes</label>
                                <textarea
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Enter any additional notes"
                                    value={weighingData.notes}
                                    onChange={(e) => setWeighingData(prev => ({ ...prev, notes: e.target.value }))}
                                />
                            </div>

                            {/* Transaction Summary */}
                            {(weighingData.vehicleId || weighingData.itemId || weighingData.vendorId || weighingData.type) && (
                                <div className="border rounded-lg p-4 bg-accent/50">
                                    <h4 className="text-sm font-medium mb-3">Transaction Summary</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                        {weighingData.type && (
                                            <div>
                                                <span className="text-muted-foreground">Type: </span>
                                                <span className="capitalize font-medium">{weighingData.type}</span>
                                            </div>
                                        )}
                                        {getSelectedVehicle() && (
                                            <div>
                                                <span className="text-muted-foreground">Vehicle: </span>
                                                <span className="font-medium">{getSelectedVehicle()?.plateNumber}</span>
                                            </div>
                                        )}
                                        {getSelectedItem() && (
                                            <div>
                                                <span className="text-muted-foreground">Item: </span>
                                                <span className="font-medium">{getSelectedItem()?.name}</span>
                                            </div>
                                        )}
                                        {getSelectedVendor() && (
                                            <div>
                                                <span className="text-muted-foreground">Vendor: </span>
                                                <span className="font-medium">{getSelectedVendor()?.name}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>)}

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-4 pt-4">
                                {/* Validation Message */}
                                {!canProceedToSave && (
                                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                                        <AlertCircle className="h-4 w-4" />
                                        <span className="text-sm">{getValidationMessage()}</span>
                                    </div>
                                )}

                                {/* Success Message */}
                                {canProceedToSave && (
                                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                                        <CheckCircle className="h-4 w-4" />
                                        <span className="text-sm">Ready to save weighing record</span>
                                    </div>
                                )}

                                {/* Buttons */}
                                <div className="flex justify-end gap-3">
                                    {canProceedToSave && (
                                        <Button
                                            onClick={printWeighingTicket}
                                            variant="outline"
                                            size="lg"
                                        >
                                            <Printer className="h-4 w-4 mr-2" />
                                            Print Ticket
                                        </Button>
                                    )}

                                    <Button
                                        onClick={saveRecord}
                                        disabled={!canProceedToSave}
                                        size="lg"
                                    >
                                        <Save className="h-4 w-4 mr-2" />
                                        Save Weighing Record
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
