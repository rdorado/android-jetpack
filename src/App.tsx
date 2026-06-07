/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Smartphone, RefreshCw, Layers, ShieldCheck, HelpCircle, Code, Cpu } from 'lucide-react';
import PhoneEmulator from './components/PhoneEmulator';
import CodeViewer from './components/CodeViewer';
import ControlPanel from './components/ControlPanel';
import { AppConfig, CompileLog } from './types';

export default function App() {
  const [config, setConfig] = useState<AppConfig>({
    greetingText: 'Hello',
    targetName: 'Android',
    themeColor: 'indigo',
    fontSize: 28,
    alignment: 'center',
    isDark: false,
    cornerRadius: 24,
    showCode: true
  });

  const [isCompiling, setIsCompiling] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [logs, setLogs] = useState<CompileLog[]>([
    { timestamp: '20:50:00', level: 'info', message: 'Gradle Sync started...' },
    { timestamp: '20:50:01', level: 'info', message: 'Sync model loaded: com.example.helloworld (1.6.0)' },
    { timestamp: '20:50:01', level: 'success', message: 'Gradle sync finished in 1s' }
  ]);

  const runBuild = () => {
    setIsCompiling(true);
    const now = new Date();
    const timeStr = now.toLocaleTimeString();

    // Reset list and set compiling steps with timeouts
    const startLogs: CompileLog[] = [
      { timestamp: timeStr, level: 'info', message: '> Task :app:preBuild STALE' },
      { timestamp: timeStr, level: 'info', message: '> Task :app:compileDebugKotlin' }
    ];
    setLogs(startLogs);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        { timestamp: new Date().toLocaleTimeString(), level: 'info', message: '  Analyzing Composable Greeting signature...' },
        { timestamp: new Date().toLocaleTimeString(), level: 'info', message: `  Resolved inputs: text="${config.greetingText}", name="${config.targetName}"` }
      ]);
    }, 450);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        { timestamp: new Date().toLocaleTimeString(), level: 'info', message: '> Task :app:mergeDebugResources' },
        { timestamp: new Date().toLocaleTimeString(), level: 'info', message: '> Task :app:packageDebug' },
        { timestamp: new Date().toLocaleTimeString(), level: 'warn', message: '  No signing configuration specified. Generating unsigned APK.' }
      ]);
    }, 900);

    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        { timestamp: new Date().toLocaleTimeString(), level: 'success', message: `BUILD SUCCESSFUL in 1.4s` },
        { timestamp: new Date().toLocaleTimeString(), level: 'success', message: 'Successfully installed on emulator (Pixel 8 API 34)' }
      ]);
      setIsCompiling(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      {/* Visual background accents */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-indigo-50/50 to-transparent dark:from-slate-900/30 pointer-events-none" />

      {/* Primary header bar */}
      <header className="relative max-w-7xl mx-auto px-6 pt-6 pb-4 flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-200/50 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg p-1.5 flex items-center justify-center shadow-md shadow-emerald-500/10">
              <Cpu className="w-5 h-5" />
            </span>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-display">
              Android Kotlin Studio
            </h1>
          </div>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
            Jetpack Compose Hello World Interactive Playground
          </p>
        </div>

        {/* Integration indicators */}
        <div className="flex items-center gap-4 mt-3 md:mt-0 text-xs font-medium">
          <div className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-100 dark:border-emerald-950/40">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Target SDK 34 (Android 14)</span>
          </div>
          <div className="flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-400 px-3 py-1.5 rounded-full border border-indigo-100 dark:border-indigo-950/40">
            <Layers className="w-3.5 h-3.5" />
            <span>Compose 1.6</span>
          </div>
        </div>
      </header>

      {/* Main Studio Area */}
      <main className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
        {/* LEFT COLUMN: Physical Device Emulator */}
        <section className="lg:col-span-5 flex flex-col items-center justify-center">
          <PhoneEmulator
            config={config}
            setConfig={setConfig}
            isCompiling={isCompiling}
            onRefresh={runBuild}
            isLocked={isLocked}
            setIsLocked={setIsLocked}
          />
        </section>

        {/* RIGHT COLUMN: Code View and Controls Studio Dashboard */}
        <section className="lg:col-span-7 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 xl:grid-cols-2">
            {/* Developer Config Panel */}
            <ControlPanel
              config={config}
              setConfig={setConfig}
              isCompiling={isCompiling}
              onRunBuild={runBuild}
              logs={logs}
            />

            {/* Jetpack Compose Kotlin Source file viewer */}
            <CodeViewer config={config} />
          </div>

          {/* Quick Help Desk */}
          <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl flex flex-col md:flex-row items-start gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl text-indigo-500">
              <HelpCircle className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-slate-800 dark:text-white mb-1">
                How does a Jetpack Compose "Hello World" app work?
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Unlike traditional XML-based layouts, modern Android uses declarative Kotlin APIs. The 
                <code className="mx-1 px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-indigo-500 font-mono font-medium">@Composable</code> 
                annotation tells the Compose compiler to turn the function's UI layout code into high-performance native layout canvases. The dynamic styling utilizes Material 3 design parameters directly in code.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Studio Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-8 border-t border-slate-200/50 dark:border-slate-800 flex justify-between items-center text-slate-400 dark:text-slate-600 font-mono text-[10px]">
        <span>Android Kotlin Hello World Template Creator</span>
        <span>Build with Google Studio AI • React + Motion</span>
      </footer>
    </div>
  );
}
