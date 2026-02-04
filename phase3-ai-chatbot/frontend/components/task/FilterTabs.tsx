/**
 * FilterTabs Component - T145
 * Task status filter navigation
 * Spec: User Story 6 - Filter tasks by status
 */

'use client';

import React, { KeyboardEvent } from 'react';

type FilterOption = 'all' | 'active' | 'completed';

interface FilterTabsProps {
  currentFilter: FilterOption;
  onFilterChange: (filter: FilterOption) => void;
}

export default function FilterTabs({
  currentFilter,
  onFilterChange,
}: FilterTabsProps) {
  const filters: FilterOption[] = ['all', 'active', 'completed'];

  // T148: Keyboard navigation support
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, filter: FilterOption) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onFilterChange(filter);
    }
  };

  return (
    <div className="border-b border-indigo-500/10 bg-card/60 backdrop-blur-md rounded-t-2xl shadow-xl" role="tablist" aria-label="Filter tasks">
      <div className="flex gap-2 p-2">
        {filters.map((filter) => (
          <button
            key={filter}
            role="tab"
            aria-selected={currentFilter === filter}
            aria-controls="task-list"
            // T149: 44px height for touch targets
            className={`min-h-[44px] px-6 py-2 text-sm font-semibold capitalize transition-all duration-300 ease-out relative rounded-xl ${currentFilter === filter
              ? 'text-white bg-indigo-600 border border-indigo-500 shadow-lg shadow-indigo-500/20'
              : 'text-gray-text hover:text-white border border-transparent hover:bg-white/5 hover:border-white/10'
              } focus:outline-none focus:ring-2 focus:ring-indigo-500/50 rounded-lg`}
            onClick={() => onFilterChange(filter)}
            onKeyDown={(e) => handleKeyDown(e, filter)}
            data-testid={`filter-${filter}`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}
