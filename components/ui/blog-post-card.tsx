'use client';

import React from 'react';

interface ArticleCardProps {
  headline: string;
  excerpt: string;
  cover: string;
  tag?: string;
  readingTimeSeconds?: number;
  writer?: string;
  publishedLabel?: string;
  clampLines?: number;
  isDarkMode?: boolean;
}

const formatReadTime = (seconds?: number) => {
  if (!seconds || seconds < 60) return 'Less than 1 min read';
  const minutes = Math.ceil(seconds / 60);
  return `${minutes} min read`;
};

export const ArticleCard: React.FC<ArticleCardProps> = ({
  headline,
  excerpt,
  cover,
  tag,
  readingTimeSeconds,
  writer,
  publishedLabel,
  clampLines = 2,
  isDarkMode = false,
}) => {
  const hasMeta = tag || readingTimeSeconds;
  const hasFooter = writer || publishedLabel;

  return (
    <article
      className={[
        'flex w-full flex-col gap-3 overflow-hidden rounded-[2rem] border shadow-xl transition-colors',
        isDarkMode
          ? 'bg-white text-navy-950 border-white/10'
          : 'bg-slate-950 text-slate-50 border-slate-900',
      ].join(' ')}
    >
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src={cover}
          alt={headline}
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col px-6 pt-5 pb-4">
        {hasMeta && (
          <div
            className={[
              'mb-4 flex flex-wrap items-center gap-2 text-xs font-medium',
              isDarkMode ? 'text-slate-500' : 'text-slate-300',
            ].join(' ')}
          >
            {tag && (
              <span
                className={[
                  'inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]',
                  isDarkMode
                    ? 'border-slate-200 bg-slate-50 text-slate-700'
                    : 'border-slate-700 bg-slate-900 text-slate-100',
                ].join(' ')}
              >
                {tag}
              </span>
            )}
            {tag && readingTimeSeconds && <span className="mx-1 text-slate-300 dark:text-navy-600">•</span>}
            {readingTimeSeconds && <span>{formatReadTime(readingTimeSeconds)}</span>}
          </div>
        )}

        <h2 className="mb-3 text-2xl font-bold leading-tight">
          {headline}
        </h2>

        <p
          className={[
            'text-sm leading-relaxed overflow-hidden text-ellipsis [-webkit-box-orient:vertical] [display:-webkit-box]',
            isDarkMode ? 'text-slate-700' : 'text-slate-200',
          ].join(' ')}
          style={{ WebkitLineClamp: clampLines }}
        >
          {excerpt}
        </p>
      </div>

      {hasFooter && (
        <div
          className={[
            'flex items-center justify-between px-6 pb-5 text-xs font-medium',
            isDarkMode ? 'text-slate-500' : 'text-slate-300',
          ].join(' ')}
        >
          {writer && (
            <div>
              <p className="uppercase tracking-[0.2em] mb-0.5">Author</p>
              <p className="text-sm font-semibold">
                {writer}
              </p>
            </div>
          )}
          {publishedLabel && (
            <div className={writer ? 'text-right' : ''}>
              <p className="uppercase tracking-[0.2em] mb-0.5">Published</p>
              <p className="text-sm font-semibold">
                {publishedLabel}
              </p>
            </div>
          )}
        </div>
      )}
    </article>
  );
};

