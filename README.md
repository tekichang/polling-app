# ALX Polly - Polling Application

A modern, secure polling application built with Next.js 15, TypeScript, and Supabase. Create polls, gather community opinions, and make data-driven decisions with a beautiful, responsive interface.

## 🚀 Features

- **User Authentication** - Secure login/registration with Supabase Auth
- **Poll Creation** - Create polls with multiple options and descriptions
- **Voting System** - Secure server-side vote processing with authentication
- **Real-time Updates** - Live poll results and user state management
- **Responsive Design** - Beautiful UI built with Tailwind CSS and Shadcn components
- **Type Safety** - Full TypeScript support for better development experience
- **Security First** - Server-side validation and authentication enforcement

## 🛠️ Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/ui
- **Authentication:** Supabase Auth
- **Database:** Supabase (PostgreSQL)
- **Icons:** Lucide React
- **Testing:** Jest + Testing Library

## 📁 Project Structure

```
app/
├── (auth)/                    # Authentication routes
│   ├── login/                 # Login page
│   ├── register/              # Registration page
│   └── layout.tsx             # Auth layout
├── (dashboard)/               # Protected dashboard routes
│   ├── dashboard/             # User dashboard
│   └── layout.tsx             # Dashboard layout
├── polls/                     # Poll management
│   ├── page.tsx               # Polls listing
│   ├── create/                # Create new poll
│   ├── [id]/                  # Poll detail page
│   └── actions.ts             # Server actions for voting
├── components/                 # Reusable components
│   ├── ui/                    # Shadcn UI components
│   ├── forms/                 # Form components
│   └── polls/                 # Poll-specific components
├── contexts/                   # React contexts
│   └── AuthContext.tsx        # Authentication context
├── lib/                       # Utility libraries
│   ├── auth/                  # Authentication utilities
│   ├── db/                    # Database utilities
│   └── supabase/              # Supabase client configuration
└── types/                     # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### 1. Clone the Repository

```bash
git clone <repository-url>
cd polling-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Supabase Configuration

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and anon key
3. Add them to your `.env.local` file
4. Set up authentication in Supabase Dashboard:
   - Go to Authentication > Settings
   - Enable email authentication
   - Configure your site URL (e.g., `http://localhost:3000`)

### 5. Database Schema (Optional)

For full functionality, set up these tables in your Supabase database:

```sql
-- Polls table
CREATE TABLE polls (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true
);

-- Poll options table
CREATE TABLE poll_options (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  poll_id UUID REFERENCES polls(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  votes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Votes table
CREATE TABLE votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  poll_id UUID REFERENCES polls(id) ON DELETE CASCADE,
  option_id UUID REFERENCES poll_options(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(poll_id, user_id) -- Prevents duplicate votes
);
```

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Usage Examples

### Creating a Poll

1. Navigate to `/polls/create`
2. Fill in the poll title and description
3. Add multiple options for voting
4. Set an expiration date (optional)
5. Submit to create the poll

### Voting on Polls

1. Browse available polls at `/polls`
2. Click on a poll to view details
3. Select your preferred option
4. Submit your vote (requires authentication)

### Managing Your Dashboard

1. Sign in to access `/dashboard`
2. View your created polls
3. Monitor voting activity
4. Access quick actions

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run tests
```

### Code Structure

The application follows Next.js 15 best practices:

- **Server Components** for data fetching and server-side logic
- **Client Components** for interactive UI elements
- **Server Actions** for secure form submissions
- **Middleware** for authentication protection
- **TypeScript** for type safety

### Key Components

- **AuthContext** - Manages user authentication state
- **VoteForm** - Handles poll voting with validation
- **LoginForm/RegisterForm** - User authentication forms
- **PollCard** - Displays poll information
- **Dashboard** - User-specific dashboard interface

## 🔒 Security Features

- **Server-side Authentication** - All sensitive operations require authentication
- **Input Validation** - Client and server-side validation
- **Secure Voting** - Prevents duplicate votes and unauthorized access
- **Type Safety** - TypeScript prevents common runtime errors
- **Environment Variables** - Sensitive data stored securely

## 🧪 Testing

Run the test suite:

```bash
npm test
```

The application includes:
- Unit tests for components
- Integration tests for authentication
- End-to-end tests for voting flow

## 📝 API Reference

### Server Actions

#### `handleVote(pollId: string, optionId: string)`

Processes a vote submission with authentication.

**Parameters:**
- `pollId` - Unique identifier for the poll
- `optionId` - Unique identifier for the selected option

**Returns:**
- `{ success: boolean, error?: string }`

### Authentication Context

#### `useAuth()`

Hook to access current user state.

**Returns:**
- `{ user: User | null }`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the documentation
- Open an issue on GitHub
- Contact the development team

---

## Security Audit

This application has undergone a comprehensive security audit to ensure:

- ✅ Secure authentication flow
- ✅ Server-side vote validation
- ✅ Protection against duplicate votes
- ✅ Input sanitization and validation
- ✅ Proper error handling

For detailed security information, see the [Security Audit Report](./SECURITY_AUDIT.md).