import React from 'react';
import  Input  from '../components/Input';
import Button from '../components/Button';
import MiniNavbar from '../components/miniNavbart';
import Navbar from '../components/Navbar';
import ProfileAvatar from '../components/ProfileAvatar';

export default function AccountSettingsPage() {
  return (
    <>
        <MiniNavbar />
        <Navbar message="Belum punya Akun?" buttonMessage="Daftar Sekarang" route={"/signup"} />
        <div className="min-h-screen bg-gray-100">
            <div className="bg-white shadow p-6 mt-4 mx-auto max-w-4xl">
                <div className="flex items-center space-x-4">
                <ProfileAvatar firstName="Ronaldo" lastName="Pascol" />
                <div>
                    <div className="font-semibold text-lg">Ronaldo Pascol</div>
                    <div className="text-gray-500">ronaldo@gmail.com</div>
                </div>
                </div>
                <div className="flex space-x-8 mt-4 border-b">
                <button className="pb-2 border-b-2 border-orange-500">Akun</button>
                <button className="pb-2">Favorit</button>
                <button className="pb-2">Riwayat Transaksi</button>
                <button className="pb-2">Keluar</button>
                </div>
            </div>

            {/* Account Form */}
            <div className="mt-6 mx-auto max-w-4xl bg-white p-6 shadow">
                <h2 className="text-xl font-semibold mb-4">Pengaturan Akun</h2>
                <div className="flex gap-6">
                <img
                    src="https://via.placeholder.com/150"
                    alt="profile"
                    className="w-40 h-40 object-cover rounded"
                />
                <form className="flex-1 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Nama Depan" defaultValue="Ronaldo" />
                    <Input placeholder="Nama Belakang" defaultValue="Pascol" />
                    </div>
                    <Input placeholder="Username" defaultValue="Ronaldo" />
                    <Input placeholder="Email" defaultValue="ronaldo@gmail.com" />
                    <Input placeholder="No Handphone" defaultValue="0812 2823 2292" />
                    <Input type="password" placeholder="Password" />
                    <Input placeholder="Foto (URL)" />
                    <Button type="submit" onClick={() => {
                        console.log("Debug");
                    }} text="Simpan Perubahan" />
                </form>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-white mt-12 p-8">
                <div className="max-w-6xl mx-auto grid grid-cols-4 gap-8">
                <div>
                    <div className="text-orange-500 font-bold text-xl mb-2">E-tutor</div>
                    <p>Platform edukasi untuk pelajar, startup founder, dan investor.</p>
                    <div className="flex space-x-2 mt-2">
                    <span>📘</span>
                    <span>📷</span>
                    <span>💼</span>
                    <span>📺</span>
                    </div>
                </div>
                <div>
                    <div className="font-semibold mb-2">Hubungi Kami</div>
                    <p>Jl. Bima Sakes No. 99, Jakarta</p>
                    <p>support@namatutorid.com</p>
                    <p>62 812-3456-7890</p>
                </div>
                <div>
                    <div className="font-semibold mb-2">Navigasi Cepat</div>
                    <p>Home</p>
                    <p>Skill (Video)</p>
                    <p>Community</p>
                    <p>Kontak</p>
                </div>
                <div>
                    <div className="font-semibold mb-2">Support</div>
                    <p>Help Center</p>
                    <p>FAQs</p>
                    <p>Terms & Condition</p>
                    <p>Privacy Policy</p>
                </div>
                </div>
                <div className="text-center text-gray-500 text-sm mt-6">
                © 2021 - E-tutor. Designed by TemplatemoSite. All rights reserved.
                </div>
            </footer>
        </div>
    </>
  );
}
