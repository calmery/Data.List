( () => {
    
    const pass = undefined
    
    class Tuple extends Array {
        
        constructor( ...xs ){
            super()
            xs.forEach( ( value, index ) => this[index] = value )
        }
        
    }
    
    const curry = func => {
        return ( ...arguments ) => {
            if( arguments.length >= func.length )
                return func.apply( func, arguments )
            return func.bind.apply( func, [func].concat( [].slice.call( arguments ) ) )
        }
    }
    
    /* --- Basic functions --- */
    
    // (++) :: [a] -> [a] -> [a]
    const concat = curry( 
        ( xs, ys ) => xs.concat( ys )
    )
    
    // head :: [a] -> a
    const head = curry(
        xs => xs[0]
    )
    
    // last :: [a] -> a
    const last = curry(
        xs => xs[xs.length-1]
    )
    
    // tail :: [a] -> [a]
    const tail = curry(
        xs => xs.concat().splice( 1 )
    )
    
    // init :: [a] -> [a]
    const init = curry(
        xs => xs.concat().splice( 0, xs.length-1 )
    )
    
    // uncons :: [a] -> Maybe( a, [a] )
    const uncons = curry(
        xs => xs.length !== 0 ? [xs[0], tail( xs )] : null
    )
    
    // null :: Foldable t => t a -> Bool
    const empty = curry(
        xs => xs.length === 0
    )
    
    // length :: Foldable t => t a -> Int
    const length = curry(
        xs => xs.length
    )
    
    /* --- List transformations --- */
    
    // map :: ( a -> b ) -> [a] -> [b]
    const map = curry(
        ( func, xs ) => xs.map( func )
    )
    
    // reverse :: [a] -> [a]
    const reverse = curry(
        xs => xs.concat().reverse()
    )
    
    // intersperse :: a -> [a] -> [a]
    const intersperse = curry(
        ( separator, xs ) => [].slice.call( xs ).join( separator )
    )
    
    // intercalate :: [a] -> [[a]] -> [a]
    const intercalate = curry(
        ( xs, xxs ) => [].slice.call( xxs ).join( xs )
    )
    
    // transpose :: [[a]] -> [[a]]
    const transpose = curry(
        xxs => {
            let outer = [],
                inner = [],
                max   = 0
            xxs.forEach( xs => max = max < xs.length ? xs.length : max )
            for( let i=0; i<max; i++ ){
                inner = []
                for( var j=0; j<xxs.length; j++ )
                    if( xxs[j][i] !== undefined ) 
                        inner.push( xxs[j][i] )
                outer.push( inner )
            }
            return outer
        }
    )
    
    // The 'nonEmptySubsequences' function returns the list of all subsequences of the argument, except for the empty list.
    const nonEmptySubsequences = xs => 
        ( xs.length === 0 ) ? [] : [[xs[0]]].concat( 
            foldr( 
                curry( ( x, ys, r ) => [ys].concat( [[x].concat( ys )], r ) )( xs[0] ), 
                [], 
                nonEmptySubsequences( xs.concat().splice( 1 ) ) 
            )
        )
    
    // subsequences :: [a] -> [[a]]
    const subsequences = curry(
        xs => [[]].concat( nonEmptySubsequences( xs ) )
    )
    
    const perms = ( _ts, is ) => {
        let ts = _ts.concat()
        if( ts.length === 0 ) return []
        const t = ts.shift()
        
        const interleave = ( xs, r ) => {
            let [_, zs] = interleave2( e => e, xs, r )
            return zs
        }

        const interleave2 = ( f, _ys, r ) => {
            let ys = _ys.concat()
            if( ys.length === 0 ) return [ts, r]
            const y = ys.shift()
            
            let [us, zs] = interleave2( e => f( [y].concat( e ) ), ys, r )
            return [[y].concat( us ), [f( [t].concat( [y].concat( us ) ) )].concat( zs )]
        }
        
        // return permutations( is ).reduce( interleave, ( perms( ts.concat(), [t].concat( is ) ) ) )
        return foldr( interleave, ( perms( ts.concat(), [t].concat( is ) ) ), permutations( is ) )
    }
    
    // permutations :: [a] -> [[a]]
    const permutations = curry(
        xs0 => [xs0].concat( perms( xs0.concat(), [] ) )
    )
    
    /* --- reducing lists ( folds ) --- */
    
    // foldl :: Foldable t => ( b -> a -> b ) -> b -> t a -> b
    const foldl = curry(
        ( func, fst, xs ) => {
            if( xs.length === 0 ) return fst
            let _xs = xs.concat()
            return foldl( func, func( fst, _xs.shift() ), _xs )
        }
    )
    
    // foldl1 :: Foldable t => (a -> a -> a) -> t a -> a
    const foldl1 = curry(
        ( func, xs ) => {
            if( xs.length === 1 ) return xs[0]
            let _xs = xs.concat()
            _xs[1] = func( xs[0], xs[1] )
            _xs.shift()
            return foldl1( func, _xs )
        }
    )
    
    // foldr :: Foldable t => (a -> b -> b) -> b -> t a -> b
    const foldr = curry(
        ( func, fst, xs ) => {
            if( xs.length === 0 ) return fst
            let _xs = xs.concat()
            return foldr( func, func( _xs.pop(), fst ), _xs )
        }
    )
    
    // foldr1 :: Foldable t => (a -> a -> a) -> t a -> a
    const foldr1 = curry(
        ( func, fst, xs ) => {
            if( xs.length === 1 ) return xs[0]
            let _xs = xs.concat()
            _xs[_xs.length-2] = func( xs[xs.length-2], xs[xs.length-1] )
            _xs.pop()
            return foldr1( func, _xs )
        }
    )
    
    /* --- Special folds --- */
    
    /* --- Infinite lists --- */
    
    /* --- Extracting sublists --- */
    
    const take = curry(
        ( count, xs ) => xs.concat().splice( 0, count )
    )
    
    const drop = curry(
        ( count, xs ) => xs.concat().splice( count )
    )
    
    const splitAt = curry(
        ( count, xs ) => new Tuple( take( count < 0 ? 0 : count, xs ), drop( count < 0 ? 0 : count, xs ) )
    )
    
    const takeWhile = curry(
        ( func, xs ) => pass
    )
    
    module.exports = takeWhile
    
} )()