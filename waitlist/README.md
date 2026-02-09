# Waitlist Introduction Page

Project ini berisi ekstraksi halaman **Introduction** ke dalam project terpisah tanpa Lottie. Fokusnya tetap mempertahankan desain, animasi, dan section yang ada pada halaman introduction asli.

## Menjalankan dengan Docker

```bash
docker compose up --build
```

Akses di `http://localhost:5173`.

## Menjalankan secara lokal (tanpa Docker)

```bash
npm install
npm run dev
```

## Catatan

Asset background tidak disertakan di repo. Simpan file gambar `cosmic-planet-background.jpg` ke:

```
waitlist/public/assets/cosmic-planet-background.jpg
```

File tersebut akan dipanggil oleh halaman introduction melalui path `/assets/cosmic-planet-background.jpg`.
