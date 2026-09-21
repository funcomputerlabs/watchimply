import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from './components/AppShell.jsx';
import { SkeletonGrid } from './components/SkeletonGrid.jsx';

const HomePage = lazy(() => import('./pages/HomePage.jsx').then((m) => ({ default: m.HomePage })));
const TrendingPage = lazy(() => import('./pages/TrendingPage.jsx').then((m) => ({ default: m.TrendingPage })));
const SearchPage = lazy(() => import('./pages/SearchPage.jsx').then((m) => ({ default: m.SearchPage })));
const WatchPage = lazy(() => import('./pages/WatchPage.jsx').then((m) => ({ default: m.WatchPage })));
const HistoryPage = lazy(() => import('./pages/LibraryPages.jsx').then((m) => ({ default: m.HistoryPage })));
const LaterPage = lazy(() => import('./pages/LibraryPages.jsx').then((m) => ({ default: m.LaterPage })));
const LikesPage = lazy(() => import('./pages/LibraryPages.jsx').then((m) => ({ default: m.LikesPage })));
const SubscriptionsPage = lazy(() => import('./pages/SubscriptionsPage.jsx').then((m) => ({ default: m.SubscriptionsPage })));
const ProfilePage = lazy(() => import('./pages/ProfilePage.jsx').then((m) => ({ default: m.ProfilePage })));

function Fallback() {
  return (
    <div className="page">
      <SkeletonGrid count={6} />
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<HomePage />} />
          <Route path="trending" element={<TrendingPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="watch/:id" element={<WatchPage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="later" element={<LaterPage />} />
          <Route path="likes" element={<LikesPage />} />
          <Route path="subscriptions" element={<SubscriptionsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
