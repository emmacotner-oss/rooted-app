'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ReadingProgress {
  articleId: string;
  timestamp: number;
  scrollPosition: number;
}

interface AppContextType {
  // Dark Mode
  darkMode: boolean;
  toggleDarkMode: () => void;
  
  // Bookmarks
  bookmarks: string[];
  addBookmark: (articleId: string) => void;
  removeBookmark: (articleId: string) => void;
  isBookmarked: (articleId: string) => boolean;
  
  // Reading Progress
  readingHistory: ReadingProgress[];
  addToHistory: (articleId: string, scrollPosition?: number) => void;
  getScrollPosition: (articleId: string) => number;
  
  // Article Stats
  incrementViewCount: (articleId: string) => void;
  getViewCount: (articleId: string) => number;
  
  // Toast Notifications
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [readingHistory, setReadingHistory] = useState<ReadingProgress[]>([]);
  const [viewCounts, setViewCounts] = useState<Record<string, number>>({});
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('success');
  const [showToastState, setShowToastState] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('rooted-dark-mode');
    const savedBookmarks = localStorage.getItem('rooted-bookmarks');
    const savedHistory = localStorage.getItem('rooted-reading-history');
    const savedViews = localStorage.getItem('rooted-view-counts');

    if (savedDarkMode) setDarkMode(JSON.parse(savedDarkMode));
    if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
    if (savedHistory) setReadingHistory(JSON.parse(savedHistory));
    if (savedViews) setViewCounts(JSON.parse(savedViews));
  }, []);

  // Apply dark mode class to html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('rooted-dark-mode', JSON.stringify(newMode));
    showToast(`${newMode ? 'Dark' : 'Light'} mode enabled`, 'success');
  };

  const addBookmark = (articleId: string) => {
    const newBookmarks = [...bookmarks, articleId];
    setBookmarks(newBookmarks);
    localStorage.setItem('rooted-bookmarks', JSON.stringify(newBookmarks));
    showToast('Article saved to bookmarks', 'success');
  };

  const removeBookmark = (articleId: string) => {
    const newBookmarks = bookmarks.filter(id => id !== articleId);
    setBookmarks(newBookmarks);
    localStorage.setItem('rooted-bookmarks', JSON.stringify(newBookmarks));
    showToast('Removed from bookmarks', 'info');
  };

  const isBookmarked = (articleId: string) => {
    return bookmarks.includes(articleId);
  };

  const addToHistory = (articleId: string, scrollPosition: number = 0) => {
    const newHistory = readingHistory.filter(item => item.articleId !== articleId);
    newHistory.unshift({ articleId, timestamp: Date.now(), scrollPosition });
    
    // Keep only last 50 items
    const trimmedHistory = newHistory.slice(0, 50);
    setReadingHistory(trimmedHistory);
    localStorage.setItem('rooted-reading-history', JSON.stringify(trimmedHistory));
  };

  const getScrollPosition = (articleId: string): number => {
    const item = readingHistory.find(h => h.articleId === articleId);
    return item?.scrollPosition || 0;
  };

  const incrementViewCount = (articleId: string) => {
    const newCounts = { ...viewCounts };
    newCounts[articleId] = (newCounts[articleId] || 0) + 1;
    setViewCounts(newCounts);
    localStorage.setItem('rooted-view-counts', JSON.stringify(newCounts));
  };

  const getViewCount = (articleId: string): number => {
    return viewCounts[articleId] || 0;
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToastState(true);
    setTimeout(() => setShowToastState(false), 3000);
  };

  return (
    <AppContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        bookmarks,
        addBookmark,
        removeBookmark,
        isBookmarked,
        readingHistory,
        addToHistory,
        getScrollPosition,
        incrementViewCount,
        getViewCount,
        showToast,
      }}
    >
      {children}
      
      {/* Toast Notification */}
      {showToastState && (
        <div className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-lg shadow-2xl transform transition-all duration-300 ${
          showToastState ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        } ${
          toastType === 'success' ? 'bg-green-500 text-white' :
          toastType === 'error' ? 'bg-red-500 text-white' :
          'bg-blue-500 text-white'
        }`}>
          <div className="flex items-center gap-3">
            <span className="text-xl">
              {toastType === 'success' ? '✓' : toastType === 'error' ? '✕' : 'ℹ'}
            </span>
            <span className="font-medium">{toastMessage}</span>
          </div>
        </div>
      )}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
