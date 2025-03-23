# FlowForge

**FlowForge** is a smart workflow automation tool designed to help internal business teams streamline multi-step approval processes — with the help of an integrated AI assistant.

This project is a full-stack example application showcasing:
- TypeScript + Vue 3 frontend
- AWS CDK infrastructure
- Serverless backend (Lambda, API Gateway, Cognito)
- DynamoDB for persistence
- AI-powered support chat (OpenAI or Amazon Bedrock)
- Full documentation: user stories, architecture, requirements

---

## Features

- Authentication & Roles (Sales, Approver, Admin, Partner)
- Workflow Engine: sales → partner form → approval
- AI Assistant: context-aware chat bot to guide users
- Admin Dashboard: view requests, users, audit logs
- Approval History & Audit Trail
- Fully Serverless Architecture (CDK)

---

## Project Structure

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

---

## Documentation

This repo emphasizes good documentation practices.

Check the `/docs` folder for:

- `user-stories.md`: User-centric goals and flows  
- `requirements.md`: Functional & non-functional specs  
- `architecture.md`: System design, diagrams, data flow  

---

## Tech Stack

| Layer       | Tech                              |
|-------------|------------------------------------|
| Frontend    | Vue 3 + TypeScript                 |
| Backend     | Node.js + TypeScript (Lambda)      |
| Infrastructure | AWS CDK (TypeScript)           |
| Database    | DynamoDB                           |
| Authentication | Amazon Cognito                 |
| AI Support  | OpenAI API / Amazon Bedrock        |
| DevOps      | GitHub Actions, CDK Pipelines      |

---

## Use Case Example

As a Sales user, I submit a request for a new partner.  
The partner fills out a form.  
Approvers get notified and either approve or reject the submission.  
The AI assistant helps guide everyone through the process.

---

## For Job Reviewers

This project is designed to demonstrate:

- Modern frontend skills (Vue 3 + TypeScript)  
- Cloud-native serverless architecture (CDK + AWS)  
- Scalable infrastructure patterns  
- Real-world documentation workflows  
- AI integration for user experience  
- Role-based access control  

---

## Status

In Progress – currently setting up foundational structure and documentation.

---

## License

MIT
