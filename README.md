# 🚌 College Bus Tracking System

> A real-time IoT-based college bus tracking platform that enables **administrators, drivers, and students** to manage, monitor, and track college buses using **ESP32 + NEO-6M GPS**.

The system combines **IoT, real-time communication, web technologies, and GPS tracking** to provide students with live bus locations on an interactive map.

---

## 📌 Overview

The **College Bus Tracking System (BTS)** is designed to make college transportation smarter, safer, and easier to manage.

An **ESP32 connected to a NEO-6M GPS module** collects the bus's real-time location and sends GPS data to a **Node.js/Express backend**.

The backend stores location information in **MongoDB** and broadcasts real-time updates using **Socket.IO**.

Students can then view the current bus location, speed, satellite information, and location history through a **React-based dashboard**.

---

## ✨ Key Features

### 👨‍💼 Admin

* Secure admin authentication
* Admin dashboard
* View total students, drivers, and buses
* Add, update, and delete students
* Add, update, and delete drivers
* Add and manage buses
* Assign drivers to buses
* Unassign drivers from buses
* Monitor bus status

### 🚌 Driver

* Driver authentication
* Driver profile
* View assigned bus
* Send real-time GPS information
* View bus assignment details

### 👨‍🎓 Student

* Student authentication
* Student profile
* View available buses
* View bus details
* Track buses in real time
* View current bus location
* View human-readable location
* View bus speed
* View GPS satellite count
* View location history

### 📍 Real-Time GPS Tracking

* ESP32-based GPS tracking
* NEO-6M GPS module
* Real-time latitude and longitude
* Speed information
* GPS satellite count
* Automatic location updates
* HTTP communication between ESP32 and backend
* Real-time updates using Socket.IO

### 🗺️ Interactive Map

* Leaflet map integration
* OpenStreetMap tiles
* Live bus marker
* Current coordinates
* Human-readable location
* Automatic marker updates
* Location history

---

## 🏗️ System Architecture

```text
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
                    │       BACKEND       │
                    │                     │
                    │ Node.js             │
                    │ Express.js          │
                    │ JWT Authentication  │
                    │ Socket.IO           │
                    └──────────┬──────────┘
                               │
                ┌──────────────┼──────────────┐
                │              │              │
                ▼              ▼              ▼
            MongoDB        Socket.IO      Geocoding
                │              │              │
                └──────────────┼──────────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │  STUDENT FRONTEND   │
                    │                     │
                    │ React.js            │
                    │ Leaflet             │
                    │ OpenStreetMap       │
                    └──────────┬──────────┘
                               │
                               │ Real-Time Location
                               │
                    ┌──────────▼──────────┐
                    │   ESP32 + NEO-6M    │
                    │       GPS           │
                    └─────────────────────┘
```

---

## 🔄 GPS Data Flow

```text
NEO-6M GPS
    │
    ▼
ESP32
    │
    │ HTTP POST
    ▼
Node.js / Express
    │
    ├── Validate Device
    │
    ├── Store Location
    │
    ├── Reverse Geocoding
    │
    └── Socket.IO
            │
            ▼
      Student Dashboard
            │
            ▼
       Leaflet Map
            │
            ▼
       Live Bus Marker
```

---

## 🛠️ Technology Stack

### Frontend

| Technology       | Purpose                    |
| ---------------- | -------------------------- |
| React.js         | User interface             |
| Vite             | Development and build tool |
| Axios            | API communication          |
| Leaflet          | Interactive maps           |
| React-Leaflet    | React map integration      |
| Socket.IO Client | Real-time updates          |
| CSS              | Styling                    |

### Backend

| Technology | Purpose                   |
| ---------- | ------------------------- |
| Node.js    | Runtime                   |
| Express.js | REST API                  |
| MongoDB    | Database                  |
| Mongoose   | MongoDB ODM               |
| JWT        | Authentication            |
| bcryptjs   | Password hashing          |
| Socket.IO  | Real-time communication   |
| Axios      | External API requests     |
| CORS       | Cross-origin requests     |
| dotenv     | Environment configuration |

### Hardware

| Component              | Purpose               |
| ---------------------- | --------------------- |
| ESP32 DevKit V1        | IoT controller        |
| NEO-6M GPS             | GPS location tracking |
| GPS Antenna            | GPS signal reception  |
| LED                    | Status indication     |
| Resistor               | LED protection        |
| Connecting Wires       | Hardware connections  |
| Wi-Fi / Mobile Hotspot | Internet connectivity |

### External Services

* OpenStreetMap
* Nominatim Reverse Geocoding
* MongoDB Atlas
* Vercel
* Render

---

## 📁 Project Structure

```text
BTS/
│
├── backend/
│   └── college-bus-backend/
│       │
│       ├── config/
│       │   └── db.js
│       │
│       ├── controllers/
│       │   ├── authController.js
│       │   ├── adminController.js
│       │   ├── driverController.js
│       │   ├── studentController.js
│       │   ├── busController.js
│       │   └── locationController.js
│       │
│       ├── middleware/
│       │   ├── authMiddleware.js
│       │   └── deviceMiddleware.js
│       │
│       ├── models/
│       │   ├── User.js
│       │   ├── Bus.js
│       │   └── Location.js
│       │
│       ├── routes/
│       │   ├── authRoutes.js
│       │   ├── adminRoutes.js
│       │   ├── driverRoutes.js
│       │   ├── studentRoutes.js
│       │   ├── busRoutes.js
│       │   └── locationRoutes.js
│       │
│       ├── services/
│       │   └── geocodingService.js
│       │
│       ├── utils/
│       │   └── generateToken.js
│       │
│       ├── .env
│       ├── .gitignore
│       ├── package.json
│       └── server.js
│
└── frontend/
    └── college-bus-frontend/
        │
        ├── public/
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
```

---

# 🔌 Hardware Connections

## NEO-6M → ESP32

| NEO-6M | ESP32         |
| ------ | ------------- |
| VCC    | 3.3V          |
| GND    | GND           |
| TX     | GPIO 16 (RX2) |
| RX     | GPIO 17 (TX2) |

## LED Connection

```text
ESP32 GPIO 23
      │
      ▼
   Resistor
      │
      ▼
LED Long Leg (+)
LED Short Leg (-)
      │
      ▼
     GND
```

---

# 📡 GPS Data

The NEO-6M provides:

```text
Latitude
Longitude
Speed
Satellite Count
```

Example GPS payload:

```json
{
  "busId": "BUS01",
  "latitude": 18.992460,
  "longitude": 73.136037,
  "speed": 0.26,
  "satellites": 6
}
```

The ESP32 sends the data to:

```text
POST /api/location
```

The backend then:

1. Validates the device key
2. Identifies the bus
3. Stores GPS data in MongoDB
4. Performs reverse geocoding
5. Updates bus status
6. Emits a Socket.IO event
7. Sends a response to the ESP32

---

# 🔐 Authentication & Authorization

The system uses **JWT-based authentication**.

```text
Authorization: Bearer <JWT_TOKEN>
```

### User Roles

```text
Admin
Driver
Student
```

Each role has different permissions.

| Role    | Main Responsibilities                 |
| ------- | ------------------------------------- |
| Admin   | Manage students, drivers, and buses   |
| Driver  | Manage assigned bus and send GPS data |
| Student | View and track buses                  |

Passwords are protected using `bcryptjs`.

---

# 🔗 API Endpoints

## Authentication

```text
POST /api/auth/admin/signup
POST /api/auth/student/signup
POST /api/auth/login
GET  /api/auth/me
```

## Admin

```text
GET    /api/admin/dashboard
GET    /api/admin/students
GET    /api/admin/students/:studentId
PUT    /api/admin/students/:studentId
DELETE /api/admin/students/:studentId
```

## Drivers

```text
POST   /api/drivers
GET    /api/drivers
GET    /api/drivers/:driverId
GET    /api/drivers/me
DELETE /api/drivers/:driverId
```

## Buses

```text
POST   /api/buses
GET    /api/buses
GET    /api/buses/:busId
PUT    /api/buses/:busId
DELETE /api/buses/:busId

PUT /api/buses/:busId/assign-driver
PUT /api/buses/:busId/unassign-driver
```

## Students

```text
GET /api/students/profile
PUT /api/students/profile

GET /api/students/buses
GET /api/students/buses/:busId
GET /api/students/buses/:busId/location
GET /api/students/buses/:busId/history
```

## GPS

```text
POST /api/location

GET /api/location/:busId/latest
GET /api/location/:busId/history
```

---

# ⚙️ Installation & Setup

## 1. Clone the Repository

```bash
git clone https://github.com/saignaeshdasari/BTS.git
cd BTS
```

---

## 2. Backend Setup

Go to the backend directory:

```bash
cd backend/college-bus-backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=8000

MONGO_URI=mongodb://127.0.0.1:27017/bus_tracking

JWT_SECRET=your_super_secret_jwt_key

CLIENT_URL=http://localhost:5173

ADMIN_SETUP_KEY=your_admin_setup_key

DEVICE_API_KEY=my_esp32_device_key
```

Start the development server:

```bash
npm run dev
```

Backend:

```text
http://localhost:8000
```

---

# 💻 Frontend Setup

Open a new terminal.

```bash
cd frontend/college-bus-frontend
```

Install dependencies:

```bash
npm install
```

Create `.env`:

```env
VITE_API_URL=http://localhost:8000/api
```

Start the frontend:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 📡 ESP32 Configuration

Update the Wi-Fi credentials in the ESP32 code:

```cpp
const char* WIFI_SSID = "YOUR_PHONE_HOTSPOT";
const char* WIFI_PASSWORD = "YOUR_HOTSPOT_PASSWORD";
```

Configure the backend API:

```cpp
const char* SERVER_URL =
    "http://YOUR_COMPUTER_IP:8000/api/location";
```

Configure the device key:

```cpp
const char* DEVICE_API_KEY =
    "my_esp32_device_key";
```

Configure the bus:

```cpp
const char* BUS_NUMBER = "BUS01";
```

> Make sure the ESP32 and the computer running the backend are connected to the same network during local testing.

---

# 🗺️ Real-Time Tracking

The real-time tracking pipeline works as follows:

```text
ESP32
  │
  │ GPS Location
  ▼
POST /api/location
  │
  ▼
Node.js / Express
  │
  ▼
MongoDB
  │
  ▼
Socket.IO
  │
  ▼
React Dashboard
  │
  ▼
Leaflet
  │
  ▼
🚌 Live Bus Marker
```

The bus marker is updated automatically without refreshing the webpage.

---

# 🔒 Security

Sensitive configuration should **never be committed to GitHub**.

Do not expose:

```text
.env
MongoDB credentials
JWT secrets
Admin setup keys
ESP32 device API keys
Production API keys
```

Add `.env` to `.gitignore`:

```gitignore
.env
.env.local
```

For production deployments, use environment variables provided by your hosting platform.

---

# 🚀 Future Improvements

* 📱 Mobile application for students
* 🔔 Bus arrival notifications
* 🧭 Estimated Time of Arrival (ETA)
* 🛣️ Route optimization
* 📊 Bus usage analytics
* 🚌 Multiple-bus live tracking
* 🔋 ESP32 battery monitoring
* 🚨 Emergency/panic button
* 📶 LoRa-based tracking for areas with poor internet connectivity
* 👨‍👩‍👧 Parent tracking portal
* 📈 Historical route analytics
* ☁️ Improved cloud deployment
* 🔐 Enhanced device security

---

# 🎯 Project Objectives

The main objectives of the project are:

* Reduce uncertainty about bus arrival times
* Provide real-time bus location
* Improve college transportation management
* Reduce manual tracking
* Provide role-based access
* Demonstrate practical IoT integration
* Combine hardware and full-stack web development
* Enable real-time communication between devices and users

---

# 🧪 Project Highlights

This project demonstrates practical experience with:

```text
IoT
GPS Tracking
ESP32
REST APIs
React.js
Node.js
Express.js
MongoDB
JWT Authentication
Socket.IO
Leaflet Maps
Reverse Geocoding
Real-Time Web Applications
```

---

# 📸 Screenshots

Add your project screenshots here:

```markdown
## 📸 Screenshots

### Admin Dashboard
![Admin Dashboard](screenshots/admin-dashboard.png)

### Student Dashboard
![Student Dashboard](screenshots/student-dashboard.png)

### Live Bus Tracking
![Live Tracking](screenshots/live-tracking.png)

### Driver Dashboard
![Driver Dashboard](screenshots/driver-dashboard.png)
```

Recommended folder:

```text
screenshots/
├── admin-dashboard.png
├── student-dashboard.png
├── driver-dashboard.png
└── live-tracking.png
```

---

# 🌐 Deployment

The project can be deployed using:

### Frontend

```text
Vercel
```

### Backend

```text
Render
```

### Database

```text
MongoDB Atlas
```

---

# 👨‍💻 Author

**Saignaesh Dasari**

GitHub:
https://github.com/saignaeshdasari

---

# ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---

## 📄 License

This project is developed for educational and project demonstration purposes.
