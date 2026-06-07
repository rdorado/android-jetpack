/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wifi, Battery, Signal, Sun, Moon, Sparkles, RefreshCw, Smartphone, Play, Power } from 'lucide-react';
import { AppConfig, ThemeColor } from '../types';

interface PhoneEmulatorProps {
  config: AppConfig;
  setConfig: React.Dispatch<React.SetStateAction<AppConfig>>;
  isCompiling: boolean;
  onRefresh: () => void;
  isLocked: boolean;
  setIsLocked: (locked: boolean) => void;
}

export default function PhoneEmulator({
  config,
  setConfig,
  isCompiling,
  onRefresh,
  isLocked,
  setIsLocked
}: PhoneEmulatorProps) {
  const [time, setTime] = useState('12:00');
  const [batteryLevel, setBatteryLevel] = useState(87);

  // Dynamic system clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      setTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Material You Palette mapping (Primary, OnPrimary, Container, OnContainer, Background)
  const palettes: Record<ThemeColor, {
    primary: string;
    onPrimary: string;
    container: string;
    isDark: {
      primary: string;
      onPrimary: string;
      container: string;
      text: string;
      bg: string;
    };
    isLight: {
      primary: string;
      onPrimary: string;
      container: string;
      text: string;
      bg: string;
    };
  }> = {
    indigo: {
      primary: '#3f51b5',
      onPrimary: '#ffffff',
      container: '#e8eaf6',
      isDark: {
        primary: '#a2b4fc',
        onPrimary: '#021e5c',
        container: '#2a3b80',
        text: '#e8eaf6',
        bg: '#12131a',
      },
      isLight: {
        primary: '#3f51b5',
        onPrimary: '#ffffff',
        container: '#deefff',
        text: '#1a1b2e',
        bg: '#fafaff',
      }
    },
    blue: {
      primary: '#005faf',
      onPrimary: '#ffffff',
      container: '#d4e3ff',
      isDark: {
        primary: '#a4c9ff',
        onPrimary: '#00315f',
        container: '#004786',
        text: '#e3f0ff',
        bg: '#0f131a',
      },
      isLight: {
        primary: '#005faf',
        onPrimary: '#ffffff',
        container: '#d4e3ff',
        text: '#001c3b',
        bg: '#f8fafc',
      }
    },
    coral: {
      primary: '#b02f23',
      onPrimary: '#ffffff',
      container: '#ffdad5',
      isDark: {
        primary: '#ffb4aa',
        onPrimary: '#690003',
        container: '#8c160e',
        text: '#ffdad5',
        bg: '#140c0b',
      },
      isLight: {
        primary: '#b02f23',
        onPrimary: '#ffffff',
        container: '#ffdad5',
        text: '#410001',
        bg: '#fffbfc',
      }
    },
    emerald: {
      primary: '#006c4b',
      onPrimary: '#ffffff',
      container: '#96f7c6',
      isDark: {
        primary: '#79daab',
        onPrimary: '#003824',
        container: '#005137',
        text: '#e6fff0',
        bg: '#0b1410',
      },
      isLight: {
        primary: '#006c4b',
        onPrimary: '#ffffff',
        container: '#96f7c6',
        text: '#002114',
        bg: '#fbfdf9',
      }
    },
    amber: {
      primary: '#765b00',
      onPrimary: '#ffffff',
      container: '#ffdf90',
      isDark: {
        primary: '#fabc09',
        onPrimary: '#3e2e00',
        container: '#594300',
        text: '#ffe086',
        bg: '#131109',
      },
      isLight: {
        primary: '#765b00',
        onPrimary: '#ffffff',
        container: '#ffdf90',
        text: '#251a00',
        bg: '#fffdf9',
      }
    }
  };

  const activePalette = config.isDark ? palettes[config.themeColor].isDark : palettes[config.themeColor].isLight;

  return (
    <div className="relative flex flex-col items-center justify-center p-4">
      {/* Device Physical Buttons Wrapper */}
      <div className="relative w-[340px] sm:w-[360px] h-[700px]">
        {/* Physical Power Button */}
        <button
          onClick={() => setIsLocked(!isLocked)}
          className="absolute right-[-4px] top-32 w-[4px] h-[55px] bg-slate-700 dark:bg-slate-500 rounded-r-md cursor-pointer hover:bg-sky-500 transition-colors z-40 active:scale-95"
          title="Tilt power button to Lock/Unlock Screen"
          id="power-button"
        />

        {/* Physical Volume Buttons */}
        <button
          onClick={() => setConfig(prev => ({ ...prev, fontSize: Math.min(48, prev.fontSize + 2) }))}
          className="absolute left-[-4px] top-28 w-[4px] h-[35px] bg-slate-700 dark:bg-slate-500 rounded-l-md cursor-pointer z-40"
          title="Volume Up (Increase Font Size)"
          id="vol-up-button"
        />
        <button
          onClick={() => setConfig(prev => ({ ...prev, fontSize: Math.max(12, prev.fontSize - 2) }))}
          className="absolute left-[-4px] top-40 w-[4px] h-[35px] bg-slate-700 dark:bg-slate-500 rounded-l-md cursor-pointer z-40"
          title="Volume Down (Decrease Font Size)"
          id="vol-down-button"
        />

        {/* Smartphone Bezel */}
        <div className="w-full h-full bg-slate-900 border-[10px] border-slate-950 rounded-[44px] shadow-2xl relative overflow-hidden flex flex-col ring-8 ring-slate-800/10 dark:ring-slate-400/5">
          {/* Internal Screen Area */}
          <div className="w-full h-full relative flex flex-col overflow-hidden select-none">
            {/* Camera Punchhole & Ear Speaker (Dynamic Island Style) */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-6 bg-slate-950 rounded-full z-50 flex items-center justify-between px-3">
              <span className="w-2.5 h-2.5 bg-slate-800/60 rounded-full border border-slate-900" />
              <span className="w-12 h-1 bg-slate-900 rounded-full" />
              <span className="w-2.5 h-2.5 bg-[#0a0f1d] rounded-full border border-slate-900 flex items-center justify-center">
                <span className="w-1 h-1 bg-blue-500/80 rounded-full" />
              </span>
            </div>

            {/* Android Status Bar */}
            <div className={`w-full h-10 px-6 pt-3 flex justify-between items-center text-xs font-medium z-40 select-none ${config.isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <div className="flex items-center gap-1">
                <span>{time}</span>
              </div>
              <div className="flex items-center gap-1.5 pt-0.5">
                <Signal className="w-3.5 h-3.5 stroke-[2]" />
                <Wifi className="w-3.5 h-3.5 stroke-[2]" />
                <div className="flex items-center gap-0.5">
                  <Battery className="w-4 h-4 stroke-[1.8]" />
                  <span className="text-[10px] leading-none">{batteryLevel}%</span>
                </div>
              </div>
            </div>

            {/* SCREEN CONTENT AREA */}
            <div className="flex-1 w-full relative overflow-hidden transition-colors duration-500" style={{ backgroundColor: activePalette.bg }}>
              <AnimatePresence mode="wait">
                {isLocked ? (
                  /* LOCK SCREEN VIEW */
                  <motion.div
                    key="lockscreen"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    onClick={() => setIsLocked(false)}
                    className="absolute inset-0 z-30 flex flex-col justify-between p-6 cursor-pointer"
                    style={{
                      background: config.isDark
                        ? 'linear-gradient(135deg, #1e1b4b 0%, #0c0a09 100%)'
                        : 'linear-gradient(135deg, #e0e7ff 0%, #fafaf9 100%)'
                    }}
                  >
                    {/* Top lock indicator */}
                    <div className="w-full flex justify-center mt-6">
                      <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className={`text-sm tracking-wide flex flex-col items-center gap-1 ${config.isDark ? 'text-slate-400' : 'text-slate-600'}`}
                        id="lock-indicator"
                      >
                        <span className="text-xl">🔒</span>
                        <span className="text-[10px] uppercase font-semibold">Tap anywhere to unlock</span>
                      </motion.div>
                    </div>

                    {/* Massive Android Time Label */}
                    <div className="flex flex-col items-center mt-12 gap-1">
                      <h1 className="text-7xl font-light tracking-tight text-center font-display" style={{ color: activePalette.primary }}>
                        {time}
                      </h1>
                      <p className={`text-sm ${config.isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
                      </p>
                    </div>

                    {/* Bottom notifications holder */}
                    <div className="flex flex-col gap-2.5 mb-14">
                      {/* Kotlin Developer Notification */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-3 rounded-2xl flex items-center justify-between shadow-sm border border-slate-200/10 ${config.isDark ? 'bg-slate-800/80 text-white' : 'bg-white/80 text-slate-800'}`}
                        id="lock-notification"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-violet-500/10 text-violet-500">
                            <Sparkles className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold">Jetpack Compose Developer</p>
                            <p className="text-[11px] opacity-75">Greeting app initialized successfully.</p>
                          </div>
                        </div>
                        <span className="text-[10px] opacity-50">Just now</span>
                      </motion.div>
                    </div>
                  </motion.div>
                ) : (
                  /* RUNNING ANDROID HELLO WORLD VIEW */
                  <motion.div
                    key="app-screen"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col h-full"
                  >
                    {/* Compose TopappBar */}
                    <div
                      className="h-14 px-4 flex items-center justify-between shadow-sm transition-colors duration-500"
                      style={{
                        backgroundColor: activePalette.container,
                        color: config.isDark ? activePalette.text : activePalette.primary
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-5 h-5 opacity-90 stroke-[2.5]" />
                        <span className="font-semibold text-sm tracking-wide font-display">Hello World App</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setConfig(prev => ({ ...prev, isDark: !prev.isDark }))}
                          className="p-2 rounded-full cursor-pointer hover:bg-black/5 active:scale-90 transition-transform"
                          title="Toggle App Theme"
                          id="theme-toggler"
                        >
                          {config.isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Compile Overlay Flash */}
                    {isCompiling && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.4, 0] }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0 bg-white z-20 pointer-events-none"
                      />
                    )}

                    {/* Application Scaffold Body */}
                    <div className="flex-1 flex flex-col justify-between p-6 relative">
                      {/* Background Visual Spec Grid */}
                      <div className="absolute inset-0 pointer-events-none opacity-[0.03] grid grid-cols-12 gap-2 p-2">
                        {Array.from({ length: 48 }).map((_, i) => (
                          <div key={i} className="border border-emerald-500 rounded-sm" />
                        ))}
                      </div>

                      {/* Header context info */}
                      <div className="flex items-start justify-between">
                        <span className="text-[10px] uppercase font-semibold tracking-wider font-mono opacity-40" style={{ color: activePalette.primary }}>
                          MainActivity
                        </span>
                        <div className="flex items-center gap-1 opacity-50">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-[9px] font-mono">COMPOSE_1.6</span>
                        </div>
                      </div>

                      {/* CENTER GREETING MESSAGE */}
                      <div className="flex-1 flex flex-col justify-center py-6">
                        <motion.div
                          layout
                          className="w-full flex flex-col transition-all"
                          style={{
                            alignItems: config.alignment === 'start' ? 'flex-start' : config.alignment === 'end' ? 'flex-end' : 'center',
                            textAlign: config.alignment
                          }}
                        >
                          <motion.div
                            key={`${config.greetingText}-${config.targetName}`}
                            initial={{ scale: 0.9, opacity: 0, y: 15 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            transition={{ type: 'spring', damping: 20 }}
                            className="max-w-full p-4 rounded-3xl transition-colors duration-500"
                            style={{
                              backgroundColor: `rgba(${config.isDark ? '255,255,255' : '0,0,0'}, 0.03)`
                            }}
                          >
                            <h2
                              className="font-bold tracking-tight font-display text-balance leading-normal break-words"
                              style={{
                                fontSize: `${config.fontSize}px`,
                                color: activePalette.primary,
                              }}
                              id="greeting-text"
                            >
                              {config.greetingText}, {config.targetName || 'World'}!
                            </h2>
                            <p
                              className="text-[10px] tracking-wider mt-1.5 font-mono select-none"
                              style={{ color: activePalette.primary, opacity: 0.6 }}
                            >
                              modifier.padding(16.dp)
                            </p>
                          </motion.div>
                        </motion.div>
                      </div>

                      {/* Jetpack Compose Material You Bottom Controller inside app (interactive representation of preview variables) */}
                      <div className="mt-auto space-y-4">
                        {/* Interactive dynamic slider directly on the phone */}
                        <div
                          className="p-3.5 rounded-2xl transition-all duration-300"
                          style={{
                            backgroundColor: `${activePalette.container}40`,
                            border: `1px solid ${activePalette.container}bb`
                          }}
                        >
                          <label className={`text-[10px] font-semibold flex items-center justify-between mb-1.5 ${config.isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            <span>Preview Modifier FontSize</span>
                            <span className="font-mono">{config.fontSize}sp</span>
                          </label>
                          <input
                            type="range"
                            min="14"
                            max="44"
                            value={config.fontSize}
                            onChange={(e) => setConfig(prev => ({ ...prev, fontSize: Number(e.target.value) }))}
                            className="w-full accent-indigo-500 h-1 bg-slate-300 dark:bg-slate-700 rounded-full appearance-none cursor-pointer"
                            style={{ accentColor: activePalette.primary }}
                            id="preview-font-range"
                          />
                        </div>

                        {/* Theme picker on the phone bottom */}
                        <div className="flex gap-2 justify-center py-1">
                          {(['indigo', 'blue', 'coral', 'emerald', 'amber'] as ThemeColor[]).map((clr) => (
                            <button
                              key={clr}
                              onClick={() => setConfig(prev => ({ ...prev, themeColor: clr }))}
                              className={`w-7 h-7 rounded-full border-2 cursor-pointer relative flex items-center justify-center transition-all ${
                                config.themeColor === clr ? 'scale-110 shadow-sm' : 'opacity-70 scale-90'
                              }`}
                              style={{
                                backgroundColor: clr === 'indigo' ? '#3f51b5' : clr === 'blue' ? '#005faf' : clr === 'coral' ? '#b02f23' : clr === 'emerald' ? '#006c4b' : '#765b00',
                                borderColor: config.themeColor === clr ? (config.isDark ? '#fafafa' : '#1e1b4b') : 'transparent'
                              }}
                              title={`Switch to ${clr} Theme Color`}
                              id={`theme-${clr}`}
                            >
                              {config.themeColor === clr && (
                                <motion.div layoutId="active-dot" className="w-1.5 h-1.5 bg-white rounded-full" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Android 3-Button or Gestural Pill Navigation Bar */}
                      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-[4px] bg-slate-600/60 rounded-full z-40" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Screen Interactive Overlay Help */}
      <div className="mt-4 text-center">
        <p className="text-xs text-slate-500 flex items-center justify-center gap-1.5 font-sans">
          <span>💡</span> Click <span className="font-semibold text-slate-700 dark:text-slate-300">Power Button</span> to Lock Screen • Use <span className="font-semibold text-slate-700 dark:text-slate-300">Volume Keys</span> to resize text
        </p>
      </div>
    </div>
  );
}
