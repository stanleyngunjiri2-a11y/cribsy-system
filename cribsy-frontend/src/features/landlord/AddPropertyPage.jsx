import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeading from "../../components/shared/PageHeading";
import PropertyForm from "./PropertyForm";

function AddPropertyPage() {
  const [savedName, setSavedName] = useState("");

  return (
    <>
      <Link
        to="/landlord/properties"
        className="text-sm text-emerald-700 underline"
      >
        Back to my properties
      </Link>
      <div className="mt-2">
        <PageHeading
          title="Add property"
          description="Enter the details of the property you want to list."
        />
      </div>

      {savedName && (
        <p
          role="status"
          className="mb-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800"
        >
          The form for "{savedName}" is valid, but it was not saved because the
          backend is not connected yet.
        </p>
      )}

      <PropertyForm
        submitLabel="Save property"
        onSubmit={(values) => setSavedName(values.name)}
      />
    </>
  );
}

export default AddPropertyPage;
