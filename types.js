/* --- Tuple --- */

class Tuple extends Array {
    constructor( ...args ){
        super()
        args.forEach( ( value, index ) => this[index] = value )
    }

    toString(){
        console.log( this )
        return '(' + this.join( ',' ) + ')'
    }
}

/* --- Maybe --- */

class Just {
    constructor( value ){
        this.value = value
    }

    bind( transform ){
        return transform( this.value )
    }

    toString(){
        return 'Just ' + ( this.value.toString !== undefined ? this.value.toString() : this.value )
    }
}

class Nothing {
    bind(){
        return this
    }

    toString(){
        return 'Nothing'
    }
}