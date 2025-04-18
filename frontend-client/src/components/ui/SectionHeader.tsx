type Props = {
    title: string;
    subtitle?: string;
  };
  
  export const SectionHeader = ({ title, subtitle }: Props) => (
    <div className="text-center max-w-2xl mx-auto mb-10">
      <h2 className="text-3xl font-bold text-white">{title}</h2>
      {subtitle && <p className="text-slate-400 mt-2">{subtitle}</p>}
    </div>
  );
  