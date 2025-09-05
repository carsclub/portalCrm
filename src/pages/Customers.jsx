import { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import TopHeader from '../components/TopHeader'
import CustomerCard from '../components/CustomerCard'
import { getCustomers } from '../data/customers'

export async function loader() {
    const customers = await getCustomers()
    return customers
}

function Customers() {
    const [showBox, setShowBox] = useState(false)
    const customers = useLoaderData()

    return (
        <main className="dashboard">
            <div className="container">
                <TopHeader
                    showBox={showBox}
                    setShowBox={setShowBox}
                    title="Customers"
                />

                <div className="dashboard__container">
                    <div className="dashboard__container__project box">
                        <div className="dashboard__container__project__top">
                            <h3 className="dashboard__container__project__top--title">
                                Customer Management
                            </h3>
                            <div className="dashboard__container__project__top__filter">
                                <select
                                    className="dashboard__container__project__top__filter--select"
                                    name="status"
                                    id="status"
                                >
                                    <option value="all">All Customers</option>
                                    <option value="active">Active</option>
                                    <option value="prospect">Prospects</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                        </div>
                        <div className="dashboard__container__project__content">
                            {customers?.length > 0 ? (
                                customers.map((customer) => (
                                    <CustomerCard key={customer.id} customer={customer} />
                                ))
                            ) : (
                                <div className="dashboard__container__welcome box">
                                    <h2 className="dashboard__container__welcome--heading">
                                        No customers found
                                    </h2>
                                    <p>Start by adding your first customer to the CRM system.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Customers