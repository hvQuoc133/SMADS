import stylesPT from "@/styles/portableTextUniversal.module.css";

const portableTextUniversal = {
  block: {
    normal: ({ children }) => <p className={stylesPT['pt-normal']}>{children}</p>,
    h1: ({ children }) => <h1 className={stylesPT['pt-h1']}>{children}</h1>,
    h2: ({ children }) => <h2 className={stylesPT['pt-h2']}>{children}</h2>,
    h3: ({ children }) => <h3 className={stylesPT['pt-h3']}>{children}</h3>,
    h4: ({ children }) => <h4 className={stylesPT['pt-h4']}>{children}</h4>,
    h5: ({ children }) => <h5 className={stylesPT['pt-h5']}>{children}</h5>,
    h6: ({ children }) => <h6 className={stylesPT['pt-h6']}>{children}</h6>,
    blockquote: ({ children }) => <blockquote className={stylesPT['pt-blockquote']}>{children}</blockquote>,
  },
  marks: {
    strong: ({ children }) => <strong className={stylesPT['pt-strong']}>{children}</strong>,
    em: ({ children }) => <em className={stylesPT['pt-em']}>{children}</em>,
    underline: ({ children }) => <u className={stylesPT['pt-underline']}>{children}</u>,
    code: ({ children }) => <code className={stylesPT['pt-code']}>{children}</code>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target={value?.blank ? "_blank" : "_self"}
        rel="noopener noreferrer"
        className={stylesPT['pt-link']}
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className={stylesPT['pt-ul']}>{children}</ul>,
    number: ({ children }) => <ol className={stylesPT['pt-ol']}>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className={stylesPT['pt-li']}>{children}</li>,
    number: ({ children }) => <li className={stylesPT['pt-li']}>{children}</li>,
  },
};

export default portableTextUniversal;