import { useEffect, useState } from 'react';
import { Server, Activity, Globe, Bell, Calendar, Mail, Settings, BarChart3, Package, AlertCircle, Cpu, HardDrive } from 'lucide-react';

interface Deployment {
  id: number;
  name: string;
  version: string;
  status: string;
  lastDeploy: string;
}

interface ServerStatus {
  server: string;
  containers: number;
  lastDeploy: string;
}

interface SystemMetrics {
  cpuUsage: number;
  ramUsage: number;
  cpuHistory: number[];
  ramHistory: number[];
  lastUpdate: string;
}

function App() {
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [serverStatus, setServerStatus] = useState<ServerStatus | null>(null);
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  const API_BASE = '/api';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [deploymentsRes, statusRes, metricsRes] = await Promise.all([
          fetch(`${API_BASE}/deployments`),
          fetch(`${API_BASE}/status`),
          fetch(`${API_BASE}/metrics`)
        ]);

        const deploymentsData = await deploymentsRes.json();
        const statusData = await statusRes.json();
        const metricsData = await metricsRes.json();

        setDeployments(deploymentsData);
        setServerStatus(statusData);
        setSystemMetrics(metricsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const chartData = [
    { day: 'M', value: 28 },
    { day: 'T', value: 35 },
    { day: 'W', value: 42 },
    { day: 'T', value: 30 },
    { day: 'F', value: 38 },
    { day: 'S', value: 48 },
    { day: 'S', value: 52 }
  ];

  const maxValue = Math.max(...chartData.map(d => d.value));

  const serverLocations = [
    { name: 'St. Petersburg', value: '150 TB', left: '58%', top: '22%' },
    { name: 'Los Angeles', value: '2,640', left: '12%', top: '35%' },
    { name: 'Siberia', value: '2,150', left: '75%', top: '25%' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-20 bg-slate-900/50 backdrop-blur-sm border-r border-slate-700/50 flex flex-col items-center py-6 z-50">
        <div className="w-12 h-12 bg-gradient-to-br from-red-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center mb-8">
          <Server className="w-6 h-6 text-red-400" />
        </div>

        <nav className="flex-1 flex flex-col items-center gap-6">
          <button className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-cyan-500/20 flex items-center justify-center text-red-400 transition-all hover:from-red-500/30 hover:to-cyan-500/30">
            <Activity className="w-5 h-5" />
          </button>
          <button className="w-12 h-12 rounded-xl flex items-center justify-center text-slate-400 transition-all hover:bg-slate-700/50">
            <BarChart3 className="w-5 h-5" />
          </button>
          <button className="w-12 h-12 rounded-xl flex items-center justify-center text-slate-400 transition-all hover:bg-slate-700/50">
            <Package className="w-5 h-5" />
          </button>
          <button className="w-12 h-12 rounded-xl flex items-center justify-center text-slate-400 transition-all hover:bg-slate-700/50">
            <Globe className="w-5 h-5" />
          </button>
        </nav>

        <button className="w-12 h-12 rounded-xl flex items-center justify-center text-slate-400 transition-all hover:bg-slate-700/50">
          <Settings className="w-5 h-5" />
        </button>
      </aside>

      {/* Main Content */}
      <main className="ml-20 p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 via-red-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-red-500/30">
              <span className="text-sm font-bold">MA</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Mohamed Anter</h2>
              <p className="text-sm text-red-400">Administrator</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-slate-400">{new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long' })}</p>
              <p className="text-sm text-slate-400">{new Date().getFullYear()}</p>
            </div>
            <button className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center hover:bg-slate-700/50 transition-all">
              <Mail className="w-5 h-5 text-slate-400" />
            </button>
            <button className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center hover:bg-slate-700/50 transition-all">
              <Bell className="w-5 h-5 text-slate-400" />
            </button>
            <button className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center hover:bg-slate-700/50 transition-all">
              <Calendar className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </header>

        {/* Dashboard Title */}
        <h1 className="text-5xl font-bold mb-12">Dashboard</h1>

        {/* System Uptime Section */}
        {serverStatus && (
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 mb-8">
            <h2 className="text-xl font-bold mb-4">System Uptime</h2>
            <p className="text-sm text-slate-400">Last Deploy: {serverStatus.lastDeploy}</p>
          </div>
        )}

        {/* Quick Stats Bar */}
        {systemMetrics && serverStatus && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* CPU Usage Quick Stat */}
            <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-200/70 uppercase tracking-wider font-semibold mb-2">CPU Usage</p>
                  <p className="text-4xl font-bold text-yellow-400">{systemMetrics.cpuUsage}%</p>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-yellow-500/20 flex items-center justify-center">
                  <Cpu className="w-8 h-8 text-yellow-400" />
                </div>
              </div>
            </div>

            {/* RAM Usage Quick Stat */}
            <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-cyan-200/70 uppercase tracking-wider font-semibold mb-2">RAM Usage</p>
                  <p className="text-4xl font-bold text-cyan-400">{systemMetrics.ramUsage}%</p>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
                  <HardDrive className="w-8 h-8 text-cyan-400" />
                </div>
              </div>
            </div>

            {/* Containers Running Quick Stat */}
            <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 backdrop-blur-sm rounded-2xl p-6 border border-red-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-200/70 uppercase tracking-wider font-semibold mb-2">Containers Running</p>
                  <p className="text-4xl font-bold text-red-400">{serverStatus.containers}</p>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-red-500/20 flex items-center justify-center">
                  <Server className="w-8 h-8 text-red-400" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* System Metrics Section */}
        {systemMetrics && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* CPU Usage */}
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                    <Cpu className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold tracking-wide">CPU USAGE</h3>
                    <p className="text-sm text-slate-400">Current processor load</p>
                  </div>
                </div>
                <div className="text-5xl font-bold text-yellow-400 mt-4">{systemMetrics.cpuUsage}%</div>
              </div>

              <div className="relative h-32 bg-slate-900/50 rounded-xl overflow-hidden">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <polyline
                    points={systemMetrics.cpuHistory.map((value, index) =>
                      `${(index / (systemMetrics.cpuHistory.length - 1)) * 100},${100 - value}`
                    ).join(' ')}
                    fill="none"
                    stroke="rgb(250, 204, 21)"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </div>

              <p className="text-xs text-slate-400 mt-3">Updated {systemMetrics.lastUpdate}</p>
            </div>

            {/* RAM Usage */}
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                    <HardDrive className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold tracking-wide">RAM USAGE</h3>
                    <p className="text-sm text-slate-400">Current memory utilization</p>
                  </div>
                </div>
                <div className="text-5xl font-bold text-cyan-400 mt-4">{systemMetrics.ramUsage}%</div>
              </div>

              <div className="relative h-32 bg-slate-900/50 rounded-xl overflow-hidden">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <polyline
                    points={systemMetrics.ramHistory.map((value, index) =>
                      `${(index / (systemMetrics.ramHistory.length - 1)) * 100},${100 - value}`
                    ).join(' ')}
                    fill="none"
                    stroke="rgb(34, 211, 238)"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </div>

              <p className="text-xs text-slate-400 mt-3">Updated {systemMetrics.lastUpdate}</p>
            </div>
          </div>
        )}

        {/* Critical Alerts Section */}
        <div className="mb-8">
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-red-500/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold">CRITICAL ALERTS</h3>
            </div>

            <div className="space-y-3">
              {deployments.filter(d => d.status === 'stopped').length > 0 ? (
                deployments.filter(d => d.status === 'stopped').map(deployment => (
                  <div key={deployment.id} className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-red-300 mb-1">{deployment.name} Service Stopped</h4>
                      <p className="text-sm text-slate-400">
                        The {deployment.name} service (v{deployment.version}) is currently not running. Immediate action required.
                      </p>
                      <p className="text-xs text-slate-500 mt-2">Last seen: {deployment.lastDeploy}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-center gap-3">
                  <Activity className="w-5 h-5 text-green-400" />
                  <p className="text-sm text-green-300">All systems operational. No critical alerts at this time.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Server Request Chart */}
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Server request</h3>
              <select className="bg-slate-700/50 text-sm px-4 py-2 rounded-lg border border-slate-600/50 focus:outline-none focus:border-red-500">
                <option>Weekly</option>
                <option>Daily</option>
                <option>Monthly</option>
              </select>
            </div>

            <div className="h-64 flex items-end justify-between gap-4">
              {chartData.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full relative" style={{ height: '200px' }}>
                    <div
                      className="absolute bottom-0 w-full bg-gradient-to-t from-red-500 via-red-400 to-cyan-400 rounded-t-lg transition-all duration-500 shadow-lg shadow-red-500/30"
                      style={{ height: `${(item.value / maxValue) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-400">{item.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Servers Map */}
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            <h3 className="text-xl font-semibold mb-6">Servers map</h3>

            <div className="relative h-64 bg-slate-900/50 rounded-xl overflow-hidden">
              {/* World Map Background */}
              <div className="absolute inset-0 opacity-30">
                <svg viewBox="0 0 800 400" className="w-full h-full">
                  <path d="M100,100 L200,80 L250,120 L300,100 L350,140 L400,120 L450,160 L500,140 L550,180 L600,160 L650,200 L700,180"
                        stroke="currentColor" strokeWidth="1" fill="none" className="text-slate-600"/>
                </svg>
              </div>

              {/* Server Locations */}
              {serverLocations.map((location, index) => (
                <div key={index} className="absolute" style={{ left: location.left, top: location.top }}>
                  <div className="relative">
                    <div className="w-4 h-4 bg-red-400 rounded-full animate-ping absolute" />
                    <div className="w-4 h-4 bg-red-400 rounded-full relative shadow-lg shadow-red-500/50" />
                  </div>
                </div>
              ))}

              {/* Legend */}
              <div className="absolute bottom-4 left-4 space-y-2">
                {serverLocations.map((location, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs">
                    <div className="w-2 h-2 bg-red-400 rounded-full" />
                    <span className="text-slate-300">{location.name}</span>
                    <span className="text-slate-400">{location.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Deployment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {loading ? (
            <div className="col-span-full flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            deployments.map((deployment, index) => (
              <div key={deployment.id} className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-red-500/50 transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl font-bold text-slate-600 group-hover:text-red-500/50 transition-all">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    deployment.status === 'running'
                      ? 'bg-orange-500/20 text-orange-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    <Server className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-lg font-semibold mb-2">{deployment.name}</h3>
                <p className="text-sm text-slate-400 mb-1">Version: {deployment.version}</p>
                <p className={`text-sm font-medium mb-3 ${
                  deployment.status === 'running' ? 'text-green-400' : 'text-red-400'
                }`}>
                  Status: {deployment.status}
                </p>
                <p className="text-xs text-slate-500">{deployment.lastDeploy}</p>
              </div>
            ))
          )}

          {/* Server Status Card */}
          {serverStatus && (
            <div className="bg-gradient-to-br from-red-500/20 via-red-600/10 to-cyan-500/20 backdrop-blur-sm rounded-2xl p-6 border border-red-500/50 shadow-xl shadow-red-500/20">
              <div className="flex items-start justify-between mb-4">
                <span className="text-4xl font-bold bg-gradient-to-r from-red-400 to-cyan-400 bg-clip-text text-transparent">
                  {String(deployments.length + 1).padStart(2, '0')}
                </span>
                <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-red-400" />
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4">Server Status</h3>
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-3 h-3 rounded-full ${
                  serverStatus.server === 'running' ? 'bg-green-400 animate-pulse' : 'bg-red-400'
                }`} />
                <p className={`text-lg font-bold ${
                  serverStatus.server === 'running' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {serverStatus.server.toUpperCase()}
                </p>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 mb-3">
                <div className="flex items-center gap-3">
                  <Server className="w-6 h-6 text-red-400" />
                  <div>
                    <p className="text-sm text-slate-400 mb-1">CONTAINERS RUNNING</p>
                    <p className="text-3xl font-bold text-red-400">{serverStatus.containers}</p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-400">Last Deploy: {serverStatus.lastDeploy}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
