export default ({ children, ...props }) => (
    <div {...props}>
        {children}
        <style jsx>
            {
`
    position: relative;
    display: flow-root;
    box-sizing: border-box;
    margin: 0 auto;
    padding: 0 20px;
    width: 100%;
    max-width: 960px;
`
            }
        </style>
    </div>

)
