// Copyright (c) 2017 Copyright Calmery All Rights Reserved.
( self => {

  // _o is based on the original implementation

  // Basic functions
  // https://www.haskell.org/onlinereport/standard-prelude.html

  // (x:xs)
  // const xs = clone( _xs )
  // const x  = xs.shift()

  // [x]
  // xs[0]

  // ( typeof module === 'object' && typeof module.exports === 'object' )

  const curry = func => {
    if( func === undefined )
      return () => undefined

    let curried
    return (
      curried = ( ...args ) =>
        args.length < func.length
        ? curried.bind.apply( curried, [this].concat( args ) )
        : func.apply( this, args )
    ).bind( this )
  }

  // Array
  // concat()   14.238ms
  // slice( 0 ) 11.517ms
  const clone = xs => xs.slice( 0 )

  // Basic functions

  // (++) :: [a] -> [a] -> [a]
  const combine_o = ( _xs, ys ) => {
    if( _xs.length === 0 )
      return ys

    const xs = clone( _xs )
    const x  = xs.shift()

    return　[x].concat( combine_o( xs, ys ) )
  }

  const combine = curry(
    ( xs, ys ) => xs.concat( ys )
  )

  // head :: [a] -> a
  const head_o = _xs => {
    if( _xs.length === 0 )
      throw new Error( 'Prelude.head: empty list' )

    const xs = clone( _xs )
    const x  = xs.shift()

    return x
  }

  const head = curry(
    xs => xs[0]
  )

  // last :: [a] -> a
  const last_o = _xs => {
    if( _xs.length === 0 )
      throw new Error( 'Prelude.last: empty list' )

    if( _xs.length === 1 )
      return _xs[0]

    const xs = clone( _xs )
    const _  = xs.shift()

    return last_o( xs )
  }

  const last = curry(
    xs => xs[xs.length - 1]
  )

  // tail :: [a] -> [a]
  const tail_o = _xs => {
    if( _xs.length === 0 )
      throw new Error( 'Prelude.tail: empty list' )

    const xs = clone( _xs )
    const _  = xs.shift()

    return xs
  }

  const tail = curry(
    xs => xs.slice( 1 )
  )

  // init :: [a] -> [a]
  const init_o = _xs => {
    if( _xs.length === 0 )
      throw new Error( 'Prelude.init: empty list' )

    if( _xs.length === 1 )
      return []

    const xs = clone( _xs )
    const x  = xs.shift()

    return [x].concat( init_o( xs ) )
  }

  const init = curry(
    xs => xs.slice( 0, xs.length - 1 )
  )

  // uncons :: [a] -> Maybe( a, [a] )
  // Not found original source code
  const uncons = curry(
    xs => xs.length === 0 ? null :[head( xs ), tail( xs )]
  )

  // null :: Foldable t => t a -> Bool
  const isNull_o = _xs => {
    if( _xs.length === 0 )
      return true
    else
      return false
  }

  const isNull = curry(
    xs => xs.length === 0
  )

  // length :: Foldable t => t a -> Int
  const length_o = _xs => {
    if( _xs.length === 0 )
      return 0

    const l = clone( _xs )
    const _ = l.shift()

    return 1 + length_o( l )
  }

  const length = curry(
    xs => xs.length
  )

  // List transformations

  const map = curry(
    ( f, xs ) => xs.map( f )
  )

  const reverse = curry(
    xs => xs.reverse()
  )

  // intersperse( 'a', 'xyz' ) => TypeError: xs.shift is not a function
  // Fix
  const _intersperse = curry(
    ( sep, _xs ) => {
      if( _xs.length === 0 )
        return []

      if( _xs.length === 1 )
        return _xs[0]

      let isString = false
      if( typeof _xs === 'string' )
        isString = true

      let xs = clone( _xs )
      if( isString === true )
        xs = [].slice.call( xs )

      let x = xs.shift()

      let result = [x].concat( [sep].concat( _intersperse( sep, xs ) ) )

      return isString === true ? result.join( '' ) : result
    }
  )

  const intersperse = curry(
    ( sep, _xs ) => {
      if( _xs.length === 0 )
        return []

      if( _xs.length === 1 )
        return _xs[0]

      let xs = clone( _xs )
      let x  = xs.shift()

      return [x].concat( [sep].concat( intersperse( sep, xs ) ) )
    }
  )

  // Support function
  const nonEmptySubsequences = _xs => {
    if( _xs.length === 0 )
      return []

    let xs = clone( _xs ),
        x  = xs.shift(),
        f  = ( ys, r ) => [ys].concat( [[x].concat( ys )], r )
    return [[x]].concat( foldr( f, [], nonEmptySubsequences( xs ) ) )
  }

  const subsequences = curry(
    xs => [[]].concat( nonEmptySubsequences( xs ) )
  )

  const permutations = curry(
    xs0 => {
      const perms = ( _ts, _is ) => {
        let ts = _ts.concat()
        let is = _is.concat()

        if( ts.length === 0 )
          return []

        let t = ts.shift()

        const interleave_ = ( f, _ys, r ) => {
          let ys = _ys.concat()

          if( ys.length === 0 )
            return [ts, r]

          let y = ys.shift()

          let response = interleave_( x => f( [y].concat( x ) ), ys, r )
          let us = response[0]
          let zs = response[1]

          return [[y].concat( us ), [f( [t].concat( [y].concat( us ) ) )].concat( zs )]
        }

        const interleave = ( _xs, r ) => {
          let xs = _xs.concat()
          let response = interleave_( x => x, xs, r )

          let _  = response[0]
          let zs = response[1]

          return zs
        }

        return foldr( interleave, ( perms( ts, [t].concat( is ) ) ), ( permutations( is ) ) )
      }

      return [xs0].concat( perms( xs0, [] ) )
    }

  )

  // Reducing lists (folds)

  const foldr = curry(
    ( func, fst, _xs ) => {
      if( _xs.length === 0 ) return fst
      let xs = clone( _xs )
      return foldr( func, func( xs.pop(), fst ), xs )
    }
  )

  // Special folds

  const concat = curry(
    xxs => foldr( ( xs, ys ) => xs.concat( ys ), [], xxs )
  )


  // Export

  self['++']     = combine
  self['head']   = head
  self['last']   = last
  self['tail']   = tail
  self['init']   = init
  self['uncons'] = uncons
  self['null']   = isNull
  self['length'] = length

  self['map'] = map
  self['reverse'] = reverse
  self['intersperse']  = _intersperse

  self['permutations'] = permutations
  self['subsequences'] = subsequences

  self['foldr'] = foldr

  self['concat'] = concat

} )( typeof module === 'object' && module.hasOwnProperty( 'exports' ) ? module.exports : this )
