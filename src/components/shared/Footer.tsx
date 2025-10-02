import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden pt-12 pb-10">
      {/* Background Layer */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 60%, #000000 40%, #010133 100%)",
        }}
      />

      {/* Content Layer */}
      <div className="relative z-10 container mx-auto px-6 sm:px-8 md:px-12 lg:px-20 xl:px-28 text-white">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          {/* Left - Logo + Copyright */}
          <div className="flex justify-center items-center gap-2">
            <Image
              src="/logo.png"
              width={90}
              height={90}
              alt="Logo"
              className="w-20 h-auto"
              priority
            />
            <p className="text-sm text-gray-400">
              © {currentYear} - All rights reserved
            </p>
          </div>

          {/* Center Nav (optional) */}
          <div className="flex flex-wrap justify-center md:justify-start space-x-6 text-sm">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/blogs" className="hover:text-white transition-colors">
              Blogs
            </Link>
            <Link
              href="/projects"
              className="hover:text-white transition-colors"
            >
              Projects
            </Link>
            <Link href="/about" className="hover:text-white transition-colors">
              About
            </Link>
          </div>

          {/* Right - Social Icons */}
          <div className="flex gap-6 text-3xl justify-center md:justify-end">
            <Link
              href="https://www.facebook.com/profile.php?id=100077898306645"
              target="_blank"
            >
              <FaFacebook className="hover:text-blue-500 transition" />
            </Link>
            <Link href="https://github.com/Sadia492" target="_blank">
              <FaGithub className="hover:text-gray-400 transition" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/sadia-afrin01/"
              target="_blank"
            >
              <FaLinkedin className="hover:text-blue-400 transition" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
