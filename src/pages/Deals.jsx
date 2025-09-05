import { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import TopHeader from '../components/TopHeader'
import DealCard from '../components/DealCard'
import { getDeals } from '../data/deals'

export async function loader() {
    const deals = await getDeals()
    return deals
}

function Deals() {
    const [showBox, setShowBox] = useState(false)
    const deals = useLoaderData()

    return (
        <main className="dashboard">
            <div className="container">
                <TopHeader
                    showBox={showBox}
                    setShowBox={setShowBox}
                    title="Sales Pipeline"
                />

                <div className="dashboard__container">
                    <div className="dashboard__container__project box">
                        <div className="dashboard__container__project__top">
                            <h3 className="dashboard__container__project__top--title">
                                Deal Management
                            </h3>
                            <div className="dashboard__container__project__top__filter">
                                <select
                                    className="dashboard__container__project__top__filter--select"
                                    name="stage"
                                    id="stage"
                                >
                                    <option value="all">All Stages</option>
                                    <option value="prospecting">Prospecting</option>
                                    <option value="qualification">Qualification</option>
                                    <option value="proposal">Proposal</option>
                                    <option value="negotiation">Negotiation</option>
                                    <option value="closed-won">Closed Won</option>
                                    <option value="closed-lost">Closed Lost</option>
                                </select>
                            </div>
                        </div>
                        <div className="dashboard__container__project__content">
                            {deals?.length > 0 ? (
                                deals.map((deal) => (
                                    <DealCard key={deal.id} deal={deal} />
                                ))
                            ) : (
                                <div className="dashboard__container__welcome box">
                                    <h2 className="dashboard__container__welcome--heading">
                                        No deals found
                                    </h2>
                                    <p>Start by adding your first deal to track your sales pipeline.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Deals