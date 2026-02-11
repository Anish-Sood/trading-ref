async function loadOptions() {
    try {
        const response = await fetch('options.json');
        const options = await response.json();

        const languageSelect = document.getElementById('language');
        const languages = Object.keys(options);
        
        languages.forEach(language => {
            const option = document.createElement('option');
            option.value = language;
            option.textContent = language;
            languageSelect.appendChild(option);
        });

        languageSelect.addEventListener('change', (e) => {
            updateNewspaperOptions(options, e.target.value);
        });

        document.getElementById('newspaper').addEventListener('change', (e) => {
            updateEditionOptions(options, languageSelect.value, e.target.value);
        });

    } catch (error) {
        console.error('Error loading options:', error);
    }
}

function updateNewspaperOptions(options, selectedLanguage) {
    const newspaperSelect = document.getElementById('newspaper');
    const editionSelect = document.getElementById('edition');

    newspaperSelect.innerHTML = '<option value="">-- Select Newspaper --</option>';
    editionSelect.innerHTML = '<option value="">-- Select Edition --</option>';

    if (selectedLanguage && options[selectedLanguage]) {
        const newspapers = Object.keys(options[selectedLanguage]);
        newspapers.forEach(newspaper => {
            const option = document.createElement('option');
            option.value = newspaper;
            option.textContent = newspaper;
            newspaperSelect.appendChild(option);
        });
    }
}

function updateEditionOptions(options, selectedLanguage, selectedNewspaper) {
    const editionSelect = document.getElementById('edition');

    editionSelect.innerHTML = '<option value="">-- Select Edition --</option>';

    if (selectedLanguage && selectedNewspaper && options[selectedLanguage] && options[selectedLanguage][selectedNewspaper]) {
        const editions = Object.keys(options[selectedLanguage][selectedNewspaper]);
        editions.forEach(edition => {
            const option = document.createElement('option');
            option.value = edition;
            option.textContent = edition;
            editionSelect.appendChild(option);
        });
    }
}

document.addEventListener('DOMContentLoaded', loadOptions);
