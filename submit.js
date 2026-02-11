async function handleFormSubmit(event) {
    event.preventDefault();

    const publicationDate = document.getElementById('publication-date').value;
    const language = document.getElementById('language').value;
    const newspaper = document.getElementById('newspaper').value;
    const edition = document.getElementById('edition').value;

    if (!publicationDate || !language || !newspaper || !edition) {
        alert('Please fill in all fields');
        return;
    }

    try {
        const response = await fetch('options.json');
        const options = await response.json();

        const stringValue = options[language][newspaper][edition];

        if (stringValue) {
            displayResult({
                publicationDate,
                language,
                newspaper,
                edition,
                stringValue
            });
        } else {
            alert('No value found for the selected options');
        }
    } catch (error) {
        console.error('Error retrieving value:', error);
        alert('Error retrieving value from JSON');
    }
}

function displayResult(data) {
    let resultContainer = document.getElementById('result-container');
    
    if (!resultContainer) {
        resultContainer = document.createElement('div');
        resultContainer.id = 'result-container';
        resultContainer.style.cssText = `
            margin-top: 30px;
            padding: 20px;
            background-color: #f0f4f8;
            border: 2px solid #667eea;
            border-radius: 5px;
            display: none;
        `;
        document.querySelector('.container').appendChild(resultContainer);
    }

    resultContainer.style.display = 'block';
    resultContainer.innerHTML = `
        <h2>Selected Information</h2>
        <div style="margin: 10px 0;">
            <strong>Publication Date:</strong> ${data.publicationDate}
        </div>
        <div style="margin: 10px 0;">
            <strong>Language:</strong> ${data.language}
        </div>
        <div style="margin: 10px 0;">
            <strong>Newspaper:</strong> ${data.newspaper}
        </div>
        <div style="margin: 10px 0;">
            <strong>Edition:</strong> ${data.edition}
        </div>
        <div style="margin: 10px 0; padding: 10px; background-color: white; border-radius: 3px; word-break: break-all;">
            <strong>String Value:</strong><br>
            <code style="color: #667eea;">${data.stringValue}</code>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', handleFormSubmit);
});
