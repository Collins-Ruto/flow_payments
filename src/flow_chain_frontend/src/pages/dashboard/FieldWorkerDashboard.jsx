import React from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { FileText, Upload, FolderPlus, Download, MoreHorizontal, Users } from 'lucide-react';

export default function FieldWorkerDashboard() {
  const reportFolders = [
    {
      title: 'Analytics reports',
      files: 24,
      icon: <FileText className="w-8 h-8 text-blue-900" />,
      team: ['JC', 'SM', 'DK']
    },
    {
      title: 'SEO reports',
      files: 32,
      icon: <FileText className="w-8 h-8 text-yellow-500" />,
      team: ['SM', 'DK']
    },
    {
      title: 'A/B Testing reports',
      files: 24,
      icon: <FileText className="w-8 h-8 text-purple-500" />,
      team: ['JC']
    }
  ];

  const files = [
    {
      name: 'detailed-seo-analysis-report.docx',
      size: '19KB',
      lastModified: 'Oct 24, 2026, 10:34 AM',
      type: 'DOCX',
      icon: <FileText className="w-4 h-4 text-blue-900" />
    },
    {
      name: 'marketing-report.pdf',
      size: '20KB',
      lastModified: 'Oct 22, 2026, 12:18 PM',
      type: 'PDF',
      icon: <FileText className="w-4 h-4 text-red-500" />
    },
    {
      name: 'marketing-charts-and-graphs.png',
      size: '378KB',
      lastModified: 'Oct 20, 2026, 9:16 AM',
      type: 'PNG',
      icon: <FileText className="w-4 h-4 text-purple-500" />
    },
    {
      name: 'Inbound Marketing Reports',
      size: '1GB',
      lastModified: 'Oct 18, 2026, 4:01 PM',
      type: 'Folder',
      icon: <FileText className="w-4 h-4 text-blue-900" />
    },
    {
      name: 'detailed-seo-analysis-report.xls',
      size: '18KB',
      lastModified: 'Oct 18, 2026, 9:56 PM',
      type: 'XLS',
      icon: <FileText className="w-4 h-4 text-green-500" />
    },
    {
      name: 'marketing-reports-presentation.pptx',
      size: '24MB',
      lastModified: 'Oct 8, 2026, 3:24 PM',
      type: 'PPTX',
      icon: <FileText className="w-4 h-4 text-orange-500" />
    },
    {
      name: 'marketing-presentation.mp4',
      size: '783MB',
      lastModified: 'Oct 3, 2026, 11:35 AM',
      type: 'MP4',
      icon: <FileText className="w-4 h-4 text-blue-500" />
    }
  ];

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <span>All Files</span>
          <span>/</span>
          <span>ChainFlow</span>
          <span>/</span>
          <span className="font-medium text-gray-900">Reports</span>
        </div>

        {/* Report Folders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {reportFolders.map((folder, index) => (
            <div key={index} className="bg-white rounded-xl p-6">
              <div className="flex justify-between items-start mb-6">
                {folder.icon}
                <button className="text-gray-400">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
              <h3 className="font-medium mb-1">{folder.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{folder.files} files</p>
              <div className="flex justify-between items-center">
                <div className="flex -space-x-2">
                  {folder.team.map((member, idx) => (
                    <div 
                      key={idx}
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm border-2 border-white"
                    >
                      {member}
                    </div>
                  ))}
                </div>
                <button className="text-gray-400">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Files Table */}
        <div className="bg-white rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-blue-900 text-white rounded-lg flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload file
              </button>
              <button className="px-4 py-2 border border-blue-900 text-blue-900 rounded-lg flex items-center gap-2">
                <FolderPlus className="w-4 h-4" />
                Create folder
              </button>
            </div>
          </div>

          <table className="w-full">
            <thead>
              <tr className="text-sm text-gray-500 border-b">
                <th className="text-left pb-4 font-medium">NAME ↑</th>
                <th className="text-left pb-4 font-medium">SIZE ↑</th>
                <th className="text-left pb-4 font-medium">LAST MODIFIED ↑</th>
                <th className="text-left pb-4 font-medium">KIND ↑</th>
                <th className="text-right pb-4 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {files.map((file, index) => (
                <tr key={index} className="border-b last:border-0">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      {file.icon}
                      <span className="text-sm">{file.name}</span>
                    </div>
                  </td>
                  <td className="py-4 text-sm text-gray-500">{file.size}</td>
                  <td className="py-4 text-sm text-gray-500">{file.lastModified}</td>
                  <td className="py-4 text-sm text-gray-500">{file.type}</td>
                  <td className="py-4 text-right">
                    <button className="text-gray-400">
                      <Download className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-6 text-sm text-gray-500">
            <div>1 - 10 of 284</div>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-lg border flex items-center justify-center">
                ←
              </button>
              <button className="w-8 h-8 rounded-lg border flex items-center justify-center">
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}