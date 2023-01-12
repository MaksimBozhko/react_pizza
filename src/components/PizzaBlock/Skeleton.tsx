import React from "react"
import ContentLoader from "react-content-loader"

const Loader = () => (
    <ContentLoader
        speed={2}
        width={280}
        height={466}
        viewBox="0 0 280 466"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="0" y="269" rx="10" ry="10" width="280" height="22" />
        <circle cx="140" cy="125" r="125" />
        <rect x="0" y="317" rx="10" ry="10" width="280" height="85" />
        <rect x="13" y="424" rx="10" ry="10" width="90" height="30" />
        <rect x="124" y="417" rx="20" ry="20" width="150" height="45" />
    </ContentLoader>
)

export default Loader

