import { Form, redirect, useActionData, useNavigate } from 'react-router-dom'
import { addCustomer } from '../data/customers'
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

    await addCustomer(data)
    return redirect('/customers')
}

function FormCustomer({ customer }) {
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

            <button className="popup__close" onClick={() => navigate('/customers')}>
                <img src="/public/img/close.svg" alt="close popup" />
                <span>close</span>
            </button>

            <div className={`${message?.length ? 'addProject shake' : 'addProject'}`}>
                <div className="addProject__title">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <path d="M16 4C12.6863 4 10 6.68629 10 10C10 13.3137 12.6863 16 16 16C19.3137 16 22 13.3137 22 10C22 6.68629 19.3137 4 16 4ZM16 6C18.2091 6 20 7.79086 20 10C20 12.2091 18.2091 14 16 14C13.7909 14 12 12.2091 12 10C12 7.79086 13.7909 6 16 6ZM16 18C11.5817 18 4 20.2183 4 24.5V28H28V24.5C28 20.2183 20.4183 18 16 18ZM16 20C20.4183 20 26 21.7817 26 24.5V26H6V24.5C6 21.7817 11.5817 20 16 20Z" fill="#2C2E32"/>
                    </svg>
                    <div className="addProject__title--txt">
                        <h2>{customer ? 'Edit Customer' : 'Add New Customer'}</h2>
                        <p>Complete all the fields below</p>
                    </div>
                </div>

                <Form className="addProject__form" method="post" noValidate>
                    <fieldset>
                        <div className="addProject__form__input">
                            <label className="label" htmlFor="companyName">
                                Company Name
                            </label>
                            <input
                                type="text"
                                id="companyName"
                                placeholder="e.g: Tech Solutions Inc"
                                name="companyName"
                                defaultValue={customer?.companyName}
                            />
                        </div>
                        <div className="addProject__form__input">
                            <label className="label" htmlFor="contactName">
                                Contact Name
                            </label>
                            <input
                                type="text"
                                id="contactName"
                                placeholder="e.g: John Smith"
                                name="contactName"
                                defaultValue={customer?.contactName}
                            />
                        </div>
                        <div className="addProject__form__input">
                            <label className="label" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="e.g: john@company.com"
                                name="email"
                                defaultValue={customer?.email}
                            />
                        </div>
                        <div className="addProject__form__input">
                            <label className="label" htmlFor="phone">
                                Phone
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                placeholder="e.g: +1 (555) 123-4567"
                                name="phone"
                                defaultValue={customer?.phone}
                            />
                        </div>
                        <div className="addProject__form__input">
                            <label className="label" htmlFor="industry">
                                Industry
                            </label>
                            <input
                                type="text"
                                id="industry"
                                placeholder="e.g: Technology"
                                name="industry"
                                defaultValue={customer?.industry}
                            />
                        </div>
                        <div className="addProject__form__input">
                            <label className="label" htmlFor="value">
                                Customer Value
                            </label>
                            <input
                                type="number"
                                id="value"
                                placeholder="e.g: 50000"
                                name="value"
                                defaultValue={customer?.value}
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="addProject__form__option">
                            <p className="addProject__form__option__label">Customer Status</p>
                            <div className="addProject__form__option__item">
                                <div className="addProject__form__option__item__radio">
                                    <input
                                        type="radio"
                                        name="status"
                                        value="prospect"
                                        defaultChecked={customer?.status === 'prospect'}
                                        id="prospect"
                                    />
                                    <label htmlFor="prospect">Prospect</label>
                                </div>
                                <div className="addProject__form__option__item__radio">
                                    <input
                                        type="radio"
                                        name="status"
                                        value="active"
                                        defaultChecked={customer?.status === 'active'}
                                        id="active"
                                    />
                                    <label htmlFor="active">Active</label>
                                </div>
                                <div className="addProject__form__option__item__radio">
                                    <input
                                        type="radio"
                                        name="status"
                                        value="inactive"
                                        defaultChecked={customer?.status === 'inactive'}
                                        id="inactive"
                                    />
                                    <label htmlFor="inactive">Inactive</label>
                                </div>
                            </div>
                        </div>
                    </fieldset>

                    <div className="addProject__form__input__textarea">
                        <label className="label" htmlFor="notes">
                            Notes
                        </label>
                        <textarea
                            placeholder="Add any additional notes about this customer"
                            name="notes"
                            defaultValue={customer?.notes}
                        />
                    </div>

                    <input
                        className="btnSubmit"
                        type="submit"
                        value={customer ? 'Update Customer' : 'Create Customer'}
                    />
                </Form>
            </div>
        </div>
    )
}

export default FormCustomer