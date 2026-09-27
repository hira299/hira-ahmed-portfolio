import { profile } from "@/data/profile";
import { ArrowUpRight, TrendingUp, ShieldCheck, Database, Zap, Layers } from "lucide-react";

interface ProofMetricsProps {
  onSelectCaseStudy: (slug: string) => void;
}

export function ProofMetrics({ onSelectCaseStudy }: ProofMetricsProps) {
  const metricMeta: Record<string, { icon: any; color: string; caseStudy: string }> = {
    "Production records": { icon: Database, color: "text-violet-400 bg-violet-500/10 border-violet-500/20", caseStudy: "28k-record-pipeline" },
    "Pipeline speedup": { icon: Zap, color: "text-amber-400 bg-amber-500/10 border-amber-500/20", caseStudy: "28k-record-pipeline" },
    "AWS cost reduction": { icon: TrendingUp, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", caseStudy: "aws-cost-optimization" },
    "QA defects documented": { icon: ShieldCheck, color: "text-rose-400 bg-rose-500/10 border-rose-500/20", caseStudy: "multitenant-saas-qa" },
    "End-to-end QA journeys": { icon: Layers, color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20", caseStudy: "multitenant-saas-qa" },
    "CloudFix-Bench patterns": { icon: Database, color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20", caseStudy: "sentinel-mesh" },
  };

  return (
    <section className="relative py-16 border-y border-white/10 bg-[#0c0f1a]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-violet-400 uppercase tracking-widest mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              Verified Metrics
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Production Proof & Real Figures
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            Concrete numbers from production AI pipelines, AWS infrastructure rewrites, and enterprise QA engagements. Click any card to inspect the case study.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {profile.metrics.map((metric) => {
            const meta = metricMeta[metric.label] || { 
              icon: Database, 
              color: "text-violet-400 bg-violet-500/10 border-violet-500/20",
              caseStudy: "28k-record-pipeline"
            };
            const Icon = meta.icon;

            return (
              <div
                key={metric.label}
                onClick={() => onSelectCaseStudy(meta.caseStudy)}
                className="group relative p-5 rounded-2xl bg-[#111524] hover:bg-[#161c30] border border-white/10 hover:border-violet-500/40 transition-all duration-200 cursor-pointer shadow-md hover:shadow-xl hover:shadow-violet-950/20 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`w-9 h-9 rounded-xl flex items-center justify-center border ${meta.color}`}>
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="text-xs font-medium text-slate-400 group-hover:text-violet-300 flex items-center gap-1 transition-colors">
                      Case Study <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </div>

                  <div className="font-extrabold text-3xl sm:text-4xl text-white tracking-tight font-mono mb-1 group-hover:text-violet-200 transition-colors">
                    {metric.value}
                  </div>

                  <div className="text-sm font-semibold text-slate-200 mb-2">
                    {metric.label}
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed border-t border-white/5 pt-3 mt-2">
                  {metric.context}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
