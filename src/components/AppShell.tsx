import { useEffect, useState, type ReactNode } from 'react';
import {
  BookOpen,
  CalendarDays,
  Download,
  FileText,
  FolderKanban,
  LayoutDashboard,
  Menu,
  Moon,
  Settings,
  Target,
  X,
  type LucideIcon,
} from 'lucide-react';
import {
  MAIN_NAVIGATION,
  PAGE_DEFINITIONS,
  type MainNavigationId,
  type PageId,
} from '../navigation';

const navigationIcons: Record<MainNavigationId, LucideIcon> = {
  dashboard: LayoutDashboard,
  roadmap: BookOpen,
  week: CalendarDays,
  daily: CalendarDays,
  lab: FileText,
  projects: FolderKanban,
  career: Target,
  library: BookOpen,
  tools: Settings,
  startup: Target,
  data: Download,
};

type AppShellProps = {
  page: PageId;
  title: string;
  onNavigate: (page: PageId) => void;
  children: ReactNode;
};

export default function AppShell({ page, title, onNavigate, children }: AppShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const activePage = MAIN_NAVIGATION.find(
    (destination) =>
      destination === page ||
      (page === 'studyClock' && destination === 'lab') ||
      (page === 'lessonDetail' && destination === 'roadmap'),
  );

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  const navigate = (destination: PageId) => {
    onNavigate(destination);
    setMenuOpen(false);
  };

  return (
    <div className="shell">
      <div className="topbar">
        <div className="topbar-main">
          <div className="brand">
            <div className="brandmark">L</div>
            <div>
              <b>Learning OS</b>
              <small>YOUR TECHNICAL LEARNING SPACE</small>
            </div>
          </div>
          <button
            className="mobilemenu"
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
          <div className="topbar-controls">
            <button
              className="theme-placeholder"
              type="button"
              aria-label="Theme toggle, available in a future update"
              title="Theme controls will be added in a future update"
              disabled
            >
              <Moon size={16} />
              <span>Theme</span>
            </button>
            <button className="account-control" type="button" onClick={() => navigate('account')}>
              <span className="avatar">IA</span>
              <span>Account</span>
              <Settings size={15} />
            </button>
          </div>
        </div>
        <nav
          id="primary-navigation"
          className={menuOpen ? 'primary-navigation is-open' : 'primary-navigation'}
          aria-label="Main navigation"
        >
          {MAIN_NAVIGATION.map((destination) => {
            const { label } = PAGE_DEFINITIONS[destination];
            const Icon = navigationIcons[destination];
            return (
              <button
                key={destination}
                type="button"
                className={activePage === destination ? 'topnav-link active' : 'topnav-link'}
                aria-current={activePage === destination ? 'page' : undefined}
                onClick={() => navigate(destination)}
              >
                <Icon size={16} />
                {label}
              </button>
            );
          })}
        </nav>
      </div>
      <main className="main">
        <header className="page-header">
          <div>
            <div className="eyebrow">PERSONAL LEARNING ENVIRONMENT</div>
            <h1>{title}</h1>
          </div>
          <div className="header-right">
            <span className="date">
              {new Date().toLocaleDateString('en-NG', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
