# Page & Feature

# **GORA — App Page & Feature Structure Specification**

## **1\. Document Purpose**

This document defines the main pages, information architecture, page structures, sections, interactions, statuses, sorting rules, and implementation scope for the GORA mobile application.

The document serves as a shared reference for the product, UX/UI design, and development teams during the hackathon.

Each page is described according to:

* The purpose of the page  
* The main user problem it solves  
* The sections contained within the page  
* The information displayed in each section  
* User interactions  
* Sorting and filtering rules  
* Example page structure and layout  
* Hackathon implementation considerations

The application should be designed around the following principle:

**Farmers should be able to understand what is happening on their farm and what they need to do next with minimal effort.**

---

# **2\. Application Overview**

## **2.1 App Concept**

GORA is an all-in-one mobile farming management application designed to help farmers manage multiple plots of crops, track agricultural activities, monitor upcoming actions, and access relevant agricultural information.

The application connects information about a farmer's plots, crops, activities, actions, weather conditions, and agricultural insights in one place.

The application combines:

1. **Plot management**  
2. **Crop management**  
3. **Activity journaling**  
4. **Action management**  
5. **Plot status monitoring**  
6. **Weather information**  
7. **Commodity price information**  
8. **Agricultural insights**

Instead of requiring farmers to rely on memory, paper notes, or multiple disconnected applications, GORA centralizes information and transforms it into an actionable overview.

---

## **2.2 Core User Problem**

Farmers may need to remember:

* Which crops are planted in each plot  
* When a plot was last watered  
* When fertilizer was last applied  
* Which plot requires attention  
* What actions need to be completed today  
* Whether weather conditions may affect farming activities  
* How crop market prices are changing

When this information is managed only through memory or disconnected tools, important actions can be missed or repeated unnecessarily.

For example, a farmer may not remember whether:

Plot A was watered yesterday or two days ago.

The Activity Journal allows the application to maintain a record of what has already happened.

GORA centralizes this information and transforms it into a clear overview of:

**What is happening, what has happened, and what needs to happen next.**

---

## **2.3 Core User Question**

The primary question the application should answer is:

**"What do I need to know and do on my farm today?"**

The application should prioritize actionable information over displaying large amounts of data.

---

# **3\. Core Information Model**

The main information flow of GORA is:

PLOT

  ↓

CROP

  ↓

ACTIVITY HISTORY

  ↓

CURRENT CONDITION

  ↓

PLOT STATUS

  ↓

REQUIRED ACTION

  ↓

FARMER DECISION

For example:

Plot A

    ↓

Tomato

    ↓

Last watered: 2 days ago

    ↓

Hot weather expected today

    ↓

Watering is required

    ↓

Plot status becomes:

URGENT

    ↓

Farmer waters the crop

    ↓

Activity is recorded

    ↓

Plot status is updated

This creates the central management loop:

OBSERVE

   ↓

UNDERSTAND

   ↓

ACT

   ↓

RECORD

   ↓

IMPROVE FUTURE DECISIONS

---

# **4\. Status System**

GORA should distinguish between the **overall status of a plot** and the **status of individual actions**.

This distinction is important because they represent different information.

---

## **4.1 Plot Status**

Plot status describes the overall condition and attention level of a plot.

The three primary statuses are:

### **🔴 Urgent**

The plot requires immediate attention.

Examples:

* An important action is overdue  
* A critical farming activity has been missed  
* A serious crop issue has been detected  
* The plot requires immediate intervention

Example:

🔴 Urgent

Watering overdue

---

### **🟡 Attention Needed**

The plot does not require immediate intervention but should be monitored or handled soon.

Examples:

* An action is due soon  
* A scheduled activity is approaching  
* The plot has a potential issue requiring inspection  
* An activity should be performed in the near future

Example:

🟡 Attention Needed

Fertilization due tomorrow

---

### **🟢 On Track**

The plot is currently progressing as expected.

Examples:

* Required activities are up to date  
* No urgent issues are detected  
* Upcoming activities are within their expected schedule

Example:

🟢 On Track

No immediate actions

---

## **4.2 Action Status**

Individual actions use a separate status system.

Suggested action statuses:

Overdue

Due Today

Due Soon

Upcoming

Completed

Example:

PLOT STATUS

🔴 Urgent

CURRENT ACTIONS

🔴 Watering

Overdue

🟡 Pest inspection

Due tomorrow

The plot status summarizes the overall condition of the plot, while the action status describes a specific task.

---

# **5\. Main Navigation Structure**

The main navigation should contain four primary destinations:

┌─────────────────────────────────────┐

│                                     │

│            CURRENT PAGE             │

│                                     │

├─────────────────────────────────────┤

│  🏠 Home   🌱 Plots   📰 Insights   👤 Profile │

└─────────────────────────────────────┘

## **Primary Navigation**

### **1\. Home**

The farmer's daily overview.

### **2\. My Plots**

A complete overview of all managed plots.

### **3\. Insights**

Weather, agricultural information, and market prices.

### **4\. Profile**

User, farm, notification, and application settings.

---

# **6\. PAGE 1 — HOME**

## **6.1 Purpose**

The Home page is the central dashboard of the application.

The page should allow the farmer to quickly understand:

* Which plots require attention  
* What actions need to be performed  
* What activities have recently occurred  
* Current weather conditions  
* Relevant agricultural information

The Home page should prioritize the most important information first.

The intended user question is:

**"What requires my attention right now?"**

---

## **6.2 Page Structure**

┌─────────────────────────────┐

│ Good morning, Budi          │

│ Here's what needs attention │

├─────────────────────────────┤

│                             │

│ MY PLOTS                    │

│                             │

│ ┌────────┐ ┌────────┐      │

│ │ Plot A │ │ Plot B │  →   │

│ │ Tomato │ │ Chili  │      │

│ │ 🔴     │ │ 🟢     │      │

│ └────────┘ └────────┘      │

│                             │

│ Slide horizontally          │

│ Maximum 8 cards             │

│                             │

├─────────────────────────────┤

│ TODAY'S ACTIONS             │

│                             │

│ 🔴 Water Plot A             │

│ 🟡 Inspect Plot C           │

│ 🟢 Fertilize Plot B         │

│                             │

│ \[View all actions\]          │

├─────────────────────────────┤

│ RECENT ACTIVITY             │

│                             │

│ 💧 Plot A watered yesterday │

│ 🌱 Plot B fertilized 2d ago│

│                             │

├─────────────────────────────┤

│ WEATHER                     │

│ ☀ 30°C                      │

│ Rain probability: 20%      │

│ \[View forecast\]             │

├─────────────────────────────┤

│ MARKET PRICES               │

│ Tomato    Rp 12,000/kg      │

│ Chili     Rp 35,000/kg      │

│ \[View all prices\]           │

├─────────────────────────────┤

│ 🏠 Home  🌱 Plots  📰  👤  │

└─────────────────────────────┘

---

## **6.3 Section A — Greeting and Farm Overview**

### **Purpose**

Provide context when the user opens the application.

### **Contains**

* Greeting  
* User name  
* Short summary of the current farm situation  
* Optional number of urgent actions

### **Example**

Good morning, Budi

2 plots require your attention today.

The text should remain short and informative.

---

## **6.4 Section B — My Plots**

This is one of the most important sections of the Home page.

### **Layout**

The plots should be displayed in a horizontally scrollable card slider.

### **Rules**

* Maximum of **8 plot cards**  
* Cards are displayed horizontally  
* User can swipe horizontally  
* Tapping a card opens the Plot Detail page

### **Sorting Order**

The cards should be sorted by:

1. **Priority Score**  
2. **Number of Unresolved Actions**  
3. **Most Recently Updated**

This ensures that plots requiring the most attention appear first.

---

## **6.5 Priority Score**

The Priority Score determines which plots should be shown first.

A plot's priority may be influenced by:

* Urgency of unresolved actions  
* Number of unresolved actions  
* How long an action has been overdue  
* Potential crop risk  
* Recent activity history  
* Relevant weather conditions

The exact calculation can be simplified for the hackathon.

The important principle is:

**The plot requiring the most attention should appear first.**

---

## **6.6 Example Plot Card**

┌──────────────────────┐

│ 🌱 Plot A            │

│                      │

│ Tomato               │

│ 1,200 m²             │

│                      │

│ 🔴 Urgent            │

│ Watering overdue     │

└──────────────────────┘

Another example:

┌──────────────────────┐

│ 🌶 Plot B            │

│                      │

│ Chili                │

│ 800 m²               │

│                      │

│ 🟢 On Track          │

│ No immediate actions │

└──────────────────────┘

### **Information Displayed**

Each card may contain:

* Plot name  
* Main crop  
* Area  
* Plot status  
* Short status explanation  
* Number of unresolved actions  
* Next relevant action

---

## **6.7 Section C — Today's Actions**

This section combines actions from multiple plots into a single list.

The farmer should not need to open every plot individually to understand what needs to be done today.

### **Example**

TODAY'S ACTIONS

🔴 Water Plot A

   Overdue

🟡 Inspect Plot C

   Due today

🟢 Fertilize Plot B

   Due tomorrow

### **Interaction**

Users should be able to:

* View the action  
* Open the related plot  
* Mark the action as completed

When an action is completed, the activity should be recorded in the Activity Journal.

---

## **6.8 Section D — Recent Activity**

The Recent Activity section provides a quick overview of what has recently happened across the farm.

### **Example**

RECENT ACTIVITY

💧 Plot A

Watered yesterday

🌱 Plot B

Fertilized 2 days ago

🔍 Plot C

Pest inspection 5 days ago

### **Purpose**

This section allows the farmer to quickly answer:

**"What has already been done recently?"**

This is especially useful for avoiding duplicate or unnecessary activities.

---

## **6.9 Section E — Weather Preview**

The Home page should provide a brief weather summary.

### **Contains**

* Current temperature  
* Weather condition  
* Rain probability  
* Basic agricultural relevance

### **Example**

WEATHER

☀ 30°C

Partly cloudy

Rain probability: 20%

Good conditions for outdoor activities.

\[View forecast\]

The Home page should not display a full weather forecast. It should provide a summary and direct the user to the detailed Weather page.

---

## **6.10 Section F — Market Price Preview**

This section provides a short overview of relevant crop prices.

### **Example**

MARKET PRICES

Tomato      ↑ Rp 12,000/kg

Chili       ↓ Rp 35,000/kg

Rice        → Rp 14,000/kg

\[View all prices\]

### **Sorting**

Prices may be sorted based on:

1. Crops grown by the user  
2. Crops followed by the user  
3. Most significant price changes

---

# **7\. PAGE 2 — MY PLOTS**

## **7.1 Purpose**

The My Plots page provides a complete overview of all plots managed by the farmer.

The page should allow users to:

* View all plots  
* Search for a plot  
* Filter plots  
* Add a new plot  
* Open a plot's detailed information

---

## **7.2 Page Structure**

┌─────────────────────────────┐

│ My Plots              \[+\]   │

├─────────────────────────────┤

│ 🔍 Search plots             │

├─────────────────────────────┤

│ All | Urgent | Attention    │

│ Needed | On Track           │

├─────────────────────────────┤

│                             │

│ ┌─────────────────────────┐ │

│ │ 🌱 Plot A               │ │

│ │ Tomato                  │ │

│ │ 1,200 m²                │ │

│ │ 🔴 Urgent               │ │

│ │ Watering overdue        │ │

│ └─────────────────────────┘ │

│                             │

│ ┌─────────────────────────┐ │

│ │ 🌶 Plot B               │ │

│ │ Chili                   │ │

│ │ 800 m²                  │ │

│ │ 🟢 On Track             │ │

│ │ No immediate actions    │ │

│ └─────────────────────────┘ │

└─────────────────────────────┘

---

## **7.3 Section A — Page Header**

### **Contains**

* Page title: My Plots  
* Add Plot button

### **Interaction**

Tapping the Add button opens the Add Plot page.

---

## **7.4 Section B — Search**

Users should be able to search plots using:

* Plot name  
* Crop name  
* Location

### **Example**

🔍 Search plots

---

## **7.5 Section C — Filter**

Suggested filters:

All

Urgent

Attention Needed

On Track

Recently Updated

The filters should help users quickly identify plots requiring attention.

---

## **7.6 Section D — Plot List**

The list should be sorted by:

1. Priority Score  
2. Number of Unresolved Actions  
3. Most Recently Updated

Each plot card should display:

* Plot name  
* Crop  
* Area  
* Current plot status  
* Status explanation  
* Number of unresolved actions  
* Next action

---

# **8\. PAGE 3 — ADD PLOT**

## **8.1 Purpose**

The Add Plot page allows farmers to register a new plot.

This information becomes the foundation for:

* Activity tracking  
* Action management  
* Plot status calculation  
* Future recommendations

---

## **8.2 Page Structure**

┌─────────────────────────────┐

│ ← Add New Plot              │

├─────────────────────────────┤

│ Plot name                   │

│ \[\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\]      │

│                             │

│ Crop                        │

│ \[ Select crop \]             │

│                             │

│ Area                        │

│ \[\_\_\_\_\_\_\_\_\] m²               │

│                             │

│ Location                    │

│ \[ Select location \]         │

│                             │

│ Planting date               │

│ \[ Select date \]             │

│                             │

│ Estimated harvest           │

│ \[ Select date \]             │

│                             │

│       \[Create Plot\]         │

└─────────────────────────────┘

---

## **8.3 Required Information**

### **Plot Name**

Example:

Plot A

### **Crop**

Example:

Tomato

### **Area**

Example:

1,200 m²

### **Location**

The location may be entered through:

* Manual location input  
* Map selection  
* Saved farm location

For the hackathon prototype, a simplified location input may be used.

### **Planting Date**

The date the crop was planted.

### **Estimated Harvest Date**

The expected harvest date.

---

# **9\. PAGE 4 — PLOT DETAIL**

## **9.1 Purpose**

The Plot Detail page is the main management page for an individual plot.

It should allow the farmer to understand:

* What is currently planted  
* The current overall plot status  
* What actions are pending  
* What activities have recently occurred  
* What has happened historically

---

## **9.2 Page Structure**

┌─────────────────────────────┐

│ ← Plot A              ⋮     │

├─────────────────────────────┤

│ 🌱 Tomato                   │

│ 1,200 m²                    │

│                             │

│ 🔴 URGENT                  │

│ Watering overdue            │

├─────────────────────────────┤

│ Planted: 12 June 2026      │

│ Estimated harvest           │

│ 25 August 2026             │

├─────────────────────────────┤

│                             │

│ CURRENT ACTIONS             │

│                             │

│ 🔴 Watering                 │

│ Overdue                     │

│                             │

│ 🟡 Pest inspection          │

│ Due tomorrow                │

├─────────────────────────────┤

│ RECENT ACTIVITY             │

│                             │

│ Yesterday                   │

│ Fertilized                  │

│                             │

│ 3 days ago                 │

│ Pest inspection             │

│                             │

│       \[+ LOG ACTIVITY\]      │

└─────────────────────────────┘

---

## **9.3 Section A — Plot Summary and Status**

### **Contains**

* Plot name  
* Main crop  
* Area  
* Current plot status  
* Status explanation  
* Planting date  
* Estimated harvest date

Example:

🌱 Plot A

Tomato

1,200 m²

🔴 URGENT

Watering overdue

Planted: 12 June 2026

Estimated harvest: 25 August 2026

The plot status should be one of:

🔴 Urgent

🟡 Attention Needed

🟢 On Track

---

## **9.4 Section B — Current Actions**

This section displays actions related to the selected plot.

### **Example**

CURRENT ACTIONS

🔴 Watering

Overdue

🟡 Pest inspection

Due tomorrow

🟢 Fertilization

Due in 3 days

### **Interaction**

Users should be able to:

* Mark an action as completed  
* Open action details  
* View the action's due date

When an action is completed, the activity should be recorded in the Activity Journal.

---

# **10\. PAGE 5 — ACTIVITY JOURNAL**

## **10.1 Purpose**

The Activity Journal records what has happened on a plot.

This is a core feature of GORA.

The application should not only tell the farmer what to do. It should also remember what has already been done.

For example:

Plot A was watered yesterday.  
Plot A was fertilized two days ago.

This information can help:

* Prevent duplicate activities  
* Provide historical context  
* Support future recommendations  
* Explain why a plot has a particular status

---

## **10.2 Activity Journal Structure**

┌─────────────────────────────┐

│ Activity Journal            │

├─────────────────────────────┤

│                             │

│ TODAY                       │

│                             │

│ 💧 Watered                  │

│ 09:30                       │

│                             │

│ 2 DAYS AGO                  │

│                             │

│ 🌱 Fertilized               │

│                             │

│ 5 DAYS AGO                  │

│                             │

│ 🔍 Pest inspection          │

│                             │

│       \[+ LOG ACTIVITY\]      │

└─────────────────────────────┘

---

## **10.3 Log Activity Interface**

┌─────────────────────────────┐

│ Log Activity                │

├─────────────────────────────┤

│ What did you do?            │

│                             │

│ \[💧 Watered\]                │

│ \[🌱 Fertilized\]             │

│ \[🧪 Applied pesticide\]      │

│ \[🔍 Inspected\]              │

│ \[🔧 Maintained\]             │

│ \[✏ Other\]                  │

│                             │

│ Date                        │

│ \[ Today \]                   │

│                             │

│ Optional note               │

│ \[\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\]   │

│                             │

│ \[Save Activity\]             │

└─────────────────────────────┘

---

## **10.4 Activity Types**

For the hackathon prototype, the following activity types are sufficient:

* Watered  
* Fertilized  
* Applied pesticide  
* Inspected for pests  
* Planted  
* Harvested  
* Maintained  
* Other

The activity journal should remain simple and fast to use.

The user should be able to log an activity in a few taps.

---

# **11\. PAGE 6 — INSIGHTS**

## **11.1 Purpose**

The Insights page is the central information hub for external agricultural information.

It combines:

* Weather  
* Market prices  
* Agricultural news  
* Farming insights

---

## **11.2 Page Structure**

┌─────────────────────────────┐

│ Insights                    │

├─────────────────────────────┤

│                             │

│ WEATHER                     │

│ ☀ 30°C                      │

│ Rain probability: 20%      │

│ \[View forecast\]             │

│                             │

├─────────────────────────────┤

│ MARKET PRICES               │

│ Tomato      ↑ Rp 12,000/kg │

│ Chili       ↓ Rp 35,000/kg │

│ \[View all\]                  │

│                             │

├─────────────────────────────┤

│ AGRICULTURAL NEWS           │

│                             │

│ How to improve tomato yield │

│ 5 min read                  │

│                             │

│ New agricultural policy...  │

│                             │

└─────────────────────────────┘

---

# **12\. PAGE 7 — WEATHER DETAIL**

## **12.1 Purpose**

The Weather page provides more detailed weather information relevant to farming activities.

---

## **12.2 Page Structure**

┌─────────────────────────────┐

│ ← Weather                   │

├─────────────────────────────┤

│ Current Conditions          │

│                             │

│ ☀ 30°C                      │

│ Partly cloudy               │

│                             │

│ Rain probability: 20%      │

├─────────────────────────────┤

│ HOURLY FORECAST             │

│                             │

│ 10 AM  ☀ 30°               │

│ 12 PM  ☀ 32°               │

│ 2 PM   🌧 29°               │

│ 4 PM   🌧 28°               │

├─────────────────────────────┤

│ DAILY FORECAST              │

│                             │

│ Today     ☀ 30°             │

│ Tomorrow  🌧 28°             │

│ Friday    ☀ 31°             │

└─────────────────────────────┘

---

## **12.3 Agricultural Relevance**

The application may provide simple contextual information such as:

Rain is expected tomorrow.

Consider completing outdoor activities today.

The purpose is not to provide complex agronomic advice but to make weather information more actionable.

---

# **13\. PAGE 8 — MARKET PRICES**

## **13.1 Purpose**

The Market Prices page provides farmers with an overview of crop prices.

This helps farmers understand market conditions and observe price movements.

---

## **13.2 Page Structure**

┌─────────────────────────────┐

│ Market Prices               │

├─────────────────────────────┤

│ 🔍 Search crops             │

├─────────────────────────────┤

│ My Crops                    │

│                             │

│ 🍅 Tomato                   │

│ Rp 12,000 / kg              │

│ ↑ 5.2%                      │

│                             │

│ 🌶 Chili                    │

│ Rp 35,000 / kg              │

│ ↓ 2.1%                      │

├─────────────────────────────┤

│ ALL CROPS                   │

│                             │

│ Rice                        │

│ Corn                        │

│ Soybean                     │

└─────────────────────────────┘

---

## **13.3 Sorting**

Prices may be sorted by:

* Crops grown by the user  
* Highest price increase  
* Highest price decrease  
* Most recently updated

---

# **14\. PAGE 9 — AGRICULTURAL NEWS**

## **14.1 Purpose**

This page provides relevant agricultural information and educational content.

---

## **14.2 Page Structure**

┌─────────────────────────────┐

│ Agricultural News           │

├─────────────────────────────┤

│ 🔍 Search articles          │

├─────────────────────────────┤

│ \[All\] \[Crops\] \[Weather\]     │

│ \[Technology\] \[Policy\]       │

├─────────────────────────────┤

│                             │

│ ┌─────────────────────────┐ │

│ │ \[Article Image\]         │ │

│ │                         │ │

│ │ How to improve crop     │ │

│ │ productivity             │ │

│ │                         │ │

│ │ 5 min read              │ │

│ └─────────────────────────┘ │

│                             │

│ ┌─────────────────────────┐ │

│ │ New agricultural news   │ │

│ └─────────────────────────┘ │

└─────────────────────────────┘

---

# **15\. PAGE 10 — PROFILE AND SETTINGS**

## **15.1 Purpose**

The Profile page allows users to manage their personal and application settings.

---

## **15.2 Page Structure**

┌─────────────────────────────┐

│ Profile                     │

├─────────────────────────────┤

│                             │

│ 👤 Budi                     │

│ Farmer                      │

│                             │

├─────────────────────────────┤

│ FARM INFORMATION            │

│                             │

│ Farm name                   │

│ Farm location               │

│                             │

├─────────────────────────────┤

│ NOTIFICATIONS               │

│                             │

│ Action reminders       ON   │

│ Weather alerts         ON   │

│ Market updates         OFF  │

│                             │

├─────────────────────────────┤

│ SETTINGS                    │

│                             │

│ Language                    │

│ Appearance                 │

│ About GORA                  │

└─────────────────────────────┘

---

# **16\. CROSS-PAGE DESIGN RULES**

## **16.1 Plot Status**

All plot-related pages should consistently use:

🔴 Urgent

🟡 Attention Needed

🟢 On Track

These statuses should appear consistently in:

* Home plot cards  
* My Plots list  
* Plot Detail page  
* Plot filters

---

## **16.2 Action Status**

Actions should use:

Overdue

Due Today

Due Soon

Upcoming

Completed

Plot status and action status should not be treated as the same thing.

---

## **16.3 Plot Card Structure**

Cards should use a consistent information hierarchy:

PLOT NAME

Crop · Area

PLOT STATUS

Status explanation

NEXT ACTION

Example:

Plot A

Tomato · 1,200 m²

🔴 Urgent

Watering overdue

Next: Watering

---

## **16.4 Empty States**

Every major page should have an empty state.

### **No Plots**

You haven't added any plots yet.

Add your first plot to start managing your farm.

\[+ Add Plot\]

### **No Actions**

No actions require your attention.

Your farm is on track.

### **No Activities**

No activities recorded yet.

Start logging activities to build your farm history.

---

# **17\. HACKATHON IMPLEMENTATION SCOPE**

The application should prioritize a functional and coherent core experience over implementing every possible feature.

---

## **17.1 MUST HAVE**

### **1\. Home Dashboard**

Must display:

* Plot cards  
* Plot status  
* Priority-based ordering  
* Today's actions  
* Recent activity  
* Basic weather preview

---

### **2\. Plot Management**

Users must be able to:

* View plots  
* Add plots  
* Open plot details  
* View plot status

---

### **3\. Activity Journal**

Users must be able to:

* Log an activity  
* View recent activities  
* See when an activity was last performed

Example:

Watered yesterday

Fertilized 2 days ago

---

### **4\. Action Management**

Users must be able to:

* See upcoming actions  
* See overdue actions  
* Mark actions as completed

---

### **5\. Basic Insights**

The prototype should display:

* Weather information  
* Market price information  
* Agricultural information

---

## **17.2 SHOULD HAVE**

If development time allows:

* Weather forecast  
* Market price changes  
* Search and filters  
* Detailed article pages  
* Crop-specific recommendations  
* Activity history filtering

---

## **17.3 NICE TO HAVE**

These features should only be implemented if the core experience is already complete:

* Advanced crop recommendations  
* AI farming assistant  
* Image-based crop disease detection  
* IoT sensor integration  
* Detailed yield prediction  
* Advanced analytics  
* Automated task generation  
* Multi-user farm collaboration

---

# **18\. RECOMMENDED HACKATHON USER FLOW**

The primary user flow should be:

OPEN APP

   ↓

HOME

   ↓

SEE PLOT STATUS

   ↓

IDENTIFY URGENT OR ATTENTION NEEDED PLOT

   ↓

OPEN PLOT DETAIL

   ↓

VIEW CURRENT ACTION

   ↓

COMPLETE FARMING ACTIVITY

   ↓

LOG ACTIVITY

   ↓

ACTIVITY JOURNAL UPDATED

   ↓

PLOT STATUS UPDATED

   ↓

HOME DASHBOARD UPDATED

Example:

User opens GORA

        ↓

Plot A displays:

🔴 Urgent

Watering overdue

        ↓

User opens Plot A

        ↓

User waters the crop

        ↓

User taps "Log Activity"

        ↓

Selects "Watered"

        ↓

Saves activity

        ↓

System updates:

Watered today

        ↓

Watering action becomes:

Completed

        ↓

Plot status changes to:

🟢 On Track

---

# **19\. FINAL PAGE PRIORITY**

For the hackathon, the most important pages are:

## **Priority 1 — Core Farm Management**

1. Home  
2. My Plots  
3. Plot Detail  
4. Add Plot  
5. Activity Journal

## **Priority 2 — Decision Support**

6. Insights  
7. Weather Detail  
8. Market Prices

## **Priority 3 — Supporting Information**

9. Agricultural News  
10. Profile and Settings

The core prototype should feel complete even if Priority 2 and Priority 3 pages are simplified.

The most important experience is:

**A farmer opens GORA, immediately sees which plots require attention, understands what needs to be done, completes the activity, records what happened, and sees the farm status update.**

That experience should be polished before additional features are added.

# User Flow & Interaction

# **GORA — Core User Flow & Interaction Specification**

## **1\. Document Purpose**

This document defines the core user flows, screen transitions, user interactions, system responses, and status changes within the GORA mobile application.

The purpose of this document is to ensure that:

* Every important screen has a clear purpose  
* Users know where they are going and why  
* Actions have predictable results  
* The application responds consistently to user input  
* Plot statuses update logically  
* Activity history and actions remain connected

This document should be used as a reference before creating detailed wireframes and high-fidelity UI designs.

---

# **2\. Core Product Loop**

The primary experience of GORA is:

OBSERVE  
   ↓  
UNDERSTAND  
   ↓  
ACT  
   ↓  
RECORD  
   ↓  
UPDATE

In the context of the application:

User opens GORA  
        ↓  
Views farm overview  
        ↓  
Identifies a plot requiring attention  
        ↓  
Views the reason for the status  
        ↓  
Performs the required action  
        ↓  
Records the activity  
        ↓  
System updates the action  
        ↓  
System recalculates the plot status  
        ↓  
Home dashboard is updated

---

# **3\. Primary User Journey**

The primary user journey is:

HOME  
  ↓  
IDENTIFY PLOT STATUS  
  ↓  
PLOT DETAIL  
  ↓  
VIEW CURRENT ACTION  
  ↓  
COMPLETE FARMING ACTIVITY  
  ↓  
LOG ACTIVITY  
  ↓  
ACTIVITY HISTORY UPDATED  
  ↓  
ACTION COMPLETED  
  ↓  
PLOT STATUS UPDATED  
  ↓  
HOME UPDATED

---

## **Example Scenario**

A farmer opens GORA.

The Home page displays:

Plot A  
🍅 Tomato  
🔴 Urgent

Watering overdue

The farmer:

1. Opens Plot A  
2. Views the overdue watering action  
3. Waters the plot  
4. Opens Log Activity  
5. Selects Watered  
6. Saves the activity

The system then:

1. Adds the activity to the Activity Journal  
2. Marks the watering action as Completed  
3. Recalculates the plot status  
4. Changes the plot from Urgent to On Track or Attention Needed depending on other unresolved actions  
5. Updates the Home page

---

# **4\. Screen Inventory**

The application should contain the following primary screens:

1\. Home  
2\. My Plots  
3\. Add Plot  
4\. Plot Detail  
5\. Log Activity  
6\. Activity History  
7\. Insights  
8\. Weather Detail  
9\. Market Prices  
10\. Agricultural News  
11\. Article Detail  
12\. Profile

The core hackathon flow should primarily use:

Home  
  ↓  
My Plots  
  ↓  
Plot Detail  
  ↓  
Log Activity  
  ↓  
Activity History

---

# **5\. MAIN NAVIGATION FLOW**

The primary navigation is:

┌─────────────┐  
│    HOME     │  
└──────┬──────┘  
       │  
       ├──────────────→ MY PLOTS  
       │                    │  
       │                    ↓  
       │              PLOT DETAIL  
       │                    │  
       │                    ↓  
       │              LOG ACTIVITY  
       │                    │  
       │                    ↓  
       │            ACTIVITY HISTORY  
       │  
       ├──────────────→ INSIGHTS  
       │                    │  
       │                    ├──→ WEATHER  
       │                    │  
       │                    ├──→ MARKET PRICES  
       │                    │  
       │                    └──→ NEWS  
       │  
       └──────────────→ PROFILE

---

# **6\. FLOW 1 — OPENING THE APPLICATION**

## **6.1 User Action**

The user opens GORA.

---

## **6.2 System Response**

The system loads the Home page.

The Home page should display:

* Greeting  
* Plot overview  
* Plot statuses  
* Today's actions  
* Recent activity  
* Weather preview  
* Market price preview

---

## **6.3 Home Page Priority**

The information should be displayed in this order:

1\. Plot Status  
        ↓  
2\. Today's Actions  
        ↓  
3\. Recent Activity  
        ↓  
4\. Weather  
        ↓  
5\. Market Prices

The most actionable information should appear first.

---

# **7\. FLOW 2 — VIEWING A PLOT**

## **7.1 User Action**

The user taps a plot card.

Example:

┌──────────────────────┐  
│ Plot A               │  
│ Tomato               │  
│                      │  
│ 🔴 Urgent            │  
│ Watering overdue     │  
└──────────────────────┘

---

## **7.2 System Response**

The system opens the Plot Detail page.

---

## **7.3 Plot Detail Information**

The page should display:

PLOT INFORMATION  
        ↓  
PLOT STATUS  
        ↓  
CURRENT ACTIONS  
        ↓  
RECENT ACTIVITY

Example:

Plot A  
Tomato  
1,200 m²

🔴 Urgent  
Watering overdue

CURRENT ACTIONS  
🔴 Watering — Overdue  
🟡 Pest inspection — Due tomorrow

RECENT ACTIVITY  
Fertilized — 2 days ago

---

# **8\. FLOW 3 — VIEWING AN ACTION**

## **8.1 User Action**

The user taps an action.

Example:

🔴 Watering  
Overdue

---

## **8.2 System Response**

The system displays action details.

Example:

WATERING

Plot:  
Plot A

Status:  
Overdue

Due:  
16 July 2026

\[Mark as Completed\]  
\[Log Activity\]

---

## **8.3 Action Completion Options**

The user may:

### **Option A — Mark as Completed**

The system marks the action as completed.

### **Option B — Log Activity**

The system opens the Log Activity interface.

The recommended flow is:

Action  
  ↓  
Log Activity  
  ↓  
Activity Recorded  
  ↓  
Action Completed

This creates a direct connection between the task and the activity that completed it.

---

# **9\. FLOW 4 — LOGGING AN ACTIVITY**

## **9.1 User Action**

The user taps:

\[+ LOG ACTIVITY\]

---

## **9.2 Log Activity Screen**

┌─────────────────────────────┐  
│ Log Activity                │  
├─────────────────────────────┤  
│ What did you do?            │  
│                             │  
│ \[💧 Watered\]                │  
│ \[🌱 Fertilized\]             │  
│ \[🧪 Applied pesticide\]      │  
│ \[🔍 Inspected\]              │  
│ \[🔧 Maintained\]             │  
│ \[✏ Other\]                  │  
│                             │  
│ Date                        │  
│ \[ Today \]                   │  
│                             │  
│ Optional note               │  
│ \[\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\]   │  
│                             │  
│ \[Save Activity\]             │  
└─────────────────────────────┘

---

## **9.3 Required Input**

The user must select:

Activity Type

The user may optionally add:

Date  
Note

The default date should be the current date.

---

## **9.4 Save Activity**

When the user taps:

\[Save Activity\]

the system should:

1. Validate the input  
2. Create the activity record  
3. Add the activity to the Activity Journal  
4. Check whether the activity corresponds to an existing action  
5. Mark the related action as Completed if applicable  
6. Recalculate the plot status  
7. Return the user to the Plot Detail page

---

# **10\. FLOW 5 — ACTIVITY RECORDING**

Example:

Before logging:

Plot A

🔴 Urgent  
Watering overdue

The user logs:

💧 Watered

After saving:

Activity Journal

Today

💧 Watered  
09:30

The related action becomes:

✓ Watering  
Completed

The system then recalculates the plot status.

---

# **11\. FLOW 6 — PLOT STATUS UPDATE**

The plot status should be recalculated after important changes.

Important changes include:

* An action is completed  
* An action becomes overdue  
* A new action is added  
* A new activity is logged  
* A relevant issue is recorded

---

## **11.1 Status Logic**

### **🔴 Urgent**

The plot should be considered Urgent if:

* A critical action is overdue  
* A high-priority action has been missed  
* A serious issue has been recorded

Example:

Watering overdue  
        ↓  
🔴 Urgent

---

### **🟡 Attention Needed**

The plot should be considered Attention Needed if:

* An action is due soon  
* An inspection is required  
* A scheduled activity is approaching  
* A potential issue requires monitoring

Example:

Fertilization due tomorrow  
        ↓  
🟡 Attention Needed

---

### **🟢 On Track**

The plot should be considered On Track if:

* No important actions are overdue  
* Required activities are up to date  
* No immediate issues are present

Example:

All activities up to date  
        ↓  
🟢 On Track

---

# **12\. FLOW 7 — RETURNING TO THE HOME PAGE**

After an activity is logged, the Home page should reflect the latest information.

Before:

Plot A  
🔴 Urgent  
Watering overdue

After:

Plot A  
🟢 On Track  
Watered today

The Today's Actions section should also update.

Before:

TODAY'S ACTIONS

🔴 Water Plot A  
Overdue

After:

TODAY'S ACTIONS

No urgent actions for Plot A

The Recent Activity section should display:

💧 Plot A  
Watered today

This creates a visible connection between:

USER ACTION  
      ↓  
SYSTEM UPDATE  
      ↓  
UPDATED FARM OVERVIEW

---

# **13\. FLOW 8 — ADDING A NEW PLOT**

## **13.1 User Action**

The user opens My Plots and taps:

\[+\]

---

## **13.2 System Response**

The system opens Add Plot.

---

## **13.3 User Inputs**

The user enters:

Plot Name  
Crop  
Area  
Location  
Planting Date  
Estimated Harvest Date

---

## **13.4 User Saves**

The user taps:

\[Create Plot\]

---

## **13.5 System Response**

The system:

1. Validates the form  
2. Creates the plot  
3. Assigns the initial status:

🟢 On Track

4. Opens the Plot Detail page

The plot may later change status based on its actions and activities.

---

# **14\. FLOW 9 — INSIGHTS**

The Insights flow is separate from the core plot-management flow.

INSIGHTS  
   │  
   ├── WEATHER  
   │  
   ├── MARKET PRICES  
   │  
   └── AGRICULTURAL NEWS

---

## **14.1 Weather Flow**

Insights  
   ↓  
Weather Preview  
   ↓  
Weather Detail  
   ↓  
Hourly Forecast  
   ↓  
Daily Forecast

---

## **14.2 Market Price Flow**

Insights  
   ↓  
Market Prices  
   ↓  
Search Crop  
   ↓  
View Price  
   ↓  
View Price Change

---

## **14.3 Agricultural News Flow**

Insights  
   ↓  
Agricultural News  
   ↓  
Select Article  
   ↓  
Article Detail

---

# **15\. ERROR AND VALIDATION STATES**

The application should provide clear feedback when an action cannot be completed.

---

## **15.1 Missing Required Input**

Example:

Please select an activity type.

---

## **15.2 Invalid Plot Information**

Example:

Please enter a valid plot area.

---

## **15.3 Successful Action**

Example:

Activity recorded successfully.

---

## **15.4 Failed Save**

Example:

Unable to save activity.

Please try again.

The user should not lose the information they entered if an error occurs.

---

# **16\. CORE DATA RELATIONSHIPS**

The application should maintain the following relationships:

USER  
  │  
  └── FARM  
        │  
        └── PLOT  
              │  
              ├── CROP  
              │  
              ├── ACTIONS  
              │  
              └── ACTIVITIES

A more detailed relationship:

PLOT  
 │  
 ├── Crop Information  
 │  
 ├── Current Status  
 │  
 ├── Action 1  
 │     └── Activity that completed Action 1  
 │  
 ├── Action 2  
 │  
 └── Activity History  
       ├── Activity 1  
       ├── Activity 2  
       └── Activity 3

---

# **17\. CORE HACKATHON USER FLOW**

The core flow that should be implemented and polished first is:

┌─────────────┐  
│    HOME     │  
└──────┬──────┘  
       │  
       ↓  
┌─────────────┐  
│ PLOT STATUS │  
└──────┬──────┘  
       │  
       ↓  
┌─────────────┐  
│ PLOT DETAIL │  
└──────┬──────┘  
       │  
       ↓  
┌─────────────┐  
│   ACTION    │  
└──────┬──────┘  
       │  
       ↓  
┌─────────────┐  
│ LOG ACTIVITY│  
└──────┬──────┘  
       │  
       ↓  
┌─────────────┐  
│ SAVE RECORD │  
└──────┬──────┘  
       │  
       ↓  
┌─────────────┐  
│ UPDATE PLOT │  
│   STATUS    │  
└──────┬──────┘  
       │  
       ↓  
┌─────────────┐  
│ UPDATE HOME │  
└─────────────┘

---

# **18\. PRODUCT SUCCESS CRITERION**

The core experience is successful if a user can:

1. Open the application  
2. Immediately identify which plot requires attention  
3. Understand why the plot requires attention  
4. Understand what action is required  
5. Complete the activity  
6. Record the activity  
7. See the action update  
8. See the plot status update  
9. See the Home page reflect the latest information

The user should not need to navigate through unnecessary screens to complete this flow.

The central product experience is:

**The farmer acts, GORA remembers, and the farm overview becomes clearer.**

# Data Structure & Relation

## **1\. User Data Structure**

| Field | Required? | Description | Example |
| ----- | ----- | ----- | ----- |
| Internal User ID | System-generated | Unique identifier used internally by GORA | user\_001 |
| Name | Yes | User's name | Budi |
| Email | Yes | User's email address | budi@example.com |
| Profile Image | No | Optional profile image | Image |
| Location | No | General location of the user or farm | Tangerang |
| Created At | System-generated | Account creation date | 16 July 2026 |

---

## **2\. Farm Data Structure**

| Field | Required? | Description | Example |
| ----- | ----- | ----- | ----- |
| Internal Farm ID | System-generated | Unique identifier used internally by GORA | farm\_001 |
| Farm Name | Yes | Name used to identify the farm | Budi's Farm |
| Location | Yes | General location of the farm | Tangerang |
| Owner | System-generated | User associated with the farm | Budi |
| Total Area | System-calculated | Combined area of all plots | 5,000 m² |
| Created At | System-generated | Date the farm was created | 16 July 2026 |

---

## **3\. Plot Data Structure**

| Field | Required? | Description | Example |
| ----- | ----- | ----- | ----- |
| Internal Plot ID | System-generated | Unique identifier used internally by GORA | plot\_001 |
| Plot ID | No | Existing identifier used by the farmer to label the plot | BLK-03 |
| Plot Name | Yes | Name used to identify the plot within GORA | Tomato Field |
| Farm ID | System-generated | Identifies the farm the plot belongs to | farm\_001 |
| Crop ID | System-generated/linked | Identifies the crop planted in the plot | crop\_001 |
| Area | Yes | Size of the plot | 1,200 m² |
| Location | No | Description or location of the plot | North Field |
| Planting Date | Yes | Date the crop was planted | 12 June 2026 |
| Estimated Harvest Date | No | Expected harvest date | 25 August 2026 |
| Current Status | System-generated | Current calculated status of the plot | Urgent |
| Last Updated | System-generated | Most recent update to the plot | 16 July 2026 |

### **Example**

Plot ID:  
BLK-03

Plot Name:  
Tomato Field

Crop:  
Tomato

Area:  
1,200 m²

Location:  
North Field

Status:  
🔴 Urgent

---

## **4\. Crop Data Structure**

| Field | Required? | Description | Example |
| ----- | ----- | ----- | ----- |
| Internal Crop ID | System-generated | Unique identifier for the crop | crop\_001 |
| Crop Name | Yes | Name of the crop | Tomato |
| Crop Category | Yes | General crop category | Vegetable |
| Growth Duration | Yes | Expected growth period | 70 days |
| Watering Frequency | Yes | Recommended watering interval | Every 2 days |
| Fertilization Frequency | No | Recommended fertilization interval | Every 14 days |
| Pest Risk | No | Common pest risk associated with the crop | Aphids |

For the hackathon, this data can be predefined based on the selected crop.

---

## **5\. Action Data Structure**

| Field | Required? | Description | Example |
| ----- | ----- | ----- | ----- |
| Internal Action ID | System-generated | Unique identifier for the action | action\_001 |
| Plot ID | System-generated | Identifies the related plot | plot\_001 |
| Action Type | Yes | Activity that needs to be performed | Watering |
| Due Date | Yes | Date by which the action should be completed | 16 July 2026 |
| Priority | Yes | Importance of the action | High |
| Status | System-generated | Current state of the action | Overdue |
| Completed At | System-generated | Date the action was completed | 16 July 2026 |
| Related Activity ID | System-generated | Activity that completed the action | activity\_001 |

### **Action Statuses**

| Status | Description |
| ----- | ----- |
| Overdue | The due date has passed and the action has not been completed |
| Due Today | The action should be completed today |
| Due Soon | The action is approaching its due date |
| Upcoming | The action is scheduled for a future date |
| Completed | The action has been completed |

---

## **6\. Activity Data Structure**

| Field | Required? | Description | Example |
| ----- | ----- | ----- | ----- |
| Internal Activity ID | System-generated | Unique identifier for the activity | activity\_001 |
| Plot ID | System-generated | Identifies the related plot | plot\_001 |
| Activity Type | Yes | Activity performed by the farmer | Watered |
| Date | Yes | Date the activity took place | 16 July 2026 |
| Time | No | Time the activity took place | 09:30 |
| Note | No | Additional information from the farmer | Watered in the morning |
| Related Action ID | System-generated/optional | Action completed by this activity | action\_001 |
| Created At | System-generated | Date the record was created | 16 July 2026 |

---

# **7\. Issue Data Structure**

I recommend adding an **Issue** entity as well.

This is necessary because the status system includes conditions such as:

* Possible pest activity  
* Severe pest infestation  
* Crop disease  
* Physical damage  
* Abnormal crop condition

These should not be stored only as free-text notes inside Activities.

| Field | Required? | Description | Example |
| ----- | ----- | ----- | ----- |
| Internal Issue ID | System-generated | Unique identifier for the issue | issue\_001 |
| Plot ID | System-generated | Identifies the affected plot | plot\_001 |
| Issue Type | Yes | Type of issue observed | Pest |
| Description | Yes | Description of the issue | Aphids found on leaves |
| Severity | Yes | Severity of the issue | Medium |
| Status | Yes | Current issue state | Open |
| Reported Date | System-generated | Date the issue was reported | 16 July 2026 |
| Resolved Date | System-generated/optional | Date the issue was resolved | — |

### **Issue Severity**

| Severity | Example |
| ----- | ----- |
| Low | Minor discoloration |
| Medium | Noticeable pest activity |
| High | Severe infestation or crop damage |

### **Issue Status**

| Status | Description |
| ----- | ----- |
| Open | Issue still requires attention |
| Monitoring | Issue is being observed |
| Resolved | Issue has been addressed |

---

# **8\. Weather Data Structure**

Because Weather is an important part of the Insights section, the application should define a basic weather data structure.

For the hackathon, this information may come from an external weather API rather than being manually entered.

| Field | Required? | Description | Example |
| ----- | ----- | ----- | ----- |
| Weather ID | System-generated | Unique weather record | weather\_001 |
| Location | Yes | Location the weather applies to | Tangerang |
| Date | Yes | Date of the forecast | 16 July 2026 |
| Temperature | Yes | Temperature information | 30°C |
| Rain Probability | Yes | Probability of rain | 70% |
| Weather Condition | Yes | General condition | Rainy |
| Humidity | No | Humidity level | 82% |
| Wind Speed | No | Wind speed | 12 km/h |

---

# **9\. Market Price Data Structure**

Market prices are external information used to help farmers understand current market conditions.

| Field | Required? | Description | Example |
| ----- | ----- | ----- | ----- |
| Price Record ID | System-generated | Unique price record | price\_001 |
| Crop | Yes | Crop associated with the price | Tomato |
| Market Location | Yes | Market or region | Tangerang |
| Price | Yes | Current price | Rp25,000/kg |
| Unit | Yes | Price measurement unit | kg |
| Date | Yes | Date of the price information | 16 July 2026 |
| Price Change | No | Difference from previous price | \+5% |

---

# **10\. Agricultural News Data Structure**

The news section contains external agricultural information.

| Field | Required? | Description | Example |
| ----- | ----- | ----- | ----- |
| Article ID | System-generated | Unique article identifier | article\_001 |
| Title | Yes | Article title | New Pest Management Method |
| Source | Yes | Publisher of the article | Agricultural Ministry |
| Category | Yes | News category | Crop Management |
| Summary | Yes | Short article summary | Summary text |
| Image | No | Article thumbnail | Image |
| Published Date | Yes | Publication date | 15 July 2026 |
| Article URL | Yes | Source article link | URL |

---

# **11\. Notification Data Structure**

A Notification entity would also be useful for reminders and urgent updates.

| Field | Required? | Description | Example |
| ----- | ----- | ----- | ----- |
| Notification ID | System-generated | Unique notification identifier | notification\_001 |
| User ID | System-generated | User receiving the notification | user\_001 |
| Type | Yes | Notification category | Action Reminder |
| Title | Yes | Notification title | Watering Due |
| Message | Yes | Notification content | Plot A requires watering |
| Related Plot ID | No | Related plot | plot\_001 |
| Related Action ID | No | Related action | action\_001 |
| Status | System-generated | Read or unread status | Unread |
| Created At | System-generated | Creation time | 16 July 2026 |

---

# **12\. Complete Core Data Structure**

The complete data structure is therefore:

USER  
  │  
  └── FARM  
        │  
        └── PLOT  
              │  
              ├── CROP  
              │  
              ├── ACTION  
              │  
              ├── ACTIVITY  
              │  
              └── ISSUE

External information:

WEATHER  
MARKET PRICE  
AGRICULTURAL NEWS

User communication:

NOTIFICATION

---

# **13\. Recommended Priority for the Hackathon**

Not all entities need to be fully implemented.

## **Essential**

User  
Farm  
Plot  
Crop  
Action  
Activity

These are required for the core product loop.

---

## **Recommended**

Issue  
Notification

These make the status and reminder systems more meaningful.

---

## **External / Optional**

Weather  
Market Price  
Agricultural News

These can be represented using mock data if the hackathon time is limited.

---

# **14\. Final Recommended Structure**

The main relationship should be:

USER  
  ↓  
FARM  
  ↓  
PLOT  
  ↓  
CROP  
  ↓  
ACTIONS  
  ↓  
ACTIVITIES  
  ↓  
UPDATED PLOT STATUS

While issues influence the status:

PLOT  
  ↓  
ISSUE  
  ↓  
SEVERITY  
  ↓  
PLOT STATUS

And external information supports decision-making:

WEATHER  
   \+  
MARKET PRICES  
   \+  
AGRICULTURAL NEWS  
        ↓  
   FARMER DECISION

This revised structure is more complete than the previous version because **every major data entity now has a clear field definition, requirement status, description, and example**.

The next document should now be the **Screen Inventory & Wireframe Specification**, using these data structures as the foundation for each page and its components.

# Tab 4

# **GORA — Screen Inventory & Wireframe Specification**

## **1\. Document Purpose**

This document translates the GORA data structure and product logic into a screen-by-screen application structure.

It defines the:

* Main application pages  
* Purpose of each page  
* Sections within each page  
* Information displayed in each section  
* User actions  
* Navigation relationships  
* Recommended layout structure

This document should be used as the foundation for creating GORA's wireframes and high-fidelity prototype.

---

# **2\. Application Navigation Structure**

The main application structure is:

┌───────────────────────────────────────┐  
│                 HOME                  │  
└───────────────┬───────────────────────┘  
                │  
        ┌───────┼────────┐  
        │       │        │  
        ↓       ↓        ↓  
    MY PLOTS  INSIGHTS  PROFILE  
        │       │  
        ↓       ├───────────────┐  
   PLOT DETAIL  │               │  
        │       ↓               ↓  
        │    WEATHER      MARKET PRICES  
        │  
        ↓  
   LOG ACTIVITY  
        │  
        ↓  
ACTIVITY HISTORY

---

# **3\. Main Navigation**

The application should use a bottom navigation bar.

┌───────────────────────────────────────┐  
│                                       │  
│              PAGE CONTENT             │  
│                                       │  
├───────────────────────────────────────┤  
│  Home   │  Plots   │ Insights │ Profile│  
└───────────────────────────────────────┘

Recommended navigation items:

| Navigation Item | Destination | Purpose |
| ----- | ----- | ----- |
| Home | Home | View priorities and urgent tasks |
| Plots | My Plots | Manage all plots |
| Insights | Insights | Access weather, market, and agricultural information |
| Profile | Profile | Manage account and farm settings |

The central product loop should remain accessible from Home and My Plots.

---

# **4\. PAGE 1 — HOME**

## **4.1 Purpose**

The Home page is the primary dashboard of GORA.

Its purpose is to answer the question:

**"What should I pay attention to right now?"**

The Home page should prioritize actionable information rather than displaying every piece of farm data.

---

## **4.2 Page Structure**

┌──────────────────────────────┐  
│ Greeting                     │  
├──────────────────────────────┤  
│ To-Do List / Today's Actions │  
├──────────────────────────────┤  
│ My Plots                     │  
├──────────────────────────────┤  
│ Recent Activity              │  
├──────────────────────────────┤  
│ Weather Preview              │  
└──────────────────────────────┘

---

## **4.3 Section A — Greeting**

### **Purpose**

Provide a personalized entry point.

### **Contains**

* Greeting  
* Farmer's name  
* Current date  
* Optional location

### **Example**

Good morning, Budi

Thursday, 16 July 2026  
Tangerang

---

## **4.4 Section B — To-Do List / Today's Actions**

### **Purpose**

Give the farmer a quick list of urgent and upcoming tasks that need attention today.

This section combines the To-Do List and Today's Actions into one unified area, since both represent the same core need: showing what the farmer should do next.

### **Example**

To-Do List

🔴 2 Urgent  
\- Check drainage on Plot A  
\- Fertilize on Plot B

🟡 3 Due Soon  
\- Inspect Plot C  
\- Apply pesticide on Plot D  
\- Update irrigation on Plot E

### **Behavior**

* Tasks should be sorted by urgency and due date.  
* Each task should be tappable.  
* Tapping a task should open the related plot or action detail.  
* The section should clearly distinguish between overdue, due today, and due soon items.

---

## **4.5 Section C — My Plots**

### **Purpose**

Display the plots requiring the most attention.

### **Behavior**

Slide horizontally  
Maximum 8 cards  
Sorted by:  
1\. Priority Score  
2\. Number of Unresolved Actions  
3\. Most Recently Updated

### **Plot Card**

┌──────────────────────────┐  
│ Plot A                   │  
│ BLK-03                   │  
│ Tomato                   │  
│                          │  
│ 🔴 Urgent                │  
│ Watering overdue         │  
│                          │  
│ 2 unresolved actions     │  
└──────────────────────────┘

### **Interaction**

Tapping a card opens:

Plot Card  
    ↓  
Plot Detail

---

## **4.6 Section D — Recent Activity**

### **Purpose**

Show recently completed farming activities.

### **Behavior**

Scrollable list  
Sorted by:  
Most Recent Activity

### **Example**

Recent Activity

💧 Plot A  
Watered  
Today, 09:30

🌱 Plot B  
Fertilized  
Yesterday

🔍 Plot C  
Inspected  
2 days ago

---

## **4.7 Section E — Weather Preview**

### **Purpose**

Provide a quick environmental overview.

### **Example**

Weather Today

☁️ 30°C

Rain:  
70%

Heavy rain expected this afternoon

### **Interaction**

Tapping the section opens:

Weather Preview  
      ↓  
Weather Detail

---

# **5\. PAGE 2 — MY PLOTS**

## **5.1 Purpose**

My Plots is the central management page for all plots.

It should allow the farmer to:

* View all plots  
* Search for a plot  
* Filter plots by status  
* Add a new plot  
* Open Plot Detail

---

## **5.2 Page Structure**

┌──────────────────────────────┐  
│ My Plots                     │  
├──────────────────────────────┤  
│ Search                       │  
├──────────────────────────────┤  
│ Status Filters               │  
├──────────────────────────────┤  
│ Plot List                    │  
│                              │  
│ Plot A                       │  
│ Plot B                       │  
│ Plot C                       │  
├──────────────────────────────┤  
│          \[+ Add Plot\]        │  
└──────────────────────────────┘

---

## **5.3 Section A — Search**

The farmer should be able to search by:

* Plot Name  
* Plot ID  
* Crop

Example:

🔍 Search plots...

---

## **5.4 Section B — Status Filters**

\[All\] \[Urgent\] \[Attention Needed\] \[On Track\]

---

## **5.5 Section C — Plot List**

### **Behavior**

Vertical scrolling  
Sorted by:  
1\. Priority Score  
2\. Number of Unresolved Actions  
3\. Most Recently Updated

### **Plot Card**

┌──────────────────────────────┐  
│ Plot A                       │  
│ Plot ID: BLK-03              │  
│ Tomato                       │  
│                              │  
│ 🔴 Urgent                    │  
│ Watering overdue             │  
│                              │  
│ 2 unresolved actions         │  
└──────────────────────────────┘

---

# **6\. PAGE 3 — ADD PLOT**

## **6.1 Purpose**

Allow farmers to add a new plot.

---

## **6.2 Page Structure**

┌──────────────────────────────┐  
│ Add Plot                     │  
├──────────────────────────────┤  
│ Plot Information             │  
├──────────────────────────────┤  
│ Crop Information             │  
├──────────────────────────────┤  
│ Planting Information         │  
├──────────────────────────────┤  
│          \[Create Plot\]       │  
└──────────────────────────────┘

---

## **6.3 Section A — Plot Information**

| Field | Required? |
| ----- | ----- |
| Plot Name | Yes |
| Plot ID | No |
| Area | Yes |
| Location | No |

### **Example**

Plot Name \*  
\[\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\]

Plot ID  
\[\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\]  
Optional

Area \*  
\[\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\]

Location  
\[\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\]

The Plot ID field should explicitly communicate that it is optional.

Example helper text:

Optional — use your existing plot labeling system if you have one.

---

## **6.4 Section B — Crop Information**

| Field | Required? |
| ----- | ----- |
| Crop | Yes |
| Crop Variety | No |

---

## **6.5 Section C — Planting Information**

| Field | Required? |
| ----- | ----- |
| Planting Date | Yes |
| Estimated Harvest Date | No |

---

# **7\. PAGE 4 — PLOT DETAIL**

## **7.1 Purpose**

Plot Detail is the central management page for one plot.

It should answer:

**"What is happening with this plot, what needs to be done, and what has already happened?"**

---

## **7.2 Page Structure**

┌──────────────────────────────┐  
│ Plot Header                  │  
├──────────────────────────────┤  
│ Status Card                  │  
├──────────────────────────────┤  
│ Plot Information             │  
├──────────────────────────────┤  
│ Current Actions              │  
├──────────────────────────────┤  
│ Open Issues                  │  
├──────────────────────────────┤  
│ Recent Activity              │  
├──────────────────────────────┤  
│ \[+ Log Activity\]             │  
│ \[+ Report Issue\]             │  
└──────────────────────────────┘

---

## **7.3 Section A — Plot Header**

Plot A  
Plot ID: BLK-03

Tomato  
1,200 m²

---

## **7.4 Section B — Status Card**

🔴 URGENT

Watering overdue

2 unresolved actions

The status card should explain the reason for the status.

The user should not see only:

🔴 Urgent

without understanding why.

---

## **7.5 Section C — Plot Information**

Crop:  
Tomato

Area:  
1,200 m²

Planted:  
12 June 2026

Estimated Harvest:  
25 August 2026

---

## **7.6 Section D — Current Actions**

Current Actions

🔴 Watering  
Overdue

🟡 Pest Inspection  
Due Tomorrow

Each action should be tappable.

---

## **7.7 Section E — Open Issues**

Open Issues

🐛 Pest activity  
Medium severity  
Reported today

If there are no issues:

No open issues reported.

---

## **7.8 Section F — Recent Activity**

Recent Activity

💧 Watered  
Today

🌱 Fertilized  
2 days ago

🔍 Inspected  
4 days ago

---

# **8\. PAGE 5 — LOG ACTIVITY**

## **8.1 Purpose**

Allow farmers to record completed farming activities quickly.

---

## **8.2 Page Structure**

┌──────────────────────────────┐  
│ Log Activity                 │  
├──────────────────────────────┤  
│ Select Plot                  │  
├──────────────────────────────┤  
│ Activity Type                │  
├──────────────────────────────┤  
│ Date and Time                │  
├──────────────────────────────┤  
│ Notes                        │  
├──────────────────────────────┤  
│          \[Save Activity\]     │  
└──────────────────────────────┘

---

## **8.3 Activity Type**

\[💧 Watered\]  
\[🌱 Fertilized\]  
\[🧪 Applied Pesticide\]  
\[🔍 Inspected\]  
\[🌿 Removed Weeds\]  
\[🌾 Planted\]  
\[🧺 Harvested\]  
\[🔧 Maintained\]  
\[✏ Other\]

---

## **8.4 Activity Behavior**

When an activity is saved:

Activity Saved  
      ↓  
Check Related Actions  
      ↓  
Complete Matching Action  
      ↓  
Recalculate Plot Status  
      ↓  
Update Activity History

---

# **9\. PAGE 6 — ACTIVITY HISTORY**

## **9.1 Purpose**

Display a chronological record of farming activities.

---

## **9.2 Page Structure**

┌──────────────────────────────┐  
│ Activity History             │  
├──────────────────────────────┤  
│ Filter by Plot               │  
├──────────────────────────────┤  
│ Filter by Activity Type      │  
├──────────────────────────────┤  
│ Activity Timeline            │  
└──────────────────────────────┘

---

## **9.3 Activity Timeline**

TODAY

💧 Watered  
Plot A  
09:30

YESTERDAY

🌱 Fertilized  
Plot B  
14:00

2 DAYS AGO

🔍 Inspected  
Plot C  
10:15

---

# **10\. PAGE 7 — REPORT ISSUE**

## **10.1 Purpose**

Allow the farmer to report a problem they physically observe in a plot.

---

## **10.2 Page Structure**

┌──────────────────────────────┐  
│ Report Issue                 │  
├──────────────────────────────┤  
│ Select Issue Type            │  
├──────────────────────────────┤  
│ Severity                     │  
├──────────────────────────────┤  
│ Description                  │  
├──────────────────────────────┤  
│ Add Photo                    │  
├──────────────────────────────┤  
│          \[Save Issue\]        │  
└──────────────────────────────┘

---

## **10.3 Issue Type**

🐛 Pest  
🦠 Disease  
🍂 Unhealthy Leaves  
💧 Water Problem  
🌱 Growth Problem  
🌪️ Weather Damage  
✏ Other

---

## **10.4 Severity**

○ Low  
○ Medium  
○ High

---

## **10.5 Issue Source**

The source should automatically be:

Farmer Report

The farmer should not need to manually select this.

---

# **11\. PAGE 8 — INSIGHTS**

## **11.1 Purpose**

Provide external information that supports farming decisions.

---

## **11.2 Page Structure**

┌──────────────────────────────┐  
│ Insights                     │  
├──────────────────────────────┤  
│ Weather                      │  
├──────────────────────────────┤  
│ Market Prices                │  
├──────────────────────────────┤  
│ Agricultural News            │  
└──────────────────────────────┘

---

# **12\. PAGE 9 — WEATHER DETAIL**

## **12.1 Page Structure**

┌──────────────────────────────┐  
│ Current Weather              │  
├──────────────────────────────┤  
│ Temperature                  │  
├──────────────────────────────┤  
│ Rain Probability             │  
├──────────────────────────────┤  
│ Hourly Forecast              │  
├──────────────────────────────┤  
│ Daily Forecast               │  
└──────────────────────────────┘

---

# **13\. PAGE 10 — MARKET PRICES**

## **13.1 Page Structure**

┌──────────────────────────────┐  
│ Market Prices                │  
├──────────────────────────────┤  
│ Search Crop                  │  
├──────────────────────────────┤  
│ Selected Crop                │  
├──────────────────────────────┤  
│ Current Price                │  
├──────────────────────────────┤  
│ Price Change                 │  
└──────────────────────────────┘

---

# **14\. PAGE 11 — AGRICULTURAL NEWS**

## **14.1 Page Structure**

┌──────────────────────────────┐  
│ Agricultural News            │  
├──────────────────────────────┤  
│ Categories                   │  
├──────────────────────────────┤  
│ Article List                 │  
└──────────────────────────────┘

### **Article Card**

┌──────────────────────────────┐  
│ \[Image\]                      │  
│ New Pest Management Method   │  
│ Crop Management              │  
│ 15 July 2026                 │  
└──────────────────────────────┘

---

# **15\. PAGE 12 — ARTICLE DETAIL**

## **15.1 Page Structure**

┌──────────────────────────────┐  
│ Article Image                │  
├──────────────────────────────┤  
│ Article Title                │  
├──────────────────────────────┤  
│ Source                       │  
├──────────────────────────────┤  
│ Publication Date             │  
├──────────────────────────────┤  
│ Article Content              │  
└──────────────────────────────┘

---

# **16\. PAGE 13 — PROFILE**

## **16.1 Page Structure**

┌──────────────────────────────┐  
│ Profile                      │  
├──────────────────────────────┤  
│ User Information             │  
├──────────────────────────────┤  
│ Farm Information             │  
├──────────────────────────────┤  
│ Notifications                │  
├──────────────────────────────┤  
│ Settings                     │  
└──────────────────────────────┘

---

# **17\. CORE SCREEN CONNECTIONS**

The main user flow should be:

HOME  
  ↓  
MY PLOTS  
  ↓  
PLOT DETAIL  
  ├──→ LOG ACTIVITY  
  │        ↓  
  │   ACTIVITY HISTORY  
  │  
  └──→ REPORT ISSUE  
           ↓  
       PLOT STATUS

The information flow is:

FARMER OBSERVES  
      ↓  
REPORTS ISSUE  
      ↓  
GORA RECORDS ISSUE  
      ↓  
PLOT STATUS UPDATED

And:

FARMER PERFORMS ACTIVITY  
      ↓  
LOGS ACTIVITY  
      ↓  
ACTION COMPLETED  
      ↓  
PLOT STATUS UPDATED

---

# **18\. SCREEN PRIORITY FOR THE HACKATHON**

The screens should be prioritized as follows.

## **Priority 1 — Core Product Experience**

1\. Home  
2\. My Plots  
3\. Plot Detail  
4\. Log Activity  
5\. Activity History  
6\. Report Issue

These screens demonstrate the main value proposition of GORA.

---

## **Priority 2 — Supporting Information**

7\. Insights  
8\. Weather Detail  
9\. Market Prices  
10\. Agricultural News  
11\. Article Detail

---

## **Priority 3 — Account Management**

12\. Add Plot  
13\. Profile

Add Plot may be moved into Priority 1 if the prototype requires users to create their own plots during the demonstration.

---

# **19\. RECOMMENDED CORE DEMO FLOW**

For the hackathon presentation, the strongest flow is:

1\. OPEN HOME  
        ↓  
2\. SEE PLOT A IS 🔴 URGENT  
        ↓  
3\. OPEN PLOT A  
        ↓  
4\. SEE WATERING IS OVERDUE  
        ↓  
5\. FARMER WATERS THE PLOT  
        ↓  
6\. LOG ACTIVITY: WATERED  
        ↓  
7\. ACTION BECOMES COMPLETED  
        ↓  
8\. PLOT STATUS UPDATES  
        ↓  
9\. HOME DASHBOARD UPDATES

A second supporting flow can demonstrate issue reporting:

1\. OPEN PLOT  
        ↓  
2\. REPORT ISSUE  
        ↓  
3\. SELECT PEST  
        ↓  
4\. SELECT MEDIUM SEVERITY  
        ↓  
5\. ADD NOTE  
        ↓  
6\. SAVE  
        ↓  
7\. PLOT STATUS CHANGES

---

# **20\. FINAL WIREFRAME PRINCIPLE**

Every page should answer three questions:

### **1\. What information does the user need?**

DATA

### **2\. What decision does the user need to make?**

DECISION

### **3\. What action can the user take?**

ACTION

For example:

PLOT DETAIL

DATA:  
Watering overdue

DECISION:  
Should I water the plot now?

ACTION:  
Log Activity

The core design principle is:

**Every important piece of information should lead naturally to a relevant action.**

The Home page should lead to Plot Detail.

Plot Detail should lead to an Action.

An Action should lead to Activity Logging.

Activity Logging should update the Plot Status.

This creates a clear, connected product experience rather than a collection of disconnected pages.

