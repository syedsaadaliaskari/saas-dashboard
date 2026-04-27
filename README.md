# 🚀 Multi-Tenant SaaS Dashboard

A production-grade, multi-tenant SaaS dashboard built with **Next.js 16**, **TypeScript**, **Prisma**, and **NextAuth v5**. Features complete tenant isolation, role-based access control, real-time analytics, and a full authentication system.

🔗 **Live Demo:** [saas-dashboard-taupe.vercel.app](https://saas-dashboard-taupe.vercel.app)

---

## ✨ Features

### 🏢 Multi-Tenancy
- Complete data isolation between companies — one codebase, zero data leakage
- Auto-generated unique invite codes per tenant
- First-login detection with smart onboarding redirect
- Create or join a company on first login

### 🔐 Authentication
- Google OAuth via NextAuth v5
- Email/Password credentials with Bcrypt hashing
- JWT strategy with custom `tenantId` and `role` fields
- Split auth config for Edge Runtime compatibility

### 👥 Role-Based Access Control
- Three roles: **ADMIN** and **USER**
- Company creator automatically becomes ADMIN
- Protected routes via Next.js Middleware
- Middleware runs on Edge Runtime — zero DB calls

### 📊 Admin Dashboard
- Total users, total admins, invite code stats
- Role distribution donut chart (Recharts)
- User management table — make admin, remove user
- Server Actions for instant DB mutations
- One-click invite code copy

### 📈 Analytics
- User growth area chart with animated pulse effect
- Team composition pie chart
- Data processed server-side with zero client overhead

### 👤 User Dashboard
- Personal info cards — company, role, member since
- Team composition chart
- Team growth chart

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Auth | NextAuth v5 |
| Database | PostgreSQL (Neon) |
| ORM | Prisma 5 |
| UI Components | Shadcn/UI |
| Styling | Tailwind CSS |
| Charts | Recharts |
| Deployment | Vercel |

---

## 🏗️ Architecture Highlights

### Multi-Tenancy
Every DB query is scoped by `tenantId` — Company A can never access Company B's data.

```ts
// Every query filtered by tenant
const users = await prisma.user.findMany({
  where: { tenantId: session.user.tenantId }
})
```

### Edge-Safe Auth
Auth config is split into two files to support Edge Runtime:
- `auth.config.ts` — no Prisma, used by Middleware
- `auth.ts` — with Prisma, used by Server Components

### Server Actions
Mutations use Next.js Server Actions with `revalidatePath` for instant UI updates — no API routes needed.

```ts
"use server"
export async function makeAdmin(userId: string) {
  await prisma.user.update({
    where: { id: userId },
    data: { role: "ADMIN" }
  })
  revalidatePath("/admin")
}
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database (Neon recommended)
- Google OAuth credentials

### Installation

```bash
# Clone the repo
git clone https://github.com/syedsaadaliaskari/saas-dashboard

# Install dependencies
cd saas-dashboard
npm install

# Set up environment variables
cp .env.example .env.local
```

### Environment Variables

```env
DATABASE_URL=your_postgresql_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
AUTH_SECRET=your_auth_secret
NEXTAUTH_URL=http://localhost:3000
```

### Database Setup

```bash
npx prisma migrate dev
npx prisma generate
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
saas-dashboard/
├── app/
│   ├── (auth)/
│   │   ├── signin/          # Sign in page
│   │   └── signup/          # Sign up page
│   ├── (dashboard)/
│   │   ├── admin/           # Admin dashboard
│   │   │   ├── users/       # User management
│   │   │   ├── UserTable.tsx
│   │   │   ├── actions.ts   # Server Actions
│   │   │   └── CopyButton.tsx
│   │   ├── analytics/       # Analytics page
│   │   ├── user/            # User dashboard
│   │   ├── Sidebar.tsx
│   │   └── layout.tsx
│   ├── api/
│   │   ├── auth/[...nextauth]/
│   │   ├── onboarding/      # Create company
│   │   ├── join/            # Join company
│   │   └── signup/          # Email signup
│   └── onboarding/          # Onboarding flow
├── prisma/
│   └── schema.prisma
├── lib/
│   └── prisma.ts
├── auth.ts                  # NextAuth config (Node.js)
├── auth.config.ts           # NextAuth config (Edge)
└── middleware.ts            # Route protection
```

---

## 🗄️ Database Schema

```prisma
model Tenant {
  id         String   @id @default(cuid())
  name       String
  inviteCode String   @unique
  createdAt  DateTime @default(now())
  users      User[]
}

model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  password  String?
  tenantId  String?
  tenant    Tenant?  @relation(fields: [tenantId], references: [id])
  role      String   @default("USER")
  createdAt DateTime @default(now())
}
```

---

## 🔒 Security

- Passwords hashed with Bcrypt (salt rounds: 10)
- JWT tokens store tenantId and role — no DB calls in Middleware
- Route protection via Edge Middleware
- Tenant data isolation at query level
- Environment variables never exposed to client

---

## 👨‍💻 Author

**Syed Saad Ali**
- GitHub: [@syedsaadaliaskari](https://github.com/syedsaadaliaskari)
- LinkedIn: [syed-saad-ali-askari](https://www.linkedin.com/in/syed-saad-ali-askari-0934263ab)

---

## 📄 License

MIT License — feel free to use this project as a reference.
