"use client";

import * as React from "react";

const ViewTransition = (React as unknown as { ViewTransition?: React.JSX.ElementType }).ViewTransition;

/**
 * Wraps page content in React's <ViewTransition> for navigation animations.
 * Uses the "main-fade" class for ::view-transition-old(.main-fade) / ::view-transition-new(.main-fade) in globals.css.
 *
 * <ViewTransition> is in React Canary. With react@19.2 stable this falls back to a fragment.
 * To enable: npm install react@canary react-dom@canary
 */
export function ViewTransitionMain({ children }: { children: React.ReactNode }) {
  if (ViewTransition) {
    return <ViewTransition default="main-fade">{children}</ViewTransition>;
  }
  return <>{children}</>;
}
