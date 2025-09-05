//! Contacts API calls

export async function getContacts() {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/contacts`)
    const data = await response.json()
    return data
}

export async function addContact(data) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/contacts`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}

export async function getContactId(id) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/contacts/${id}`)
    const data = await response.json()
    return data
}

export async function updateContact(id, data) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/contacts/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}

export async function removeContact(id) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/contacts/${id}`, {
            method: 'DELETE',
        })
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}