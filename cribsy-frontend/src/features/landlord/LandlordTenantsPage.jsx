// OWNER: Member 4 - Nato. Tenants and their tenancy information.
import PageHeading from "../../components/shared/PageHeading";
import StateMessage from "../../components/shared/StateMessage";
import SampleDataNotice from "../../components/shared/SampleDataNotice";
import StatusBadge from "../../components/shared/StatusBadge";
import { formatDate } from "../../utils/format";
import {
  landlordProperties,
  landlordTenants,
  statusTone,
} from "./landlordData";

function LandlordTenantsPage() {
  function propertyName(id) {
    return landlordProperties.find((p) => p.id === id)?.name ?? "Not assigned";
  }

  return (
    <>
      <PageHeading
        title="Tenants"
        description="Tenant details and tenancy information for your properties."
      />
      <SampleDataNotice />

      {landlordTenants.length === 0 ? (
        <StateMessage
          title="No tenants yet"
          message="Tenants assigned to your properties will appear here."
        />
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-2">Tenant</th>
                <th className="px-4 py-2">Contact</th>
                <th className="px-4 py-2">Property</th>
                <th className="px-4 py-2">Lease period</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {landlordTenants.map((t) => (
                <tr key={t.id} className="border-t border-slate-100 align-top">
                  <td className="px-4 py-2 font-medium">{t.name}</td>
                  <td className="px-4 py-2">
                    {t.phone}
                    <br />
                    <span className="text-slate-500">{t.email}</span>
                  </td>
                  <td className="px-4 py-2">{propertyName(t.propertyId)}</td>
                  <td className="px-4 py-2">
                    {formatDate(t.leaseStart)} to {formatDate(t.leaseEnd)}
                  </td>
                  <td className="px-4 py-2">
                    <StatusBadge tone={statusTone(t.status)}>
                      {t.status}
                    </StatusBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default LandlordTenantsPage;
