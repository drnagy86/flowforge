# Welcome!

This repo is a showcase of some projects I wanted to take on to explore and learn some new technologies while updating my portfolio page.

---

## 🔧 What’s Included

### 1. **FlowForge App** (Concept Web App)

A serverless web application demonstrating:

- React + TypeScript frontend
- AWS CDK (TypeScript) for infrastructure-as-code
- Cognito for authentication
- AppSync GraphQL API + Lambda resolvers
- DynamoDB for data persistence
- Role-based access control and audit logging
- AI chatbot assistant via OpenAI or Bedrock

### 2. **Dev Portfolio** (Static Site)

A minimal, fast-loading portfolio site built with:

- Vite + TailwindCSS
- HTML + vanilla JS
- Deployed as a static S3 website
- Linked via root redirect from `derricknagy.dev`

---

## 🧱 Project Structure (Highlights)

```bash
.
├── backend             # Lambda handlers and supporting logic
├── cdk                # AWS CDK project (infra for app + dev site)
├── devsite            # Static portfolio site (Vite + TailwindCSS)
├── docs               # Product specs, architecture, and planning
├── frontend-client    # React + TypeScript web client for FlowForge
├── scratch            # Temporary files/scripts
└── README.md          # You’re here
```

---

## 📘 Documentation

Documentation lives in the `/docs` directory and relevant `README.md` files throughout the project. Key files include:

| File / Location                  | Purpose                                               |
|----------------------------------|--------------------------------------------------------|
| `docs/product-specs/*`          | User stories, epics, and functional specs              |
| `frontend-client/ui-ux-guide.md`| UI/UX design principles for the web app                |
| `cdk/README.md`                 | AWS CDK stack overview and deployment instructions     |
| `devsite/README.md`            | Dev portfolio overview, build steps, and deployment    |
| `setup.md`                      | Local development and environment setup instructions   |

---

## 🚀 Goals

- Showcase modern, scalable full-stack patterns using AWS
- Demonstrate a polished frontend experience with React + Tailwind
- Highlight developer portfolio and experience in a clean, minimal way
- Maintain clear documentation and structure for real-world relevance

---

## 🛠 Tech Stack

| Layer          | Tech                                 |
|----------------|--------------------------------------|
| Frontend       | React + TypeScript, TailwindCSS      |
| Backend        | Node.js + TypeScript (Lambda)        |
| Infrastructure | AWS CDK                              |
| Auth           | Amazon Cognito                       |
| Database       | DynamoDB                             |
| AI Assistant   | OpenAI API / Amazon Bedrock          |
| Dev Tools      | Vite, GitHub Actions, Jest           |

---

## 📝 License

MIT
