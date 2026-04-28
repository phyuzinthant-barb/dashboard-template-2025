import { useState } from "react";

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="w-full h-full">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Dashboard Analytics</h1>
        <p className="text-gray-600">Tooto TV User Insights</p>
      </div>

      <div className="w-full h-[800px] border rounded-lg overflow-hidden relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-gray-600">Loading dashboard...</p>
            </div>
          </div>
        )}

        <iframe
          src="https://lookerstudio.google.com/embed/reporting/cb6e6d0e-e6b2-4f60-b03b-f738ac172085/page/xzEUF"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
