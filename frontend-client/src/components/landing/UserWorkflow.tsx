// src/components/landing/UserWorkflow.tsx
import { motion } from 'framer-motion';
import {
  UserCheck,
  FileText,
  ShieldCheck,
  LayoutDashboard,
  PuzzleIcon,
  Icon,
} from 'lucide-react';

const steps = [
  {
    icon: <UserCheck className="w-6 h-6 text-forge-heat mb-2 mx-auto" />,
    title: 'Access Control',
    description: 'Role-based workflows for Sales, Admin, and Partners.',
  },
  {
    icon: <FileText className="w-6 h-6 text-forge-heat mb-2 mx-auto" />,
    title: 'Form Submission',
    description: 'Submit partner data and trigger custom workflows.',
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-forge-heat mb-2 mx-auto" />,
    title: 'Approval Engine',
    description: 'Admins review, approve, and track requests.',
  },
  {
    icon: <LayoutDashboard className="w-6 h-6 text-forge-heat mb-2 mx-auto" />,
    title: 'Dashboards',
    description: 'Monitor activity, audit logs, and partner actions.',
  },
];

const UserWorkflow = () => (
  <section className="max-w-5xl mx-auto px-4 py-20 text-center">
<motion.h2
  className="text-2xl sm:text-3xl font-bold text-forge-heat mb-4 flex items-center justify-center gap-2"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
  viewport={{ once: true }}
>
  <PuzzleIcon className="w-6 h-6 text-forge-heat" />
  How It Works
</motion.h2>


    <motion.p
      className="text-slate-300 mb-12 max-w-xl mx-auto text-sm sm:text-base"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.4 }}
      viewport={{ once: true }}
    >
      FlowForge walks users through a real-world workflow — from role-based logins to approval queues and admin dashboards.
    </motion.p>

    <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 text-slate-100">
      {steps.map(({ icon, title, description }, i) => (
        <motion.div
          key={title}
          className="bg-forge-ash/80 border border-forge-ember/40 rounded-lg p-4 backdrop-blur-sm shadow hover:shadow-lg transition"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="mb-2">{icon}</div>
          <div className="font-semibold text-forge-lava">{title}</div>
          <div className="text-sm text-slate-400 mt-1">{description}</div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default UserWorkflow;
