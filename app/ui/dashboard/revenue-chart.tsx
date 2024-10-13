import { generateYAxis } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { Application } from '@/app/lib/types'; // Import Application type

// Function to fetch the driver applications
async function fetchDriverApplications(): Promise<Application[]> {
  const response = await fetch('https://banturide-api.onrender.com/admin/get-driver-applications');
  const data = await response.json();
  return data.applications;
}

export default async function RevenueChart() {
  const applications: Application[] = await fetchDriverApplications();

  // Let's assume we're counting approved applications per month
  const monthlyApplications = applications.reduce((acc, app) => {
    const month = new Date(app.createdAt._seconds * 1000).toLocaleString('default', { month: 'short' });
    if (!acc[month]) acc[month] = 0;
    if (app.driverVerificationStatus === 'approved') acc[month]++;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(monthlyApplications).map(([month, count]) => ({ month, revenue: count }));

  const chartHeight = 350;
  const { yAxisLabels, topLabel } = generateYAxis(chartData);

  if (!chartData || chartData.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Approved Applications
      </h2>
      <div className="rounded-xl bg-gray-50 p-4">
        <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
          {/* y-axis */}
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {chartData.map((data) => (
            <div key={data.month} className="flex flex-col items-center gap-2">
              {/* bars */}
              <div
                className="w-full rounded-md bg-blue-300"
                style={{
                  height: `${(chartHeight / topLabel) * data.revenue}px`,
                }}
              ></div>
              {/* x-axis */}
              <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                {data.month}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Last 12 months</h3>
        </div>
      </div>
    </div>
  );
}
