import { Form, redirect, useNavigate } from 'react-router-dom'
import { removeDeal } from '../data/deals'

export async function action({ params }) {
    await removeDeal(params.dealId)
    return redirect('/deals')
}

function DealCard({ deal }) {
    const {
        dealName,
        customerName,
        value,
        stage,
        probability,
        expectedCloseDate,
        assignedTo,
        notes,
        id,
    } = deal

    const navigate = useNavigate()

    const getStageColor = (stage) => {
        switch (stage) {
            case 'prospecting': return 'progress'
            case 'qualification': return 'medium'
            case 'proposal': return 'high'
            case 'negotiation': return 'high'
            case 'closed-won': return 'done'
            case 'closed-lost': return 'cancelled'
            default: return 'medium'
        }
    }

    const getProbabilityColor = (probability) => {
        if (probability >= 75) return 'done'
        if (probability >= 50) return 'progress'
        if (probability >= 25) return 'medium'
        return 'high'
    }

    return (
        <div className="dashboard__container__project__content__item">
            <div className="dashboard__container__project__content__item__menuDots">
                <img src="public/img/3Dots.svg" alt="menuaction" />

                <div className="dashboard__container__project__content__item__menuDots__menu">
                    <button
                        className="btns btnEdit"
                        onClick={() => navigate(`/deals/${id}/edit`)}
                    >
                        <img src="public/img/edit.svg" alt="edit" />
                        edit
                    </button>
                    <Form
                        onSubmit={(e) => {
                            if (
                                !confirm(
                                    'Are you sure you want to delete this deal?'
                                )
                            ) {
                                e.preventDefault()
                            }
                        }}
                        method="post"
                        action={`/deals/${id}/remove`}
                    >
                        <button className="btns btnRemove" type="submit">
                            <img src="public/img/delete.svg" alt="remove" />
                            remove
                        </button>
                    </Form>
                    <button 
                        className="btns btnLaunch"
                        onClick={() => navigate(`/deals/${id}/details`)}
                    >
                        <img src="public/img/launch.svg" alt="view" />
                        view
                    </button>
                </div>
            </div>

            <div className="dashboard__container__project__content__item__company">
                <p className="dashboard__container__project__content__item__company--name">
                    {dealName}
                </p>

                <div className="dashboard__container__project__content__item__company__info">
                    <div className="dashboard__container__project__content__item__company__info--img">
                        <img src="public/img/user.svg" alt="customer" />
                        <small>customer</small>
                    </div>
                    <div className="dashboard__container__project__content__item__company__info--text">
                        <p>{customerName}</p>
                        <small>{assignedTo}</small>
                    </div>
                </div>
            </div>

            <div className="separator separator--1"></div>
            
            <div className="dashboard__container__project__content__item__events">
                <div className="status">
                    <p>Stage</p>
                    <span className={getStageColor(stage)}>{stage}</span>
                </div>
                <div className="status">
                    <p>Value</p>
                    <span className="done">${value?.toLocaleString() || '0'}</span>
                </div>
                <div className="status">
                    <p>Probability</p>
                    <span className={getProbabilityColor(probability)}>{probability}%</span>
                </div>
            </div>

            <div className="separator separator--2"></div>
            
            <div className="dashboard__container__project__content__item__action">
                <div className="dashboard__container__project__content__item__action__assets">
                    <div className="status">
                        <p>Expected Close</p>
                        <span className="progress">{expectedCloseDate}</span>
                    </div>
                    <p className="dashboard__container__project__content__item__action__assets--txt">
                        {notes || 'No notes available'}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default DealCard