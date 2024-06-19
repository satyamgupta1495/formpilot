///<reference types="chrome" />

chrome.runtime.onMessage.addListener((request: any): void => {
    if (request.action === 'fetchRandomUserData') {
        fetchRandomUserData(request.countries);
    } else if (request.action === 'saveFormData') {
        saveFormData();
    } else if (request.action === 'fillForm') {
        fillForm();
    }
});

function saveFormData(): void {
    const formElements = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>('input, textarea, select');
    const formData: any = {};
    formElements.forEach(element => {
        if (element.name) {
            formData[element.name] = element.value;
        }
    });
    chrome.storage.local.set({ formData }, () => {
        alert('Form data saved!');
    });
}

function fillForm(): void {
    chrome.storage.local.get('formData', (data) => {
        const formData: any = data.formData;
        if (formData) {
            for (const name in formData) {
                const element = document.querySelector<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(`[name="${name}"]`);
                if (element) {
                    element.value = formData[name];
                    const inputEvent = new Event('input', { bubbles: true });
                    const changeEvent = new Event('change', { bubbles: true });
                    element.dispatchEvent(inputEvent);
                    element.dispatchEvent(changeEvent);
                    element.focus();
                    element.blur();
                }
            }
            alert('Form filled with saved data!');
        } else {
            alert('No form data saved. Please save the form data first.');
        }
    });
}

async function fetchRandomUserData(countries: string[]): Promise<void> {
    try {
        const response = await fetch(`https://randomuser.me/api/?nat=${countries.join(',')}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        chrome.runtime.sendMessage({ action: 'log', message: `countries: ${countries}, response: ${response}, url: ${response.url}` });

        const data = await response.json();
        if (!data) {
            throw new Error('No results found');
        }
        fillRandomData(data.results[0]);
    } catch (error) {
        alert('Error fetching random user data');
        fillRandomData(null);
    }
}

function fillRandomData(data: any | null): void {
    const formElements = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>('input, textarea, select');
    formElements.forEach((element: any) => {
        const name = element.name.toLowerCase();
        let value = '';

        if (data) {
            value = getDataValue(name, data);
        } else {
            value = generateRandomValue(name, element);
        }

        if (element.tagName.toLowerCase() === 'textarea') {
            (element as HTMLTextAreaElement).value = value;
        } else if (element.tagName.toLowerCase() === 'select') {
            const selectElement = element as HTMLSelectElement;
            const optionExists = Array.from(selectElement.options).some(option => option.value === value);
            // chrome.runtime.sendMessage({ action: 'log', message: `optionExists: ${optionExists}, value: ${value}` });
            if (optionExists) {
                selectElement.value = value;
            } else if (selectElement.options.length > 0) {
                selectElement.value = selectElement.options[1].value;
            }
        } else if (element.tagName.toLowerCase() === 'input' && element.type === 'number') {
            chrome.runtime.sendMessage({ action: 'log', message: `element.type: ${element.type}, value: ${value}` });
            element.value = Math.floor(Math.random() * 100);
        } else if (element.tagName.toLowerCase() === 'input' && element.type === 'checkbox') {
            element.checked = value;
        } else if (element.tagName.toLowerCase() === 'input' && element.type === 'date') {
            element.value = new Date().toISOString().slice(0, 10);
        }
        else if (element.tagName.toLowerCase() === 'input' && element.type === 'datetime-local') {
            element.value = new Date().toISOString().slice(0, 16);
        }
        else if (element.tagName.toLowerCase() === 'input' && element.type === 'month') {
            element.value = new Date().toISOString().slice(0, 7);
        }
        else if (element.tagName.toLowerCase() === 'input' && element.type === 'time') {
            element.value = new Date().toISOString().slice(11, 16);
        }
        else if (element.tagName.toLowerCase() === 'input' && element.type === 'week') {
            element.value = new Date().toISOString().slice(0, 10);
        }
        else if (element.tagName.toLowerCase() === 'input' && element.type === 'range') {
            element.value = Math.floor(Math.random() * 100);
        } else if (element.tagName.toLowerCase() === 'input' && element.type === 'radio') {
            element.checked = true;
        } else if (element.tagName.toLowerCase() === 'input' && element.type === 'submit' || element.type === 'reset') {
            return;
        } else if (element.tagName.toLowerCase() === 'input' && element.type === 'color') {
            element.value = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        } else {
            element.value = value;
        }

        const inputEvent = new Event('input', { bubbles: true });
        const changeEvent = new Event('change', { bubbles: true });
        element.dispatchEvent(inputEvent);
        element.dispatchEvent(changeEvent);

        element.focus();
        element.blur();
    });
}

function getDataValue(name: string, data: any): string {
    switch (true) {
        case name.includes('username'):
            return data.login.username;
        case name.includes('first name') || name.includes('first'):
            return data.name.first;
        case name.includes('middle name') || name.includes('middle'):
            return "A.";
        case name.includes('last name') || name.includes('last'):
            return data.name.last;
        case name.includes('full name') || name.includes('full'):
            return `${data.name.first} ${data.name.last}`;
        case name.includes('gender') || name.includes('sex'):
            return data.gender;
        case name.includes('name'):
            return `${data.name.first} ${data.name.last}`;
        case name.includes('email'):
            return data.email;
        case name.includes('phone') || name.includes('tel'):
            return data.phone;
        case name.includes('cell'):
            return data.cell;
        case name.includes('address'):
            return `${data.location.street.number} ${data.location.street.name}, ${data.location.city}, ${data.location.state}, ${data.location.country}`;
        case name.includes('city'):
            return data.location.city;
        case name.includes('state'):
            return data.location.state;
        case name.includes('country'):
            return data.location.country;
        case name.includes('postcode'):
            return data.location.postcode.toString();
        case name.includes('dob') || name.includes('birthday'):
            return new Date(data.dob.date).toISOString().split('T')[0];
        default:
            return generateRandomString(20);
    }
}

function generateRandomValue(name: string, element: any): string {
    switch (true) {
        case name.includes('username'):
            return generateRandomUsername();
        case name.includes('first name') || name.includes('first'):
            return generateRandomString(5);
        case name.includes('middle name') || name.includes('middle'):
            return "A.";
        case name.includes('last name') || name.includes('last'):
            return generateRandomString(7);
        case name.includes('full name') || name.includes('full'):
            return `${generateRandomString(5)} ${generateRandomString(7)}`;
        case name.includes('gender') || name.includes('sex'):
            return ['male', 'female'][Math.floor(Math.random() * 2)];
        case name.includes('name'):
            return `${generateRandomString(5)} ${generateRandomString(7)}`;
        case name.includes('email'):
            return generateRandomEmail();
        case name.includes('phone') || name.includes('tel'):
            return generateRandomPhoneNumber();
        case name.includes('cell'):
            return generateRandomPhoneNumber();
        case name.includes('address'):
            return `${Math.floor(Math.random() * 10000)} ${generateRandomString(15)} St, ${generateRandomString(5)}, ${generateRandomString(7)}, ${generateRandomString(10)}`;
        case name.includes('city'):
            return generateRandomString(15);
        case name.includes('state'):
            return generateRandomString(15);
        case name.includes('country'):
            return generateRandomString(15);
        case name.includes('postcode'):
            return `${Math.floor(Math.random() * 10000)}`;
        case name.includes('dob') || name.includes('birthday'):
            return `19${Math.floor(Math.random() * 90) + 10}-0${Math.floor(Math.random() * 9) + 1}-0${Math.floor(Math.random() * 9) + 1}`;
        default:
            return generateRandomData(element.type);
    }
}

function generateRandomData(type: string): string {
    switch (type) {
        case 'text':
            return generateRandomString(15);
        case 'email':
            return generateRandomEmail();
        case 'number':
            return Math.floor(Math.random() * 100).toString();
        case 'tel':
            return generateRandomPhoneNumber();
        case 'url':
            return `http://example.com/${generateRandomString(15)}`;
        case 'textarea':
            return generateRandomString(20);
        default:
            return generateRandomString(20);
    }
}

function generateRandomString(length: number): string {
    return Math.random().toString(36).substring(2, length + 2);
}

function generateRandomEmail(): string {
    return `${generateRandomString(8)}@example.com`;
}

function generateRandomPhoneNumber(): string {
    return `123-456-789${Math.floor(Math.random() * 10)}`;
}

function generateRandomUsername(): string {
    return `user_${generateRandomString(8)}`;
}
