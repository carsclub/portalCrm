import { Form, redirect, useActionData, useNavigate } from 'react-router-dom'
import { addDeal } from '../data/deals'
import Message from './Message'

export async function action({ request }) {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)

    const error = []
    if (Object.values(data).includes('')) {
        error.push('⛔ All the fields are required. ⛔')
    }

    if (Object.keys(error).length) {
        return error
    }

    await addDeal(data)
    return redirect('/deals')
}

function FormDeal({ deal }) {
    const navigate = useNavigate()
    const message = useActionData()

    return (
        <div className="popup">
            {message?.length &&
                message.map((text, index) => (
                    <Message key={index} type="error">
                        {text}
                    </Message>
                ))}

            <button className="popup__close" onClick={() => navigate('/deals')}>
                <img src="/public/img/close.svg" alt="close popup" />
                <span>close</span>
            </button>

            <div className={`${message?.length ? 'addProject shake' : 'addProject'}`}>
                <div className="addProject__title">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <path d="M26 6H22V4C22 2.9 21.1 2 20 2H12C10.9 2 10 2.9 10 4V6H6C4.9 6 4 6.9 4 8V26C4 27.1 4.9 28 6 28H26C27.1 28 28 27.1 28 26V8C28 6.9 27.1 6 26 6ZM12 4H20V6H12V4ZM26 26H6V8H10V10H12V8H20V10H22V8H26V26Z" fill="#2C2E32"/>
                    </svg>
                    <div className="addProject__title--txt">
                        <h2>{deal ? 'Edit Deal' : 'Add New Deal'}</h2>
                        <p>Complete all the fields below</p>
                    </div>
                </div>

                <Form className="addProject__form" method="post" noValidate>
                    <fieldset>
                        <div className="addProject__form__input">
                            <label className="label" htmlFor="dealName">
                                Deal Name
                            </label>
                            <input
                                type="text"
                                id="dealName"
                                placeholder="e.g: Website Redesign Project"
                                name="dealName"
                                defaultValue={deal?.dealName}
                            />
                        </div>
                        <div className="addProject__form__input">
                            <label className="label" htmlFor="customerName">
                                Customer Name
                            </label>
                            <input
                                type="text"
                                id="customerName"
                                placeholder="e.g: Tech Solutions Inc"
                                name="customerName"
                                defaultValue={deal?.customerName}
                            />
                        </div>
                        <div className="addProject__form__input">
                            <label className="label" htmlFor="value">
                                Deal Value
                            </label>
                            <input
                                type="number"
                                id="value"
                                placeholder="e.g: 25000"
                                name="value"
                                defaultValue={deal?.value}
                            />
                        </div>
                        <div className="addProject__form__input">
                            <label className="label" htmlFor="probability">
                                Probability (%)
                            </label>
                            <input
                                type="number"
                                id="probability"
                                placeholder="e.g: 75"
                                name="probability"
                                min="0"
                                max="100"
                                defaultValue={deal?.probability}
                            />
                        </div>
                        <div className="addProject__form__input">
                            <label className="label" htmlFor="expectedCloseDate">
                                Expected Close Date
                            </label>
                            <input
                                type="date"
                                id="expectedCloseDate"
                                name="expectedCloseDate"
                                defaultValue={deal?.expectedCloseDate}
                            />
                        </div>
                        <div className="addProject__form__input">
                            <label className="label" htmlFor="assignedTo">
                                Assigned To
                            </label>
                            <input
                                type="text"
                                id="assignedTo"
                                placeholder="e.g: John Smith"
                                name="assignedTo"
                                defaultValue={deal?.assignedTo}
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="addProject__form__option">
                            <p className="addProject__form__option__label">Deal Stage</p>
                            <div className="addProject__form__option__item">
                                <div className="addProject__form__option__item__radio">
                                    <input
                                        type="radio"
                                        name="stage"
                                        value="prospecting"
                                        defaultChecked={deal?.stage === 'prospecting'}
                                        id="prospecting"
                                    />
                                    <label htmlFor="prospecting">Prospecting</label>
                                </div>
                                <div className="addProject__form__option__item__radio">
                                    <input
                                        type="radio"
                                        name="stage"
                                        value="qualification"
                                        defaultChecked={deal?.stage === 'qualification'}
                                        id="qualification"
                                    />
                                    <label htmlFor="qualification">Qualification</label>
                                </div>
                                <div className="addProject__form__option__item__radio">
                                    <input
                                        type="radio"
                                        name="stage"
                                        value="proposal"
                                        defaultChecked={deal?.stage === 'proposal'}
                                        id="proposal"
                                    />
                                    <label htmlFor="proposal">Proposal</label>
                                </div>
                                <div className="addProject__form__option__item__radio">
                                    <input
                                        type="radio"
                                        name="stage"
                                        value="negotiation"
                                        defaultChecked={deal?.stage === 'negotiation'}
                                        id="negotiation"
                                    />
                                    <label htmlFor="negotiation">Negotiation</label>
                                </div>
                                <div className="addProject__form__option__item__radio">
                                    <input
                                        type="radio"
                                        name="stage"
                                        value="closed-won"
                                        defaultChecked={deal?.stage === 'closed-won'}
                                        id="closed-won"
                                    />
                                    <label htmlFor="closed-won">Closed Won</label>
                                </div>
                                <div className="addProject__form__option__item__radio">
                                    <input
                                        type="radio"
                                        name="stage"
                                        value="closed-lost"
                                        defaultChecked={deal?.stage === 'closed-lost'}
                                        id="closed-lost"
                                    />
                                    <label htmlFor="closed-lost">Closed Lost</label>
                                </div>
                            </div>
                        </div>
                    </fieldset>

                    <div className="addProject__form__input__textarea">
                        <label className="label" htmlFor="notes">
                            Notes
                        </label>
                        <textarea
                            placeholder="Add any additional notes about this deal"
                            name="notes"
                            defaultValue={deal?.notes}
                        />
                    </div>

                    <input
                        className="btnSubmit"
                        type="submit"
                        value={deal ? 'Update Deal' : 'Create Deal'}
                    />
                </Form>
            </div>
        </div>
    )
}

export default FormDeal