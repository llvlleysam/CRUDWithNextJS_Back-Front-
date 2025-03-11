"use client";

import { useState } from "react";
import { FaGithub, FaTelegram, FaEnvelope, FaInstagram } from "react-icons/fa";

const socialLinks = [
  { name: "GitHub", icon: <FaGithub />, url: "https://github.com/llvlleysam" },
  { name: "Telegram", icon: <FaTelegram />, url: "https://t.me/llvlleysamF" },
  { name: "Email", icon: <FaEnvelope />, url: "mailto:meysam.farzalian@gmail.com" },
  { name: "Instagram", icon: <FaInstagram />, url: "https://www.instagram.com/llvlleysam/profilecard/?igsh=dGdnNDR3NThqY2R6" },
];

export default function SocialLinks() {
  const [hovered, setHovered] = useState(null as string | null);

  return (
    <div className="flex gap-4">
      {socialLinks.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-center p-3 rounded-full transition-all duration-300 group"
          onMouseEnter={() => setHovered(link.name)}
          onMouseLeave={() => setHovered(null)}
        >
          {/* آیکون */}
          <span className="text-gray-600 group-hover:text-blue-500 text-2xl transition-all duration-300">
            {link.icon}
          </span>

          {/* متن نمایش داده‌شده هنگام هاور */}
          {hovered === link.name && (
            <span className="absolute top-12 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300">
              {link.name}
            </span>
          )}
        </a>
      ))}
    </div>
  );
}
