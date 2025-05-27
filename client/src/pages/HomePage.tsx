import React from "react";
import { Card, CardContent } from "../components/Card";
import { Button } from "../components/Button2";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="bg-[#121212] text-white font-sans">

      <div className="bg-black text-white p-4 text-lg font-semibold">Home</div>

      {/* Reused Navbar Component */}
      <Navbar message="Welcome to Home" buttonMessage="Get Started" route={"/"} />

      {/* Hero Section */}
      <div className="bg-white px-16 py-16 flex flex-col lg:flex-row items-center justify-between gap-10">
        <div className="max-w-xl text-center lg:text-left">
            <h1 className="text-4xl font-bold leading-tight text-black">
            Belajar dari Para <br /> Pebisnis Profesional
            </h1>
            <p className="mt-4 text-gray-700">
            Tingkatkan keterampilan bisnis Anda dengan materi eksklusif dari pebisnis profesional & investor berpengalaman!
            </p>
            <Button className="mt-6 bg-orange-500 hover:bg-orange-600 text-white">
            Kontak Kami
            </Button>
        </div>
        <div className="w-full max-w-2xl lg:self-stretch lg:rounded-none lg:overflow-hidden">
            <img
              src="src/assets/heroImages.png"
              alt="Hero"
              className="w-full h-[400px] object-cover rounded-lg lg:rounded-none"
              style={{ objectPosition: "center" }}
            />
        </div>
    </div>

      {/* Why Us Section */}
        <div className="bg-[#1A1535] text-white px-16 py-12">
        <div className="grid grid-cols-4 gap-8">
            <div>
                <h2 className="text-xl font-semibold mb-2">Mengapa Kami Yang Terbaik</h2>
                <p className="text-gray-300 mb-8 max-w-lg">
                    Kesempatan menghubungkan bisnis Anda dengan investor.
                </p>
            </div>
            <div>
                <img src="src/assets/icons/community-icon.png" alt="Komunitas Pebisnis" className="w-10 h-10 mb-2" />
                <h3 className="font-semibold">Komunitas Pebisnis</h3>
                <p>Berinteraksi dengan para pengusaha</p>
            </div>
            <div>
                <img src="src/assets/icons/video-icon.png" alt="Komunitas Pebisnis" className="w-10 h-10 mb-2" />
                <h3 className="font-semibold">Video Bisnis Premium</h3>
                <p>Belajar langsung dari pebisnis sukses melalui video</p>
                </div>
            <div>
                <img src="src/assets/icons/mentoring-icon.png" alt="Komunitas Pebisnis" className="w-10 h-10 mb-2" />
                <h3 className="font-semibold">Mentoring Ahli</h3>
                <p>Konsultasi langsung dengan mentor bisnis</p>
            </div>
        </div>
        </div>


      {/* Skill Terbaru Section */}
      <div className="bg-[#F9FBFC] text-black px-16 py-12">
        <h2 className="text-2xl font-bold mb-8">Skill Terbaru</h2>
        <div className="grid grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((_, idx) => (
            <Card key={idx} className="overflow-hidden">
              <div className="relative">
                <img src="/skill-thumbnail.jpg" alt="Skill" className="w-full" />
                <div className="absolute top-2 right-2 bg-white text-black rounded-full p-1 text-xs font-bold">▶</div>
              </div>
              <CardContent>
                <div className="text-xs text-red-500 font-semibold mb-1">45 MENIT · 1 Minggu lalu</div>
                <p className="text-sm font-medium">
                  Strategi Meningkatkan Omzet Bisnis dengan Digital Marketing
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="bg-white text-black px-16 py-12 flex items-center gap-12">
        <div className="max-w-md">
          <h2 className="text-xl text-orange-600 font-bold">Apa Kata Mereka?</h2>
          <p className="mt-4 text-gray-700">
            Bersama kami, ribuan pebisnis telah mendapatkan ilmu, jaringan, dan peluang investasi untuk mengembangkan usaha mereka.
          </p>
          <Button className="mt-6 border border-orange-500 text-orange-500 hover:bg-orange-50">
            Tuliskan penilaian Anda
          </Button>
        </div>
        <div className="relative">
          <img src="/testimonial.jpg" alt="Testimonial" className="w-64 rounded-lg" />
          <div className="absolute -bottom-4 left-0 bg-white p-4 shadow rounded-lg w-full text-sm">
            Saya memulai startup saya dengan modal kecil dan kesulitan mencari investor. Setelah mengikuti video kursus tentang pitching ke investor dan berpartisipasi di komunitas, saya akhirnya berhasil.
            <div className="font-semibold mt-2">Sinta Sanskita</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white px-16 py-12 text-sm">
        <div className="flex justify-between mb-8">
          <div>
            <img src="/logo-footer.png" alt="E-tutor" className="w-24 mb-4" />
            <p>Platform edukatif untuk pebisnis, startup founder, dan investor.</p>
            <div className="flex gap-2 mt-4">
              <a href="#" className="bg-gray-800 p-2 rounded">in</a>
              <a href="#" className="bg-gray-800 p-2 rounded">ig</a>
              <a href="#" className="bg-gray-800 p-2 rounded">yt</a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">HUBUNGI KAMI</h4>
            <p>Jl. Bonie Sukasari No. 98, Jakarta</p>
            <p>support@tananetworks1.com</p>
            <p>62 813-5266-7989</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">NAVIGASI CEPAT</h4>
            <p>Home</p>
            <p>Community</p>
            <p>Kontak</p>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-4 text-center">
          © 2021 - Eduflex. Designed by Templatecookie. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
