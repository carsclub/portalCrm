import { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import CustomerCard from '../components/CustomerCard'
import DealCard from '../components/DealCard'
import TopHeader from '../components/TopHeader'
import { weatherData } from '../data/weather'
import { getCustomers } from '../data/customers'
import { getDeals } from '../data/deals'
import Meeting from '../components/Meeting'
import Task from '../components/Task'

export async function loader() {
    try {
        const [dataWeather, customers, deals] = await Promise.allSettled([
            weatherData(),
            getCustomers(),
            getDeals()
        ])
        
        return {
            dataWeather: dataWeather.status === 'fulfilled' ? dataWeather.value : null,
            customers: customers.status === 'fulfilled' ? customers.value : [],
            deals: deals.status === 'fulfilled' ? deals.value : []
        }
    } catch (error) {
        console.error('Dashboard loader error:', error)
        return { dataWeather: null, customers: [], deals: [] }
    }
}

function Dashboard() {
    const [showBox, setShowBox] = useState(false)
    const { dataWeather, customers, deals } = useLoaderData()
    const [task, setTask] = useState(false)

    const info = {
        city: dataWeather.location.name,
        temp: dataWeather.current.temp_c,
        icon: dataWeather.current.condition.icon,
        condition: dataWeather.current.condition.text,
    }

    function handleTask() {
        setTask(true)

        if (task) {
            setTask(false)
        }
    }

    return (
        <main className="dashboard">
            <div className="container">
                <TopHeader
                    showBox={showBox}
                    setShowBox={setShowBox}
                    title="CRM Dashboard"
                />

                <div className="dashboard__container">
                    <div className="dashboard__container__welcome box">
                        <h2 className="dashboard__container__welcome--heading">
                            welcome, <span>alexander</span>
                        </h2>
                        <div className="dashboard__container__welcome__content">
                            <p className="dashboard__container__welcome__content--text">
                                Welcome to your CRM dashboard. Here's a quick weather report for{' '}
                                <span>{info.city} </span>
                                today and an overview of your business activities 🖐️
                            </p>
                            <div className="dashboard__container__welcome__content__temp">
                                <img
                                    className="dashboard__container__welcome__content__temp--icon"
                                    src={info.icon}
                                    alt="icon-weather"
                                />
                                <div className="dashboard__container__welcome__content__temp__text">
                                    <small className="dashboard__container__welcome__content__temp__text--condition">
                                        {info.condition}
                                    </small>
                                    <p className="dashboard__container__welcome__content__temp__text--outdoor">
                                        <img
                                            src="public/img/outdoorTemp.svg   "
                                            alt="outdoor"
                                        />
                                        outdoor temperature:
                                        <span>
                                            {info.temp}{' '}
                                            <img
                                                src={
                                                    'public/img/iconCentigrados.svg'
                                                }
                                                alt="grado"
                                            />
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="dashboard__container__project box">
                        <div className="dashboard__container__project__top">
                            <h3 className="dashboard__container__project__top--title">
                                Recent Customers
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
                            {customers?.slice(0, 3).map((customer) => (
                                <CustomerCard key={customer.id} customer={customer} />
                            ))}
                        </div>
                    </div>

                    <div className="dashboard__container__project box">
                        <div className="dashboard__container__project__top">
                            <h3 className="dashboard__container__project__top--title">
                                Active Deals
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
                                </select>
                            </div>
                        </div>
                        <div className="dashboard__container__project__content">
                            {deals?.slice(0, 3).map((deal) => (
                                <DealCard key={deal.id} deal={deal} />
                            ))}
                        </div>
                    </div>

                    <div className="dashboard__container__meeting box">
                        <div className="dashboard__container__meeting__top">
                            <h3 className="dashboard__container__meeting__top--title">
                                Upcoming Meetings
                            </h3>
                            <button className="dashboard__container__meeting__top--add">
                                <img
                                    src="public/img/add.svg"
                                    alt="add meeting"
                                />
                            </button>
                        </div>
                        <div className="dashboard__container__meeting__content">
                            <Meeting />
                            <Meeting />
                            <Meeting />
                        </div>
                    </div>
                    <div className="dashboard__container__task box">
                        <div className="dashboard__container__task__top">
                            <h3 className="dashboard__container__task__top--title">
                                Tasks & Follow-ups
                            </h3>
                            <button className="dashboard__container__task__top--add">
                                <img
                                    src="public/img/add.svg"
                                    alt="add meeting"
                                />
                            </button>
                        </div>
                        <div className="dashboard__container__task__content">
                            <Task
                                task={task}
                                setTask={setTask}
                                handleTask={handleTask}
                            />
                            <Task />
                            <Task />
                            <Task />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Dashboard
