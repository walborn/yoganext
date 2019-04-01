import Link from 'next/link';

const menu = [
    { key: 'schedule', href: 'schedule', title: 'Расписание' },
    { key: 'price', href: 'price', title: 'Цены' },
    { key: 'master', href: 'master/list', title: 'Инструкторы' },
    { key: 'rent', href: 'rent', title: 'Аренда залов' },
    { key: 'contact', href: 'contact', title: 'Контакты' },
];

export default () => (
    <div>
        <Link href="/">
            <a>Home</a>
        </Link>
        <ul>
            {
                menu.map(i => (
                    <li key={i.key}>
                        <Link href={`/${i.href}`}>
                            <a>{i.title}</a>
                        </Link>
                    </li>
                ))
            }
        </ul>
    </div>
)
