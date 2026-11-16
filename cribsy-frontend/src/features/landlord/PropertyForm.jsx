// OWNER: Member 4 - Nato. One form used by both Add property and Edit property.
// Props: initialValues (optional), submitLabel, onSubmit(values)
import { useState } from "react";
import FormField from "../../components/shared/FormField";
import SelectField from "../../components/shared/SelectField";
import TextAreaField from "../../components/shared/TextAreaField";
import Button from "../../components/shared/Button";
import ImageUpload from "./ImageUpload";

const emptyValues = {
  name: "",
  location: "",
  type: "Apartment",
  rent: "",
  bedrooms: "",
  bathrooms: "",
  description: "",
  status: "Vacant",
};

function validate(v) {
  const errors = {};
  if (v.name.trim().length < 3)
    errors.name = "Enter a property name (at least 3 characters).";
  if (!v.location.trim()) errors.location = "Enter the location.";
  if (v.rent === "" || Number(v.rent) <= 0)
    errors.rent = "Enter a monthly rent above 0.";
  if (v.bedrooms === "" || Number(v.bedrooms) < 0)
    errors.bedrooms = "Enter the number of bedrooms.";
  if (v.bathrooms === "" || Number(v.bathrooms) < 0)
    errors.bathrooms = "Enter the number of bathrooms.";
  if (v.description.trim().length < 10)
    errors.description = "Describe the property (at least 10 characters).";
  return errors;
}

function PropertyForm({
  initialValues,
  submitLabel = "Save property",
  onSubmit,
}) {
  const [values, setValues] = useState({ ...emptyValues, ...initialValues });
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length === 0) onSubmit({ ...values, image });
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="grid gap-4 rounded-lg border border-slate-200 bg-white p-4 md:grid-cols-2 md:p-6"
    >
      <FormField
        id="name"
        name="name"
        label="Property name"
        value={values.name}
        onChange={handleChange}
        error={errors.name}
      />
      <FormField
        id="location"
        name="location"
        label="Location"
        value={values.location}
        onChange={handleChange}
        error={errors.location}
      />
      <SelectField
        id="type"
        name="type"
        label="Property type"
        value={values.type}
        onChange={handleChange}
        options={["Apartment", "House", "Bedsitter", "Studio"]}
      />
      <FormField
        id="rent"
        name="rent"
        label="Monthly rent (KSh)"
        type="number"
        min="0"
        value={values.rent}
        onChange={handleChange}
        error={errors.rent}
      />
      <FormField
        id="bedrooms"
        name="bedrooms"
        label="Bedrooms"
        type="number"
        min="0"
        value={values.bedrooms}
        onChange={handleChange}
        error={errors.bedrooms}
      />
      <FormField
        id="bathrooms"
        name="bathrooms"
        label="Bathrooms"
        type="number"
        min="0"
        value={values.bathrooms}
        onChange={handleChange}
        error={errors.bathrooms}
      />
      <SelectField
        id="status"
        name="status"
        label="Availability"
        value={values.status}
        onChange={handleChange}
        options={[
          { value: "Vacant", label: "Vacant (available to rent)" },
          { value: "Occupied", label: "Occupied" },
        ]}
      />
      <div className="md:col-span-2">
        <TextAreaField
          id="description"
          name="description"
          label="Description"
          value={values.description}
          onChange={handleChange}
          error={errors.description}
        />
      </div>
      <div className="md:col-span-2">
        <ImageUpload onChange={setImage} />
      </div>
      <div className="md:col-span-2">
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}

export default PropertyForm;
