HURRY UP CAR TRANSPORTATION SERVICE WEBSITE

Files
- index.html: responsive one-page homepage and fare calculator
- style.css: layout, responsive styles, colors and typography
- script.js: fare calculation, driver salary suggestion, print receipt
- asset/img/: local logo and all four homepage photos

How to run
1. Extract the ZIP file.
2. Open the extracted hurry-up-website folder.
3. Double-click index.html, or use VS Code Live Server.

Pricing logic included
- Profit markup defaults to 22% of operating expenses.
- Selling price rounds UP to the next PHP 100.
- SUV fuel efficiency default: 7 km/L (editable).
- Van fuel efficiency default: 5 km/L (editable).
- Driver salary suggestion: up to 10 km = PHP 400; 11-20 km = PHP 600;
  21-37 km = PHP 800; 38 km and above = PHP 1,000.
- Driver salary can be manually edited.
- Vehicle and admin allocations are editable per-kilometer assumptions.
- Round trip doubles distance-based fuel, driver salary, vehicle allocation,
  and admin allocation. Toll is entered as the total toll allowance for the
  whole trip and is not doubled again.

Important
The per-kilometer vehicle/admin rates and vehicle fuel efficiencies are
illustrative defaults, not verified company accounting data. Update them
based on actual fleet consumption and operating costs. The website is a
front-end calculator and does not store bookings.
The sample fuel price is a placeholder and should be updated before use.

All homepage photos and the logo are included locally in asset/img/.
Google Fonts still require an internet connection, with system font fallbacks.

The receipt is hidden until valid fare details are submitted with Calculate fare.
Changing any fare input hides the previous receipt until you calculate again.


MANUAL DISTANCE ENTRY
The calculator uses a manual one-way distance field. Enter the road distance
in kilometers yourself (for example, 103 for NAIA Terminal 3). The calculator
then computes fuel, driver salary suggestions, allocations, profit, and fare.

The From field remains fixed to Score Birds Hotel, Angeles City. Toll is
entered as the total allowance for the whole trip. For a round trip, distance,
fuel, driver salary, and per-kilometer allocations are doubled; toll is not.
