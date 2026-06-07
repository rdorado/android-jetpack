/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Sparkles, RefreshCw, Layers, AlignLeft, AlignCenter, AlignRight, FileCode2, Terminal, CheckCircle2 } from 'lucide-react';
import { AppConfig, CompileLog } from '../types';

interface ControlPanelProps {
  config: AppConfig;
  setConfig: React.Dispatch<React.SetStateAction<AppConfig>>;
  isCompiling: boolean;
  onRunBuild: () => void;
  logs: CompileLog[];
}

export default function ControlPanel({
  config,
  setConfig,
  isCompiling,
  onRunBuild,
  logs
}: ControlPanelProps) {
  const [activeTab, setActiveTab] = useState<'editor' | 'terminal'>('editor');

  const alignButtons = [
    { value: 'start', icon: AlignLeft, label: 'Start' },
    { value: 'center', icon: AlignCenter, label: 'Center' },
    { value: 'end', icon: AlignRight, label: 'End' }
  ] as const;

  const quickSamples = [
    { text: 'Hello', name: 'Kotlin' },
    { text: 'Jetpack', name: 'Compose' },
    { text: 'Welcome to', name: 'Android' },
    { text: 'Code once', name: 'Run anywhere' }
  ];

  return (
    <div className="flex flex-col h-[520px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-lg">
      {/* Dynamic Header */}
      <div className="bg-slate-50 dark:bg-slate-950 px-5 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-indigo-500" />
          <span className="font-semibold text-sm text-slate-800 dark:text-slate-100 font-display">
            Compose Designer Panel
          </span>
        </div>
        <div className="flex bg-slate-200 dark:bg-slate-800 p-0.5 rounded-lg text-[11px] font-semibold">
          <button
            onClick={() => setActiveTab('editor')}
            className={`px-3 py-1 rounded-md cursor-pointer transition-all ${
              activeTab === 'editor'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
            }`}
            id="panel-editor-tab"
          >
            Config
          </button>
          <button
            onClick={() => setActiveTab('terminal')}
            className={`px-3 py-1 rounded-md cursor-pointer relative transition-all ${
              activeTab === 'terminal'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
            }`}
            id="panel-terminal-tab"
          >
            Gradle Terminal
            {isCompiling && (
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-indigo-500 rounded-full animate-ping" />
            )}
          </button>
        </div>
      </div>

      {/* Main Contents Panel */}
      <div className="flex-1 overflow-y-auto p-5 no-scrollbar">
        <AnimatePresence mode="wait">
          {activeTab === 'editor' ? (
            <motion.div
              key="editor"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-5"
            >
              {/* String Customization */}
              <div className="space-y-3.5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono">
                  String Resources (strings.xml)
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 font-sans">
                      Greeting Text
                    </label>
                    <input
                      type="text"
                      value={config.greetingText}
                      onChange={(e) => setConfig(prev => ({ ...prev, greetingText: e.target.value }))}
                      placeholder="e.g. Hello"
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-white outline-none focus:ring-1.5 focus:ring-indigo-500 transition-shadow"
                      id="input-greeting-text"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 font-sans">
                      Target Name
                    </label>
                    <input
                      type="text"
                      value={config.targetName}
                      onChange={(e) => setConfig(prev => ({ ...prev, targetName: e.target.value }))}
                      placeholder="e.g. World"
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-white outline-none focus:ring-1.5 focus:ring-indigo-500 transition-shadow"
                      id="input-target-name"
                    />
                  </div>
                </div>

                {/* Quick Presets */}
                <div className="pt-1.5">
                  <div className="flex flex-wrap gap-1.5">
                    {quickSamples.map((sample, idx) => (
                      <button
                        key={idx}
                        onClick={() => setConfig(prev => ({
                          ...prev,
                          greetingText: sample.text,
                          targetName: sample.name
                        }))}
                        className="px-2.5 py-1 text-[10px] bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg transition-colors cursor-pointer"
                        id={`preset-btn-${idx}`}
                      >
                        "{sample.text}, {sample.name}!"
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Box Modifier Layout */}
              <div className="space-y-2.5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono">
                  Parent Box Modifier Alignment
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {alignButtons.map(({ value, icon: Icon, label }) => (
                    <button
                      key={value}
                      onClick={() => setConfig(prev => ({ ...prev, alignment: value }))}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl border cursor-pointer transition-all ${
                        config.alignment === value
                          ? 'bg-indigo-500/5 dark:bg-indigo-500/10 border-indigo-500 text-indigo-500 font-semibold'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50'
                      }`}
                      id={`align-btn-${value}`}
                    >
                      <Icon className="w-4 h-4 mb-1" />
                      <span className="text-[10px]">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Corner Radius & Screen mode */}
              <div className="space-y-2.5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-mono">
                  MainActivity Presentation
                </h3>
                <div className="grid grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl border border-slate-200/50 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-600 dark:text-slate-400">Light / Dark</span>
                    <button
                      onClick={() => setConfig(prev => ({ ...prev, isDark: !prev.isDark }))}
                      className="px-3 py-1 bg-slate-200 dark:bg-slate-800 rounded-xl text-[10px] font-semibold text-slate-700 dark:text-slate-300 cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-700 change-theme-btn"
                      id="theme-toggle-panel"
                    >
                      {config.isDark ? '🌙 Dark' : '☀️ Light'}
                    </button>
                  </div>
                  <div className="flex items-center justify-between pl-3 border-l border-slate-200 dark:border-slate-800">
                    <span className="text-xs text-slate-600 dark:text-slate-400">Hot Reload</span>
                    <button
                      onClick={onRunBuild}
                      disabled={isCompiling}
                      className="px-3 py-1 bg-indigo-600 disabled:opacity-50 text-white rounded-xl text-[10px] font-semibold cursor-pointer hover:bg-indigo-700 transition"
                      id="hot-reload-btn"
                    >
                      {isCompiling ? 'Running...' : 'COMPILE'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* INTERACTIVE TERMINAL GRADLE DEB BUILD LOG VIEWER */
            <motion.div
              key="terminal"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="font-mono text-[11px] leading-relaxed select-text space-y-1.5 h-full pb-4"
              id="terminal-container"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 text-[10px] text-slate-400">
                <span>Task Gradle Logger :app</span>
                <span className="text-indigo-400">active</span>
              </div>
              <div className="space-y-1 overflow-y-auto max-h-[300px] no-scrollbar">
                {logs.map((log, idx) => (
                  <div key={idx} className="flex items-start gap-1.5">
                    <span className="text-slate-500 text-[9px] translate-y-0.5 select-none">{log.timestamp}</span>
                    <span
                      className={
                        log.level === 'success'
                          ? 'text-emerald-500 font-semibold'
                          : log.level === 'warn'
                          ? 'text-amber-500'
                          : log.level === 'error'
                          ? 'text-rose-500 font-bold animate-pulse'
                          : 'text-slate-400 dark:text-slate-400'
                      }
                    >
                      {log.message}
                    </span>
                  </div>
                ))}
              </div>
              {isCompiling && (
                <div className="flex items-center gap-2 pt-2 text-indigo-400 italic">
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  <span>compiling dex resources...</span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main ACTION compilation bar */}
      <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={() => {
            setActiveTab('terminal');
            onRunBuild();
          }}
          disabled={isCompiling}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-semibold text-xs flex items-center justify-center gap-2 shadow-lg hover:shadow-indigo-500/20 active:scale-98 transition disabled:opacity-50 cursor-pointer"
          id="compile-run-button"
        >
          {isCompiling ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Running Gradle Sync...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current text-white" />
              <span>Run ':app:MainActivity'</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
