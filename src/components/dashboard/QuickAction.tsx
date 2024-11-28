'use client'

import type { QuickActionProps } from '@/lib/types'
import { icons } from 'lucide-react';
import { ArrowRight } from 'lucide-react'
import Link from 'next/link';

export default function QuickAction({ icon: iconName, title, description, url }: QuickActionProps) {
  const LucideIcon = icons[iconName];

  return (
    <Link
      href={url}
      className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 group w-full"
    >
      <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
        <LucideIcon className="w-6 h-6 text-blue-600" />
      </div>
      <div className="text-left flex-1">
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-500 text-sm mt-1">{description}</p>
      </div>
      <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors" />
    </Link>
  )
}