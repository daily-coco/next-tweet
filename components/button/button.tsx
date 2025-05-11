import Link from 'next/link';

interface IButtonProps {
    icon?: string;
    style?: string;
    text: string;
    dir?: string;
}

export default function Button({ icon, style, text, dir }: IButtonProps) {
    return (
        <>
            <Link className={style ? style : ''} href={dir ? dir : ''}>
                {icon && <i aria-hidden='true'>{`<${icon} />`}</i>}
                <span>{text}</span>
            </Link>
        </>
    );
}
