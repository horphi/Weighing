# Weighing Station Client Page Features

## Overview
The Client Page (`/client`) is a comprehensive weighing interface designed for factory operators to manage weighing operations. It provides an intuitive workflow for capturing two-stage weights and calculating net weights automatically.

## Key Features

### 🔄 Two-Stage Weighing Process
- **Step 1**: Capture first weight (with or without pallet)
- **Step 2**: Capture second weight (opposite of first weight)
- **Automatic Calculation**: System calculates gross, tare, and net weights
- **Visual Progress**: Step indicator with status updates

### 📊 Weight Calculations
- **Gross Weight**: Maximum of the two captured weights
- **Tare Weight**: Minimum of the two captured weights  
- **Net Weight**: Gross weight minus tare weight
- **Real-time Updates**: All calculations update automatically after second weight

### 🎛️ Enhanced Form Controls
- **Transaction Type**: Dropdown for Incoming/Outgoing selection
- **Vehicle Selection**: Dropdown with plate number, type, and driver info
- **Item Selection**: Dropdown with item name and category
- **Vendor Selection**: Dropdown with vendor name, code, and type
- **Auto-populate**: Driver name fills automatically when vehicle is selected

### ✅ Smart Validation
- **Real-time Validation**: Shows missing fields dynamically
- **Progress Indicators**: Visual feedback on completion status
- **Validation Messages**: Clear guidance on what's needed to proceed

### 🖨️ Print Functionality  
- **Professional Tickets**: Formatted weighing tickets for printing
- **Complete Information**: Includes all transaction details and weights
- **Signature Area**: Space for operator signature

### 🎨 Enhanced UI/UX
- **Status Indicators**: Current operation status display
- **Progress Tracking**: Visual step completion with checkmarks
- **Transaction Summary**: Live preview of selected options
- **Responsive Design**: Works on desktop and tablet devices
- **Dark/Light Mode**: Theme support via toggle

### 🔧 Technical Features
- **Simulated Scale**: Mock weighing scale with 2-second delay
- **Weight Reset**: Option to restart weighing process
- **Form Persistence**: Data retained during weighing process
- **TypeScript**: Full type safety throughout

## User Workflow

1. **Start Weighing**
   - Click "Capture First Weight" button
   - System simulates scale reading (2-second delay)
   - First weight is captured and displayed

2. **Complete Weighing**
   - Click "Capture Second Weight" button
   - System captures second weight
   - Automatic calculation of gross, tare, and net weights

3. **Enter Transaction Details**
   - Fill in ticket number (required)
   - Select transaction type (required)
   - Choose vehicle from dropdown (required)
   - Select item from dropdown (required)
   - Choose vendor from dropdown (required)
   - Add driver name (auto-populated from vehicle)
   - Add optional notes

4. **Save or Print**
   - Review transaction summary
   - Print weighing ticket if needed
   - Save the weighing record
   - System resets for next transaction

## Navigation
- **Dashboard Link**: Return to main dashboard
- **Weighing Station**: Current page indicator
- **Theme Toggle**: Switch between light and dark modes

## Data Integration
- Uses dummy data from `lib/dummy-data.ts`
- Integrates with existing type definitions
- Compatible with dashboard filtering and reporting

## Future Enhancements
- Real weighing scale integration
- Database persistence
- Barcode scanning for vehicles/items
- Digital signature capture
- Multi-language support
- Audio notifications
- Email ticket delivery
