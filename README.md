College Bus Tracking System

A real-time IoT-based College Bus Tracking System that allows administrators, drivers, and students to manage and monitor college buses. The system uses an ESP32 and NEO-6M GPS to collect live bus location data and sends it to a Node.js backend. Students can view the bus location in real time on an interactive map.

🚀 Features
👨‍💼 Admin
Admin authentication
Admin dashboard
View total students, drivers, and buses
Create and manage students
Create and manage drivers
Create and manage buses
Assign drivers to buses
Unassign drivers from buses
Delete students, drivers, and buses
Monitor bus status
🚌 Driver
Driver authentication
View driver profile
View assigned bus
Send real-time GPS location
View bus assignment information
👨‍🎓 Student
Student authentication
View student profile
View available buses
View bus details
Track buses in real time
View current bus location
View human-readable location name
View bus speed and GPS satellite information
View location history
📍 GPS Tracking
ESP32-based GPS tracker
NEO-6M GPS module
Real-time latitude and longitude
Speed information
Satellite count
Automatic location updates
HTTP communication with backend
Real-time updates using Socket.IO
🗺️ Live Map
Interactive map using Leaflet
OpenStreetMap
Live bus marker
Current bus coordinates
Human-readable location
Automatic marker updates
🏗️ System Architecture
                         ┌─────────────────────┐
                         │       ADMIN         │
                         │                     │
                         │ Manage Students     │
                         │ Manage Drivers      │
                         │ Manage Buses        │
                         │ Assign Drivers      │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │      BACKEND        │
                         │                     │
                         │ Node.js             │
                         │ Express.js          │
                         │ JWT Authentication  │
                         │ Socket.IO           │
                         └──────────┬──────────┘
                                    │
                    ┌───────────────┼────────────────┐
                    │               │                │
                    ▼               ▼                ▼
               MongoDB          Socket.IO       Geocoding
                    │               │                │
                    │               │                │
                    └───────────────┼────────────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   STUDENT FRONTEND  │
                         │                     │
                         │ React.js            │
                         │ Leaflet             │
                         │ OpenStreetMap       │
                         └──────────┬──────────┘
                                    │
                                    │
ESP32 + NEO-6M GPS ── HTTP ────────┘
       │
       ▼
   GPS Location
       │
       ▼
   Backend API
🛠️ Technology Stack
Frontend
React.js
Vite
Axios
Leaflet
React-Leaflet
Socket.IO Client
CSS
Backend
Node.js
Express.js
MongoDB
Mongoose
JWT
bcryptjs
Socket.IO
Axios
CORS
dotenv
Hardware
ESP32 DevKit V1
NEO-6M GPS Module
GPS Antenna
LED
Resistor
Connecting wires
Phone hotspot / Wi-Fi
External Services
OpenStreetMap
Nominatim Reverse Geocoding
MongoDB Atlas
Vercel
Render
📁 Project Structure
Backend
college-bus-backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── adminController.js
│   ├── driverController.js
│   ├── studentController.js
│   ├── busController.js
│   └── locationController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── deviceMiddleware.js
│
├── models/
│   ├── User.js
│   ├── Bus.js
│   └── Location.js
│
├── routes/
│   ├── authRoutes.js
│   ├── adminRoutes.js
│   ├── driverRoutes.js
│   ├── studentRoutes.js
│   ├── busRoutes.js
│   └── locationRoutes.js
│
├── services/
│   └── geocodingService.js
│
├── utils/
│   └── generateToken.js
│
├── .env
├── .gitignore
├── package.json
└── server.js
Frontend
college-bus-frontend/
│
├── public/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── context/
│   ├── App.jsx
│   └── main.jsx
│
├── .env
├── .gitignore
├── package.json
└── vite.config.js
🔌 Hardware Connections
NEO-6M → ESP32
NEO-6M	ESP32
VCC	3.3V
GND	GND
TX	GPIO 16 / RX2
RX	GPIO 17 / TX2
NEO-6M                  ESP32
────────                ──────

VCC  ─────────────────> 3V3

GND  ─────────────────> GND

TX   ─────────────────> GPIO 16 (RX2)

RX   ─────────────────> GPIO 17 (TX2)
LED

Recommended connection:

ESP32 GPIO 23
      │
   Resistor
      │
      ▼
 LED Long Leg (+)
 LED Short Leg (-)
      │
      ▼
     GND
📡 GPS Data Flow

The NEO-6M obtains:

Latitude
Longitude
Speed
Satellites

The ESP32 creates a JSON request:

{
  "busId": "BUS01",
  "latitude": 18.992460,
  "longitude": 73.136037,
  "speed": 0.26,
  "satellites": 6
}

The ESP32 sends this to:

POST /api/location

The backend:

Validates the device key
Finds the bus
Stores GPS data in MongoDB
Performs reverse geocoding
Updates bus status
Emits a Socket.IO event
Sends the response to ESP32
🔐 Authentication

The system uses JWT-based authentication.

The authentication header is:

Authorization: Bearer <TOKEN>

Three user roles are supported:

admin
driver
student

Each role has different permissions.

🔗 API Endpoints
Authentication
POST /api/auth/admin/signup
POST /api/auth/student/signup
POST /api/auth/login
GET  /api/auth/me
Admin
GET    /api/admin/dashboard
GET    /api/admin/students
GET    /api/admin/students/:studentId
PUT    /api/admin/students/:studentId
DELETE /api/admin/students/:studentId
Drivers
POST   /api/drivers
GET    /api/drivers
GET    /api/drivers/:driverId
GET    /api/drivers/me
DELETE /api/drivers/:driverId
Buses
POST   /api/buses
GET    /api/buses
GET    /api/buses/:busId
PUT    /api/buses/:busId
DELETE /api/buses/:busId

PUT /api/buses/:busId/assign-driver
PUT /api/buses/:busId/unassign-driver
Students
GET /api/students/profile
PUT /api/students/profile

GET /api/students/buses
GET /api/students/buses/:busId
GET /api/students/buses/:busId/location
GET /api/students/buses/:busId/history
GPS
POST /api/location

GET /api/location/:busId/latest

GET /api/location/:busId/history
⚙️ Backend Installation

Clone the repository:

git clone YOUR_BACKEND_REPOSITORY_URL

Go to the backend:

cd college-bus-backend

Install dependencies:

npm install

Start development server:

npm run dev

Start production server:

npm start

Backend runs locally on:

http://localhost:8000
🔑 Backend Environment Variables

Create a .env file:

PORT=8000

MONGO_URI=mongodb://127.0.0.1:27017/bus_tracking

JWT_SECRET=your_super_secret_jwt_key

CLIENT_URL=http://localhost:5173

ADMIN_SETUP_KEY=your_admin_setup_key

DEVICE_API_KEY=my_esp32_device_key

For production, use MongoDB Atlas instead of the local MongoDB server.

Example:

MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/bus_tracking
⚠️ Security

Never commit .env to GitHub.

💻 Frontend Installation

Clone the frontend repository:

git clone YOUR_FRONTEND_REPOSITORY_URL

Go into the project:

cd college-bus-frontend

Install dependencies:

npm install

Start development server:

npm run dev

The frontend will normally run at:

http://localhost:5173
🌐 Frontend Environment Variables

Create:

.env

For local development:

VITE_API_URL=http://localhost:8000/api

For production:

VITE_API_URL=https://your-backend-domain.com/api
🚌 ESP32 Configuration

Update the Wi-Fi:

const char* WIFI_SSID =
    "YOUR_PHONE_HOTSPOT";

const char* WIFI_PASSWORD =
    "YOUR_HOTSPOT_PASSWORD";

For local testing:

const char* SERVER_URL =
    "http://10.136.25.66:8000/api/location";

For production:

const char* SERVER_URL =
    "https://your-backend-domain.com/api/location";

Device authentication:

const char* DEVICE_API_KEY =
    "my_esp32_device_key";

Bus:

const char* BUS_NUMBER =
    "BUS01";
🗺️ Real-Time Tracking

The student dashboard connects to Socket.IO.

When ESP32 sends a new location:

ESP32
  ↓
POST /api/location
  ↓
Node.js
  ↓
MongoDB
  ↓
Socket.IO
  ↓
Student Dashboard
  ↓
Leaflet Map
  ↓
🚌 Live Bus Marker

The marker is updated without refreshing the webpage.

📍 Example GPS Location

Example:

Latitude: 18.992460
Longitude: 73.136037
Speed: 0.26 km/h
Satellites: 6

The backend can convert the coordinates into a human-readable location using reverse geocoding.

Example:

18.992460, 73.136037
        ↓
Reverse Geocoding
        ↓
Human-readable location
🚀 Deployment

Recommended deployment architecture:

                    INTERNET
                       │
          ┌────────────┴────────────┐
          │                         │
          ▼                         ▼
       Vercel                    Render
      React App               Node.js API
                                   │
                    ┌──────────────┴──────────────┐
                    │                             │
                    ▼                             ▼
              MongoDB Atlas                  Socket.IO
                    │                             │
                    └──────────────┬──────────────┘
                                   │
                                   ▼
                              Live Tracking

ESP32
   │
   │ HTTPS
   ▼
Render Backend
Frontend

Deploy the React application to:

Vercel
Backend

Deploy the Node.js/Express server to:

Render
Database

Use:

MongoDB Atlas
ESP32

After backend deployment, change:

http://10.136.25.66:8000/api/location

to:

https://your-backend-domain.com/api/location
🔄 System Workflow
1. Admin logs in
        ↓
2. Admin creates bus
        ↓
3. Admin creates driver
        ↓
4. Admin assigns driver to bus
        ↓
5. Driver logs in
        ↓
6. ESP32 starts
        ↓
7. ESP32 connects to Wi-Fi
        ↓
8. NEO-6M receives GPS signal
        ↓
9. ESP32 collects GPS coordinates
        ↓
10. ESP32 sends location to backend
        ↓
11. Backend validates device
        ↓
12. Backend stores location
        ↓
13. Backend reverse geocodes location
        ↓
14. Socket.IO broadcasts location
        ↓
15. Student receives live update
        ↓
16. Bus marker moves on map
🔒 Security Considerations

The system uses:

JWT authentication
Password hashing with bcrypt
Role-based access control
ESP32 device API key
Environment variables for secrets
CORS configuration

Production improvements should include:

HTTPS-only communication
Per-device authentication
API rate limiting
Input validation
Strong JWT secrets
Restricted MongoDB network access
Secure admin account creation
GPS data validation
Authentication/authorization on every protected endpoint
🧪 Testing

Test the backend:

GET /health

Test GPS:

POST /api/location

Expected successful response:

HTTP 200

Example ESP32 output:

GPS DATA

Latitude: 18.992460
Longitude: 73.136037
Speed: 0.26 km/h
Satellites: 6

HTTP Response Code: 200
📊 Project Benefits
Real-time college bus tracking
Improved transportation visibility
Students can monitor bus locations
Centralized bus management
Driver-bus assignment
GPS-based location tracking
Reduced need for manual tracking
Scalable web-based architecture
Low-cost IoT hardware
Real-time communication using Socket.IO
🔮 Future Enhancements
Mobile application
SIM7600 4G LTE connectivity
Multiple GPS-enabled buses
Bus route management
Route stops
Estimated Time of Arrival (ETA)
Geofencing
Bus arrival notifications
Push notifications
SOS/emergency functionality
Driver attendance
Trip history and analytics
Fuel monitoring
Speed alerts
Overspeed notifications
Automatic offline detection
Parent access
QR-based bus identification
👨‍💻 Project

College Bus Tracking System

An IoT-enabled real-time college transportation monitoring platform integrating:

IoT
+
GPS
+
ESP32
+
Node.js
+
Express.js
+
MongoDB
+
Socket.IO
+
React.js
+
Leaflet
+
OpenStreetMap
