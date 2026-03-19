# Aadhaar QR Scanner UI

A government-style Aadhaar QR Scanner interface designed with the official Indian government UI aesthetic - clean, minimal, and functional.

## Features

- **Saffron/Orange Header** - Reflecting India's national identity
- **Green Verification Banner** - Shows digital signature verification status
- **Profile Card** - Photo placeholder with personal details
- **Address Section** - Full address display with proper formatting
- **Aadhaar Number** - Masked Aadhaar number in monospace font
- **Editable Details** - Update all information via modal interface
- **Local Storage** - Data persists across sessions
- **Responsive Design** - Works on mobile and desktop

## Design Philosophy

This interface follows government digital service principles:
- Clean, minimal aesthetic
- Functional over decorative
- Prioritizes verification status
- Left-aligned text for readability
- Consistent spacing and padding

## How to Use

### Editing Details
1. Click the "Edit Details" button in the footer
2. Update any field in the modal form
3. Click "Save Changes"
4. Details will be updated and saved locally

### Photo Upload
1. Click "Edit Photo" below the photo placeholder
2. Select an image file from your device
3. Photo will be displayed and saved

### Sharing
1. Click "Share" button in the footer
2. Details will be copied to clipboard
3. Share via your preferred messaging app

## Technical Details

- **Framework**: Pure HTML, CSS, JavaScript (no external dependencies)
- **Storage**: Uses localStorage for data persistence
- **Responsive**: Mobile-first design approach
- **Print-friendly**: Hides action buttons when printing

## File Structure
