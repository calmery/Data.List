class InfiniteArray extends Array {
    
    constructor(){ 
        super()
        this.index = 0
    }
    
    shift(){
        return this[this.index++]
    }
    
}

let arr = new Proxy( new InfiniteArray(), {
    get: ( target, name ) => {
        if( name === 'length' ) return Infinity
        if( ['push', 'pop'].indexOf( name ) !== -1 ) return undefined
        if( name in target ) return target[name]
        return ( ( e ) => e * e )( Number( name ) )
    }
} )

module.exports.arr = arr
module.exports.InfiniteArray = InfiniteArray