import { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import TopHeader from '../components/TopHeader'
import ContactCard from '../components/ContactCard'
import { getContacts } from '../data/contacts'

export async function loader() {
    const contacts = await getContacts()
    return contacts
}

function Contacts() {
    const [showBox, setShowBox] = useState(false)
    const contacts = useLoaderData()

    return (
        <main className="dashboard">
            <div className="container">
                <TopHeader
                    showBox={showBox}
                    setShowBox={setShowBox}
                    title="Contacts"
                />

                <div className="dashboard__container">
                    <div className="dashboard__container__project box">
                        <div className="dashboard__container__project__top">
                            <h3 className="dashboard__container__project__top--title">
                                Contact Management
                            </h3>
                            <div className="dashboard__container__project__top__filter">
                                <select
                                    className="dashboard__container__project__top__filter--select"
                                    name="status"
                                    id="status"
                                >
                                    <option value="all">All Contacts</option>
                                    <option value="active">Active</option>
                                    <option value="prospect">Prospects</option>
                                    <option value="customer">Customers</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                        </div>
                        <div className="dashboard__container__project__content">
                            {contacts?.length > 0 ? (
                                contacts.map((contact) => (
                                    <ContactCard key={contact.id} contact={contact} />
                                ))
                            ) : (
                                <div className="dashboard__container__welcome box">
                                    <h2 className="dashboard__container__welcome--heading">
                                        No contacts found
                                    </h2>
                                    <p>Start by adding your first contact to build your network.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Contacts