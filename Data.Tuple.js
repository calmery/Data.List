(function( exports ){
    
    var Tuple = {
        
        fst: function( xs ){
            return xs[0]
        },
        
        snd: function( xs ){
            return xs[1]
        },
        
        curry: function( func, a, b ){
            return func( [a, b] )
        },
        
        uncurry: function( func, p ){
            return func( p[0], p[1] )
        },
        
        swap: function( xs ){
            return [xs[1], xs[0]]
        }
        
    }
    
    var Private = {
        Eq: {
            '==': function( xs, ys ){
                return true
            },
            '/=': function( xs, ys ){
                return false
            }
        },
        Qrd: {
            '<=': function( xs, ys ){
                return true
            },
            '<': function( xs, ys ){
                return false
            },
            '>=': function( xs, ys ){
                return true
            },
            '>': function( xs, ys ){
                return false
            },
            'max': function(){
                return []
            },
            'min': function(){
                return []
            },
            'compare': function(){
                return []
            }
        }
    }
    
    Tuple.Eq = Private.Eq
    Tuple.Ord = Private.Ord
    
    exports.Data = { Tuple: Tuple }
    
})( window )

var _ = Data.Tuple
console.log( _.curry( function( xs ){
    return _.fst( xs ) + _.snd( xs )
}, 1, 2 ) )
