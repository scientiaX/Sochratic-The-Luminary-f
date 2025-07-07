import React, { useState } from 'react';

// Data untuk kursus, diorganisir berdasarkan kategori
const courseData = {
  'Lesson': {
    title: 'Pembelajaran Per Topik',
    description: 'Meningkatkan Problem solving Per Topik Materi (unidisipiln).',
    topics: ['📊SPLDV', '🧲Newton\'s Laws', '🧪Larutan asam pH','💻Computing Logic']
  },
  'Themes': {
    title: 'Pembelajaran Per Tema',
    description: 'Meningkatkan Problem solving Per Tema masalah (Interdisiplin).',
    topics: ['🤖AI untuk Murid Tertinggal', '🎮EduGame Anti-Cyberbullying', '🌆Desain Smart City', '🛰️Life Support Station']
  }
};

// Data detail untuk setiap topik
const topicDetails = {
  '📊SPLDV': {
    title: 'Sistem Persamaan Linear Dua Variabel',
    description: 'Pelajari cara menyelesaikan sistem persamaan linear dengan dua variabel menggunakan berbagai metode.',
    content: 'Dalam materi ini, Anda akan mempelajari metode substitusi, eliminasi, dan grafik untuk menyelesaikan SPLDV.',
    difficulty: 'Menengah',
    duration: '15 menit'
  },
  '🧲Newton\'s Laws': {
    title: 'Hukum Newton',
    description: 'Memahami hukum-hukum Newton dan bagaimana gaya memengaruhi gerak benda dalam kehidupan nyata.',
    content: 'Kamu akan belajar hukum 1 (inersia), hukum 2 (percepatan), dan hukum 3 (aksi-reaksi).',
    difficulty: 'Sulit',
    duration: '20 menit'
  },
  '🧪Larutan asam pH': {
    title: 'Larutan Asam dan pH',
    description: 'Pelajari bagaimana keasaman dan kebasaan memengaruhi produk seperti sabun atau makanan.',
    content: 'Kamu akan memahami skala pH, sifat asam-basa, dan menghitung pH untuk membantu merancang produk aman bagi kulit atau lingkungan.',
    difficulty: 'Sulit',
    duration: '20 menit'
  },
  '💻Computing Logic': {
    title: 'Logika Komputasi dasar',
    description: 'Pelajari cara berpikir logis yang menjadi dasar pemrograman dan sistem cerdas.',
    content: 'Kamu akan menggunakan logika boolean dan struktur kontrol seperti if/else untuk membuat program sederhana yang memecahkan masalah nyata.',
    difficulty: 'menengah',
    duration: '15 menit'
  },
  '🤖AI untuk Murid Tertinggal': {
    title: 'AI untuk Murid Tertinggal',
    description: 'Mengembangkan solusi AI untuk membantu murid yang mengalami kesulitan belajar.',
    content: 'Proyek interdisiplin yang menggabungkan teknologi AI dengan pendidikan inklusif.',
    difficulty: 'Lanjutan',
    duration: '20 menit'
  },
  '🎮EduGame Anti-Cyberbullying': {
    title: 'EduGame Anti-Cyberbullying',
    description: 'Rancang game edukatif untuk mencegah cyberbullying dan menumbuhkan empati digital.',
    content: 'Gabungkan prinsip psikologi remaja, storytelling, dan desain interaktif untuk menciptakan game pendek yang mendidik dan menyentuh.',
    difficulty: 'Lanjutan',
    duration: '20 menit'
  },
  '🌆Desain Smart City': {
    title: 'Desain Smart City',
    description: 'Merancang konsep kota pintar yang berkelanjutan dan ramah lingkungan.',
    content: 'Proyek yang mengintegrasikan teknologi, urbanisme, dan sustainability.',
    difficulty: 'Lanjutan',
    duration: '20 menit'
  },
  '🛰️Life Support Station': {
    title: 'Perancang Sistem Kehidupan di Stasiun Luar Angkasa',
    description: 'Merancang sistem keberlangsungan hidup jangka panjang di luar angkasa untuk kru manusia.',
    content: 'Kamu akan mengeksplorasi bagaimana merancang pasokan oksigen, air, makanan, dan pengelolaan limbah di lingkungan ruang angkasa yang terbatas. Diskusikan bersama AI bagaimana teknologi seperti daur ulang air, pertanian ruang angkasa, dan sistem tertutup bisa bekerja.',
    difficulty: 'Lanjutan',
    duration: '20 menit'
   }

};

// Komponen halaman detail topik
function TopicDetailPage({ topic, onBack }) {
  const details = topicDetails[topic];
  
  // Fungsi untuk memulai pembelajaran (navigasi ke halaman pembelajaran)
  const handleStartLearning = (selectedTopic) => {
    // Nanti di sini akan ada navigasi ke halaman pembelajaran
    // Sementara ini hanya console.log untuk testing
    console.log('Navigasi ke halaman pembelajaran untuk topik:', selectedTopic);
    
    // Untuk implementasi nanti, Anda bisa menggunakan:
    // window.location.href = `/learning/${selectedTopic}`;
    // atau menggunakan React Router
    // navigate(`/learning/${selectedTopic}`);
    
    alert(`Navigasi ke halaman pembelajaran: ${selectedTopic}`);
  };
  
  if (!details) {
    return (
      <div className="bg-gray-100 min-h-screen font-sans flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700">Detail topik tidak ditemukan.</p>
          <button onClick={onBack} className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Kembali
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="container mx-auto p-4 md:p-8 max-w-4xl">
        {/* Header dengan tombol kembali */}
        <div className="mb-6">
          <button 
            onClick={onBack}
            className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Kembali ke Pilihan Topik
          </button>
        </div>

        {/* Konten detail topik */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{details.title}</h1>
          <p className="text-xl text-gray-600 mb-6">{details.description}</p>
          
          {/* Info singkat */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Tingkat Kesulitan</h3>
              <p className="text-blue-700">{details.difficulty}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">Durasi</h3>
              <p className="text-green-700">{details.duration}</p>
            </div>
          </div>

          {/* Konten detail */}
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Deskripsi Materi</h3>
            <p className="text-gray-700 leading-relaxed">{details.content}</p>
          </div>

          {/* Tombol aksi */}
          <div className="flex justify-center">
            <button 
              onClick={() => handleStartLearning(topic)}
              className="bg-indigo-600 text-white py-3 px-8 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Mulai Pembelajaran
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main App Component
export default function SelectionPage() {
  // Ambil kategori pertama sebagai default untuk menghindari undefined
  const firstCategory = Object.keys(courseData)[0];
  
  // State untuk melacak kategori aktif dan topik yang dipilih
  const [activeCategory, setActiveCategory] = useState(firstCategory);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentPage, setCurrentPage] = useState('selection'); // 'selection' atau 'detail'

  // Fungsi untuk mengubah kategori aktif
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setSelectedTopic(null); // Reset pilihan topik saat kategori berubah
  };

  // Fungsi untuk navigasi ke halaman detail
  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
    setCurrentPage('detail');
  };

  // Fungsi untuk kembali ke halaman selection
  const handleBackToSelection = () => {
    setCurrentPage('selection');
    setSelectedTopic(null);
  };

  // Tampilkan halaman detail jika currentPage adalah 'detail'
  if (currentPage === 'detail') {
    return <TopicDetailPage topic={selectedTopic} onBack={handleBackToSelection} />;
  }

  const categoryDetails = courseData[activeCategory];

  // Tambahkan error handling untuk mencegah crash
  if (!categoryDetails) {
    return (
      <div className="bg-gray-100 min-h-screen font-sans flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700">Data kategori tidak ditemukan.</p>
        </div>
      </div>
    );
  }

  return (
    // Kontainer utama dengan latar belakang abu-abu muda
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="container mx-auto p-4 md:p-8 max-w-4xl">
        
        {/* Kontainer untuk pemilih kategori */}
        <div className="flex justify-center space-x-2 md:space-x-4 mb-8">
          {Object.keys(courseData).map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`
                w-full md:w-auto text-center px-6 py-3 rounded-xl text-md md:text-lg font-semibold transition-all duration-300 border-2
                ${activeCategory === category 
                  ? 'bg-indigo-600 text-white border-transparent shadow-lg' 
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Konten dinamis berdasarkan kategori yang aktif */}
        <div className="text-left mb-8 p-6 bg-white rounded-xl shadow-md">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {categoryDetails.title}
          </h1>
          <p className="text-md md:text-lg text-gray-600">
            {categoryDetails.description}
          </p>
        </div>

        {/* Grid responsif untuk kartu topik */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryDetails.topics.map((topic) => (
            <div
              key={topic}
              onClick={() => handleTopicClick(topic)}
              className="p-6 rounded-xl cursor-pointer transition-all duration-300 ease-in-out
                transform hover:-translate-y-2 bg-white text-gray-800 hover:bg-gray-50 shadow-lg
                hover:shadow-xl border-2 border-transparent hover:border-indigo-200"
            >
              <h2 className="text-xl font-semibold mb-2">{topic}</h2>
              <p className="text-gray-600 text-sm">
                {topicDetails[topic]?.difficulty || 'Menengah'} • {topicDetails[topic]?.duration || '2 jam'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}