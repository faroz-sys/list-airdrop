import React, { useState, useEffect } from 'react';
import { Search, Filter, Calendar, ExternalLink, Bell, Shield, TrendingUp, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

// Mock data untuk airdrop
const mockAirdrops = [
  {
    id: 1,
    name: "Arbitrum Odyssey",
    description: "Program airdrop untuk pengguna aktif jaringan Arbitrum dengan hadiah hingga 1000 ARB",
    platform: "ETH",
    status: "Active",
    startDate: "2024-01-15",
    endDate: "2024-03-15",
    tokenAllocation: "10,000,000 ARB",
    participationType: "on-chain",
    verified: true,
    roadmap: "Fase 1: Distribusi token kepada pengguna aktif. Fase 2: Program staking. Fase 3: Governance DAO.",
    team: "Tim pengembang Arbitrum Foundation",
    tokenomics: "Total Supply: 10B ARB, Airdrop Allocation: 12%, Staking: 25%, Treasury: 30%, Team: 15%, Ecosystem: 18%",
    steps: [
      "Hubungkan dompet Ethereum Anda ke situs resmi Arbitrum",
      "Verifikasi aktivitas on-chain minimal 5 transaksi",
      "Klaim token airdrop melalui dashboard resmi",
      "Stake token untuk mendapatkan reward tambahan"
    ]
  },
  {
    id: 2,
    name: "Solana Summer",
    description: "Airdrop musim panas untuk komunitas Solana dengan fokus pada DeFi dan NFT",
    platform: "SOL",
    status: "Upcoming",
    startDate: "2024-02-01",
    endDate: "2024-04-30",
    tokenAllocation: "5,000,000 SOL",
    participationType: "social",
    verified: true,
    roadmap: "Peluncuran Q1 2024, Distribusi Q2 2024, Ekspansi ekosistem Q3 2024",
    team: "Solana Labs dan komunitas validator",
    tokenomics: "Total Supply: 500M SOL, Airdrop: 8%, Development Fund: 20%, Community: 15%, Marketing: 7%",
    steps: [
      "Follow akun Twitter resmi @SolanaSummer",
      "Retweet postingan airdrop dengan hashtag #SolanaSummer",
      "Join Discord server resmi",
      "Daftar melalui form resmi sebelum deadline"
    ]
  },
  {
    id: 3,
    name: "BSC Farm Rewards",
    description: "Reward untuk petani yield farming di Binance Smart Chain",
    platform: "BSC",
    status: "Ended",
    startDate: "2023-11-01",
    endDate: "2023-12-31",
    tokenAllocation: "2,500,000 BNB",
    participationType: "on-chain",
    verified: false,
    roadmap: "Program telah selesai pada Desember 2023",
    team: "Tim BSC Ecosystem",
    tokenomics: "Alokasi khusus untuk program yield farming",
    steps: [
      "Program telah berakhir",
      "Informasi untuk referensi historis"
    ]
  }
];

const App = () => {
  const [airdrops, setAirdrops] = useState(mockAirdrops);
  const [filteredAirdrops, setFilteredAirdrops] = useState(mockAirdrops);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedAirdrop, setSelectedAirdrop] = useState(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    let filtered = airdrops;

    if (searchTerm) {
      filtered = filtered.filter(airdrop =>
        airdrop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        airdrop.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedStatus !== 'All') {
      filtered = filtered.filter(airdrop => airdrop.status === selectedStatus);
    }

    if (selectedPlatform !== 'All') {
      filtered = filtered.filter(airdrop => airdrop.platform === selectedPlatform);
    }

    if (selectedType !== 'All') {
      filtered = filtered.filter(airdrop => airdrop.participationType === selectedType);
    }

    setFilteredAirdrops(filtered);
  }, [searchTerm, selectedStatus, selectedPlatform, selectedType, airdrops]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Upcoming': return 'bg-blue-100 text-blue-800';
      case 'Ended': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlatformColor = (platform) => {
    switch (platform) {
      case 'ETH': return 'bg-purple-100 text-purple-800';
      case 'SOL': return 'bg-indigo-100 text-indigo-800';
      case 'BSC': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">CryptoAirdrop.ID</h1>
                <p className="text-purple-300 text-sm">Sumber Terpercaya Peluang Airdrop</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#active" className="text-white hover:text-purple-300 transition-colors">Aktif</a>
              <a href="#upcoming" className="text-white hover:text-purple-300 transition-colors">Mendatang</a>
              <a href="#ended" className="text-white hover:text-purple-300 transition-colors">Selesai</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Temukan Peluang Airdrop Terbaik
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Platform terpercaya untuk menemukan, melacak, dan berpartisipasi dalam airdrop cryptocurrency terbaru. 
            Semua informasi diverifikasi dan diperbarui secara real-time.
          </p>
        </div>

        {/* Subscription Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <Bell className="w-6 h-6 text-purple-400" />
              <div>
                <h3 className="text-white font-semibold">Dapatkan Notifikasi Airdrop Baru</h3>
                <p className="text-gray-300 text-sm">Jangan lewatkan peluang airdrop terbaik!</p>
              </div>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email Anda"
                className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all font-medium"
              >
                Berlangganan
              </button>
            </form>
          </div>
          {subscribed && (
            <div className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300 text-center">
              ✅ Berhasil berlangganan! Anda akan menerima notifikasi airdrop baru.
            </div>
          )}
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cari airdrop berdasarkan nama atau deskripsi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="All">Semua Status</option>
              <option value="Active">Aktif</option>
              <option value="Upcoming">Mendatang</option>
              <option value="Ended">Selesai</option>
            </select>

            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="All">Semua Platform</option>
              <option value="ETH">Ethereum</option>
              <option value="SOL">Solana</option>
              <option value="BSC">BSC</option>
            </select>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedType('All')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedType === 'All' 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              Semua Jenis
            </button>
            <button
              onClick={() => setSelectedType('on-chain')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedType === 'on-chain' 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              Tugas On-Chain
            </button>
            <button
              onClick={() => setSelectedType('social')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedType === 'social' 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              Media Sosial
            </button>
          </div>
        </div>

        {/* Airdrop List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAirdrops.map((airdrop) => (
            <div
              key={airdrop.id}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-purple-500/50 transition-all cursor-pointer group"
              onClick={() => setSelectedAirdrop(airdrop)}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                    {airdrop.name}
                  </h3>
                  {airdrop.verified && (
                    <Shield className="w-5 h-5 text-green-400" title="Diverifikasi" />
                  )}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(airdrop.status)}`}>
                  {airdrop.status}
                </span>
              </div>

              <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                {airdrop.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getPlatformColor(airdrop.platform)}`}>
                  {airdrop.platform}
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                  {airdrop.participationType === 'on-chain' ? 'On-Chain' : 'Media Sosial'}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-300 text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{airdrop.startDate} - {airdrop.endDate}</span>
                </div>
                <div className="flex items-center text-gray-300 text-sm">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  <span>{airdrop.tokenAllocation}</span>
                </div>
              </div>

              <button className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all font-medium flex items-center justify-center space-x-2">
                <span>Lihat Detail</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {filteredAirdrops.length === 0 && (
          <div className="text-center py-12">
            <AlertTriangle className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Tidak ada airdrop yang ditemukan</h3>
            <p className="text-gray-400">Coba ubah kriteria pencarian atau filter Anda</p>
          </div>
        )}
      </main>

      {/* Detail Modal */}
      {selectedAirdrop && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{selectedAirdrop.name}</h2>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedAirdrop.status)}`}>
                      {selectedAirdrop.status}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPlatformColor(selectedAirdrop.platform)}`}>
                      {selectedAirdrop.platform}
                    </span>
                    {selectedAirdrop.verified && (
                      <Shield className="w-5 h-5 text-green-400" title="Diverifikasi" />
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAirdrop(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              <p className="text-gray-300 mb-6">{selectedAirdrop.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3">Informasi Dasar</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Periode:</span>
                      <span className="text-white">{selectedAirdrop.startDate} - {selectedAirdrop.endDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Alokasi Token:</span>
                      <span className="text-white">{selectedAirdrop.tokenAllocation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Jenis Partisipasi:</span>
                      <span className="text-white capitalize">{selectedAirdrop.participationType}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3">Tokenomics</h3>
                  <p className="text-gray-300 text-sm">{selectedAirdrop.tokenomics}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Roadmap</h3>
                <p className="text-gray-300">{selectedAirdrop.roadmap}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Tim</h3>
                <p className="text-gray-300">{selectedAirdrop.team}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">Panduan Langkah demi Langkah</h3>
                <ol className="space-y-3">
                  {selectedAirdrop.steps.map((step, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">{index + 1}</span>
                      </div>
                      <span className="text-gray-300">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all font-medium flex items-center justify-center space-x-2">
                  <ExternalLink className="w-4 h-4" />
                  <span>Klaim Airdrop</span>
                </button>
                <button className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors font-medium">
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-sm border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-400">
              © 2024 CryptoAirdrop.ID - Platform informasi airdrop cryptocurrency terpercaya.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Disclaimer: Lakukan riset sendiri sebelum berpartisipasi dalam airdrop. Kami tidak bertanggung jawab atas kerugian finansial.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
