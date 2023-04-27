
let autocomplete;
    let address1Field;

    function initAutocomplete() {
        address1Field = document.querySelector("input[type='text']");
        autocomplete = new google.maps.places.Autocomplete(address1Field, {
            componentRestrictions: { country: ["dk"] },
            fields: ["address_components", "geometry"],
            types: ["address"],
        });
        
        // Listen for når brugeren vælger en adresse fra dropdown-menuen.
        autocomplete.addListener("place_changed", fillInAddress);
    }
    
    function fillInAddress() {
        // Hent detaljerne om adressen fra Autocomplete-objektet.
        const place = autocomplete.getPlace();
        
        // Fyld hver adressekomponent i formularen med den tilsvarende værdi fra stedet.
        for (const component of place.address_components) {
            const componentType = component.types[0];

            switch (componentType) {
                case "street_number":
                    document.querySelector("#address1").value = component.long_name;
                    break;
                case "route":
                    document.querySelector("#address1").value += " " + component.short_name;
                    break;
                case "postal_code":
                    document.querySelector("#postcode").value = component.long_name;
                    break;
                case "locality":
                    document.querySelector("#city").value = component.long_name;
                    break;
                case "administrative_area_level_1":
                    document.querySelector("#state").value = component.short_name;
                    break;
                case "country":
                    document.querySelector("#country").value = component.long_name;
                    break;
            }
        }
    }
    
    window.onload = function() {
        initAutocomplete();
    }