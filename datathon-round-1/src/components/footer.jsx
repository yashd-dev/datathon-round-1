import { Github, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-blue-50">
      <div className="p-6 bg-white mx-auto relative z-10 overflow-hidden border border-b-0 border-gray-200">
        <div className="flex flex-col items-center gap-4 text-center">
          <Link href="/">
            {/* <LogoType className='h-7 text-gray-800' /> */}
          </Link>
          <p className="max-w-md text-sm text-gray-500">
            A hackathon project that turned out much better than we expected :D
          </p>

          <p className="text-sm leading-5 text-gray-400">
            © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
