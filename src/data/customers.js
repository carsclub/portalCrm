//! Customer Management API calls

export async function getCustomers() {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/customers`)
    const data = await response.json()
    return data
}

export async function addCustomer(data) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/customers`, {
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

export async function getCustomerId(id) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/customers/${id}`)
    const data = await response.json()
    return data
}

export async function updateCustomer(id, data) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/customers/${id}`, {
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

export async function removeCustomer(id) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/customers/${id}`, {
            method: 'DELETE',
        })
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}