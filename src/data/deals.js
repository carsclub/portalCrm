//! Deals/Sales Pipeline API calls

export async function getDeals() {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/deals`)
    const data = await response.json()
    return data
}

export async function addDeal(data) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/deals`, {
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

export async function getDealId(id) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/deals/${id}`)
    const data = await response.json()
    return data
}

export async function updateDeal(id, data) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/deals/${id}`, {
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

export async function removeDeal(id) {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/deals/${id}`, {
            method: 'DELETE',
        })
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}