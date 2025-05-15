import { Phone } from 'lucide-react';
import Image from 'next/image';

function Footer() {
  return (
    <footer className="relative bg-[#008C9E] text-white pt-20 pb-12 mt-20">
      {/* Emergency Box */}
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white text-[#152847] px-6 py-6 rounded-md shadow-lg w-full max-w-md flex items-center space-x-4">
        <div className="bg-[#008C9E] text-white p-4 rounded-full">
          <Phone className="text-2xl" />
        </div>
        <div>
          <p className="text-sm">Emergency Service</p>
          <h3 className="text-2xl font-bold">511 - 589 - 6656</h3>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-12">
        {/* Column 1 */}
        <div className="space-y-4">
          <Image src="/logo2.svg" alt="logo" width={180} height={80} className="shadow-2xl" />
          <p className="mb-4 text-sm leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
          <button className="bg-white text-[#33b9cb] font-semibold px-6 py-2 rounded-full hover:bg-gray-100 transition">Appointment</button>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="font-bold mb-3">Page</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">About</a></li>
            <li><a href="#">Service</a></li>
            <li><a href="#">Page</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Doctor</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="font-bold mb-3">Favorite</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">About</a></li>
            <li><a href="#">Service</a></li>
            <li><a href="#">Page</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Doctor</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

        {/* Column 4 */}
        <div className="space-y-4">
          <h3 className="font-bold mb-3">Fun Fact</h3>
          <p className="text-3xl font-bold">150 K <sup>+</sup></p>
          <p className="text-sm mt-1">Patient</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-white/30 mt-18 pt-2 px-4 flex flex-col md:flex-row justify-between items-center text-sm">
        <p>Copyright © 2021 Medicare | Powered by Risegraph</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-youtube"></i></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
