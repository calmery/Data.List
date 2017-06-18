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
  const concat_o = ( _xs, ys ) => {
    if( _xs.length === 0 )
      return ys

    const xs = clone( _xs )
    const x  = xs.shift()

    return　[x].concat( concat_o( xs, ys ) )
  }

  const concat = curry(
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

  // Export

  self['++']     = concat
  self['head']   = head
  self['last']   = last
  self['tail']   = tail
  self['init']   = init
  self['uncons'] = uncons
  self['null']   = isNull
  self['length'] = length

} )(  typeof module === 'object' && module.hasOwnProperty( 'exports' ) ? module.exports : this  )
