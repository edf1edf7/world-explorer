// Country data for each continent
const continentData = {
    africa: {
        name: "Africa",
        countries: [
            "Algeria", "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi", "Cabo Verde", "Cameroon",
            "Central African Republic", "Chad", "Comoros", "Congo", "Democratic Republic of the Congo", "Côte d'Ivoire", "Djibouti", "Egypt",
            "Equatorial Guinea", "Eritrea", "Eswatini", "Ethiopia", "Gabon", "Gambia", "Ghana", "Guinea",
            "Guinea-Bissau", "Kenya", "Lesotho", "Liberia", "Libya", "Madagascar", "Malawi", "Mali",
            "Mauritania", "Mauritius", "Morocco", "Mozambique", "Namibia", "Niger", "Nigeria", "Rwanda",
            "Sao Tome and Principe", "Senegal", "Seychelles", "Sierra Leone", "Somalia", "South Africa",
            "South Sudan", "Sudan", "Tanzania", "Togo", "Tunisia", "Uganda", "Zambia", "Zimbabwe"
        ]
    },
    asia: {
        name: "Asia",
        countries: [
            "Afghanistan", "Armenia", "Azerbaijan", "Bahrain", "Bangladesh", "Bhutan", "Brunei", "Cambodia",
            "China", "Cyprus", "Georgia", "India", "Indonesia", "Iran", "Iraq", "Israel", "Japan", "Jordan",
            "Kazakhstan", "Kuwait", "Kyrgyzstan", "Laos", "Lebanon", "Malaysia", "Maldives", "Mongolia",
            "Myanmar", "Nepal", "North Korea", "Oman", "Pakistan", "Palestine", "Philippines", "Qatar",
            "Russia", "Saudi Arabia", "Singapore", "South Korea", "Sri Lanka", "Syria", "Taiwan", "Tajikistan",
            "Thailand", "Timor-Leste", "Turkey", "Turkmenistan", "United Arab Emirates", "Uzbekistan",
            "Vietnam", "Yemen"
        ]
    },
    europe: {
        name: "Europe",
        countries: [
            "Albania", "Andorra", "Austria", "Belarus", "Belgium", "Bosnia and Herzegovina", "Bulgaria",
            "Croatia", "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece",
            "Hungary", "Iceland", "Ireland", "Italy", "Kosovo", "Latvia", "Liechtenstein", "Lithuania",
            "Luxembourg", "Malta", "Moldova", "Monaco", "Montenegro", "Netherlands", "North Macedonia",
            "Norway", "Poland", "Portugal", "Romania", "Russia", "San Marino", "Serbia", "Slovakia",
            "Slovenia", "Spain", "Sweden", "Switzerland", "Ukraine", "United Kingdom", "Vatican City"
        ]
    },
    "north-america": {
        name: "North America",
        countries: [
            "Canada",
            "United States of America",
            "Mexico"
        ]
    },
    "central-america": {
        name: "Central America",
        countries: [
            "Belize", "Costa Rica", "El Salvador", "Guatemala", "Honduras", "Nicaragua", "Panama"
        ]
    },
    "caribbean": {
        name: "Caribbean",
        countries: [
            "Antigua and Barbuda", "Bahamas", "Barbados", "Cuba", "Dominica", "Dominican Republic",
            "Grenada", "Haiti", "Jamaica", "Saint Kitts and Nevis", "Saint Lucia",
            "Saint Vincent and the Grenadines", "Trinidad and Tobago"
        ]
    },
    "south-america": {
        name: "South America",
        countries: [
            "Argentina", "Bolivia", "Brazil", "Chile", "Colombia", "Ecuador", "Guyana", "Paraguay",
            "Peru", "Suriname", "Uruguay", "Venezuela"
        ]
    },
    oceania: {
        name: "Oceania",
        countries: [
            "Australia", "Fiji", "Kiribati", "Marshall Islands", "Micronesia", "Nauru", "New Zealand",
            "Palau", "Papua New Guinea", "Samoa", "Solomon Islands", "Tonga", "Tuvalu", "Vanuatu"
        ]
    }
};

// Get the current continent from URL parameters
function getCurrentContinent() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('continent') || 'africa';
}

// Update the continent name in the title
function updateContinentTitle() {
    const continent = getCurrentContinent();
    const continentNameElement = document.getElementById('continent-name');
    if (continentNameElement) {
        continentNameElement.textContent = continentData[continent].name;
    }
}

// Call updateContinentTitle when the page loads
document.addEventListener('DOMContentLoaded', updateContinentTitle);

// Show feedback message
function showFeedback(message, isCorrect) {
    // Create feedback element if it doesn't exist
    let feedback = document.getElementById('feedback');
    if (!feedback) {
        feedback = document.createElement('div');
        feedback.id = 'feedback';
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            border-radius: 5px;
            color: white;
            font-weight: bold;
            display: none;
            z-index: 1000;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        `;
        document.body.appendChild(feedback);
    }
    
    if (isCorrect) {
        // Random encouraging messages for correct answers
        const messages = [
            "Mid lit",
            "Okay, that was aura",
            "Auramaxxing brah!",
            "So sigma",
            "Outstanding",
            "friggin awesome",
            "Correct!",
            "Genius",
            "Wow, I mean, wow",
            "Shablamss!",
            "Chully Farged!!"
        ];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        feedback.textContent = randomMessage;
        feedback.className = 'feedback correct';
        feedback.style.backgroundColor = '#4CAF50';
    } else {
        feedback.textContent = message;
        feedback.className = 'feedback incorrect';
        feedback.style.backgroundColor = '#f44336';
    }
    
    // Show the feedback
    feedback.style.display = 'block';
    
    // Add animation
    feedback.style.animation = 'slideIn 0.5s ease-out';
    
    // Hide after 2 seconds
    setTimeout(() => {
        feedback.style.display = 'none';
        feedback.style.animation = '';
    }, 2000);
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    .feedback {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        display: none;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    }

    .feedback.correct {
        background-color: #4CAF50;
    }

    .feedback.incorrect {
        background-color: #f44336;
    }
`;
document.head.appendChild(style);

// Initialize the learning page
async function initLearningPage() {
    const continent = getCurrentContinent();
    console.log('Current continent:', continent);
    const continentName = continentData[continent].name;
    document.getElementById('continent-name').textContent = continentName;

    // Create button container
    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = `
        display: flex;
        gap: 10px;
        margin-bottom: 20px;
        justify-content: center;
        margin-top: 20px;
    `;
    document.querySelector('.learning-container').appendChild(buttonContainer);

    // Create restart button
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Restart Test';
    restartButton.style.cssText = `
        padding: 8px 16px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    `;
    restartButton.onclick = () => location.reload();
    buttonContainer.appendChild(restartButton);

    // Create reset zoom button
    const resetZoomButton = document.createElement('button');
    resetZoomButton.textContent = 'Reset Zoom';
    resetZoomButton.style.cssText = `
        padding: 8px 16px;
        background-color: #2196F3;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    `;
    resetZoomButton.onclick = () => {
        svg.transition().duration(750).call(
            zoom.transform,
            d3.zoomIdentity
        );
    };
    buttonContainer.appendChild(resetZoomButton);

    // Create show all names button
    const showNamesButton = document.createElement('button');
    showNamesButton.textContent = 'Show All Names';
    showNamesButton.style.cssText = `
        padding: 8px 16px;
        background-color: #FF9800;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    `;
    showNamesButton.onclick = () => {
        const isHidden = showNamesButton.textContent === 'Show All Names';
        
        // Remove all existing labels and lines
        const existingLabels = document.querySelectorAll('.country-label');
        existingLabels.forEach(label => label.remove());
        
        // Remove all lines
        const existingLines = document.querySelectorAll('line');
        existingLines.forEach(line => line.remove());
        
        if (isHidden) {
            // Get all countries in the current continent
            const countries = continentData[continent].countries;
            
            // Create labels for all countries
            countries.forEach(country => {
                const countryElement = document.querySelector(`[data-name="${country}"]`);
                if (countryElement) {
                    const svg = countryElement.closest('svg');
                    const mapGroup = svg.querySelector('g');
                    
                    // Get country dimensions
                    const bbox = countryElement.getBBox();
                    const centerX = bbox.x + bbox.width/2;
                    const centerY = bbox.y + bbox.height/2;
                    
                    // Calculate area and determine font size
                    const area = bbox.width * bbox.height;
                    const baseFontSize = 4; // Base font size for reference
                    const minFontSize = 2.5; // Minimum font size
                    const maxFontSize = 5; // Maximum font size
                    
                    // Calculate proportional font size based on area
                    // Using a square root scale to handle large variations in area
                    const fontSize = Math.min(maxFontSize, 
                        Math.max(minFontSize, 
                            baseFontSize * Math.sqrt(area) / Math.sqrt(1000)));
                    
                    // Create text element
                    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
                    text.setAttribute("x", "0");
                    text.setAttribute("y", "0");
                    text.setAttribute("text-anchor", "middle");
                    text.setAttribute("dominant-baseline", "middle");
                    text.setAttribute("fill", "white");
                    text.setAttribute("font-size", `${fontSize}px`);
                    text.setAttribute("font-weight", "bold");
                    text.setAttribute("opacity", "0.9");
                    text.textContent = country;
                    
                    // Create background rectangle with proportional size
                    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                    const textLength = country.length * (fontSize * 0.5); // Reduced text length multiplier
                    const padding = fontSize * 0.4; // Reduced padding
                    rect.setAttribute("x", "-" + (textLength/2 + padding));
                    rect.setAttribute("y", "-" + (fontSize/2 + padding/2));
                    rect.setAttribute("width", textLength + (padding * 2));
                    rect.setAttribute("height", fontSize + padding);
                    rect.setAttribute("fill", "#2196F3");
                    rect.setAttribute("rx", "2");
                    rect.setAttribute("opacity", "0.7");
                    
                    // Create a group for the label
                    const labelGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
                    labelGroup.classList.add('country-label');
                    labelGroup.appendChild(rect);
                    labelGroup.appendChild(text);
                    labelGroup.setAttribute("pointer-events", "none");
                    
                    // Position label group in the center of the country
                    labelGroup.setAttribute("transform", `translate(${centerX},${centerY})`);
                    
                    // Add the label to the map group
                    mapGroup.appendChild(labelGroup);
                }
            });
        }
        
        // Toggle button text
        showNamesButton.textContent = isHidden ? 'Hide All Names' : 'Show All Names';
    };
    buttonContainer.appendChild(showNamesButton);

    // Create progress container
    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress-container';
    progressContainer.style.cssText = `
        width: 300px;
        margin: 20px auto;
        background: white;
        padding: 15px;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    `;
    document.querySelector('.learning-container').appendChild(progressContainer);

    // Create progress title
    const progressTitle = document.createElement('div');
    progressTitle.textContent = 'Progress';
    progressTitle.style.cssText = `
        text-align: center;
        font-weight: bold;
        margin-bottom: 10px;
    `;
    progressContainer.appendChild(progressTitle);

    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.style.cssText = `
        width: 100%;
        height: 20px;
        background-color: #e9ecef;
        border-radius: 10px;
        overflow: hidden;
    `;
    progressContainer.appendChild(progressBar);

    // Create progress fill
    const progressFill = document.createElement('div');
    progressFill.id = 'progress-fill';
    progressFill.className = 'progress-fill';
    progressFill.style.cssText = `
        width: 0%;
        height: 100%;
        background-color: #4CAF50;
        transition: width 0.3s ease;
    `;
    progressBar.appendChild(progressFill);

    // Create progress text
    const progressText = document.createElement('div');
    progressText.id = 'progress-text';
    progressText.textContent = '0%';
    progressText.style.cssText = `
        text-align: center;
        margin-top: 5px;
        font-weight: bold;
    `;
    progressContainer.appendChild(progressText);

    // Create map container
    const mapContainer = document.createElement('div');
    mapContainer.className = 'map-container';
    document.querySelector('.learning-container').appendChild(mapContainer);

    // Create disclaimer
    const disclaimer = document.createElement('div');
    disclaimer.style.cssText = `
        position: fixed;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 12px;
        color: #666;
        text-align: center;
        background: rgba(255, 255, 255, 0.8);
        padding: 5px 10px;
        border-radius: 4px;
        z-index: 1000;
    `;
    disclaimer.textContent = 'Note: Some territories shown may be disputed. Map data is for educational purposes only.';
    document.body.appendChild(disclaimer);

    // Create SVG element
    const svg = d3.select(mapContainer)
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%");

    // Add water background
    svg.append("rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("fill", "#4a90e2")
        .attr("opacity", "0.7"); // Make the blue more translucent

    // Create a group for all map elements
    const mapGroup = svg.append("g");

    // Create zoom behavior
    const zoom = d3.zoom()
        .scaleExtent([1, 20])
        .on("zoom", (event) => {
            mapGroup.attr("transform", event.transform);
        });

    // Create country list container
    const countryListContainer = document.createElement('div');
    countryListContainer.style.cssText = `
        width: 100%;
        max-width: 800px;
        margin: 20px auto;
        background-color: white;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        overflow: hidden;
    `;
    document.querySelector('.learning-container').appendChild(countryListContainer);

    // Create country list title
    const countryListTitle = document.createElement('div');
    countryListTitle.textContent = 'Countries to Find';
    countryListTitle.style.cssText = `
        padding: 15px;
        background-color: #f8f9fa;
        border-bottom: 1px solid #dee2e6;
        font-weight: bold;
        text-align: center;
    `;
    countryListContainer.appendChild(countryListTitle);

    // Create scrollable country list
    const countryListScroll = document.createElement('div');
    countryListScroll.style.cssText = `
        padding: 10px;
        overflow-y: auto;
        max-height: 300px;
    `;
    countryListContainer.appendChild(countryListScroll);

    // Add countries to the list
    const countries = continentData[continent].countries;
    countries.forEach(country => {
        const countryItem = document.createElement('div');
        countryItem.textContent = country;
        countryItem.className = 'country-item';
        countryItem.style.cssText = `
            padding: 8px;
            margin: 4px 0;
            background-color: #f8f9fa;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        `;
        countryItem.onmouseover = () => {
            countryItem.style.backgroundColor = '#e9ecef';
        };
        countryItem.onmouseout = () => {
            countryItem.style.backgroundColor = '#f8f9fa';
        };
        countryItem.onclick = () => {
            // Find the currently selected country on the map
            const selectedCountry = document.querySelector('path[data-name]');
            if (selectedCountry) {
                const countryName = selectedCountry.getAttribute('data-name');
                showCountryInput(country);
            }
        };
        countryListScroll.appendChild(countryItem);
    });

    // Load the TopoJSON data
    try {
        console.log('Loading map data...');
        const response = await fetch(`https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json`);
        if (!response.ok) {
            console.error('Failed to fetch map data:', response.status, response.statusText);
            throw new Error('Failed to load map data');
        }
        const worldData = await response.json();
        console.log('Map data loaded successfully');

        // Convert TopoJSON to GeoJSON
        const countries = topojson.feature(worldData, worldData.objects.countries);
        console.log('Converted to GeoJSON');

        // Create a projection
        const projection = d3.geoMercator()
            .fitSize([mapContainer.clientWidth, mapContainer.clientHeight], countries);
        console.log('Created projection');

        // Create a path generator
        const path = d3.geoPath()
            .projection(projection);
        console.log('Created path generator');

        // Add countries
        console.log('Adding countries to map...');
        mapGroup.selectAll("path")
            .data(countries.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("fill", d => {
                const countryName = d.properties.name;
                console.log('Processing country:', countryName);
                // Handle special cases where names might not match exactly
                const nameMap = {
                    "Congo, Democratic Republic of the": "Democratic Republic of the Congo",
                    "Dem. Rep. Congo": "Democratic Republic of the Congo",
                    "Côte d'Ivoire": "Côte d'Ivoire",
                    "Cape Verde": "Cabo Verde",
                    "Swaziland": "Eswatini",
                    "eSwatini": "Eswatini",
                    "Eswatini": "Eswatini",
                    "São Tomé and Príncipe": "Sao Tome and Principe",
                    "Central African Rep.": "Central African Republic",
                    "S. Sudan": "South Sudan",
                    "Eq. Guinea": "Equatorial Guinea",
                    // Add special cases for small island nations
                    "Seychelles": "Seychelles",
                    "Mauritius": "Mauritius",
                    "Comoros": "Comoros",
                    "São Tomé and Príncipe": "Sao Tome and Principe",
                    "Cabo Verde": "Cabo Verde",
                    // Add Central American country name mappings
                    "Costa Rica": "Costa Rica",
                    "El Salvador": "El Salvador",
                    "Guatemala": "Guatemala",
                    "Honduras": "Honduras",
                    "Nicaragua": "Nicaragua",
                    "Panama": "Panama",
                    "Belize": "Belize",
                    // Add North American country name mappings
                    "United States of America": "United States of America",
                    "Canada": "Canada",
                    "Mexico": "Mexico"
                };
                const isInContinent = continentData[continent].countries.includes(countryName) || 
                                    continentData[continent].countries.includes(nameMap[countryName]);
                console.log('Country:', countryName, 'Mapped to:', nameMap[countryName], 'Is in continent:', isInContinent);
                return isInContinent ? "#ffffff" : "#d3d3d3";
            })
            .attr("stroke", "#000000")
            .attr("stroke-width", "1") // Thicker borders
            .attr("cursor", d => {
                const countryName = d.properties.name;
                const nameMap = {
                    "Congo, Democratic Republic of the": "Democratic Republic of the Congo",
                    "Dem. Rep. Congo": "Democratic Republic of the Congo",
                    "Côte d'Ivoire": "Côte d'Ivoire",
                    "Cape Verde": "Cabo Verde",
                    "Swaziland": "Eswatini",
                    "eSwatini": "Eswatini",
                    "Eswatini": "Eswatini",
                    "São Tomé and Príncipe": "Sao Tome and Principe",
                    "Central African Rep.": "Central African Republic",
                    "S. Sudan": "South Sudan",
                    "Eq. Guinea": "Equatorial Guinea",
                    // Add special cases for small island nations
                    "Seychelles": "Seychelles",
                    "Mauritius": "Mauritius",
                    "Comoros": "Comoros",
                    "São Tomé and Príncipe": "Sao Tome and Principe",
                    "Cabo Verde": "Cabo Verde",
                    // Add Central American country name mappings
                    "Costa Rica": "Costa Rica",
                    "El Salvador": "El Salvador",
                    "Guatemala": "Guatemala",
                    "Honduras": "Honduras",
                    "Nicaragua": "Nicaragua",
                    "Panama": "Panama",
                    "Belize": "Belize",
                    // Add North American country name mappings
                    "United States of America": "United States of America",
                    "Canada": "Canada",
                    "Mexico": "Mexico"
                };
                const mappedName = nameMap[countryName] || countryName;
                let isClickable = false;
                
                if (continent === 'north-america') {
                    // For North America, only allow these three countries
                    isClickable = ["Canada", "United States of America", "Mexico"].includes(mappedName);
                } else {
                    // For other continents, use the normal logic
                    isClickable = continentData[continent].countries.includes(mappedName);
                }
                
                console.log('Country:', countryName, 'Mapped to:', mappedName, 'Is clickable:', isClickable);
                return isClickable ? "pointer" : "not-allowed";
            })
            .attr("data-name", d => {
                const countryName = d.properties.name;
                const nameMap = {
                    "Congo, Democratic Republic of the": "Democratic Republic of the Congo",
                    "Dem. Rep. Congo": "Democratic Republic of the Congo",
                    "Côte d'Ivoire": "Côte d'Ivoire",
                    "Cape Verde": "Cabo Verde",
                    "Swaziland": "Eswatini",
                    "eSwatini": "Eswatini",
                    "Eswatini": "Eswatini",
                    "São Tomé and Príncipe": "Sao Tome and Principe",
                    "Central African Rep.": "Central African Republic",
                    "S. Sudan": "South Sudan",
                    "Eq. Guinea": "Equatorial Guinea",
                    // Add special cases for small island nations
                    "Seychelles": "Seychelles",
                    "Mauritius": "Mauritius",
                    "Comoros": "Comoros",
                    "São Tomé and Príncipe": "Sao Tome and Principe",
                    "Cabo Verde": "Cabo Verde",
                    // Add Central American country name mappings
                    "Costa Rica": "Costa Rica",
                    "El Salvador": "El Salvador",
                    "Guatemala": "Guatemala",
                    "Honduras": "Honduras",
                    "Nicaragua": "Nicaragua",
                    "Panama": "Panama",
                    "Belize": "Belize",
                    // Add North American country name mappings
                    "United States of America": "United States of America",
                    "Canada": "Canada",
                    "Mexico": "Mexico"
                };
                const mappedName = nameMap[countryName] || countryName;
                console.log('Country:', countryName, 'Mapped to:', mappedName);
                return mappedName;
            })
            .on("mouseover", function(event, d) {
                const countryName = d.properties.name;
                const nameMap = {
                    "Congo, Democratic Republic of the": "Democratic Republic of the Congo",
                    "Dem. Rep. Congo": "Democratic Republic of the Congo",
                    "Côte d'Ivoire": "Côte d'Ivoire",
                    "Cape Verde": "Cabo Verde",
                    "Swaziland": "Eswatini",
                    "eSwatini": "Eswatini",
                    "Eswatini": "Eswatini",
                    "São Tomé and Príncipe": "Sao Tome and Principe",
                    "Central African Rep.": "Central African Republic",
                    "S. Sudan": "South Sudan",
                    "Eq. Guinea": "Equatorial Guinea",
                    // Add special cases for small island nations
                    "Seychelles": "Seychelles",
                    "Mauritius": "Mauritius",
                    "Comoros": "Comoros",
                    "São Tomé and Príncipe": "Sao Tome and Principe",
                    "Cabo Verde": "Cabo Verde",
                    // Add Central American country name mappings
                    "Costa Rica": "Costa Rica",
                    "El Salvador": "El Salvador",
                    "Guatemala": "Guatemala",
                    "Honduras": "Honduras",
                    "Nicaragua": "Nicaragua",
                    "Panama": "Panama",
                    "Belize": "Belize",
                    // Add North American country name mappings
                    "United States of America": "United States of America",
                    "Canada": "Canada",
                    "Mexico": "Mexico"
                };
                const mappedName = nameMap[countryName] || countryName;
                let isClickable = false;
                
                if (continent === 'north-america') {
                    // For North America, only allow these three countries
                    isClickable = ["Canada", "United States of America", "Mexico"].includes(mappedName);
                } else {
                    // For other continents, use the normal logic
                    isClickable = continentData[continent].countries.includes(mappedName);
                }
                
                if (!d3.select(this).classed("clicked") && !d3.select(this).classed("disabled") && isClickable) {
                    d3.select(this)
                        .attr("fill", "#cccccc")
                        .attr("stroke-width", "2"); // Thicker border on hover
                }
            })
            .on("mouseout", function(event, d) {
                const countryName = d.properties.name;
                const nameMap = {
                    "Congo, Democratic Republic of the": "Democratic Republic of the Congo",
                    "Dem. Rep. Congo": "Democratic Republic of the Congo",
                    "Côte d'Ivoire": "Côte d'Ivoire",
                    "Cape Verde": "Cabo Verde",
                    "Swaziland": "Eswatini",
                    "eSwatini": "Eswatini",
                    "Eswatini": "Eswatini",
                    "São Tomé and Príncipe": "Sao Tome and Principe",
                    "Central African Rep.": "Central African Republic",
                    "S. Sudan": "South Sudan",
                    "Eq. Guinea": "Equatorial Guinea",
                    // Add special cases for small island nations
                    "Seychelles": "Seychelles",
                    "Mauritius": "Mauritius",
                    "Comoros": "Comoros",
                    "São Tomé and Príncipe": "Sao Tome and Principe",
                    "Cabo Verde": "Cabo Verde",
                    // Add Central American country name mappings
                    "Costa Rica": "Costa Rica",
                    "El Salvador": "El Salvador",
                    "Guatemala": "Guatemala",
                    "Honduras": "Honduras",
                    "Nicaragua": "Nicaragua",
                    "Panama": "Panama",
                    "Belize": "Belize",
                    // Add North American country name mappings
                    "United States of America": "United States of America",
                    "Canada": "Canada",
                    "Mexico": "Mexico"
                };
                const mappedName = nameMap[countryName] || countryName;
                let isClickable = false;
                
                if (continent === 'north-america') {
                    // For North America, only allow these three countries
                    isClickable = ["Canada", "United States of America", "Mexico"].includes(mappedName);
                } else {
                    // For other continents, use the normal logic
                    isClickable = continentData[continent].countries.includes(mappedName);
                }
                
                if (!d3.select(this).classed("clicked") && !d3.select(this).classed("disabled")) {
                    d3.select(this)
                        .attr("fill", isClickable ? "#ffffff" : "#d3d3d3")
                        .attr("stroke-width", "1"); // Back to normal border width
                }
            })
            .on("click", function(event, d) {
                const countryName = d.properties.name;
                const nameMap = {
                    "Congo, Democratic Republic of the": "Democratic Republic of the Congo",
                    "Dem. Rep. Congo": "Democratic Republic of the Congo",
                    "Côte d'Ivoire": "Côte d'Ivoire",
                    "Cape Verde": "Cabo Verde",
                    "Swaziland": "Eswatini",
                    "eSwatini": "Eswatini",
                    "Eswatini": "Eswatini",
                    "São Tomé and Príncipe": "Sao Tome and Principe",
                    "Central African Rep.": "Central African Republic",
                    "S. Sudan": "South Sudan",
                    "Eq. Guinea": "Equatorial Guinea",
                    // Add special cases for small island nations
                    "Seychelles": "Seychelles",
                    "Mauritius": "Mauritius",
                    "Comoros": "Comoros",
                    "São Tomé and Príncipe": "Sao Tome and Principe",
                    "Cabo Verde": "Cabo Verde",
                    // Add Central American country name mappings
                    "Costa Rica": "Costa Rica",
                    "El Salvador": "El Salvador",
                    "Guatemala": "Guatemala",
                    "Honduras": "Honduras",
                    "Nicaragua": "Nicaragua",
                    "Panama": "Panama",
                    "Belize": "Belize",
                    // Add North American country name mappings
                    "United States of America": "United States of America",
                    "Canada": "Canada",
                    "Mexico": "Mexico"
                };
                const mappedName = nameMap[countryName] || countryName;
                let isClickable = false;
                
                if (continent === 'north-america') {
                    // For North America, only allow these three countries
                    isClickable = ["Canada", "United States of America", "Mexico"].includes(mappedName);
                } else {
                    // For other continents, use the normal logic
                    isClickable = continentData[continent].countries.includes(mappedName);
                }
                
                console.log('Clicked country:', countryName, 'Mapped to:', mappedName, 'Is clickable:', isClickable);
                if (isClickable) {
                    showCountryInput(mappedName);
                }
            });

        // Add small island nations
        if (continent === 'africa') {
            const smallIslands = [
                {
                    name: "Seychelles",
                    path: "M0,0 L2,-1 L3,0 L2,1 L0,0 Z", // Simplified Seychelles shape
                    transform: "translate(55.4540, -4.6796) scale(0.5)"
                },
                {
                    name: "Mauritius",
                    path: "M0,0 L2,-1 L3,0 L2,1 L0,0 Z", // Simplified Mauritius shape
                    transform: "translate(57.5522, -20.3484) scale(0.5)"
                },
                {
                    name: "Comoros",
                    path: "M0,0 L2,-1 L3,0 L2,1 L0,0 Z", // Simplified Comoros shape
                    transform: "translate(43.3333, -11.6455) scale(0.5)"
                },
                {
                    name: "Sao Tome and Principe",
                    path: "M0,0 L2,-1 L3,0 L2,1 L0,0 Z", // Simplified Sao Tome and Principe shape
                    transform: "translate(6.6131, 0.1864) scale(0.5)"
                },
                {
                    name: "Cabo Verde",
                    path: "M0,0 L2,-1 L3,0 L2,1 L0,0 Z", // Simplified Cabo Verde shape
                    transform: "translate(-23.5083, 15.1201) scale(0.5)"
                }
            ];

            smallIslands.forEach(island => {
                const [x, y] = projection([parseFloat(island.transform.split('(')[1].split(',')[0]), 
                                         parseFloat(island.transform.split(',')[1].split(')')[0])]);
                
                const islandGroup = mapGroup.append("g")
                    .attr("transform", `translate(${x},${y}) scale(0.5)`);

                islandGroup.append("path")
                    .attr("d", island.path)
                    .attr("fill", "#ffffff")
                    .attr("stroke", "#000000")
                    .attr("stroke-width", "1")
                    .attr("cursor", "pointer")
                    .attr("data-name", island.name)
                    .on("mouseover", function() {
                        if (!d3.select(this).classed("clicked")) {
                            d3.select(this)
                                .attr("fill", "#cccccc")
                                .attr("stroke-width", "2");
                        }
                    })
                    .on("mouseout", function() {
                        if (!d3.select(this).classed("clicked")) {
                            d3.select(this)
                                .attr("fill", "#ffffff")
                                .attr("stroke-width", "1");
                        }
                    })
                    .on("click", function() {
                        showCountryInput(island.name);
                    });
            });
        }

        // Apply zoom behavior to SVG
        svg.call(zoom);
        console.log('Zoom behavior added');

        // Center on the selected continent
        let centerCountry;
        let defaultScale = 0.15; // Default scale for most regions
        
        switch(continent) {
            case 'africa':
                centerCountry = "Dem. Rep. Congo";
                defaultScale = 0.0825; // Increased scale for Africa (55% of original 0.15)
                break;
            case 'central-america':
                centerCountry = "Panama";
                break;
            case 'caribbean':
                centerCountry = "Cuba";
                break;
            case 'south-america':
                centerCountry = "Brazil";
                break;
            case 'north-america':
                centerCountry = "United States of America";
                break;
            case 'europe':
                centerCountry = "Austria";
                defaultScale = 0.09; // Reduced scale for Europe (30% of previous 0.3)
                break;
            case 'asia':
                centerCountry = "China";
                break;
            case 'oceania':
                centerCountry = "Australia";
                break;
            default:
                centerCountry = "South Africa";
        }
        
        console.log('Center country:', centerCountry);
        
        // Debug: Log all country names in the map data
        console.log('Available countries:', countries.features.map(d => d.properties.name));
        
        const countryFeature = countries.features.find(d => d.properties.name === centerCountry);
        if (!countryFeature) {
            console.error('Could not find center country:', centerCountry);
            // Try to find the country with a different name
            const alternativeNames = {
                "Congo, Democratic Republic of the": ["Democratic Republic of the Congo", "DR Congo", "Congo-Kinshasa"],
                "United States of America": ["United States", "USA", "U.S.A."],
                "Côte d'Ivoire": ["Ivory Coast"],
                "Cape Verde": ["Cabo Verde"],
                "Swaziland": "Eswatini",
                "São Tomé and Príncipe": "Sao Tome and Principe"
            };
            
            const alternatives = alternativeNames[centerCountry] || [];
            for (const altName of alternatives) {
                const altFeature = countries.features.find(d => d.properties.name === altName);
                if (altFeature) {
                    console.log('Found country with alternative name:', altName);
                    countryFeature = altFeature;
                    break;
                }
            }
            
            if (!countryFeature) {
                console.error('Could not find country with any alternative names');
                return;
            }
        }
        
        const bounds = d3.geoBounds(countryFeature);
        console.log('Bounds:', bounds);
        
        // Calculate the center point
        const center = [
            (bounds[0][0] + bounds[1][0]) / 2,
            (bounds[0][1] + bounds[1][1]) / 2
        ];
        console.log('Center:', center);
        
        // Calculate the scale based on the bounds
        const width = bounds[1][0] - bounds[0][0];
        const height = bounds[1][1] - bounds[0][1];
        const scale = defaultScale / Math.max(width / mapContainer.clientWidth, height / mapContainer.clientHeight);
        
        // Calculate the translation
        const translate = [
            mapContainer.clientWidth / 2 - scale * projection(center)[0],
            mapContainer.clientHeight / 2 - scale * projection(center)[1]
        ];
        
        // Apply the zoom transformation
        svg.transition().duration(750).call(
            zoom.transform,
            d3.zoomIdentity
                .translate(translate[0], translate[1])
                .scale(scale)
        );
        console.log('Map centered with scale:', scale, 'and translate:', translate);

    } catch (error) {
        console.error('Error loading map:', error);
        mapContainer.innerHTML = `
            <div style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                text-align: center;
                color: #666;
            ">
                <h3>Error loading map</h3>
                <p>Please try refreshing the page</p>
                <p>Error details: ${error.message}</p>
            </div>
        `;
    }
}

// Show the country input modal
function showCountryInput(country) {
    console.log('Showing input for country:', country);
    
    // Create input container if it doesn't exist
    let inputContainer = document.getElementById('country-input');
    if (!inputContainer) {
        inputContainer = document.createElement('div');
        inputContainer.id = 'country-input';
        inputContainer.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            z-index: 1000;
        `;
        document.body.appendChild(inputContainer);
    }
    
    // Create input field if it doesn't exist
    let inputField = document.getElementById('country-name');
    if (!inputField) {
        inputField = document.createElement('input');
        inputField.id = 'country-name';
        inputField.type = 'text';
        inputField.style.cssText = `
            width: 200px;
            padding: 8px;
            margin-bottom: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
        `;
        inputContainer.appendChild(inputField);
    }
    
    // Show the input container
    inputContainer.style.display = 'block';
    inputField.value = '';
    inputField.focus();
    
    // Update the input placeholder
    inputField.placeholder = 'Enter the selected country\'s name';
    
    // Handle input changes for filtering
    inputField.oninput = () => {
        const input = normalizeText(inputField.value);
        const continent = getCurrentContinent();
        
        // Get all country items from the list
        const countryItems = document.querySelectorAll('.country-item');
        
        // Filter and show/hide country items based on input
        countryItems.forEach(item => {
            const countryName = normalizeText(item.textContent);
            const isStrikethrough = item.style.textDecoration.includes('line-through');
            
            if (countryName.includes(input) && !isStrikethrough) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    };
    
    // Handle Enter key
    inputField.onkeypress = (e) => {
        if (e.key === 'Enter') {
            checkAnswer(country, inputField.value);
            inputContainer.style.display = 'none';
        }
    };
    
    // Handle click outside to close
    document.addEventListener('click', function closeInput(e) {
        if (!inputContainer.contains(e.target) && !e.target.closest('path')) {
            inputContainer.style.display = 'none';
            document.removeEventListener('click', closeInput);
        }
    });
}

// Function to normalize text for comparison
function normalizeText(text) {
    return text.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
        .replace(/[^a-z0-9\s]/g, '') // Remove special characters
        .trim();
}

// Check if the answer is correct
function checkAnswer(correctCountry, userAnswer) {
    const continent = getCurrentContinent();
    const countries = continentData[continent].countries;
    
    // Normalize both the correct answer and user's answer
    const normalizedCorrect = normalizeText(correctCountry);
    const normalizedUser = normalizeText(userAnswer);
    
    const isCorrect = normalizedCorrect === normalizedUser;
    
    // Update the map
    const countryElement = document.querySelector(`[data-name="${correctCountry}"]`);
    if (countryElement) {
        if (isCorrect) {
            countryElement.classList.add('correct');
            countryElement.style.fill = '#4CAF50'; // Green for correct
            
            // Add country name label
            const svg = countryElement.closest('svg');
            const mapGroup = svg.querySelector('g');
            
            // Get country dimensions
            const bbox = countryElement.getBBox();
            const centerX = bbox.x + bbox.width/2;
            const centerY = bbox.y + bbox.height/2;
            
            // Calculate area and determine font size
            const area = bbox.width * bbox.height;
            const baseFontSize = 4; // Base font size for reference
            const minFontSize = 2.5; // Minimum font size
            const maxFontSize = 5; // Maximum font size
            
            // Calculate proportional font size based on area
            const fontSize = Math.min(maxFontSize, 
                Math.max(minFontSize, 
                    baseFontSize * Math.sqrt(area) / Math.sqrt(1000)));
            
            // Create text element
            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("x", "0");
            text.setAttribute("y", "0");
            text.setAttribute("text-anchor", "middle");
            text.setAttribute("dominant-baseline", "middle");
            text.setAttribute("fill", "white");
            text.setAttribute("font-size", `${fontSize}px`);
            text.setAttribute("font-weight", "bold");
            text.setAttribute("opacity", "0.9");
            text.textContent = correctCountry;
            
            // Create background rectangle
            const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            const textLength = correctCountry.length * (fontSize * 0.5);
            const padding = fontSize * 0.4;
            rect.setAttribute("x", "-" + (textLength/2 + padding));
            rect.setAttribute("y", "-" + (fontSize/2 + padding/2));
            rect.setAttribute("width", textLength + (padding * 2));
            rect.setAttribute("height", fontSize + padding);
            rect.setAttribute("fill", "#2196F3");
            rect.setAttribute("rx", "2");
            rect.setAttribute("opacity", "0.7");
            
            // Create label group
            const labelGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
            labelGroup.classList.add('country-label');
            labelGroup.appendChild(rect);
            labelGroup.appendChild(text);
            labelGroup.setAttribute("pointer-events", "none");
            labelGroup.setAttribute("transform", `translate(${centerX},${centerY})`);
            mapGroup.appendChild(labelGroup);
            
            // Update the country list
            const countryItems = document.querySelectorAll('.country-item');
            countryItems.forEach(item => {
                if (normalizeText(item.textContent) === normalizedCorrect) {
                    item.style.cssText = `
                        padding: 8px;
                        background: #4CAF50;
                        color: white;
                        border-radius: 4px;
                        text-decoration: line-through;
                        opacity: 0.7;
                    `;
                }
            });

            // Get all found countries
            const foundCountries = new Set();
            document.querySelectorAll('.correct').forEach(el => {
                const countryName = el.getAttribute('data-name');
                if (countryName) {
                    foundCountries.add(countryName);
                }
            });

            // Update progress in localStorage
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser) {
                // Initialize progress if it doesn't exist
                if (!currentUser.progress) {
                    currentUser.progress = {};
                }

                // Ensure all continents have progress tracking
                const allContinents = [
                    'africa', 'asia', 'europe', 'north-america', 
                    'central-america', 'caribbean', 'south-america', 'oceania'
                ];

                allContinents.forEach(cont => {
                    if (!currentUser.progress[cont]) {
                        currentUser.progress[cont] = { 
                            points: 0, 
                            completed: 0,
                            errors: 0,
                            finalScore: 0
                        };
                    }
                });

                // Update progress for the current continent
                currentUser.progress[continent].completed = foundCountries.size;
                
                // Calculate final score (100 - (errors * 3))
                const errors = document.querySelectorAll('.incorrect').length;
                currentUser.progress[continent].errors = errors;
                currentUser.progress[continent].finalScore = Math.max(0, 100 - (errors * 3));

                // Save updated progress
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
            }

            // Update progress bar and text
            const progressFill = document.getElementById('progress-fill');
            const progressText = document.getElementById('progress-text');
            
            if (progressFill && progressText) {
                const progress = (foundCountries.size / countries.length) * 100;
                progressFill.style.width = `${Math.min(100, progress)}%`;
                progressText.textContent = `${Math.min(100, Math.round(progress))}%`;
            }
            
            // Show feedback
            showFeedback('Correct!', true);
            
            // Check if all countries are found
            if (continent === 'north-america') {
                const requiredCountries = ["Canada", "United States of America", "Mexico"];
                const allFound = requiredCountries.every(country => foundCountries.has(country));
                
                if (allFound) {
                    const errors = document.querySelectorAll('.incorrect').length;
                    const finalScore = Math.max(0, 100 - (errors * 3));
                    showResult(finalScore); // Show final score
                }
            } else if (foundCountries.size === countries.length) {
                const errors = document.querySelectorAll('.incorrect').length;
                const finalScore = Math.max(0, 100 - (errors * 3));
                showResult(finalScore); // Show final score
            }
        } else {
            countryElement.classList.add('incorrect');
            countryElement.style.fill = '#FF9800'; // Orange for incorrect
            alert(`Incorrect! The correct answer is: ${correctCountry}\nYou have ${Math.ceil(countries.length * 0.35) - document.querySelectorAll('.incorrect').length} more attempts before having to restart.`);
            
            // Show feedback
            showFeedback('Incorrect!', false);
            
            // Check if max attempts reached
            const incorrectCount = document.querySelectorAll('.incorrect').length;
            const maxAttempts = Math.ceil(countries.length * 0.35);
            if (incorrectCount >= maxAttempts) {
                alert('You have used all your attempts. Please start again from the beginning.');
                window.location.reload();
            }
        }
        // Remove the disabled class to allow re-trying incorrect countries
        countryElement.classList.remove('disabled');
    }
    
    // Hide the input container
    document.getElementById('country-input').style.display = 'none';
}

// Show the final result
function showResult(score) {
    // Create result modal if it doesn't exist
    let resultModal = document.getElementById('result-modal');
    if (!resultModal) {
        resultModal = document.createElement('div');
        resultModal.id = 'result-modal';
        resultModal.className = 'result-modal';
        document.body.appendChild(resultModal);
    }

    // Determine message based on score
    let title, message;
    if (score >= 90) {
        title = "Mad Lit Auramaxx!!!!!";
        message = "Awesome Job";
        // Trigger confetti for high score
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    } else if (score >= 80) {
        title = "Beta yet rizful";
        message = "Farm more aura";
        // Trigger confetti for good score
        confetti({
            particleCount: 70,
            spread: 50,
            origin: { y: 0.6 }
        });
    } else if (score >= 70) {
        title = "Mid, but you got some Aura Points";
        message = "Try again";
        // Trigger confetti for average score
        confetti({
            particleCount: 40,
            spread: 30,
            origin: { y: 0.6 }
        });
    } else {
        title = "Negative Aura";
        message = "Try again";
        // No confetti for low score
    }

    // Update modal content
    resultModal.innerHTML = `
        <h2 class="result-title">${title}</h2>
        <p class="result-message">${message}</p>
        <p class="final-score">Final Score: ${score}/100</p>
        <div class="result-buttons">
            <button class="try-again-button" onclick="location.reload()">Try Again</button>
            <button class="main-menu-button" onclick="window.location.href='index.html'">Back to Main Menu</button>
        </div>
    `;

    // Add styles for the buttons and score
    const style = document.createElement('style');
    style.textContent = `
        .result-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-top: 1.5rem;
        }

        .try-again-button, .main-menu-button {
            padding: 0.8rem 1.5rem;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1rem;
            transition: all 0.3s ease;
        }

        .try-again-button {
            background-color: var(--primary-color);
            color: white;
        }

        .main-menu-button {
            background-color: #6c757d;
            color: white;
        }

        .try-again-button:hover, .main-menu-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .final-score {
            font-size: 1.2rem;
            font-weight: bold;
            color: #2c3e50;
            margin: 1rem 0;
        }
    `;
    document.head.appendChild(style);

    // Show the modal
    resultModal.classList.add('active');

    // Trigger additional confetti bursts for high scores
    if (score >= 90) {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            });
        }, 250);
    }
}

// Initialize the page when it loads
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('learn.html')) {
        initLearningPage();
    }
}); 