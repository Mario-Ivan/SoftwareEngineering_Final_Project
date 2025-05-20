import { useState } from "react";

const paymentOptions = [
    { method: "Dana", number: "0123 4567 890", name: "Ronaldo Pascol" },
    { method: "Mandiri", number: "0123 4567 890", name: "Ronaldo Pascol" },
];

export default function JoinForm() {
    const [selectedPayment, setSelectedPayment] = useState("Dana");

    return (
        <div className="max-w-2xl mx-auto bg-white p-10 rounded shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-2">
            Bergabunglah Bersama Kami
        </h1>
        <p className="text-center text-gray-600 mb-8">
            Bergabunglah dengan komunitas bisnis eksklusif yang menghubungkan Anda
            dengan para pebisnis profesional, investor, dan mentor bisnis
            berpengalaman!
        </p>

        <form className="space-y-6">
            <div>
            <label className="block mb-1 font-medium">Nama Lengkap</label>
            <input
                type="text"
                placeholder="Masukkan Nama Lengkap"
                className="w-full border border-gray-300 p-2 rounded"
            />
            </div>

            <div className="flex gap-4">
            <div className="w-1/2">
                <label className="block mb-1 font-medium">Email</label>
                <input
                type="email"
                placeholder="Masukkan Email"
                className="w-full border border-gray-300 p-2 rounded"
                />
            </div>
            <div className="w-1/2">
                <label className="block mb-1 font-medium">No Handphone</label>
                <input
                type="text"
                placeholder="Masukkan Nomor HP"
                className="w-full border border-gray-300 p-2 rounded"
                />
            </div>
            </div>

            <div>
            <label className="block mb-1 font-medium">Paket</label>
            <select className="w-full border border-gray-300 p-2 rounded">
                <option>1 Tahun</option>
                <option>6 Bulan</option>
            </select>
            </div>

            <div>
            <label className="block mb-2 font-medium">
                Pilih Metode Pembayaran
            </label>
            <div className="space-y-2">
                {paymentOptions.map((option) => (
                <div
                    key={option.method}
                    onClick={() => setSelectedPayment(option.method)}
                    className={`flex justify-between items-center p-3 border rounded cursor-pointer ${
                    selectedPayment === option.method
                        ? "border-green-500 bg-green-50"
                        : "border-gray-300"
                    }`}
                >
                    <span className="font-medium">{option.method}</span>
                    <span className="text-gray-700">{option.number}</span>
                    <span className="text-gray-700">{option.name}</span>
                </div>
                ))}
            </div>
            </div>

            <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded mt-4 font-semibold"
            >
            Bayar Sekarang
            </button>
        </form>
        </div>
    );
}
