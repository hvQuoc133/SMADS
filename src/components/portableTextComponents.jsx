import Image from "next/image";
import { urlFor } from "../sanity/lib/image";
import styles from "../styles/PortableText.module.css";

const portableTextComponents = {
    types: {
        image: ({ value }) => {
            if (!value?.asset?._ref) return null;
            const src = urlFor(value).width(800).height(500).quality(80).url();
            return (
                <div className={styles.contentImage}>
                    <Image
                        src={src}
                        alt={value.alt || "Content image"}
                        width={800}
                        height={500}
                        className={styles.image}
                    />
                    {value.caption && <p className={styles.imageCaption}>{value.caption}</p>}
                </div>
            );
        }
    },
    marks: {
        strong: ({ children }) => <strong className={styles.strong}>{children}</strong>,
        em: ({ children }) => <em className={styles.em}>{children}</em>,
        underline: ({ children }) => <u className={styles.underline}>{children}</u>,
        code: ({ children }) => <code className={styles.code}>{children}</code>,
        "strike-through": ({ children }) => <s className={styles.strikeThrough}>{children}</s>,
        link: ({ children, value }) => (
            <a
                href={value?.href}
                target={value?.blank ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className={styles.link}
            >
                {children}
            </a>
        )
    },
    block: {
        h1: ({ children }) => <h1 className={styles.h1}>{children}</h1>,
        h2: ({ children }) => <h2 className={styles.h2}>{children}</h2>,
        h3: ({ children }) => <h3 className={styles.h3}>{children}</h3>,
        h4: ({ children }) => <h4 className={styles.h4}>{children}</h4>,
        h5: ({ children }) => <h5 className={styles.h5}>{children}</h5>,
        h6: ({ children }) => <h6 className={styles.h6}>{children}</h6>,
        blockquote: ({ children }) => <blockquote className={styles.blockquote}>{children}</blockquote>,
        normal: ({ children }) => <p className={styles.p}>{children}</p>
    },
    list: {
        bullet: ({ children }) => <ul className={styles.ul}>{children}</ul>,
        number: ({ children }) => <ol className={styles.ol}>{children}</ol>
    },
    listItem: {
        bullet: ({ children }) => <li className={styles.li}>{children}</li>,
        number: ({ children }) => <li className={styles.li}>{children}</li>
    }
};

export default portableTextComponents;