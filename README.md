# GORA 
**Your Farming Companion** 
GORA is a mobile application that empowers farmers by providing everything they need in one place-from crop tracking and weather updates to market insights and personalized farming recommendations. Guided by our philosophy, **Grow. Guide. Harvest.**, GORA helps farmers make better decisions throughout every stage of the farming journey. 


# Inspiration 
Indonesia's agriculture sector is largely driven by smallholder farmers, who often face challenges such as unpredictable weather, pest outbreaks, changing market prices, and limited access to timely information. Many important farming decisions are still based on experience alone, making it difficult to respond quickly when conditions change.

We created GORA to become a digital farming companion that simplifies decision-making by providing relevant information and practical daily recommendations in one place.


# Description
GORA empowers farmers to make more informed decisions throughout the farming cycle.

The application combines:
1. Crop Tracking  
2. Weather Monitoring
3. Market Insights
4. Relevant News & Updatte
5. Personalized Daily Recommendations
6. Gamification (Streaks, Levels & Badges)

By combining essential farming information into one intuitive platform, GORA enables farmers to make smarter and more informed decisions every day.


# Development Process 
We started by identifying the biggest daily challenges faced by smallholder farmers and mapping their decision-making journey. 

The application was first designed in Figma with a mobile-first approach focused on simplicity and accessibility. After finalizing the user experience, the frontend was built using React and deployed as a mobile application through Capacitor. Supabase was used for authentication and cloud database management.

To meet the hackathon timeline, we developed a functional MVP using a rule-based recommendation system while designing the architecture to support future machine learning integration.


# Tech Stack
### Frontend
- **React**: Builds a responsive and interactive user interface using reusable components.
- **Capacitor**: Wraps the React web application into a native Android application for mobile deployment.

### Backend
- **Supabase**: Provides authentication, PostgreSQL database, and cloud storage for managing user and crop data.

### APIs
- **Weather API**: Retrieves real-time weather forecasts and environmental conditions for crop monitoring.
- **Market Price API**: Provides up-to-date commodity prices to help farmers make better selling decisions.
- **News API**: Delivers relevant news and informative articles that may impact farmers, including weather events, government policies, market trends, and farming insights.

### Design
- **Figma**: Used to design the application's UI/UX, prototypes, and user flow before development.

### Development Tools
- **Visual Studio Code**: Primary code editor for frontend and backend development.
- **Android Studio**: Builds, emulates, and tests the Android application through Capacitor.
- **Git & GitHub**: Version control and team collaboration throughout the development process.
- **Postman**: Tests and validates API endpoints during development.


# Quick Start Guide 
npm run dev

for mobile apk 
android -> app -> build -> outputs -> apk -> debug -> app-debug.apk


# Challenges We Ran Into 
This project pushed us outside our comfort zone in many ways.
- **Learning Mobile Development from Scratch**: As fifth-semester students, we had never built a mobile application before. We learned React + Capacitor while simultaneously developing our MVP during the hackathon.
- **Migrating from Local Storage to Supabase**: As the project grew, we transitioned from local storage to Supabase, which required redesigning our data flow and backend integration.
- **Team Collaboration with Git**: Working in parallel introduced challenges such as Git branching, merge conflicts, and maintaining a consistent codebase.


# Accomplishments That We're Proud Of 
We are proud that we successfully:
- Built a complete cross-platform mobile application.
- Integrated React, Capacitor, and Supabase into one workflow.
- Designed a scalable architecture for future machine learning development.


# What We Learned 
This project strengthened both our technical and collaborative skills.
We learned how to:
- Build cross-platform applications with React and Capacitor.
- Design scalable backend architecture using Supabase.
- Prioritize features under tight deadlines.
- Work effectively as a team throughout rapid product development.
- Transform real-world agricultural problems into practical digital solutions.


# What's Next
Our vision for GORA extends beyond the current MVP.
Future improvements include:
- Machine Learning harvest prediction
- Offline mode for rural areas
- Marketplace integration
- Community forum for farmers to share knowledge and experiences


# Use of AI 
AI was used as a development assistant throughout the project to improve productivity and accelerate the design process. Specifically, AI was used for:
- **Code Assistance** – Refactoring code, debugging issues, and improving code readability and structure.
- **Asset Generation** – Generating and iterating the GORA mascot concept.

AI was used solely as a supporting tool during development. All design decisions, application logic, feature implementation, and final deliverables were reviewed, customized, and developed by the team.


# Team Name 
penyawit lihai
**Group Member**: Rafael Romelo Gibran, Fellix Fernando, Jesslyn Claresta Sanders, Tiffany Titania Sunarga
