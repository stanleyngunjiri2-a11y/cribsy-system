// OWNER: Member 4 - Nato. Edit an existing property (uses the same form as Add property).
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageHeading from "../../components/shared/PageHeading";
import StateMessage from "../../components/shared/StateMessage";
import PropertyForm from "./PropertyForm";
import { landlordProperties } from "./landlordData";

function EditPropertyPage() {
  const { id } = useParams();
  const property = landlordProperties.find((p) => p.id === id);
  const [saved, setSaved] = useState(false);

  if (!property) {
    return (
      <>
        <StateMessage
          title="Property not found"
          message="This property does not exist."
        />
        <Link
          to="/landlord/properties"
          className="mt-4 inline-block text-emerald-700 underline"
        >
          Back to my properties
        </Link>
      </>
    );
  }

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
          title={`Edit ${property.name}`}
          description="Update the details of this property."
        />
      </div>

      {saved && (
        <p
          role="status"
          className="mb-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800"
        >
          The changes are valid, but they were not saved because the backend is
          not connected yet.
        </p>
      )}

      <PropertyForm
        initialValues={property}
        submitLabel="Save changes"
        onSubmit={() => setSaved(true)}
      />
    </>
  );
}

export default EditPropertyPage;
