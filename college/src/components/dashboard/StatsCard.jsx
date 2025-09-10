import React from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

export default function StatsCard({ title, value, icon: Icon, bgColor, trend }) {
  return (
    <Card className="relative overflow-hidden shadow-lg border-0 bg-white hover:shadow-xl transition-all duration-300">
      <div className={`absolute top-0 right-0 w-24 h-24 transform translate-x-6 -translate-y-6 ${bgColor} rounded-full opacity-10`} />
      <CardHeader className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
            <div className="text-3xl font-bold text-slate-800">
              {value}
            </div>
          </div>
          <div className={`p-3 rounded-xl ${bgColor} bg-opacity-20`}>
            <Icon className={`w-6 h-6 ${bgColor.replace('bg-', 'text-')}`} />
          </div>
        </div>
        {trend && (
          <div className="flex items-center mt-3 text-sm">
            <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
            <span className="text-slate-600 font-medium">{trend}</span>
          </div>
        )}
      </CardHeader>
    </Card>
  );
}