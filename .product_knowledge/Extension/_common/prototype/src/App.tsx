import { useCallback, useEffect, useMemo, useState } from 'react';
import { BrowserMock } from './components/BrowserMock';
import { PluginShell } from './components/PluginShell';
import { DashboardPages } from './features/dashboard/DashboardPages';
import { DetectedPanel } from './features/detected/DetectedPanel';
import { DownloadsPanel } from './features/downloads/DownloadsPanel';
import { detectedResources as detectedSeed, downloadTasks as downloadSeed } from './mocks/prototypeData';
import type { DashboardPage, DetectedResource, DownloadTask, PreviewState, RuntimeTab } from './types';

const firstDetectedId = detectedSeed[0]?.id ?? null;

function previewStateFromHash(): PreviewState {
  const hash = window.location.hash.replace('#', '');
  if (hash === 'hover') return 'detected-hover';
  if (hash === 'expand') return 'detected-expand';
  if (hash === 'downloads') return 'downloads';
  if (hash === 'setting') return 'setting';
  if (hash === 'license') return 'license-info';
  return 'detected-default';
}

function hashFromPreviewState(state: PreviewState) {
  if (state === 'detected-default') return '';
  if (state === 'license-info') return 'license';
  return state.replace('detected-', '');
}

export default function App() {
  const [previewState, setPreviewState] = useState<PreviewState>(() => previewStateFromHash());
  const [panelOpen, setPanelOpen] = useState(true);
  const [resources, setResources] = useState<DetectedResource[]>(detectedSeed);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set(detectedSeed.map((item) => item.id)));
  const [expandedId, setExpandedId] = useState<string | null>(
    previewState === 'detected-expand' ? firstDetectedId : null,
  );
  const [downloadTasks, setDownloadTasks] = useState<DownloadTask[]>(downloadSeed);

  useEffect(() => {
    const onHashChange = () => setPreviewState(previewStateFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    if (previewState === 'detected-expand') {
      setExpandedId((current) => current ?? resources[0]?.id ?? null);
    }
  }, [previewState, resources]);

  const activeTab: RuntimeTab = previewState === 'downloads' ? 'downloads' : 'detected';
  const dashboardPage: DashboardPage | null =
    previewState === 'setting' ? 'setting' : previewState === 'license-info' ? 'license-info' : null;
  const hoverPreviewId = previewState === 'detected-hover' ? resources[0]?.id ?? null : null;

  const navigate = useCallback((next: PreviewState) => {
    const hash = hashFromPreviewState(next);
    window.location.hash = hash;
    setPreviewState(next);
  }, []);

  const toggleSelected = useCallback((id: string) => {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleAll = useCallback(
    (checked: boolean) => {
      setSelectedIds(checked ? new Set(resources.map((resource) => resource.id)) : new Set());
    },
    [resources],
  );

  const toggleExpanded = useCallback((id: string) => {
    setExpandedId((current) => (current === id ? null : id));
  }, []);

  const removeResource = useCallback((id: string) => {
    setResources((current) => current.filter((resource) => resource.id !== id));
    setSelectedIds((current) => {
      const next = new Set(current);
      next.delete(id);
      return next;
    });
    setExpandedId((current) => (current === id ? null : current));
  }, []);

  const startSelectedDownloads = useCallback(() => {
    const selectedResources = resources.filter((resource) => selectedIds.has(resource.id));
    if (selectedResources.length === 0) return;

    const newTasks: DownloadTask[] = selectedResources.map((resource, index) => ({
      id: `task-new-${resource.id}`,
      title: resource.title,
      status: index === 0 ? 'downloading' : 'pending',
      progress: index === 0 ? 18 : 0,
      resolution: resource.resolution,
      format: 'MP4',
      speed: index === 0 ? '2.4 MB/s' : undefined,
    }));

    setDownloadTasks((current) => [...newTasks, ...current]);
    setResources((current) => current.filter((resource) => !selectedIds.has(resource.id)));
    setSelectedIds(new Set());
    setExpandedId(null);
    navigate('downloads');
  }, [navigate, resources, selectedIds]);

  const runtimeContent = useMemo(() => {
    if (activeTab === 'downloads') return <DownloadsPanel tasks={downloadTasks} />;
    return (
      <DetectedPanel
        resources={resources}
        selectedIds={selectedIds}
        expandedId={expandedId}
        hoverPreviewId={hoverPreviewId}
        onToggleSelected={toggleSelected}
        onToggleAll={toggleAll}
        onToggleExpanded={toggleExpanded}
        onRemove={removeResource}
        onDownload={startSelectedDownloads}
      />
    );
  }, [
    activeTab,
    downloadTasks,
    expandedId,
    hoverPreviewId,
    removeResource,
    resources,
    selectedIds,
    startSelectedDownloads,
    toggleAll,
    toggleExpanded,
    toggleSelected,
  ]);

  return (
    <BrowserMock panelOpen={panelOpen} onTogglePanel={() => setPanelOpen((current) => !current)}>
      {dashboardPage ? (
        <DashboardPages
          page={dashboardPage}
          onPageChange={(page) => navigate(page === 'setting' ? 'setting' : 'license-info')}
          onBack={() => navigate('detected-default')}
        />
      ) : (
        <PluginShell
          activeTab={activeTab}
          detectedCount={resources.length}
          onTabChange={(tab) => navigate(tab === 'downloads' ? 'downloads' : 'detected-default')}
          onHome={() => navigate('detected-default')}
          onSettings={() => navigate('setting')}
          onLicense={() => navigate('license-info')}
        >
          {runtimeContent}
        </PluginShell>
      )}
    </BrowserMock>
  );
}
