## ADDED Requirements

### Requirement: Ticket tier display
The Tickets section SHALL display two ticket tier cards side-by-side (General and VIP), each showing the tier name, price, and a list of perks — all sourced from `content.json tickets`. Each card SHALL have a "Rezervă" (Reserve) button that opens the reservation modal. The VIP card SHALL be visually distinguished (e.g., glowing border, badge) to indicate premium status.

#### Scenario: Ticket prices match content.json
- **WHEN** the Tickets section is visible
- **THEN** the General card shows the price from `content.json tickets.general.price` and the VIP card shows `content.json tickets.vip.price`

#### Scenario: VIP card is visually distinguished
- **WHEN** both ticket cards are rendered
- **THEN** the VIP card has a visually distinct style (glowing border or badge) compared to the General card

#### Scenario: Perks list rendered per tier
- **WHEN** a ticket card is visible
- **THEN** each string in the corresponding `perks` array is rendered as a list item with a checkmark icon

### Requirement: Reservation modal — step 1: ticket selection
When a "Rezervă" button is clicked, a modal SHALL open over the page. Step 1 of the modal SHALL display both ticket types (General / VIP) as selectable options. The option corresponding to the clicked button SHALL be pre-selected. The user MAY switch between options within the modal. A "Continuă" (Continue) button advances to step 2.

#### Scenario: Modal opens on button click
- **WHEN** a user clicks either "Rezervă" button
- **THEN** the reservation modal appears with a dark overlay, centred on the screen

#### Scenario: Pre-selection matches clicked tier
- **WHEN** the user clicks the VIP "Rezervă" button
- **THEN** the modal opens with the VIP option pre-selected

#### Scenario: User can switch tier inside modal
- **WHEN** the modal is open with General pre-selected
- **AND** the user clicks the VIP option
- **THEN** VIP becomes selected and the total price updates accordingly

### Requirement: Reservation modal — step 2: contact details
Step 2 SHALL display a form with: Nume (text, required), Email (email, required), and Număr de bilete (number, required, min 1, max 10). The total cost (price × quantity) SHALL update dynamically as the quantity changes. A "Confirmă rezervarea" button submits and advances to step 3.

#### Scenario: Total price updates dynamically
- **WHEN** the user changes the quantity field
- **THEN** the displayed total (price × quantity) updates immediately without page reload

#### Scenario: Validation blocks invalid submission
- **WHEN** the user clicks "Confirmă rezervarea" with an empty Name or invalid Email
- **THEN** inline error messages appear on the invalid fields and the modal does not advance to step 3

### Requirement: Reservation modal — step 3: confirmation
Step 3 SHALL display a success message in Romanian, the selected tier, total cost, and a disclaimer that this is a hypothetical demonstration. The message SHALL include: "Rezervarea ta a fost înregistrată! În cadrul evenimentului real, vei primi un email de confirmare." A "Închide" (Close) button SHALL dismiss the modal and reset it to step 1.

#### Scenario: Confirmation shows correct summary
- **WHEN** step 3 is reached after selecting VIP × 2
- **THEN** the confirmation displays "VIP", "2 bilete", and the correct total (€60)

#### Scenario: Modal resets on close
- **WHEN** the user clicks "Închide" on the confirmation step
- **THEN** the modal closes and the next time it is opened it starts at step 1 with no pre-filled data

### Requirement: Modal accessibility and dismissal
The modal SHALL trap keyboard focus while open (Tab cycles only within the modal). Pressing Escape SHALL close the modal. The background overlay click SHALL close the modal. The modal SHALL have a visible close (×) button in the top-right corner.

#### Scenario: Escape key closes modal
- **WHEN** the modal is open and the user presses Escape
- **THEN** the modal closes and focus returns to the "Rezervă" button that opened it

#### Scenario: Overlay click closes modal
- **WHEN** the modal is open and the user clicks the dark overlay outside the modal panel
- **THEN** the modal closes

#### Scenario: Focus trapped inside modal
- **WHEN** the modal is open and the user presses Tab repeatedly
- **THEN** focus cycles only through interactive elements inside the modal, never reaching elements behind it
