import { useState } from "react";

import AddressField from "./AddressField";
import { allCountries } from "country-region-data";
import { useAddressValidation } from "@/hooks/useAddressValidation";

const initial = {
  fullName: "",
  street: "",
  city: "",
  country: "",
  state: "",
  zip: "",
};

export default function ShippingDetails({ value, onChange }) {
	const [address, setAddress] = useState(value || initial);
	const [touched, setTouched] = useState({});
	const [showErrors, setShowErrors] = useState(false);

	const { regions, validateAddress } = useAddressValidation(address);

	function handleChange(e) {
		const { name, value } = e.target;
		let updated = { ...address, [name]: value };
		if (name === "country") updated.state = "";
		setAddress(updated);
		if (onChange) onChange(updated);
	}

	function handleBlur(e) { setTouched(prev => ({ ...prev, [e.target.name]: true })); }

	function handleConfirm() {
		const { errors, isValid } = validateAddress();
		setShowErrors(true);

		setTouched({
			fullName: true,
			street: true,
			city: true,
			country: true,
			state: true,
			zip: true,
		});

		if (isValid && onChange) {
			onChange(address);
			alert("Address confirmed!");
		} else {
			alert("Error: ", errors);
		}
	}

	const { errors } = validateAddress();
	const getFieldError = (field) => { return errors[field] && (touched[field] || showErrors) ? errors[field] : null; };

	const countryOptions = allCountries.map((country, idx) => ({
		value: country[1], label: country[0] }));

	const regionOptions = regions.map((region, idx) => ({
		value: region[1] || region[0], label: region[0] }));

	return (
		<div className="bg-white rounded-lg shadow p-6 mb-8">
			<h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
			
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
			<AddressField label="Full Name" name="fullName" value={address.fullName} onChange={handleChange} 
				onBlur={handleBlur} error={getFieldError('fullName')} required />
			
			<AddressField label="Street Address" name="street" value={address.street} onChange={handleChange} 
				onBlur={handleBlur} error={getFieldError('street')} required />
			
			<AddressField label="City" name="city" value={address.city} onChange={handleChange} onBlur={handleBlur} 
				error={getFieldError('city')} required />
			
			<AddressField label="Country" name="country" type="select" value={address.country} onChange={handleChange} 
				onBlur={handleBlur} error={getFieldError('country')} options={countryOptions} />
			
			<AddressField label="State/Province" name="state" type={regions.length > 0 ? "select" : "text"} 
				value={address.state} onChange={handleChange} onBlur={handleBlur} error={getFieldError('state')} 
				options={regionOptions} disabled={regions.length === 0} placeholder={regions.length === 0 ? "N/A" : ""} />
			
			<AddressField label="Postal Code" name="zip" value={address.zip} onChange={handleChange} onBlur={handleBlur} 
				error={getFieldError('zip')} required />
			</div>
			
			<button type="button" onClick={handleConfirm} className="btn btn-primary mt-6"> Confirm Address </button>
		</div>
	);
}