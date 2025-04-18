// src/components/landing/ArchitectureShowcase.tsx
import { motion } from 'framer-motion';

const ArchitectureShowcase = () => (
  <section className="max-w-5xl mx-auto px-4 py-20 text-center">
    <motion.h2
      className="text-2xl sm:text-3xl font-bold text-forge-heat mb-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
    >
      🛠️ Full-Stack AWS Serverless Architecture
    </motion.h2>

    <motion.p
      className="text-slate-300 mb-10 max-w-2xl mx-auto text-sm sm:text-base"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.4 }}
      viewport={{ once: true }}
    >
      This is a developer showcase project built entirely on AWS using modern, serverless architecture.
      From the React frontend in S3 + CloudFront to the AppSync GraphQL API with Lambda resolvers and DynamoDB.
      It's designed to demonstrate clean infrastructure, real-world workflows, and future-focused patterns.
    </motion.p>

    <motion.div
  className="mx-auto w-full max-w-md bg-forge-ash/80 backdrop-blur-md border border-forge-lava/40 rounded-lg p-6 shadow-lg text-sm text-left text-slate-200 font-mono leading-relaxed whitespace-pre-wrap"
  initial={{ opacity: 0, scale: 0.98 }}
  whileInView={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.4 }}
  viewport={{ once: true }}
>
  {`React + TypeScript (S3 + CloudFront)
↓
AWS AppSync (GraphQL API)
↓
Lambda Resolvers (Node.js)
↓
DynamoDB (NoSQL)
↓
Cognito (Auth) + CDK (Infra as Code)
↓
AI Assistant (Amazon Bedrock)
↓
Audit Logs + Notifications`}
</motion.div>


    {/* <div className="mt-6">
      <a
        href="/docs"
        className="text-forge-ember hover:underline text-sm inline-block transition-colors duration-200"
      >
        View technical documentation →
      </a>
    </div> */}
  </section>
);

export default ArchitectureShowcase;
