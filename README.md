# FlowForge

**FlowForge** is a dev portfolio project. 

## Showcase Project

This project is designed to showcase:

- Modern web development practices with React and TypeScript
- A cloud-native, serverless architecture using AWS CDK
- Scalable infrastructure patterns
- Real-world documentation workflows
- AI integration for improved user experience
- Role-based access control with audit support

---

## Stack
This project is a full-stack example application demonstrating:
- TypeScript + React frontend
- AWS CDK infrastructure (fully serverless)
- Lambda + App Sync GraphQL
- Cognito for authentication and user management
- DynamoDB for persistence
- AI-powered support chat (OpenAI or Amazon Bedrock)
- Full documentation including user stories, architecture, and requirements

## Features

- Role-based authentication (Sales, Approver, Admin, Partner)
- Workflow engine: sales → partner form → approval
- AI assistant: context-aware chatbot to guide users
- Admin dashboard: view requests, users, audit logs
- Approval history and audit trail
- Fully serverless architecture using AWS CDK

---


## Project Structure

```bash
.
├── LICENSE
├── README.md
├── backend               # Lambda functions and backend logic
├── cdk                   # AWS CDK infrastructure (TypeScript)
│   ├── bin               # CDK entrypoint
│   ├── lib               # CDK stacks: auth, users, certificates
│   ├── test              # Unit tests for CDK stacks
├── docs                  # Product specs and technical documentation
│   └── product-specs
│       └── epic-admin-access
├── frontend-client       # React + TypeScript web client
│   ├── public
│   ├── src
│   │   ├── pages         # login, confirm, home
│   │   ├── features      # auth module
│   │   ├── tests
└── scratch               # Temporary or sandbox scripts/files
```

---

## Documentation

Find product planning and architectural documentation in the `/docs` folder.

- `user-stories.md`: User-centric goals and workflow mapping  
- `requirements.md`: Functional and non-functional requirements  
- `architecture.md`: System design, diagrams, and data flow descriptions  

Note: Keep these updated with each new feature branch or epic.

---

## Tech Stack

| Layer          | Tech                                 |
|----------------|--------------------------------------|
| Frontend       | React + TypeScript                   |
| Backend        | Node.js + TypeScript (AWS Lambda)    |
| Infrastructure | AWS CDK (TypeScript)                 |
| Database       | DynamoDB                             |
| Authentication | Amazon Cognito                       |
| AI Assistant   | OpenAI API / Amazon Bedrock          |
| DevOps         | GitHub Actions, CDK Pipelines        |

---

## License

MIT
