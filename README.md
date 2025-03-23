# 🛠️ FlowForge

**FlowForge** is a smart workflow automation tool designed to help internal business teams streamline multi-step approval processes — with the help of an integrated AI assistant.

This project is a full-stack example application showcasing:
- TypeScript + Vue 3 frontend
- AWS CDK infrastructure
- Serverless backend (Lambda, API Gateway, Cognito)
- DynamoDB for persistence
- AI-powered support chat (OpenAI or Amazon Bedrock)
- Full documentation: user stories, architecture, requirements

---

## 🚀 Features

- 🔐 **Authentication & Roles** (Sales, Approver, Admin, Partner)
- 📝 **Workflow Engine**: sales → partner form → approval
- 💬 **AI Assistant**: context-aware chat bot to guide users
- 📊 **Admin Dashboard**: view requests, users, audit logs
- 🧾 **Approval History & Audit Trail**
- ⚙️ **Fully Serverless Architecture (CDK)**

---

## 📁 Project Structure

```bash
flowforge/
├── frontend/       # Vue 3 app (TypeScript)
├── backend/        # API handlers, business logic
├── cdk/            # AWS CDK infrastructure
├── docs/           # User stories, requirements, architecture
│   ├── user-stories.md
│   ├── requirements.md
│   └── architecture.md
├── scripts/        # Utility scripts (dev tools, setup)
├── .github/        # GitHub Actions, issue templates
└── README.md       # You are here
```
