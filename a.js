( () => {
    
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
    
    // permutations :: [a] -> [[a]]
    /*
    const permutations = curry(
        xs0 => {
            const perms = curry(
                ( ts, is ) => {
                    const interleave = curry(
                        ( xs, r ) => {
                            const interleave_dash = curry(
                                ( f, ys, r ) => {
                                    let y = ys.shift()
                                    let [us, zs] = interleave_dash( ( ( e ) => f( [y].concat( e ) ) ), ys, r )
                                    return [[y].concat( us ), f( [t].concat( [y].concat( us ) ) ).concat( zs )]
                                }
                            )
                            let [_, zs] = interleave_dash( ( e => e ), xs, r )
                            return zs
                        }
                    )
                    if( ts.length === 0 ) return []
                    let t = ts.shift()
                    return foldr( interleave, ( perms(ts, [t].concat( is ) ) ), permutations( is ) )
                }
            )
            return xs0.concat( perms( xs0, [] ) )
        }
    )
    */
    
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
        
        return foldr( interleave, ( perms( ts.concat(), [t].concat( is ) ) ), permutations( is ) )
    }
    
    // permutations :: [a] -> [[a]]
    const permutations = curry(
        xs0 => [xs0].concat( perms( xs0.concat(), [] ) )
    )
    
    /* --- reducing lists ( folds ) --- */
    
    const foldr = curry(
        ( func, fst, xs ) => {
            if( xs.length === 0 ) return fst
            let _xs = xs.concat()
            return foldr( func, func( _xs.pop(), fst ), _xs )
        }
    )
    
    
    
} )()