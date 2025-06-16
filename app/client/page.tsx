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
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    // Detect touch device
    useEffect(() => {
        const checkTouchDevice = () => {
            setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
        };

        checkTouchDevice();
        window.addEventListener('resize', checkTouchDevice);
        return () => window.removeEventListener('resize', checkTouchDevice);
    }, []);

    // Touch device feedback
    const provideTouchFeedback = () => {
        if (isTouchDevice && 'vibrate' in navigator) {
            navigator.vibrate(50); // Short vibration for touch feedback
        }
    };

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
    }; const captureWeight = async () => {
        setIsWeighing(true);
        provideTouchFeedback();

        // Simulate delay for scale reading
        await new Promise(resolve => setTimeout(resolve, 2000));

        const weight = simulateWeightReading();

        if (currentStep === 1) {
            setWeighingData(prev => ({ ...prev, firstWeight: weight }));
            setCurrentStep(2);
            provideTouchFeedback();
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
            provideTouchFeedback();
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
        <div className="min-h-screen bg-background">            {/* Header */}
            <header className="border-b bg-card/50 backdrop-blur-sm">
                <div className="container mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <Scale className="h-10 w-10 text-primary" />                            <div>
                                <h1 className="text-3xl font-bold">Weighing Station</h1>
                                <p className="text-base text-muted-foreground">
                                    Client Interface {isTouchDevice && "• Touch Mode"}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <nav className="flex items-center gap-3">
                                <a
                                    href="/"
                                    className="px-6 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors touch-manipulation"
                                >
                                    Dashboard
                                </a>
                                <a
                                    href="/client"
                                    className="px-6 py-3 text-base font-medium text-foreground bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors touch-manipulation"
                                >
                                    Weighing Station
                                </a>
                            </nav>
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </header><div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {/* Weighing Control Panel */}
                    <Card className="xl:col-span-1 touch-manipulation">
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center space-x-3 text-xl">
                                <Scale className="h-7 w-7" />
                                <span>Weighing Control</span>
                            </CardTitle>
                            <CardDescription className="text-base">
                                Capture weights from the weighing scale
                            </CardDescription>
                        </CardHeader>                        <CardContent className="space-y-8 p-6">
                            {/* Current Status */}
                            <div className="text-center">
                                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-base font-medium bg-primary/10 text-primary border border-primary/20">
                                    <Scale className="h-5 w-5" />
                                    {currentStep === 1 && !weighingData.firstWeight && "Ready for First Weighing"}
                                    {currentStep === 1 && weighingData.firstWeight && "First Weight Captured"}
                                    {currentStep === 2 && !weighingData.secondWeight && "Ready for Second Weighing"}
                                    {currentStep === 2 && weighingData.secondWeight && "Weighing Complete"}
                                </div>
                            </div>

                            {/* Step Indicator */}
                            <div className="flex items-center space-x-6">
                                <div className={`flex items-center justify-center w-12 h-12 rounded-full text-base font-medium transition-all ${weighingData.firstWeight ? 'bg-green-500 text-white' :
                                    currentStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                                    }`}>
                                    {weighingData.firstWeight ? <CheckCircle className="h-6 w-6" /> : '1'}
                                </div>
                                <div className={`h-1 flex-1 rounded transition-all ${weighingData.firstWeight ? 'bg-green-500' : 'bg-muted'}`} />
                                <div className={`flex items-center justify-center w-12 h-12 rounded-full text-base font-medium transition-all ${weighingData.secondWeight ? 'bg-green-500 text-white' :
                                    currentStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                                    }`}>
                                    {weighingData.secondWeight ? <CheckCircle className="h-6 w-6" /> : '2'}
                                </div>
                            </div>                            {/* Weight Display */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="text-center p-4 bg-muted/20 rounded-lg">
                                    <p className="text-base font-medium text-muted-foreground mb-3">First Weight</p>
                                    <div className="text-4xl font-bold">
                                        {weighingData.firstWeight ? `${weighingData.firstWeight.toLocaleString()} kg` : '--'}
                                    </div>
                                </div>
                                <div className="text-center p-4 bg-muted/20 rounded-lg">
                                    <p className="text-base font-medium text-muted-foreground mb-3">Second Weight</p>
                                    <div className="text-4xl font-bold">
                                        {weighingData.secondWeight ? `${weighingData.secondWeight.toLocaleString()} kg` : '--'}
                                    </div>
                                </div>
                            </div>

                            {/* Capture Button */}
                            <div className="text-center">
                                <Button
                                    onClick={captureWeight}
                                    disabled={isWeighing || (currentStep === 2 && weighingData.secondWeight !== null)}
                                    className="w-full h-16 text-lg font-semibold touch-manipulation"
                                >
                                    {isWeighing ? (
                                        <>
                                            <div className="animate-spin h-6 w-6 border-2 border-current border-t-transparent rounded-full mr-3" />
                                            Reading Scale...
                                        </>
                                    ) : (
                                        <>
                                            <Scale className="h-6 w-6 mr-3" />
                                            Capture {currentStep === 1 ? 'First' : 'Second'} Weight
                                        </>
                                    )}
                                </Button>                                {/* Touch-friendly hint - hide keyboard shortcut on touch devices */}
                                {!isWeighing && !isTouchDevice && ((currentStep === 1 && !weighingData.firstWeight) || (currentStep === 2 && !weighingData.secondWeight)) && (
                                    <p className="text-sm text-muted-foreground mt-3">
                                        Press <kbd className="px-2 py-1 bg-muted rounded text-sm">Space</kbd> to capture weight
                                    </p>
                                )}
                            </div>

                            {/* Reset Button */}
                            {(weighingData.firstWeight || weighingData.secondWeight) && (
                                <div className="text-center">
                                    <Button
                                        onClick={resetWeighing}
                                        variant="outline"
                                        className="h-12 px-6 text-base touch-manipulation"
                                    >
                                        <RotateCcw className="h-5 w-5 mr-2" />
                                        Reset Weighing
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>                    {/* Calculated Results */}
                    <Card className="xl:col-span-1 touch-manipulation">
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center space-x-3 text-xl">
                                <Calculator className="h-7 w-7" />
                                <span>Calculated Results</span>
                            </CardTitle>
                            <CardDescription className="text-base">
                                Automatically calculated weights
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 p-6">
                            <div className="grid grid-cols-1 gap-6">
                                <div className="flex justify-between items-center p-5 rounded-lg bg-muted/50 touch-manipulation">
                                    <span className="font-medium text-lg">Gross Weight:</span>
                                    <span className="text-2xl font-bold">
                                        {weighingData.grossWeight ? `${weighingData.grossWeight.toLocaleString()} kg` : '--'}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center p-5 rounded-lg bg-muted/50 touch-manipulation">
                                    <span className="font-medium text-lg">Tare Weight:</span>
                                    <span className="text-2xl font-bold">
                                        {weighingData.tareWeight ? `${weighingData.tareWeight.toLocaleString()} kg` : '--'}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center p-6 rounded-lg bg-primary/10 border-2 border-primary/20 touch-manipulation">
                                    <span className="font-medium text-xl text-primary">Net Weight:</span>
                                    <span className="text-3xl font-bold text-primary">
                                        {weighingData.netWeight ? `${weighingData.netWeight.toLocaleString()} kg` : '--'}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>                    {/* Transaction Details */}
                    <Card className="xl:col-span-2 touch-manipulation">
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center space-x-3 text-xl">
                                <Truck className="h-7 w-7" />
                                <span>Transaction Details</span>
                            </CardTitle>
                            <CardDescription className="text-base">
                                Enter transaction information
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <label className="text-base font-medium">Ticket Number *</label>
                                    <Input
                                        placeholder="Enter ticket number"
                                        value={weighingData.ticketNumber}
                                        onChange={(e) => setWeighingData(prev => ({ ...prev, ticketNumber: e.target.value }))}
                                        className="h-12 text-base touch-manipulation"
                                    />
                                </div>                                <div className="space-y-3">
                                    <label className="text-base font-medium">Type *</label>
                                    <div className="flex gap-3">
                                        <Button
                                            type="button"
                                            variant={weighingData.type === 'incoming' ? 'default' : 'outline'}
                                            className="flex-1 h-12 text-base touch-manipulation"
                                            onClick={() => setWeighingData(prev => ({ ...prev, type: 'incoming' }))}
                                        >
                                            Incoming
                                        </Button>
                                        <Button
                                            type="button"
                                            variant={weighingData.type === 'outgoing' ? 'default' : 'outline'}
                                            className="flex-1 h-12 text-base touch-manipulation"
                                            onClick={() => setWeighingData(prev => ({ ...prev, type: 'outgoing' }))}
                                        >
                                            Outgoing
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-base font-medium">Vehicle *</label>
                                    <Select value={weighingData.vehicleId} onValueChange={(value) => {
                                        const selectedVehicle = dummyVehicles.find(v => v.id === value);
                                        setWeighingData(prev => ({
                                            ...prev,
                                            vehicleId: value,
                                            driverName: selectedVehicle?.driver || prev.driverName
                                        }));
                                    }}>
                                        <SelectTrigger className="w-full h-12 text-base touch-manipulation">
                                            <SelectValue placeholder="Select vehicle" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {dummyVehicles.map((vehicle) => (
                                                <SelectItem key={vehicle.id} value={vehicle.id} className="h-12 text-base">
                                                    {vehicle.plateNumber} - {vehicle.type} ({vehicle.driver})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-base font-medium">Item *</label>
                                    <Select value={weighingData.itemId} onValueChange={(value) => setWeighingData(prev => ({ ...prev, itemId: value }))}>
                                        <SelectTrigger className="w-full h-12 text-base touch-manipulation">
                                            <SelectValue placeholder="Select item" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {dummyItems.map((item) => (
                                                <SelectItem key={item.id} value={item.id} className="h-12 text-base">
                                                    {item.name} ({item.category})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-base font-medium">Vendor *</label>
                                    <Select value={weighingData.vendorId} onValueChange={(value) => setWeighingData(prev => ({ ...prev, vendorId: value }))}>
                                        <SelectTrigger className="w-full h-12 text-base touch-manipulation">
                                            <SelectValue placeholder="Select vendor" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {dummyVendors.map((vendor) => (
                                                <SelectItem key={vendor.id} value={vendor.id} className="h-12 text-base">
                                                    {vendor.name} ({vendor.code}) - {vendor.type}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-base font-medium">Driver Name</label>
                                    <Input
                                        placeholder="Enter driver name"
                                        value={weighingData.driverName}
                                        onChange={(e) => setWeighingData(prev => ({ ...prev, driverName: e.target.value }))}
                                        className="h-12 text-base touch-manipulation"
                                    />
                                </div>
                            </div>                            <div className="space-y-3">
                                <label className="text-base font-medium">Notes</label>
                                <textarea
                                    className="flex min-h-[120px] w-full rounded-lg border border-input bg-background px-4 py-3 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 touch-manipulation resize-none"
                                    placeholder="Enter any additional notes"
                                    value={weighingData.notes}
                                    onChange={(e) => setWeighingData(prev => ({ ...prev, notes: e.target.value }))}
                                />
                            </div>

                            {/* Transaction Summary */}
                            {(weighingData.vehicleId || weighingData.itemId || weighingData.vendorId || weighingData.type) && (
                                <div className="border rounded-lg p-6 bg-accent/50 touch-manipulation">
                                    <h4 className="text-base font-medium mb-4">Transaction Summary</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-base">
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
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-6 pt-6">
                                {/* Validation Message */}
                                {!canProceedToSave && (
                                    <div className="flex items-center gap-3 text-amber-600 dark:text-amber-400 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
                                        <AlertCircle className="h-5 w-5 flex-shrink-0" />
                                        <span className="text-base">{getValidationMessage()}</span>
                                    </div>
                                )}

                                {/* Success Message */}
                                {canProceedToSave && (
                                    <div className="flex items-center gap-3 text-green-600 dark:text-green-400 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                                        <CheckCircle className="h-5 w-5 flex-shrink-0" />
                                        <span className="text-base">Ready to save weighing record</span>
                                    </div>
                                )}

                                {/* Buttons */}
                                <div className="flex flex-col sm:flex-row justify-end gap-4">
                                    {canProceedToSave && (
                                        <Button
                                            onClick={printWeighingTicket}
                                            variant="outline"
                                            className="h-14 px-8 text-lg font-semibold touch-manipulation"
                                        >
                                            <Printer className="h-5 w-5 mr-3" />
                                            Print Ticket
                                        </Button>
                                    )}

                                    <Button
                                        onClick={saveRecord}
                                        disabled={!canProceedToSave}
                                        className="h-14 px-8 text-lg font-semibold touch-manipulation"
                                    >
                                        <Save className="h-5 w-5 mr-3" />
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
