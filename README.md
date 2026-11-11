# VIBNEX — Interactive Social Networking Platform

> **Connect. Share. Interact.**  
> A next-generation, high-performance social networking platform engineered with the MERN stack, Socket.IO real-time bi-directional events, modern cyan-glow aesthetics, Cloudinary CDN asset storage, direct messaging, and an isolated staff administration command hub.

---

### 👨‍💻 Sole Author & Maintainer

- **Sole Contributor:** **Nandhakishore A**
- **Email:** [nandhakishore252@gmail.com](mailto:nandhakishore252@gmail.com)
- **GitHub Profile:** [@Nandhakishore-A](https://github.com/Nandhakishore-A)
- **Repository:** [https://github.com/Nandhakishore-A/VibNex](https://github.com/Nandhakishore-A/VibNex)

---

## 🎨 VIBNEX Workspace Design System

VIBNEX delivers a standalone, modern social networking experience featuring a dark cyber-teal aesthetic (`#070A0F`, `#0E1520`, `#06B6D4`, `#00F2FE`):

1. **Interactive Landing Experience:**
   - Hero section featuring 3D mobile application mockup with ambient cyan light glow and floating user avatars.
   - Real-time platform KPI metrics: **50K+ Active Users**, **1M+ Posts Shared**, **100K+ Connections**, **Real-Time Interactions**.
   - Public live trending post grid and quick call-to-actions.

2. **Authentication Suite & 1-Click Social Logins:**
   - Split-screen visual layouts with floating scenic cards on the left.
   - 1-click **Google** and **GitHub** social login flows powered by `POST /api/auth/social`.
   - Email verification system with cryptographic tokens (`/verify-email`) and password recovery workflows (`/forgot-password`).

3. **Home Timeline & Rich Composer:**
   - 3-column responsive layout with Left Sidebar, Main Feed, and Right Discovery widget.
   - Instant post composer with Photo, Video, Poll, and Feeling triggers.
   - Multi-image grid galleries, like animation counters, comments, bookmarks, and sharing handlers.

4. **Direct Messaging & Real-Time Chat (`/messages`):**
   - Active contact list with unread counters and live online status indicators.
   - Sub-50ms Socket.IO bi-directional message dispatching and conversation history.

5. **User Profiles & Discovery:**
   - Mountain sunset banner header, circular avatar with cyan border and verified badges.
   - Location tag, join date, follower/following relationship graphs, and categorized tabs (*Posts, Media, Bookmarks, Liked*).
   - Explore page with category filter pills (*For You, Trending, People, Photos, Videos, Tags*).

6. **Standalone Staff Admin Console (`admin/`):**
   - Isolated staff management portal (`admin@vibnex.dev`).
   - Live MongoDB Atlas telemetry, account moderation (block/unblock, delete), post moderation (hide/unhide), and comment audit.

---

## 💻 Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Web Client** | React 19, Vite 8, Tailwind CSS v4, Lucide React Icons, React Router 7, Axios, Socket.IO Client, React Hot Toast |
| **Admin Console** | React 19, Vite 8, Tailwind CSS v4, Lucide React Icons, React Router 7, Axios |
| **Backend REST API** | Node.js (ES Modules), Express 5, Socket.IO 4, Mongoose 9, Helmet, Express-Rate-Limit, BCryptJS, JSONWebToken, Swagger UI |
| **Database** | MongoDB Atlas (Cluster `cluster0.9dyssq7.mongodb.net/VibNex`) |
| **Media CDN Storage** | Cloudinary CDN (`mern_stack_project_storage/VibNex`) |
| **Design Tokens** | Sleek Cyber Slate (`#070A0F`, `#0E1520`, `#1E293B`) & Electric Neon Cyan (`#06B6D4`, `#00F2FE`) |

---

## 📁 Repository Directory Structure

```text
VibNex/
├── client/                     # Consumer Web Application (React 19 + Vite 8)
│   ├── src/
│   │   ├── api/axios.js               # Axios instance with JWT interceptors
│   │   ├── assets/                    # VIBNEX neon cyan vector logos
│   │   ├── components/
│   │   │   ├── layout/                # LeftSidebar, RightSidebar, MainLayout, Navbar, Footer
│   │   │   ├── post/                  # PostCard, CreatePostForm, CommentItem, PostGrid
│   │   │   └── ui/                    # Logo, Avatar, Button, Input, Modal, Dropdown
│   │   ├── context/                   # AuthContext, SocketContext, NotificationContext
│   │   ├── pages/
│   │   │   ├── landing/LandingPage.jsx    # Hero section with 3D phone showcase & stats
│   │   │   ├── auth/Login.jsx             # Split-screen login with Google/GitHub buttons
│   │   │   ├── auth/Register.jsx          # Account creation with social login
│   │   │   ├── feed/FeedPage.jsx          # Personalized timeline & post composer
│   │   │   ├── messages/MessagesPage.jsx  # Live Socket.IO direct messaging chat
│   │   │   ├── explore/ExplorePage.jsx    # Discovery with category filter pills
│   │   │   └── profile/ProfilePage.jsx    # User profile with cover art & verification
│   │   ├── App.jsx                    # React Router 7 route tree
│   │   └── index.css                  # VIBNEX Tailwind v4 design tokens
│   ├── package.json
│   └── vite.config.js
│
├── admin/                      # Standalone Staff Administration Console
│   ├── src/
│   │   ├── components/AdminLayout.jsx # Staff layout & navigation
│   │   ├── context/AdminAuthContext.jsx # Admin session token management
│   │   ├── pages/
│   │   │   ├── AdminLogin.jsx         # Staff credential portal
│   │   │   ├── DashboardPage.jsx      # Telemetry KPI cards & growth analytics
│   │   │   ├── UsersPage.jsx          # User moderation & account management
│   │   │   ├── PostsPage.jsx          # Post content moderation & removal
│   │   │   └── CommentsPage.jsx       # Comment audit & cleanup
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Node.js + Express 5 + Socket.IO Backend
│   ├── config/
│   │   ├── db.js                      # MongoDB Atlas connection manager
│   │   ├── env.js                     # Environment variables validation
│   │   └── cloudinary.js              # Cloudinary buffer streaming SDK
│   ├── controllers/
│   │   ├── authController.js          # Register, login, social auth, password reset
│   │   ├── messageController.js       # Real-time direct messaging CRUD
│   │   ├── postController.js          # Post publishing & Cloudinary cascade
│   │   ├── userController.js          # Profile updates & follow relationships
│   │   └── adminController.js         # Staff platform analytics & moderation
│   ├── models/                        # Mongoose 9 models (User, Post, Comment, Notification, Message)
│   ├── routes/                        # Express 5 endpoint routers
│   ├── socket/                        # Socket.IO connection manager & auth
│   ├── seed/                          # adminSeed.js & demoSeed.js
│   ├── index.js                       # HTTP server bootstrap & Socket.io attachment
│   └── package.json
│
└── README.md
```

---

## 🛠️ Local Installation & Development

### 1. Clone the Repository
```bash
git clone https://github.com/Nandhakishore-A/VibNex.git
cd VibNex
```

### 2. Configure Environment Variables
Create `.env` inside `server/` using `server/.env.example` as a template:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/VibNex?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_at_least_32_characters
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_FOLDER=mern_stack_project_storage/VibNex
ADMIN_EMAIL=admin@vibnex.dev
ADMIN_USERNAME=vibnexadmin
ADMIN_PASSWORD=your_secure_admin_password
```

Inside `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

Inside `admin/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Run Development Servers
```bash
# Terminal 1: Backend API
cd server && npm run dev

# Terminal 2: Consumer Web App
cd client && npm run dev

# Terminal 3: Admin Console
cd admin && npm run dev
```

---

## 📄 License
This project is licensed under the MIT License — authored and maintained solely by **Nandhakishore A**.
