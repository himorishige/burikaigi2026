"use client";

import { Timer, Zap, Clock } from "lucide-react";

type Props = {
  value: number;
  onChange: (value: number) => void;
};

const presets = [
  { value: 0, label: "0秒", description: "即時", icon: Zap },
  { value: 2000, label: "2秒", description: "短め" },
  { value: 5000, label: "5秒", description: "標準", icon: Timer },
  { value: 10000, label: "10秒", description: "長め" },
  { value: 15000, label: "15秒", description: "婚活サイト想定", icon: Clock },
  { value: 30000, label: "30秒", description: "旅行サイト想定" },
];

export function DelaySlider({ value, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <Timer className="w-4 h-4" />
          意図的な遅延時間
        </label>
        <span className="text-lg font-bold text-triton-blue">
          {(value / 1000).toFixed(1)}秒
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={30000}
        step={500}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-triton-blue"
      />

      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => {
          const Icon = preset.icon;
          return (
            <button
              key={preset.value}
              onClick={() => onChange(preset.value)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-colors ${
                value === preset.value
                  ? "bg-triton-blue text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {Icon && <Icon className="w-3.5 h-3.5" />}
              {preset.label}
              <span className="text-xs opacity-70">({preset.description})</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
