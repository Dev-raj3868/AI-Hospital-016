
import React from 'react';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="h-6 w-6 text-blue-400" />
              <h3 className="text-lg font-bold">Dockyard Health Monitor</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Comprehensive health monitoring and management system for dockyard personnel.
              Ensuring the wellbeing of our workforce through advanced health analytics.
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Health Dashboard</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">AME Schedule</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Health Records</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-3">Contact Info</h4>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>health@dockyard.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>123 Harbor St, Port City</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; 2024 Dockyard Health Monitor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
