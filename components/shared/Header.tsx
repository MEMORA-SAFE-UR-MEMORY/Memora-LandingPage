"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { kumbhSans, montserrat } from "@/fonts/font";
import Logo from "../../public/logo/Logo.svg";
import { LogOut, Package, UserRound, Menu, X } from "lucide-react";

const AUTH_EVENT = "memora:auth";

export default function Header() {
  const router = useRouter();
  const [open, setOpen] = useState(false); // mobile menu
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false); // desktop profile dropdown
  const profileRef = useRef<HTMLDivElement | null>(null);

  // đơn giản: kiểm tra 1 lần khi mount + nghe mỗi AUTH_EVENT
  useEffect(() => {
    const check = () => setIsLoggedIn(!!localStorage.getItem("accessToken"));
    check();
    const onAuth = () => check();
    window.addEventListener(AUTH_EVENT, onAuth as EventListener);
    return () =>
      window.removeEventListener(AUTH_EVENT, onAuth as EventListener);
  }, []);

  // click outside để đóng dropdown profile
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!profileRef.current) return;
      if (!profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    };
    if (profileOpen) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [profileOpen]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.dispatchEvent(new Event(AUTH_EVENT));
    setOpen(false);
    setProfileOpen(false);
    router.push("/login");
  };

  return (
    <header className="w-full absolute top-0 left-0 z-50">
      <div className="mx-auto w-[min(96vw,1200px)] flex items-center justify-between py-4 sm:py-5 px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src={Logo} alt="logo" width={80} height={80} priority />
        </Link>

        {/* Desktop nav */}
        <nav
          className={`hidden md:flex items-center gap-10 text-base ${montserrat.className}`}
        >
          <Link href="/" className="text-black hover:opacity-80">
            Trang chủ
          </Link>
          <Link href="/#about" className="text-black hover:opacity-80">
            Về chúng tôi
          </Link>
          <Link href="/#features" className="text-black hover:opacity-80">
            Tính năng
          </Link>
          <Link href="/privacy-policy" className="text-black hover:opacity-80">
            Chính sách và Điều khoản
          </Link>
        </nav>

        {/* Desktop actions */}
        <div className={`${montserrat.className} hidden md:flex items-center`}>
          {isLoggedIn ? (
            <div ref={profileRef} className="relative">
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={profileOpen}
                onClick={() => setProfileOpen((v) => !v)}
                className="inline-flex items-center justify-center h-10 w-10 rounded-full border hover:bg-black/5"
                title="Tài khoản"
              >
                <UserRound size={18} />
              </button>

              {profileOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-56 rounded-2xl bg-white shadow-xl ring-1 ring-black/10 p-1"
                >
                  <Link
                    href="/orders"
                    onClick={() => setProfileOpen(false)}
                    role="menuitem"
                    className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-black/5"
                  >
                    <Package size={16} />
                    <span>Đơn hàng của bạn</span>
                  </Link>
                  <button
                    role="menuitem"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-3 py-2 rounded-md hover:bg-black/5 text-left"
                  >
                    <LogOut size={16} />
                    <span>Đăng xuất</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className={`inline-block bg-black text-white px-5 py-2.5 rounded-md text-sm ${montserrat.className}`}
            >
              Đăng nhập
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          aria-label={open ? "Close Menu" : "Open Menu"}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-black/80 hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-black/20"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden absolute inset-x-0 top-full px-4 sm:px-6 pb-4">
          <div className="mx-auto w-full max-w-[680px] rounded-2xl bg-white shadow-xl ring-1 ring-black/10 p-2 sm:p-3">
            <div className={`flex flex-col ${montserrat.className}`}>
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-black hover:bg-black/5"
              >
                Trang chủ
              </Link>
              <Link
                href="/#about"
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-black hover:bg-black/5"
              >
                Về chúng tôi
              </Link>
              <Link
                href="/#features"
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-black hover:bg-black/5"
              >
                Tính năng
              </Link>
              <Link
                href="/privacy-policy"
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-black hover:bg-black/5"
              >
                Chính sách và Điều khoản
              </Link>

              <div className="px-4 py-3 mt-1">
                {isLoggedIn ? (
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/orders"
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-center gap-2 rounded-md border px-5 py-2.5 text-sm hover:bg-black/5"
                    >
                      Đơn hàng của bạn
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full rounded-md bg-black text-white px-5 py-2.5 text-sm"
                    >
                      Đăng xuất
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="block w-full text-center bg-black text-white px-5 py-2.5 rounded-md text-sm"
                  >
                    Đăng nhập
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
