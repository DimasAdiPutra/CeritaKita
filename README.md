# CeritaKita - Plan

## Tujuan Website

### 1. **Membangun Komunitas**

- Menyediakan ruang bagi orang-orang untuk berbagi cerita, pengalaman, dan inspirasi, sehingga dapat membangun rasa kebersamaan.

### 2. **Menyampaikan Informasi dan Inspirasi**

- Menyajikan konten menarik yang informatif, seperti artikel, panduan, atau cerita inspiratif, yang dapat memberikan manfaat kepada pembaca.

### 3. **Meningkatkan Interaksi Pengguna**

- Memiliki fitur interaktif seperti kolom komentar, rating artikel, atau bahkan forum diskusi, untuk meningkatkan keterlibatan pengunjung.

### 4. **Mempermudah Akses Cerita**

- Membuat semua konten mudah diakses melalui navigasi sederhana, fitur pencarian, dan desain responsif untuk berbagai perangkat.

### 5. **Menjadi Sumber Kepercayaan**

- Menciptakan reputasi sebagai blog yang kredibel, sehingga pengguna merasa nyaman dan percaya untuk membaca, berbagi, atau berkontribusi.

### 6. **Memonetisasi Konten (Opsional di Masa Depan)**

- Dengan traffic yang stabil, platform ini bisa digunakan untuk menghasilkan pendapatan melalui iklan, langganan premium, atau kolaborasi dengan brand tertentu.

## Target Audiens

### 1. **Milenial dan Gen Z (Usia 18–35 tahun)**

- Mereka yang sering mencari konten inspiratif, cerita kehidupan, dan tips praktis.
- Terbiasa membaca blog dan menikmati format konten yang relatable serta ringan.

### 2. **Penggemar Cerita atau Narasi**

- Orang-orang yang senang membaca pengalaman hidup, cerita pendek, atau artikel reflektif.
- Mencari cerita yang bisa memberi pelajaran atau hiburan.

### 3. **Profesional Muda dan Mahasiswa**

- Membutuhkan panduan hidup, motivasi, atau insight yang relevan dengan tantangan sehari-hari.
- Terbuka terhadap konten seputar pengembangan diri, karier, atau keseimbangan hidup.

### 4. **Komunitas Kreatif dan Penulis Amatir**

- Penulis atau pembuat konten yang ingin membagikan karya mereka.
- Mereka yang mencari platform untuk mendapatkan eksposur atau umpan balik atas karya mereka.

### 5. **Orang yang Mencari Inspirasi atau Hiburan**

- Pengunjung yang ingin mengisi waktu luang dengan membaca konten yang ringan tetapi bermakna.
- Seringkali berasal dari media sosial yang tertarik dengan artikel tertentu.

### 6. **Komunitas Lokal**

- Jika ada fokus pada cerita-cerita lokal atau berbasis budaya, maka audiensnya bisa mencakup orang-orang yang ingin mendalami cerita dari daerah atau komunitas mereka.

## Fitur Utama

- **Halaman Beranda yang Menarik**: Saya ingin tampilan pertama yang memikat, dengan gambar atau video latar belakang, serta teks yang informatif dan mudah dipahami. Halaman utama harus jelas menggambarkan tujuan website ini.
- **Responsif**: Website harus dapat diakses dengan baik di berbagai perangkat, baik desktop, tablet, maupun ponsel.
- **Fitur Pencarian**: Pengguna harus dapat mencari konten atau produk dengan mudah menggunakan fitur pencarian yang efisien.
- **Sistem Pengguna**: Website harus memiliki fitur login dan registrasi pengguna, dengan opsi untuk mengatur profil pribadi dan riwayat aktivitas.
- **Konten Dinamis**: Saya ingin bisa mengelola konten website melalui sistem backend yang mudah digunakan. Misalnya, menggunakan CMS untuk blog atau halaman produk.
- **Optimasi SEO**: Website harus dioptimalkan untuk mesin pencari agar mudah ditemukan oleh orang lain.
- **Keamanan**: Keamanan data pengguna sangat penting, jadi saya ingin implementasi autentikasi yang aman, seperti OAuth atau JWT.
- **Kecepatan dan Performa**: Website harus cepat, dengan waktu muat yang minimal. Gambar dan video harus dioptimalkan untuk kecepatan.
- **Interaksi Pengguna**: Fitur interaktif seperti form kontak, komentar, atau sistem rating untuk produk/layanan.

## Teknologi Utama

- Frontend : React Js dan Tailwind CSS
- Backend : Node Js dan Express
- Database : MongoDB

### **Keputusan Teknologi:**

1. **Frontend: React JS + Tailwind CSS**
   - React JS akan digunakan untuk frontend dengan Tailwind CSS ( Hyper UI ) untuk styling.
2. **Backend: Proxy, Strapi (CMS), Express JS (Custom API)**
   - Proxy akan menghubungkan frontend dengan backend.
   - Strapi akan mengelola konten blog dan cerita.
   - Express JS akan menangani API kustom dan fitur yang tidak tersedia di Strapi.
3. **Database: MongoDB**
   - MongoDB Atlas akan menyimpan data dengan keunggulan fleksibilitas dan biaya rendah.
4. **Authentication: Google OAuth + JWT**
   - Pengguna dapat masuk melalui akun Google, dengan sesi yang dikelola menggunakan JWT.
5. **MFA: Speakeasy**
   - Multi-factor authentication (MFA) akan diterapkan untuk meningkatkan keamanan.
6. **ElasticSearch**
   - Akan dimanfaatkan untuk pencarian yang cepat dan fleksibel.
7. **CMS Backend: Strapi**
   - Berfungsi sebagai platform pengelolaan konten artikel dan cerita.
8. **Image Hosting: ImageKit.io**
   - Akan mengoptimalkan dan menyimpan gambar untuk mendukung kecepatan dan kualitas.
