
import React from 'react';
import {
  Mail,
  Phone,
  FileText,
  Clock,
  Facebook,
  Linkedin,
} from 'lucide-react';

const icons = { facebook: Facebook, linkedin: Linkedin };

export function ContactCard({
  id,
  name,
  email,
  phone,
  owner,
  notes,
  lastActive,
  platform,
  selected = false,
}) {
  const Icon = icons[platform];
  return (
    <div
      className={`w-72 bg-white rounded-lg shadow-sm flex-shrink-0 ${
        selected ? 'border-2 border-blue-500' : 'border border-gray-200'
      }`}
    >
      {/* Header */}
      <div className="flex items-center px-4 py-2 border-b border-gray-200 space-x-2">
        <Icon className="w-5 h-5 text-blue-600" />
        <h3 className="text-sm font-semibold leading-snug">{name}</h3>
      </div>

      {/* Body */}
      <div className="px-4 py-3 space-y-2">
        <div className="flex items-center space-x-2 text-xs text-gray-600">
          <Mail className="w-4 h-4 text-gray-400" />
          <span>{email}</span>
        </div>
        <div className="flex items-center space-x-2 text-xs text-gray-600">
          <Phone className="w-4 h-4 text-gray-400" />
          <span>{phone}</span>
        </div>
        <div className="flex items-center space-x-2 text-xs text-gray-600">
          <div
            className="
              w-5 h-5
              rounded-full
              bg-gray-400
              flex items-center justify-center
              text-white text-[10px] font-semibold
            "
          >
            {owner.charAt(0).toUpperCase()}
          </div>
          <span>{owner}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between px-4 py-2 border-t border-gray-200 text-xs text-gray-600">
        <div className="flex items-center space-x-1">
          <FileText className="w-4 h-4 text-gray-400" />
          <span>{notes} Notes</span>
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4 text-gray-400" />
          <span>{lastActive}</span>
        </div>
      </div>
    </div>
  );
}
