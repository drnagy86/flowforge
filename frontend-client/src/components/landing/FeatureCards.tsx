// src/components/landing/FeatureCards.tsx
import { motion } from 'framer-motion';
import { ShieldCheck, Cloud, Bot } from 'lucide-react';

const features = [
  {
    icon: <ShieldCheck className="w-6 h-6 text-forge-heat" />,
    title: 'Auth',
    description:
      'Cognito-powered authentication with role-based access control.',
  },
  {
    icon: <Cloud className="w-6 h-6 text-forge-heat" />,
    title: 'Serverless',
    description:
      'Built with Lambda, DynamoDB, and CDK — fully serverless and scalable.',
  },
  {
    icon: <Bot className="w-6 h-6 text-forge-heat" />,
    title: 'AI Support',
    description:
      'Powered by OpenAI or Bedrock. Smart defaults, smarter support.',
  },
];

const FeatureCards = () => (
  <section
    id="features"
    className="scroll-mt-20 max-w-6xl mx-auto px-4 py-16"
  >
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
      {features.map(({ icon, title, description }, index) => (
        <motion.div
          key={title}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="bg-forge-ash/70 backdrop-blur-md rounded-lg p-6 border border-forge-ember/30 shadow-sm hover:shadow-md transition hover:border-forge-lava/50"
        >
          <div className="flex flex-col items-start space-y-3">
            <div className="w-10 h-10 flex items-center justify-center bg-forge-ember/10 rounded">
              {icon}
            </div>
            <h3 className="text-lg font-semibold text-forge-heat">
              {title}
            </h3>
            <p className="text-sm text-slate-300">{description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default FeatureCards;
