import Layout from '../../components/Layout'
import Unlimited from '../../components/Unlimited'
import './styles.scss';


export default () => (
    <Layout>
        <div className="price">
            <h2 className="price__header">Безлимитная неделя</h2>
            <Unlimited />
            <h2 className="price__header">Стоимость групповых занятий</h2>
            <section className="price__content">
                <div className="price__card">
                    <div className="price__card__amount">600 рублей</div> - разовое занятие.
                </div>
                <div className="price__card">
                    <div className="price__card__amount">2200 рублей</div> - абонемент на 4 занятия в течение 1-го месяца
                    <div className="price__card__hint">550 руб. одно занятие</div>
                </div>
                <div className="price__card">
                    <div className="price__card__amount">4000 рублей</div> - абонемент на 8 занятий в течение 1-го месяца
                    <div className="price__card__hint">500 руб. одно занятие</div>
                </div>
                <div className="price__card">
                    <div className="price__card__amount">5400 рублей</div> - абонемент на 12 занятий в течение 2-х месяцев.
                    <div className="price__card__hint">450 руб. одно занятие</div>
                </div>
                <div className="price__card">
                    <div className="price__card__amount">9600 рублей</div> - абонемент на 24 занятия в течение 3-х месяцев.
                    <div className="price__card__hint">400 руб. одно занятие</div>
                    <div className="price__card__hint">Этот абонемент можно заморозить 2 раза в сумме не более, чем на 30 дней</div>
                </div>
            </section>

            <h2 className="price__header">Стоимость индивидуальных занятий</h2>
            <section className="price__content">
                <div className="price__card">
                    <div className="price__card__amount">2000 рублей</div> - разовое занятие (1 час).
                </div>
                <div className="price__card">
                    <div className="price__card__amount">2500 рублей</div> – разовое занятие (1,5 часа).
                </div>
                <div className="price__card">
                    <div className="price__card__amount">7000 рублей</div> - абонемент на 4 занятия (по 1 часу) в течение 1-го месяца.
                </div>
            </section>
            <section className="price__info">
                Оплачивая занятие, абонемент или услугу, клиент присоединяется к настоящему <a href="/static/docs/privacy_policy_yoga_club_om.pdf">договору-оферте</a>
            </section>
        </div>
    </Layout>
)
