# This file is only for editing file nodes, do not break the structure
## Project Description
PixelPlaque is a cyberpunk-themed digital agency website offering web design, web development, graphic design, content generation, and SaaS/e-commerce solutions. Features a stunning neon aesthetic with magenta and cyan colors, glowing elements, glitch effects, dark/light theme toggle, and a complete admin dashboard for content management.

## Key Features
- Cyberpunk-inspired design with neon glows and glitch effects
- Dark/light theme toggle with persistent storage
- Full website with Home, About, Services, Contact, Portfolio, and Blog pages
- Responsive navigation with mobile menu
- Email OTP authentication system
- Protected admin dashboard for content management
- Portfolio management: Create, edit, delete, and display portfolio projects
- Blog management: Create, edit, delete, and publish blog posts
- Public portfolio and blog pages with category filtering
- Database-driven content with real-time updates

## Data Storage
Tables: 
- portfolio (f2x3eui2wydc): Stores portfolio projects with categories, images, client info, and technologies
- blog (f2x3euicwdfk): Stores blog posts with markdown/HTML content, categories, tags, and publish status
Local: Theme preference stored in localStorage via Zustand persist

## Devv SDK Integration
Built-in: 
- Auth: Email OTP authentication for admin access
- Table: NoSQL database for portfolio and blog content storage
External: None

## Special Requirements
- Cyberpunk aesthetic with magenta (#FF006E) and cyan (#00FFFF) as primary colors
- Glowing elements and glitch effects throughout
- Dark theme as default
- Admin authentication required for content management
- Public read access for portfolio and blog content

/src
├── components/      # Shared components
│   ├── ui/         # Pre-installed shadcn/ui components
│   ├── admin/      # Admin-specific components
│   │   ├── PortfolioManager.tsx # Portfolio CRUD interface
│   │   └── BlogManager.tsx      # Blog CRUD interface
│   ├── Layout.tsx  # Main layout wrapper with navigation and footer
│   ├── Navigation.tsx # Top navigation with theme toggle and admin link
│   ├── Footer.tsx  # Site footer with links and contact info
│   └── ProtectedRoute.tsx # Route guard for admin areas
│
├── pages/          # Page components
│   ├── HomePage.tsx    # Landing page with hero, services preview, stats
│   ├── AboutPage.tsx   # About page with story, values, team
│   ├── ServicesPage.tsx # Services page with detailed offerings and process
│   ├── ContactPage.tsx # Contact page with form and info cards
│   ├── PortfolioPage.tsx # Portfolio page with database-driven content
│   ├── BlogPage.tsx    # Blog page with database-driven content
│   ├── LoginPage.tsx   # Admin login with email OTP authentication
│   ├── AdminDashboardPage.tsx # Admin dashboard with portfolio and blog management
│   └── NotFoundPage.tsx # 404 error page
│
├── store/          # State management
│   ├── theme-store.ts # Theme toggle state with Zustand persist
│   └── auth-store.ts  # Authentication state management
│
├── hooks/          # Custom Hooks
│   ├── use-mobile.ts # Mobile detection Hook
│   └── use-toast.ts  # Toast notification system Hook
│
├── lib/            # Utility library
│   └── utils.ts    # Utility functions, including cn function
│
├── App.tsx         # Root component with all routes configured
├── main.tsx        # Entry file
└── index.css       # Global styles with cyberpunk design system
