const InfiniteArray = generator => {
    return new Proxy( [], {
        get: ( target, name ) => generator( Number( name ) )
    } )
}

module.exports = InfiniteArray