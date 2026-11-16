// OWNER: Member 4 - Nato. List of the landlord's properties.
import { useState } from "react";
import { Link } from "react-router-dom";
import { Bath, BedDouble, Plus } from "lucide-react";
import PageHeading from "../../components/shared/PageHeading";
import StateMessage from "../../components/shared/StateMessage";
import SampleDataNotice from "../../components/shared/SampleDataNotice";
import StatusBadge from "../../components/shared/StatusBadge";
import { formatKES } from "../../utils/format";
import { landlordProperties, statusTone } from "./landlordData";

function MyPropertiesPage() {
  const [query, setQuery] = useState("");

  const shown = landlordProperties.filter((p) =>
    `${p.name} ${p.location}`
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <PageHeading
          title="My properties"
          description="View and manage the properties you rent out."
        />
        <Link
          to="/landlord/properties/new"
          className="flex items-center gap-2 rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800"
        >
          <Plus size={16} /> Add property
        </Link>
      </div>
      <SampleDataNotice />

      <label htmlFor="search" className="sr-only">
        Search properties
      </label>
      <input
        id="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name or location"
        className="mb-4 w-full max-w-sm rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
      />

      {shown.length === 0 ? (
        <StateMessage
          title="No properties found"
          message="Try a different search or add a new property."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {shown.map((p) => (
            <article
              key={p.id}
              className="rounded-lg border border-slate-200 bg-white p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-semibold">{p.name}</h2>
                <StatusBadge tone={statusTone(p.status)}>
                  {p.status}
                </StatusBadge>
              </div>
              <p className="text-sm text-slate-600">{p.location}</p>
              <p className="mt-2 flex items-center gap-4 text-sm text-slate-600">
                <span>{p.type}</span>
                <span className="flex items-center gap-1">
                  <BedDouble size={16} /> {p.bedrooms}
                </span>
                <span className="flex items-center gap-1">
                  <Bath size={16} /> {p.bathrooms}
                </span>
              </p>
              <p className="mt-2 font-semibold text-emerald-800">
                {formatKES(p.rent)} / month
              </p>
              <Link
                to={`/landlord/properties/${p.id}/edit`}
                className="mt-3 inline-block text-sm text-emerald-700 underline"
              >
                Edit property
              </Link>
            </article>
          ))}
        </div>
      )}
    </>
  );
}

export default MyPropertiesPage;
