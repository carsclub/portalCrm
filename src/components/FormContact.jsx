import { Form, redirect, useActionData, useNavigate } from 'react-router-dom'
import { addContact } from '../data/contacts'
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

    await addContact(data)
    return redirect('/contacts')
}

function FormContact({ contact }) {
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

            <button className="popup__close" onClick={() => navigate('/contacts')}>
                <img src="/public/img/close.svg" alt="close popup" />
                <span>close</span>
            </button>

            <div className={`${message?.length ? 'addProject shake' : 'addProject'}`}>
                <div className="addProject__title">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <path d="M16 4C12.6863 4 10 6.68629 10 10C10 13.3137 12.6863 16 16 16C19.3137 16 22 13.3137 22 10C22 6.68629 19.3137 4 16 4ZM16 6C18.2091 6 20 7.79086 20 10C20 12.2091 18.2091 14 16 14C13.7909 14 12 12.2091 12 10C12 7.79086 13.7909 6 16 6ZM16 18C11.5817 18 4 20.2183 4 24.5V28H28V24.5C28 20.2183 20.4183 18 16 18ZM16 20C20.4183 20 26 21.7817 26 24.5V26H6V24.5C6 21.7817 11.5817 20 16 20Z" fill="#2C2E32"/>
                    </svg>
                    <div className="addProject__title--txt">
                        <h2>{contact ? 'Edit Contact' : 'Add New Contact'}</h2>
                        <p>Complete all the fields below</p>
                    </div>
                </div>

                <Form className="addProject__form" method="post" noValidate>
                    <fieldset>
                        <div className="addProject__form__input">
                            <label className="label" htmlFor="firstName">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                placeholder="e.g: John"
                                name="firstName"
                                defaultValue={contact?.firstName}
                            />
                        </div>
                        <div className="addProject__form__input">
                            <label className="label" htmlFor="lastName">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                placeholder="e.g: Smith"
                                name="lastName"
                                defaultValue={contact?.lastName}
                            />
                        </div>
                        <div className="addProject__form__input">
                            <label className="label" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="e.g: john.smith@company.com"
                                name="email"
                                defaultValue={contact?.email}
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
                                defaultValue={contact?.phone}
                            />
                        </div>
                        <div className="addProject__form__input">
                            <label className="label" htmlFor="company">
                                Company
                            </label>
                            <input
                                type="text"
                                id="company"
                                placeholder="e.g: Tech Solutions Inc"
                                name="company"
                                defaultValue={contact?.company}
                            />
                        </div>
                        <div className="addProject__form__input">
                            <label className="label" htmlFor="position">
                                Position
                            </label>
                            <input
                                type="text"
                                id="position"
                                placeholder="e.g: Marketing Manager"
                                name="position"
                                defaultValue={contact?.position}
                            />
                        </div>
                    </fieldset>

                    <fieldset>
                        <div className="addProject__form__option">
                            <p className="addProject__form__option__label">Contact Status</p>
                            <div className="addProject__form__option__item">
                                <div className="addProject__form__option__item__radio">
                                    <input
                                        type="radio"
                                        name="status"
                                        value="prospect"
                                        defaultChecked={contact?.status === 'prospect'}
                                        id="prospect-contact"
                                    />
                                    <label htmlFor="prospect-contact">Prospect</label>
                                </div>
                                <div className="addProject__form__option__item__radio">
                                    <input
                                        type="radio"
                                        name="status"
                                        value="active"
                                        defaultChecked={contact?.status === 'active'}
                                        id="active-contact"
                                    />
                                    <label htmlFor="active-contact">Active</label>
                                </div>
                                <div className="addProject__form__option__item__radio">
                                    <input
                                        type="radio"
                                        name="status"
                                        value="customer"
                                        defaultChecked={contact?.status === 'customer'}
                                        id="customer-contact"
                                    />
                                    <label htmlFor="customer-contact">Customer</label>
                                </div>
                                <div className="addProject__form__option__item__radio">
                                    <input
                                        type="radio"
                                        name="status"
                                        value="inactive"
                                        defaultChecked={contact?.status === 'inactive'}
                                        id="inactive-contact"
                                    />
                                    <label htmlFor="inactive-contact">Inactive</label>
                                </div>
                            </div>
                        </div>
                    </fieldset>

                    <div className="addProject__form__input__textarea">
                        <label className="label" htmlFor="notes">
                            Notes
                        </label>
                        <textarea
                            placeholder="Add any additional notes about this contact"
                            name="notes"
                            defaultValue={contact?.notes}
                        />
                    </div>

                    <input
                        className="btnSubmit"
                        type="submit"
                        value={contact ? 'Update Contact' : 'Create Contact'}
                    />
                </Form>
            </div>
        </div>
    )
}

export default FormContact