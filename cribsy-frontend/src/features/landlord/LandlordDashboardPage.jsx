// OWNER: Member 4 - Nato. Landlord dashboard overview.
import { Link } from "react-router-dom";
import PageHeading from "../../components/shared/PageHeading";
import SampleDataNotice from "../../components/shared/SampleDataNotice";
import StatusBadge from "../../components/shared/StatusBadge";
import { formatDate, formatKES } from "../../utils/format";
import {
  landlordMaintenance,
  landlordProperties,
  landlordRentRecords,
  landlordTenants,
  statusTone,
} from "./landlordData";

function LandlordDashboardPage() {
  const stats = [
    { label: "Total properties", value: landlordProperties.length },
    {
      label: "Occupied",
      value: landlordProperties.filter((p) => p.status === "Occupied").length,
    },
    {
      label: "Vacant",
      value: landlordProperties.filter((p) => p.status === "Vacant").length,
    },
    { label: "Registered tenants", value: landlordTenants.length },
    {
      label: "Pending maintenance",
      value: landlordMaintenance.filter((m) => m.status === "Pending").length,
    },
  ];

  const recent = [...landlordRentRecords]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 4);

  function tenantName(id) {
    return landlordTenants.find((t) => t.id === id)?.name ?? "Unknown tenant";
  }

  return (
    <>
      <PageHeading
        title="Dashboard"
        description="An overview of your properties, tenants and rent."
      />
      <SampleDataNotice />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-lg border border-slate-200 bg-white p-4"
          >
            <p className="text-sm text-slate-600">{s.label}</p>
            <p className="mt-1 text-2xl font-bold text-emerald-800">
              {s.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          to="/landlord/properties/new"
          className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800"
        >
          Add property
        </Link>
        <Link
          to="/landlord/tenants"
          className="rounded-md border border-emerald-700 px-4 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-50"
        >
          View tenants
        </Link>
      </div>

      <h2 className="mb-2 mt-8 text-lg font-semibold">Recent rent records</h2>
      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-2">Tenant</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {recent.map((r) => (
              <tr key={r.id} className="border-t border-slate-100">
                <td className="px-4 py-2">{tenantName(r.tenantId)}</td>
                <td className="px-4 py-2">{formatKES(r.amount)}</td>
                <td className="px-4 py-2">{formatDate(r.date)}</td>
                <td className="px-4 py-2">
                  <StatusBadge tone={statusTone(r.status)}>
                    {r.status}
                  </StatusBadge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default LandlordDashboardPage;
