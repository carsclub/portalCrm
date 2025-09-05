import { Form, redirect, useNavigate } from 'react-router-dom'
import { removeCustomer } from '../data/customers'

export async function action({ params }) {
    await removeCustomer(params.customerId)
    return redirect('/customers')
}

function CustomerCard({ customer }) {
    const {
        companyName,
        contactName,
        email,
        phone,
        industry,
        status,
        value,
        lastContact,
        notes,
        id,
    } = customer

    const navigate = useNavigate()

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'active'
            case 'prospect': return 'progress'
            case 'inactive': return 'cancelled'
            default: return 'medium'
        }
    }

    return (
        <div className="dashboard__container__project__content__item">
            <div className="dashboard__container__project__content__item__menuDots">
                <img src="public/img/3Dots.svg" alt="menuaction" />

                <div className="dashboard__container__project__content__item__menuDots__menu">
                    <button
                        className="btns btnEdit"
                        onClick={() => navigate(`/customers/${id}/edit`)}
                    >
                        <img src="public/img/edit.svg" alt="edit" />
                        edit
                    </button>
                    <Form
                        onSubmit={(e) => {
                            if (
                                !confirm(
                                    'Are you sure you want to delete this customer?'
                                )
                            ) {
                                e.preventDefault()
                            }
                        }}
                        method="post"
                        action={`/customers/${id}/remove`}
                    >
                        <button className="btns btnRemove" type="submit">
                            <img src="public/img/delete.svg" alt="remove" />
                            remove
                        </button>
                    </Form>
                    <button 
                        className="btns btnLaunch"
                        onClick={() => navigate(`/customers/${id}/details`)}
                    >
                        <img src="public/img/user.svg" alt="view" />
                        view
                    </button>
                </div>
            </div>

            <div className="dashboard__container__project__content__item__company">
                <p className="dashboard__container__project__content__item__company--name">
                    {companyName}
                </p>

                <div className="dashboard__container__project__content__item__company__info">
                    <div className="dashboard__container__project__content__item__company__info--img">
                        <img src="public/img/user.svg" alt="contact" />
                        <small>contact</small>
                    </div>
                    <div className="dashboard__container__project__content__item__company__info--text">
                        <p>{contactName}</p>
                        <small>{email}</small>
                    </div>
                </div>
            </div>

            <div className="separator separator--1"></div>
            
            <div className="dashboard__container__project__content__item__events">
                <div className="status">
                    <p>Status</p>
                    <span className={getStatusColor(status)}>{status}</span>
                </div>
                <div className="status">
                    <p>Industry</p>
                    <span className="medium">{industry}</span>
                </div>
                <div className="status">
                    <p>Value</p>
                    <span className="done">${value?.toLocaleString() || '0'}</span>
                </div>
            </div>

            <div className="separator separator--2"></div>
            
            <div className="dashboard__container__project__content__item__action">
                <div className="dashboard__container__project__content__item__action__assets">
                    <div className="status">
                        <p>Last Contact</p>
                        <span className="progress">{lastContact || 'Never'}</span>
                    </div>
                    <p className="dashboard__container__project__content__item__action__assets--txt">
                        {notes || 'No notes available'}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CustomerCard