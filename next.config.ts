const nextConfig = {
    rewrites() { // このメソッドを足す
        return [
            {
                source: "**",
                destination: "/"
            }
        ]
    }
}

module.exports = nextConfig