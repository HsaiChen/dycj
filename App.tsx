import React, { useState } from 'react';
import Visualizer from './components/Visualizer';
import ChatInterface from './components/ChatInterface';
import { EXAMPLES, RULES } from './constants';
import { Example } from './types';

const App: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState<Example>(EXAMPLES[0]);
  const [activeTab, setActiveTab] = useState<'learn' | 'practice'>('learn');

  return (
    <div className="flex h-screen w-full bg-slate-100">
      {/* Sidebar - Navigation & Examples */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-slate-100">
          <h1 className="text-2xl font-bold text-primary">语法可视化</h1>
          <p className="text-xs text-slate-500 mt-1">定语从句专题</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">精选例句</h3>
          <div className="space-y-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex.id}
                onClick={() => setSelectedExample(ex)}
                className={`w-full text-left p-3 rounded-lg text-sm transition-all duration-200 ${
                  selectedExample.id === ex.id 
                    ? 'bg-blue-50 text-primary border-l-4 border-primary shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-50 border-l-4 border-transparent'
                }`}
              >
                <div className="font-medium truncate">{ex.combined}</div>
                <div className="text-xs text-slate-400 mt-1">
                  Type: <span className="capitalize">{ex.type}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50">
          <p className="text-xs text-slate-500 leading-relaxed">
            选择一个例句，在右侧观看它是如何通过两个简单句合并而成的。
          </p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Mobile Header */}
        <header className="md:hidden bg-white p-4 border-b border-slate-200 flex justify-between items-center">
          <h1 className="font-bold text-primary">定语从句 Visualizer</h1>
          <select 
            className="text-sm border border-slate-300 rounded p-1"
            onChange={(e) => {
              const ex = EXAMPLES.find(x => x.id === e.target.value);
              if (ex) setSelectedExample(ex);
            }}
            value={selectedExample.id}
          >
            {EXAMPLES.map(ex => <option key={ex.id} value={ex.id}>{ex.type}</option>)}
          </select>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8">
          
          {/* Visualization Section */}
          <section className="mb-12">
            <Visualizer example={selectedExample} />
          </section>

          {/* Explanation Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-2 h-6 bg-secondary rounded-full"></span>
                知识点讲解
              </h2>
              <div className="space-y-6">
                {RULES.map((rule, idx) => (
                  <div key={idx} className="border-b border-slate-100 last:border-0 pb-4 last:pb-0">
                    <h4 className="font-semibold text-slate-700 mb-2">{rule.title}</h4>
                    <p className="text-slate-600 text-sm mb-3 leading-relaxed">{rule.content}</p>
                    <div className="bg-slate-50 p-3 rounded border border-slate-100">
                      <ul className="list-disc list-inside text-xs text-slate-500 space-y-1">
                        {rule.examples.map((e, i) => <li key={i}>{e}</li>)}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Example Detail */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
               <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-2 h-6 bg-accent rounded-full"></span>
                当前例句解析
              </h2>
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase">Combined Sentence</span>
                  <p className="text-lg font-medium text-slate-800 mt-1">{selectedExample.combined}</p>
                  <p className="text-sm text-slate-500 mt-1">{selectedExample.translation}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-blue-50 p-3 rounded-lg">
                      <span className="text-xs font-bold text-blue-500 uppercase">Antecedent (先行词)</span>
                      <p className="font-semibold text-blue-700">{selectedExample.antecedent}</p>
                   </div>
                   <div className="bg-pink-50 p-3 rounded-lg">
                      <span className="text-xs font-bold text-pink-500 uppercase">Relative Word (关系词)</span>
                      <p className="font-semibold text-pink-700">{selectedExample.relativeWord}</p>
                   </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 text-sm text-yellow-800">
                  <p className="font-semibold mb-1">💡 助教提示：</p>
                  <p>
                    {selectedExample.type === 'human' && "因为先行词是指人，所以我们通常使用 who (作主语) 或 whom (作宾语)。"}
                    {selectedExample.type === 'thing' && "先行词是指物，所以使用 which。当然，在限制性定语从句中，that 经常可以代替 who 或 which。"}
                    {selectedExample.type === 'place' && "这里先行词表示地点，且在从句中作状语（in the village），所以使用关系副词 where。"}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Floating Chat Interface (Fixed Right Side on Desktop, Drawer on Mobile) */}
      <div className="fixed bottom-0 right-0 w-full md:w-96 md:h-2/3 h-1/2 md:mr-6 md:mb-6 shadow-2xl z-50">
         <ChatInterface />
      </div>
    </div>
  );
};

export default App;