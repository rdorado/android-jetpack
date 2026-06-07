/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ThemeColor = 'blue' | 'coral' | 'emerald' | 'indigo' | 'amber';

export interface AppConfig {
  greetingText: string;
  targetName: string;
  themeColor: ThemeColor;
  fontSize: number;
  alignment: 'start' | 'center' | 'end';
  isDark: boolean;
  cornerRadius: number;
  showCode: boolean;
}

export interface CompileLog {
  timestamp: string;
  level: 'info' | 'success' | 'warn' | 'error';
  message: string;
}
