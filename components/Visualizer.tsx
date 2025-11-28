import React, { useState, useEffect } from 'react';
import { Step, Example } from '../types';

interface VisualizerProps {
  example: Example;
}

const Visualizer: React.FC<VisualizerProps> = ({ example }) => {
  const [step, setStep] = useState<Step>(Step.Separate);

  // Reset step when example changes
  useEffect(() => {
    setStep(Step.Separate);
  }, [example]);

  const nextStep = () => {
    setStep((prev) => (prev < Step.Combine ? prev + 1 : prev));
  };

  const prevStep = () => {
    setStep((prev) => (prev > Step.Separate ? prev - 1 : prev));
  };

  // Parsing sentences to find parts for visualization
  // This is a simplified parsing for demonstration logic
  const noun = example.antecedent; 
  
  // Visual positions (simplified for 1D animation logic within SVG)
  const isObjectRelative = example.mainSentence.indexOf(noun) > 5; // Rough heuristic

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-3xl mx-auto flex flex-col items-center">
      <h3 className="text-xl font-bold text-gray-800 mb-4">定语从句生成演示</h3>
      
      <div className="relative w-full h-64 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
        <svg className="w-full h-full" viewBox="0 0 600 200">
          <defs>
            <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6" />
            </marker>
          </defs>

          {/* Sentence A (Main) */}
          <g transform="translate(50, 50)">
             <rect x="-10" y="-25" width="520" height="50" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="2" />
             <text x="0" y="5" className="font-mono text-lg fill-gray-800">
               {step === Step.Combine ? example.combined : example.mainSentence}
             </text>
             {/* Highlight Antecedent in Main */}
             {(step >= Step.Highlight && step < Step.Combine) && (
                <rect 
                  x={example.mainSentence.indexOf(noun) * 9.5} 
                  y="-20" 
                  width={noun.length * 10} 
                  height="40" 
                  fill="rgba(59, 130, 246, 0.2)" 
                  stroke="#3b82f6"
                  rx="4"
                />
             )}
          </g>

          {/* Sentence B (Sub) */}
          <g 
            transform={`translate(50, ${step === Step.Combine ? 50 : 130})`} 
            style={{ 
              transition: 'transform 0.8s ease-in-out',
              opacity: step === Step.Combine ? 0 : 1
            }}
          >
            <rect x="-10" y="-25" width="520" height="50" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="2" />
            
            {step < Step.Transform ? (
              <text x="0" y="5" className="font-mono text-lg fill-gray-800">{example.subSentence}</text>
            ) : (
               <g>
                 <text x="0" y="5" className="font-mono text-lg fill-gray-800">
                    {/* Simplified text replacement logic for visualizer */}
                    <tspan fill="#ec4899" fontWeight="bold">{example.relativeWord}</tspan> 
                    {example.subSentence.replace(noun, '').replace('The', '').replace('the', '')}
                 </text>
               </g>
            )}

            {/* Highlight Antecedent in Sub */}
            {step === Step.Highlight && (
               <rect 
                 x={example.subSentence.indexOf(noun) * 9.5} 
                 y="-20" 
                 width={noun.length * 10} 
                 height="40" 
                 fill="rgba(236, 72, 153, 0.2)" 
                 stroke="#ec4899"
                 rx="4"
               />
            )}
          </g>
          
          {/* Connector Arrow for Combination Phase */}
          <path 
             d="M300,105 L300,75" 
             stroke="#3b82f6" 
             strokeWidth="3" 
             markerEnd="url(#arrow)"
             style={{ 
               opacity: step === Step.Transform ? 1 : 0, 
               transition: 'opacity 0.5s' 
             }}
          />

        </svg>

        {/* Floating Labels */}
        <div className="absolute top-2 right-2 text-xs text-slate-400">
          Step: {step}/3
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4 mt-6">
        <button 
          onClick={prevStep} 
          disabled={step === Step.Separate}
          className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 disabled:opacity-50 font-medium transition"
        >
          上一步
        </button>
        <div className="flex-1 text-center py-2 px-4 font-semibold text-slate-700">
          {step === Step.Separate && "两个独立的简单句"}
          {step === Step.Highlight && "找到相同的成分（先行词）"}
          {step === Step.Transform && `将从句中的 "${noun}" 替换为关系词 "${example.relativeWord}"`}
          {step === Step.Combine && "将从句移动到主句先行词之后"}
        </div>
        <button 
          onClick={nextStep} 
          disabled={step === Step.Combine}
          className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-blue-600 disabled:opacity-50 font-medium transition shadow-sm"
        >
          下一步
        </button>
      </div>
    </div>
  );
};

export default Visualizer;