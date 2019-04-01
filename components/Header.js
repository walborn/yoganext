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
            Home
        </Link>
        <ul>
            {
                menu.map(i => (
                    <li key={i.key}>
                        <Link href={`/${i.href}`}>
                            {i.title}
                        </Link>
                    </li>
                ))
            }
        </ul>
    </div>
)
