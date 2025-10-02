import { useMemo } from "react";
import { allCountries } from "country-region-data";
import { postcodeValidator, postcodeValidatorExistsForCountry } from "postcode-validator";

export function useAddressValidation(address) {
	const selectedCountry = useMemo(
		() => allCountries.find(c => c[1] === address.country),
		[address.country]
	);

	const regions = selectedCountry?.[2] || [];

	function validateAddress() {
		let isValidZip = true;

		if (address.zip && address.country) {
			try {
				if (postcodeValidatorExistsForCountry(address.country)) {
					isValidZip = postcodeValidator(address.zip, address.country);
				} else {
					isValidZip = true;
				}
			} catch (error) {
				console.log("Postcode validation error:", error);
				isValidZip = false;
			}
		}

		const errors = {
			fullName: !address.fullName ? "Full name is required" : null,
			street: !address.street ? "Street address is required" : null,
			city: !address.city ? "City is required" : null,
			country: !address.country ? "Country is required" : null,
			state: (regions.length > 0 && !address.state) ? "State/Province is required" : null,
			zip: !address.zip ? "Postal code is required" : 
				(!isValidZip ? "Invalid postal code for selected country" : null),
		};

		const isValid = Object.values(errors).every(v => !v);
		return { errors, isValid };
	}

	return { regions, selectedCountry, validateAddress };
}