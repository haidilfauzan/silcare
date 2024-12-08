import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qna',
  templateUrl: './qna.page.html',
  styleUrls: ['./qna.page.scss'],
})
export class QnaPage implements OnInit {

  constructor() { }

  qna: any[] =   [
    {
      question: "Apakah aplikasi SILCARE sudah tersedia di iOS?",
      answer: "Saat ini, fokus pengembangan aplikasi SILCARE masih di Android. Namun, jika ke depan ada kebutuhan untuk versi iOS, maka akan dipertimbangkan untuk mengembangkannya di platform tersebut."
    },
    {
      question: "Apakah ketika mendaftar sebagai UMKM, pengguna masih bisa mendaftar lagi sebagai kurir atau pembeli?",
      answer: "Ya, Anda dapat mendaftarkan diri sebagai kurir maupun pembeli, dengan syarat menggunakan email yang berbeda dari akun UMKM."
    },
    {
      question: "Apakah aplikasi SILCARE memiliki fitur pelacakan pesanan?",
      answer: "Ya, aplikasi SILCARE mendukung pengguna dalam melacak pesanan mereka secara mudah. Pengguna cukup membuka fitur 'INFO' yang tersedia di dalam aplikasi."
    },
    {
      question: "Bagaimana cara memantau riwayat transaksi di SILCARE?",
      answer: "Riwayat transaksi dapat dipantau melalui menu 'Riwayat Transaksi' yang menampilkan daftar lengkap transaksi pengiriman dan penjualan."
    },
    {
      question: "Apa yang harus dilakukan jika saya lupa password akun SILCARE?",
      answer: "Klik 'Lupa Password' di halaman login dan ikuti instruksi untuk mereset password melalui email terdaftar."
    },
    {
      question: "Bagaimana cara menghubungi dukungan pelanggan SILCARE?",
      answer: "Dukungan pelanggan dapat dihubungi melalui menu 'Bantuan' atau langsung mengirim pesan ke email atau nomor kontak yang tersedia."
    },
    {
      question: "Apakah SILCARE mendukung pembayaran online? Jika iya, bagaimana cara melakukan pembayaran tersebut?",
      answer: "Ya, SILCARE mendukung pembayaran online. Pengguna dapat melakukan pembayaran melalui opsi pembayaran yang tersedia pada saat proses checkout setelah produk UMKM."
    },
    {
      question: "Bagaimana cara memperbarui informasi produk atau layanan di aplikasi SILCARE?",
      answer: "Pembaruan informasi produk dapat dilakukan melalui menu 'Produk' yang terletak di Fitur AKUN, dengan memilih produk yang ingin diubah dan klik UPDATE untuk memperbarui detailnya."
    },
    {
      question: "Apakah SILCARE menyediakan fitur laporan penjualan dan pengiriman?",
      answer: "Ya, SILCARE memiliki fitur laporan yang dapat diakses di menu 'INFO' untuk melihat data penjualan dan pengiriman."
    },
    {
      question: "Apa saja metode pengiriman yang didukung oleh SILCARE?",
      answer: "Saat ini SILCARE mendukung berbagai metode pengiriman, termasuk kurir lokal dan pengiriman standar."
    },
    {
      question: "Bagaimana cara mengetahui perkiraan biaya pengiriman menggunakan SILCARE?",
      answer: "Perkiraan biaya pengiriman dapat dilihat pada saat checkout berdasarkan berat barang, jarak pengiriman, dan metode pengiriman yang dipilih."
    },
    {
      question: "Apakah SILCARE memiliki sistem notifikasi untuk pemberitahuan terkait pengiriman?",
      answer: "Ya, SILCARE mengirimkan notifikasi otomatis melalui email atau aplikasi terkait status pengiriman dan pembaruan lainnya."
    },
    {
      question: "Bagaimana cara menambahkan alamat pengiriman dan penerima di SILCARE?",
      answer: "Alamat pengiriman dan penerima dapat ditambahkan di menu 'Pengaturan' atau langsung pada saat proses checkout."
    },
    {
      question: "Bagaimana SILCARE menjaga keamanan data pengguna?",
      answer: "SILCARE menggunakan enkripsi data dan protokol keamanan standar untuk melindungi informasi pengguna dari akses tidak sah."
    },
    {
      question: "Apakah SILCARE dapat digunakan untuk pengiriman internasional?",
      answer: "Saat ini SILCARE mendukung pengiriman domestik. Namun, fitur pengiriman internasional sedang dalam pengembangan dan akan tersedia di versi mendatang."
    }
  ]
  
  ngOnInit() {
  }

}
