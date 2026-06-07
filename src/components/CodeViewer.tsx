/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Copy, Check, FileCode, Palette } from 'lucide-react';
import { AppConfig } from '../types';

interface CodeViewerProps {
  config: AppConfig;
}

export default function CodeViewer({ config }: CodeViewerProps) {
  const [activeTab, setActiveTab] = useState<'main' | 'theme'>('main');
  const [copied, setCopied] = useState(false);

  // Capitalize first letter helper
  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  const alignmentCodeMap = {
    start: 'Alignment.CenterStart',
    center: 'Alignment.Center',
    end: 'Alignment.CenterEnd'
  };

  const mainActivityCode = `package com.example.helloworld

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.helloworld.ui.theme.HelloWorldTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            HelloWorldTheme(darkTheme = ${config.isDark}) {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    Greeting(
                        text = "${config.greetingText}",
                        name = "${config.targetName || 'World'}"
                    )
                }
            }
        }
    }
}

@Composable
fun Greeting(text: String, name: String, modifier: Modifier = Modifier) {
    Box(
        modifier = modifier.fillMaxSize().padding(16.dp),
        contentAlignment = ${alignmentCodeMap[config.alignment]}
    ) {
        Text(
            text = "$text, $name!",
            fontSize = ${config.fontSize}.sp,
            color = MaterialTheme.colorScheme.primary,
            style = MaterialTheme.typography.titleLarge
        )
    }
}`;

  const themeCode = `package com.example.helloworld.ui.theme

import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.platform.LocalContext

private val ${capitalize(config.themeColor)}DarkColorScheme = darkColorScheme(
    primary = ${config.themeColor === 'blue' ? 'Blue80' : config.themeColor === 'coral' ? 'Coral80' : config.themeColor === 'emerald' ? 'Emerald80' : config.themeColor === 'amber' ? 'Amber80' : 'Indigo80'},
    secondary = ${config.themeColor === 'blue' ? 'BlueGrey80' : config.themeColor === 'coral' ? 'CoralGrey80' : config.themeColor === 'emerald' ? 'EmeraldGrey80' : config.themeColor === 'amber' ? 'AmberGrey80' : 'IndigoGrey80'},
    background = Color(0xFF1E1F22)
)

private val ${capitalize(config.themeColor)}LightColorScheme = lightColorScheme(
    primary = ${config.themeColor === 'blue' ? 'Blue40' : config.themeColor === 'coral' ? 'Coral40' : config.themeColor === 'emerald' ? 'Emerald40' : config.themeColor === 'amber' ? 'Amber40' : 'Indigo40'},
    secondary = ${config.themeColor === 'blue' ? 'BlueGrey40' : config.themeColor === 'coral' ? 'CoralGrey40' : config.themeColor === 'emerald' ? 'EmeraldGrey40' : config.themeColor === 'amber' ? 'AmberGrey40' : 'IndigoGrey40'},
    background = Color(0xFFF8F9FA)
)

@Composable
fun HelloWorldTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    dynamicColor: Boolean = true, // Material You dynamic palette
    content: @Composable () -> Unit
) {
    val colorScheme = when {
        dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S -> {
            val context = LocalContext.current
            if (darkTheme) dynamicDarkColorScheme(context) else dynamicLightColorScheme(context)
        }
        darkTheme -> ${capitalize(config.themeColor)}DarkColorScheme
        else -> ${capitalize(config.themeColor)}LightColorScheme
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography,
        content = content
    )
}`;

  const handleCopy = () => {
    const codeToCopy = activeTab === 'main' ? mainActivityCode : themeCode;
    navigator.clipboard.writeText(codeToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightCode = (code: string) => {
    // Basic structural custom regex-free high-precision tokenizer with tags
    return code.split('\n').map((line, index) => {
      // Inline highlights for key keywords
      const parts = line.split(/(\s+)/);
      const highlightedLine = parts.map((part, i) => {
        if (/^(package|import|class|fun|override|val|private|when|else|return|super)$/.test(part)) {
          return <span key={i} className="text-orange-500 font-semibold">{part}</span>;
        }
        if (/^(@Composable|@Override)$/.test(part)) {
          return <span key={i} className="text-violet-500 font-medium">{part}</span>;
        }
        if (/^(Boolean|String|Bundle|Modifier|Alignment|Box|Text|MaterialTheme|Surface|HelloWorldTheme|Color)$/.test(part)) {
          return <span key={i} className="text-sky-500 font-semibold">{part}</span>;
        }
        if (part.startsWith('"') && part.endsWith('"')) {
          return <span key={i} className="text-emerald-500">{part}</span>;
        }
        if (/^(true|false|[0-9]+)$/.test(part)) {
          return <span key={i} className="text-amber-500 font-medium">{part}</span>;
        }
        return part;
      });

      return (
        <div key={index} className="table-row">
          <span className="table-cell pr-4 text-right text-slate-500 select-none text-[10px] w-6 font-mono border-r border-slate-700/50">
            {index + 1}
          </span>
          <span className="table-cell pl-4 font-mono white-space-pre break-all">
            {highlightedLine}
          </span>
        </div>
      );
    });
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-lg flex flex-col h-[520px]">
      {/* Code Header and Tabs */}
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('main')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
              activeTab === 'main'
                ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
            id="tab-main-activity"
          >
            <FileCode className="w-3.5 h-3.5" />
            MainActivity.kt
          </button>
          <button
            onClick={() => setActiveTab('theme')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
              activeTab === 'theme'
                ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
            id="tab-theme-kt"
          >
            <Palette className="w-3.5 h-3.5" />
            Theme.kt
          </button>
        </div>

        <button
          onClick={handleCopy}
          className="p-1.5 rounded-lg text-slate-400 cursor-pointer hover:text-white hover:bg-slate-800 active:scale-90 transition-transform flex items-center gap-1 text-[11px]"
          title="Copy Kotlin Code"
          id="copy-code-button"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body Container */}
      <div className="flex-1 overflow-auto p-4 list-none no-scrollbar bg-slate-950 text-xs text-slate-300">
        <div className="table w-full select-text selection:bg-indigo-500/30">
          {highlightCode(activeTab === 'main' ? mainActivityCode : themeCode)}
        </div>
      </div>

      {/* Footer Meta indicator */}
      <div className="bg-slate-950 border-t border-slate-800/80 px-4 py-2 flex items-center justify-between text-[11px] text-slate-500 font-mono">
        <span>Language: Kotlin (Android)</span>
        <span>Framework: Jetpack Compose</span>
      </div>
    </div>
  );
}
