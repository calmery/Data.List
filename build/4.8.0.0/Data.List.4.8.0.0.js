/*

    Haskell - Data.List 4.8.0.0 in JavaScript
    
    Copyright (C) 2015 Kikukawa M. All rights reserved.
    Released under the MIT license ( ../LICENSE.txt )
    
    Date - Sat Aug 22 2015 18:45:00 GMT+0900 (JST)
    
    Data.List - //hackage.haskell.org/package/base-4.8.0.0/docs/src/Data-List.html
    -----------------------------------------------------------------------------
    -- |
    -- Module      :  Data.List
    -- Copyright   :  (c) The University of Glasgow 2001
    -- License     :  BSD-style (see the file libraries/base/LICENSE)
    -- 
    -- Maintainer  :  libraries@haskell.org
    -- Stability   :  stable
    -- Portability :  portable
    --
    -- Operations on lists.
    --
    -----------------------------------------------------------------------------
    
*/
(function( exports ){
        
        
    var Data = {
     
        List: {
            
            /* ----- * Basic functions ----- */
            
            '++': function( xs, ys ){
                return arguments.length < 2 ? Data.Private.portion( arguments, this ) : xs.concat( ys )
            },
            
            head: function( xs ){
                return arguments.length < 1 ? Data.Private.portion( arguments, this ) : xs[0]
            },
            
            last: function( xs ){
                return arguments.length < 1 ? Data.Private.portion( arguments, this ) : xs[xs.length-1]
            },
            
            tail: function( xs ){
                var _xs;
                return arguments.length < 1 ? Data.Private.portion( arguments, this ) : ( _xs = xs.concat(), _xs.shift(), _xs )
            },
            
            init: function( xs ){
                var _xs;
                return arguments.length < 1 ? Data.Private.portion( arguments, this ) : ( _xs = xs.concat(), _xs.pop(), _xs )
            },
            
            // Since 4.8.0.0
            uncons: function( xs ){
                return arguments.length < 1 ? Data.Private.portion( arguments, this ) : [ xs[0], xs.splice( 1, xs.length-1 ) ]
            },
            
            'null': function( xs ){
                return arguments.length < 1 ? Data.Private.portion( arguments, this ) : !xs.length
            },
            
            length: function( xs ){
                return arguments.length < 1 ? Data.Private.portion( arguments, this ) : xs.length
            },
            
            /* ----- * List transformations ----- */
            
            map: function( func, xs ){
                return arguments.length < 2 ? Data.Private.portion( arguments, this ) : xs.map( func )
            },
            
            reverse: function( xs ){
                return arguments.length < 1 ? Data.Private.portion( arguments, this ) : xs.reverse()
            },
            
            intersperse: function( elem, xs ){
                if( arguments.length < 2 ) return Data.Private.portion( arguments, this );
                var arr = [],
                    _xs = xs.concat();
                for( var i=0; i<xs.length*2-1; i++ ) arr[i] = i%2 ? elem : _xs.shift();
                return arr
            },
            
            intercalate: function( xs, ys ){
                if( arguments.length < 2 ) return Data.Private.portion( arguments, this );
                var arr1 = this.intersperse( xs, ys ),
                    arr2 = [];
                for( var i=0; i<arr1.length; i++ )
                    for( var j=0; j<arr1[i].length; j++ ) arr2[arr2.length] = arr1[i][j];
                return arr2
            },
            
            transpose: function( xs ){
                if( arguments.length < 1 ) return Data.Private.portion( arguments, this );
                var num  = xs.length,
                    arr1 = [],
                    max  = 0;
                for( var i=0; i<num; i++ ) max = max < xs[i].length ? xs[i].length : max;
                for( var i=0; i<max; i++ ){
                    var arr2 = [];
                    for( var j=0; j<num; j++ )
                        if( xs[j][i] ) arr2[arr2.length] = xs[j][i];
                    arr1[arr1.length] = arr2;
                }
                return arr1
            },
            
            subsequences: function( xs ){
                return arguments.length < 1 ? Data.Private.portion( arguments, this ) : [[]].concat( Data.Private.nonEmptySubsequences( xs ) )
            },
            
            permutation: function( xs ){
                if( arguments.length < 1 ) return Data.Private.portion( arguments, this );
                return (function(){
                    var gene = function( perm, pre, post, n ){
                        var elem, i, rest, len;
                        if( n>0 )
                            for( i=0, len=post.length; i<len; ++i ){
                                rest = post.slice(0);
                                elem = rest.splice(i, 1);
                                gene(perm,pre.concat(elem),rest,n-1);
                            }
                        else perm.push(pre);
                    }
                    var n = xs.length;
                    var perm = [];
                    gene(perm, [], xs, n);
                    return perm
                })()
            },
            
            /* ----- * Reducing lists (folds) ----- */
            
            foldl: function( func, fst, xs ){
                if( arguments.length < 3 ) return Data.Private.portion( arguments, this );
                if( !xs.length ) return fst;
                var _xs = xs.concat();
                return this.foldl( func, func(fst, _xs.shift() ), _xs )
            },

            foldl1: function( func, xs ){
                if( arguments.length < 2 ) return Data.Private.portion( arguments, this );
                if( xs.length == 1 ) return xs[0];
                xs[1] = func( xs[0], xs[1] );
                var _xs = xs.concat();
                _xs.shift();
                return this.foldl1( func, _xs )
            },
            
            foldr: function( func, fst, xs ){
                if( arguments.length < 3 ) return Data.Private.portion( arguments, this );
                if( !xs.length ) return fst;
                var _xs = xs.concat();
                return this.foldr( func, func( _xs.pop(), fst ), _xs )
            },

            foldr1: function( func, xs ){
                if( arguments.length < 2 ) return Data.Private.portion( arguments, this );
                if( xs.length == 1 ) return xs[0];
                xs[xs.length-2] = func( xs[xs.length-2], xs[xs.length-1] );
                var _xs = xs.concat();
                _xs.pop();
                return this.foldr1( func, _xs )
            },
            
            /* ----- ** Special folds ----- */
            
            concat: function( xs ){
                if( arguments.length < 1 ) return Data.Private.portion( arguments, this );
                if( !xs.length ) return [];
                var _xs = xs.concat();
                return _xs.shift().concat( this.concat( _xs ) )
            },

            concatMap: function( func, xs ){
                if( arguments.length < 2 ) return Data.Private.portion( arguments, this );
                if( !xs.length ) return [];
                var _xs = xs.concat();
                return func( _xs.shift() ).concat( this.concatMap( func, _xs ) )
            },
            
            and: function( xs ){
                if( arguments.length < 1 ) return Data.Private.portion( arguments, this );
                if( !xs.length ) return true;
                var _xs = xs.concat();
                return _xs.shift() ? this.and( _xs ) : false
            },

            or: function( xs ){
                if( arguments.length < 1 ) return Data.Private.portion( arguments, this );
                if( !xs.length ) return false;
                var _xs = xs.concat();
                return _xs.shift() ? true : this.or( _xs )
            },

            any: function( func, xs ){
                if( arguments.length < 2 ) return Data.Private.portion( arguments, this );
                var arr = [];
                for( var i=0; i<xs.length; i++ ) arr[i] = func( xs[i] );
                return this.or( arr )
            },

            all: function( func, xs ){
                if( arguments.length < 2 ) return Data.Private.portion( arguments, this );
                var arr = [];
                for( var i=0; i<xs.length; i++ ) arr[i] = func( xs[i] );
                return this.and( arr )
            },
            
            sum: function( xs ){
                if( arguments.length < 1 ) return Data.Private.portion( arguments, this );
                if( !xs.length ) return 0;
                var _xs = xs.concat();
                return _xs.shift() + this.sum( _xs )
            },

            product: function( xs ){
                if( arguments.length < 1 ) return Data.Private.portion( arguments, this );
                if( !xs.length ) return 1;
                var _xs = xs.concat();
                return _xs.shift() * this.product( _xs )
            },
            
            maximum: function( xs ){
                return arguments.length < 1 ? Data.Private.portion( arguments, this ) : this.foldl1( function( x, y ){
                    return x < y ? y : x 
                }, xs )
            },
            
            minimum: function( xs ){
                return arguments.length < 1 ? Data.Private.portion( arguments, this ) : this.foldl1( function( x, y ){
                    return x > y ? y : x 
                }, xs )
            },
            
            /* ----- * Building lists ----- */
            
            /* ----- ** Scans ----- */
            
            scanl: function( func, x, ys ){
                if( arguments.length < 3 ) return Data.Private.portion( arguments, this );
                if( !ys.length ) return [x]
                var _ys = ys.concat();
                var y = _ys.shift();
                return [x].concat( this.scanl( func, func( x, y ) , _ys ) )
            },

            scanl1: function( func, ys ){
                if( arguments.length < 2 ) return Data.Private.portion( arguments, this );
                var copy = ys[0];
                var res  = func( copy, ys[0] );
                var _f   = function( func, ys ){
                    if( ys.length == 1 ) return [];
                    ys[1] = func( ys[0], ys[1] );
                    var _ys = ys.concat();
                    _ys.shift();
                    return [_ys[0]].concat( _f( func, _ys ) )
                }
                return [copy].concat( _f( func, ys ) )
            },
            
            scanr: function( func, x, ys ){
                if( arguments.length < 3 ) return Data.Private.portion( arguments, this );
                if( !ys.length ) return [x];
                var _ys = ys.concat();
                var y = _ys.pop();
                return this.scanr( func, func( y, x ), _ys ).concat( x )
            },

            scanr1: function( func, ys ){
                if( arguments.length < 2 ) return Data.Private.portion( arguments, this );
                var copy = ys[ys.length-1];
                var res = func( copy, ys[ys.length-1] )
                var _f = function( func, ys ){
                    if( ys.length == 1 ) return [];
                    ys[ys.length-2] = func( ys[ys.length-2], ys[ys.length-1] );
                    var _ys = ys.concat();
                    _ys.pop();
                    return [_ys[_ys.length-1]].concat( _f( func,_ys ) )
                }
                return this.reverse( [copy].concat( _f( func, ys ) ) )
            },
            
            /* ----- ** Accumulating maps ----- */
            
            mapAccumL: function( func, fst, xs ){
                if( arguments.length < 3 ) return Data.Private.portion( arguments, this );
                if( !xs.length ) return [fst,[]];

                var _xs = xs.concat(),
                    x   = _xs.shift();
                var s2_y = func( fst, x );
                var s2 = s2_y[0], y = s2_y[1];
                var s3_ys = this.mapAccumL( func, s2, _xs );
                var s3 = s3_ys[0], ys = s3_ys[1];

                return [s3,[y].concat(ys)]
            },

            mapAccumR: function( func, fst, xs ){
                if( arguments.length < 3 ) return Data.Private.portion( arguments, this );
                if( !xs.length ) return [fst,[]];

                var _xs = xs.concat(),
                    x   = _xs.shift();
                var s2_ys = this.mapAccumR( func, fst, _xs );
                var s2 = s2_ys[0], ys = s2_ys[1];
                var s3_y = func( s2, x );
                var s3 = s3_y[0], y = s3_y[1];

                return [s3,[y].concat(ys)]
            },
            
            /* ----- ** Infinite lists ----- */
            /* ***** These functions is returns an infinite list but returns an caller function in JavaScript. ***** */
            
            iterate: function( func, fst ){
                return arguments.length < 2 ? Data.Private.portion( arguments, this ) : function( func, fst, num ){
                    var arr = [fst];
                    for( var i=1; i<num; i++ ) arr[i] = func( arr[i-1] );
                    return arr
                }.bind( this, func, fst )
            },
            
            repeat: function( elem ){
                return arguments.length < 1 ? Data.Private.portion( arguments, this ) : function( elem, num ){
                    var arr = [];
                    for( var i=0; i<num; i++ ) arr[i] = elem;
                    return arr
                }.bind( this, elem )
            },
            
            replicate: function( num, elem ){
                return arguments.length < 2 ? Data.Private.portion( arguments, this ) : this.repeat( elem )( num )
            },

            cycle: function( xs ){
                if( arguments.length < 1 ) return Data.Private.portion( arguments, this );
                return function( xs, num ){
                    var arr = [];
                    for( var i=0; i<Math.floor( num/xs.length )+1; i++ ) arr = arr.concat( xs );
                    return arr.splice( 0, num )
                }.bind( this, xs )
            },
            
            /* ----- * Unfolding ----- */
            
            unfoldr: function( func, fst ){
                if( arguments.length < 2 ) return Data.Private.portion( arguments, this );
                var re = func( fst );
                if( !re ) return [].concat( func( fst ) )
                return [].concat( func( fst ), this.unfoldr( func, re ) )
            },
            
            /* ----- * Sublists ----- */
            
            /* ----- ** Extracting sublists ----- */
            
            take: function( num, xs ){
                var _xs;
                return arguments.length < 2 ? Data.Private.portion( arguments, this ) : ( _xs = xs.concat(), _xs.splice( 0, num ) )
            },

            drop: function( num, xs ){
                var _xs;
                return arguments.length < 2 ? Data.Private.portion( arguments, this ) : ( _xs = xs.concat(), _xs.splice( num, _xs.length ) )
            },

            splitAt: function( num, xs ){
                var _xs;
                return arguments.length < 2 ? Data.Private.portion( arguments, this ) : ( _xs = xs.concat(), [_xs.splice( 0, num ),_xs] )
            },

            takeWhile: function( func, xs ){
                if( arguments.length < 2 ) return Data.Private.portion( arguments, this );
                var arr = [];
                for( var i=0; i<xs.length; i++ ){
                    if( func( xs[i] ) ) arr[arr.length] = xs[i];
                    else return arr
                }
                return arr
            },
            
            dropWhile: function( func, xs ){
                if( arguments.length < 2 ) return Data.Private.portion( arguments, this );
                var num = 0
                for( var i=0; i<xs.length; i++ ){
                    if( !func( xs[i] ) ){
                        num = i;
                        break
                    }
                }
                var _xs = xs.concat();
                return num ? _xs.splice( num, _xs.length-1 ) : []
            },

            dropWhileEnd: function( func, xs ){
                if( arguments.length < 2 ) return Data.Private.portion( arguments, this );
                var num = xs.length-1
                for( var i=0; i<xs.length; i++ ){
                    if( func( xs[i] ) ){
                        num = i;
                        break
                    }
                }
                var _xs = xs.concat();
                return num ? _xs.splice( 0, num ) : []
            },

            span: function( func, xs ){
                if( arguments.length < 2 ) return Data.Private.portion( arguments, this );
                var ys = [],zs = [];

                var flg = 1;
                for (var i = 0; i < xs.length; i++) {

                    if (flg && func( xs[i] )) ys[ys.length] = xs[i];
                    else {
                        flg = 0;
                        zs[zs.length] = xs[i]
                    }

                }

                return [ys, zs]            
            },

            'break': function( func, xs ){
                if( arguments.length < 2 ) return Data.Private.portion( arguments, this );
                var num = 0;
                for( var i=0; i<xs.length; i++ ){
                    if( func( xs[i] ) ){
                        num = i;
                        break
                    }
                }
                return this.splitAt(num,xs)
            },
            
            stripPrefix: function( arr1, arr2 ){
                if( arguments.length < 2 ) return Data.Private.portion( arguments, this );
                var ar2 = this.splitAt( arr1.length, arr2 )
                return this.isPrefixOf( arr1, ar2[0] ) ? ar2[1] : false 
            },

            group: function( xs ){
                if( arguments.length < 1 ) return Data.Private.portion( arguments, this );
                var _xs = xs.concat();
                var arr = [];
                for(var i=0; _xs.length; i++ ){
                    var base = _xs.shift(),
                        ret  = [base];
                    if( base != undefined ){
                        var num = _xs.length;
                        for( var j=0; j<_xs.length; j++ ){
                            if( base != _xs[j] ){
                                num = j;
                                break
                            }
                        }
                        ret = ret.concat( _xs.splice( 0, num ) );
                        arr[arr.length] = ret
                    }
                }
                return arr
            },

            inits: function( xs ){
                if( arguments.length < 1 ) return Data.Private.portion( arguments, this );
                var arr = [[]], _xs = xs.concat();
                var j = 0;
                for( var i=0; i<xs.length; i++ ) arr[arr.length] = [];
                for( var i=1; i<arr.length; i++ ) arr[i] = arr[i-1].concat( _xs.shift() );
                return arr
            },

            tails: function( xs ){
                return arguments.length < 1 ? Data.Private.portion( arguments, this ) : this.reverse( this.inits( xs ) )
            },

            /* ----- ** Predicates ----- */
            
            isPrefixOf: function( arr1, arr2 ){
                return arguments.length < 2 ? Data.Private.portion( arguments, this ) : ( arr2.join(',').indexOf( arr1.join(',') ) > -1 ) ? true : false
            },

            isSuffixOf: function( arr1, arr2 ){
                return arguments.length < 2 ? Data.Private.portion( arguments, this ) : ( arr1.join(',').indexOf( arr2.join(',') ) > -1 ) ? true : false
            },

            isInfixOf: function( arr1, arr2 ){
                return arguments.length < 2 ? Data.Private.portion( arguments, this ) : this.isPrefixOf( arr1, arr2 )
            },
            
            // Since 4.8.0.0
            isSubsequenceOf: function( xs, ys ){
                var x, y;
                return arguments.length < 2 ? Data.Private.portion( arguments, this ) : xs.length==0 ? true : ys.length == 0 ? false : ( x = xs.slice( 1, xs.length ), y = ys.slice( 1, ys.length ), xs[0] == ys[0] ? this.isSubsequenceOf( x, y ) : this.isSubsequenceOf( xs, y ) )
            },
            
            /* ----- * Searching lists ----- */
            
            elem: function( elem, xs ){
                if( arguments.length < 2 ) return Data.Private.portion( arguments, this );
                if( !xs.length ) return false;
                var _xs = xs.concat();
                return ( elem === _xs.shift() ) ? true : this.elem( elem, _xs )
            },
            
            notElem: function( elem, xs ){
                return arguments.length < 2 ? Data.Private.portion( arguments, this ) : this.elem( elem, xs ) ? false : true
            },
            
            lookup: function( index, xs ){
                if( arguments.length < 2 ) return Data.Private.portion( arguments, this );
                if( xs[0].length > 2 ) return false;
                for( var i=0; i<xs.length; i++ ) if( index == xs[i][0] ) return xs[i][1];
                return false // Nothing
            },
            
            /* ----- ** Searching with a predicate ----- */
            
            find: function( ex, xs ){
                return arguments.length < 2 ? Data.Private.portion( arguments, this ) : this.filter( ex, xs )[0]
            },

            filter: function( func, xs ){
                if( arguments.length < 2 ) return Data.Private.portion( arguments, this );
                if( !xs.length ) return [];
                var _xs = xs.concat();
                var x = _xs.shift();
                return [].concat( func( x )?x:[], this.filter( func, _xs ) )
            },

            partition: function( func, xs ){
                if( arguments.length < 2 ) return Data.Private.portion( arguments, this );
                var tru = [], fal = [];
                for( var i=0; i<xs.length; i++ ){
                    if( func( xs[i] ) ) tru[tru.length] = xs[i];
                    else fal[fal.length] = xs[i]
                }
                return [tru,fal]
            },
            
            /* ----- * Indexing lists ----- */
            
            '!!': function( xs, index ){
                return arguments.length < 2 ? Data.Private.portion( arguments, this ) : xs[index]
            },

            elemIndex: function( index, xs ){
                return arguments.length < 2 ? Data.Private.portion( arguments, this ) : this.elemIndices( index, xs )[0]
            },

            elemIndices: function( index, xs ){
                if( arguments.length < 2 ) return Data.Private.portion( arguments, this );
                var arr = [];
                for( var i=0; i<xs.length; i++ ) if( index === xs[i] ) arr[arr.length] = i;
                return arr
            },

            findIndex: function( func, xs ){
                return arguments.length < 2 ? Data.Private.portion( arguments, this ) : this.findIndices( func, xs )[0]
            },

            findIndices: function( func, xs ){
                if( arguments.length < 2 ) return Data.Private.portion( arguments, this );
                var arr = [];
                for( var i=0; i<xs.length; i++ ) if( func(xs[i]) ) arr[arr.length] = i;
                return arr
            },

            /* ----- * Zipping and unzipping lists ----- */
            
            zip: function( xs, ys ){
                var _xs, _ys;
                return arguments.length < 2 ? Data.Private.portion( arguments, this ) : ( xs.length == 1 || ys.length == 1 ) ? [[xs[0], ys[0]]] : ( _xs = xs.concat(), _ys = ys.concat(), [[_xs.shift(),_ys.shift()]].concat( this.zip( _xs, _ys ) ) )
            },

            zip3: function( xs, ys, zs ){
                var _xs, _ys, _zs;
                return arguments.length < 3 ? Data.Private.portion( arguments, this ) : ( xs.length == 1 || ys.length == 1 || zs.length == 1 ) ? [[xs[0], ys[0], zs[0]]] : ( _xs = xs.concat(), _ys = ys.concat(), _zs = zs.concat(), [[_xs.shift(),_ys.shift(),_zs.shift()]].concat( this.zip3( _xs, _ys, _zs ) ) )
            },

            zip4: function( xs, ys, zs, as ){
                var _xs, _ys, _zs, _as;
                return arguments.length < 4 ? Data.Private.portion( arguments, this ) : ( xs.length == 1 || ys.length == 1 || zs.length == 1 || as.length == 1) ? [[xs[0], ys[0], zs[0], as[0]]] : (  _xs = xs.concat(), _ys = ys.concat(), _zs = zs.concat(), _as = as.concat(), [[_xs.shift(),_ys.shift(),_zs.shift(),_as.shift()]].concat( this.zip4( _xs, _ys, _zs, _as ) ) )
            },

            zip5: function( xs, ys, zs, as, bs ){
                var _xs, _ys, _zs, _as, _bs;
                return arguments.length < 5 ? Data.Private.portion( arguments, this ) : ( xs.length == 1 || ys.length == 1 || zs.length == 1 || as.length == 1 || bs.length == 1 ) ? [[xs[0], ys[0], zs[0], as[0], bs[0]]] : ( _xs = xs.concat(), _ys = ys.concat(), _zs = zs.concat(), _as = as.concat(), _bs = bs.concat(), [[_xs.shift(),_ys.shift(),_zs.shift(),_as.shift(),_bs.shift()]].concat( this.zip5( _xs, _ys, _zs, _as, _bs ) ) )
            },

            zip6: function( xs, ys, zs, as, bs, cs ){
                var _xs, _ys, _zs, _as, _bs, _cs;
                return arguments.length < 6 ? Data.Private.portion( arguments, this ) : ( xs.length == 1 || ys.length == 1 || zs.length == 1 || as.length == 1 || bs.length == 1 || cs.length == 1 ) ? [[xs[0], ys[0], zs[0], as[0], bs[0], cs[0]]] : ( _xs = xs.concat(), _ys = ys.concat(), _zs = zs.concat(), _as = as.concat(), _bs = bs.concat(), _cs = cs.concat(), [[_xs.shift(),_ys.shift(),_zs.shift(),_as.shift(),_bs.shift(),_cs.shift()]].concat( this.zip6( _xs, _ys, _zs, _as, _bs, _cs ) ) )
            },

            zip7: function( xs, ys, zs, as, bs, cs, ds ){
                var _xs, _ys, _zs, _as, _bs, _cs, _ds;
                return arguments.length < 7 ? Data.Private.portion( arguments, this ) : ( xs.length == 1 || ys.length == 1 || zs.length == 1 || as.length == 1 || bs.length == 1 || cs.length == 1 || ds.length == 1 ) ? [[xs[0], ys[0], zs[0], as[0], bs[0], cs[0], ds[0]]] : ( _xs = xs.concat(), _ys = ys.concat(), _zs = zs.concat(), _as = as.concat(), _bs = bs.concat(), _cs = cs.concat(), _ds = ds.concat(), [[_xs.shift(),_ys.shift(),_zs.shift(),_as.shift(),_bs.shift(),_cs.shift(),_ds.shift()]].concat( this.zip7( _xs, _ys, _zs, _as, _bs, _cs, _ds ) ) )
            },
            
            zipWith: function( func, xs, ys ){
                var _xs, _ys;
                return arguments.length < 3 ? Data.Private.portion( arguments, this ) : ( xs.length == 1 || ys.length == 1 ) ? func( xs[0], ys[0] ) : ( _xs = xs.concat(), _ys = ys.concat(), [].concat( func( _xs.shift(), _ys.shift() ), this.zipWith( func, _xs, _ys ) ) )
            },

            zipWith3: function( func, xs, ys, zs ){
                var _xs, _ys, _zs;
                return arguments.length < 4 ? Data.Private.portion( arguments, this ) : ( xs.length == 1 || ys.length == 1 || zs.length == 1 ) ? func( xs[0], ys[0], zs[0] ) : ( _xs = xs.concat(), _ys = ys.concat(), _zs = zs.concat(), [].concat( func( _xs.shift(), _ys.shift(), _zs.shift() ), this.zipWith3( func, _xs, _ys, _zs ) ) )
            },

            zipWith4: function( func, xs, ys, zs, as ){
                var _xs, _ys, _zs, _as;
                return arguments.length < 5 ? Data.Private.portion( arguments, this ) : ( xs.length == 1 || ys.length == 1 || zs.length == 1 || as.length == 1 ) ? func( xs[0], ys[0], zs[0], as[0] ) : ( _xs = xs.concat(), _ys = ys.concat(), _zs = zs.concat(), _as = as.concat(), [].concat( func( _xs.shift(), _ys.shift(), _zs.shift(), _as.shift() ), this.zipWith4( func, _xs, _ys, _zs, _as ) ) )
            },

            zipWith5: function( func, xs, ys, zs, as, bs ){
                var _xs, _ys, _zs, _as, _bs;
                return arguments.length < 6 ? Data.Private.portion( arguments, this ) : ( xs.length == 1 || ys.length == 1 || zs.length == 1 || as.length == 1 || bs.length == 1) ? func( xs[0], ys[0], zs[0], as[0], bs[0] ) : ( _xs = xs.concat(), _ys = ys.concat(), _zs = zs.concat(), _as = as.concat(), _bs = bs.concat(), [].concat( func( _xs.shift(), _ys.shift(), _zs.shift(), _as.shift(), _bs.shift() ), this.zipWith5( func, _xs, _ys, _zs, _as, _bs ) ) )
            },

            zipWith6: function( func, xs, ys, zs, as, bs, cs ){
                var _xs, _ys, _zs, _as, _bs, _cs;
                return arguments.length < 7 ? Data.Private.portion( arguments, this ) : ( xs.length == 1 || ys.length == 1 || zs.length == 1 || as.length == 1 || bs.length == 1 || cs.length == 1) ? func( xs[0], ys[0], zs[0], as[0], bs[0], cs[0] ) : ( _xs = xs.concat(), _ys = ys.concat(), _zs = zs.concat(), _as = as.concat(), _bs = bs.concat(), _cs = cs.concat(), [].concat( func( _xs.shift(), _ys.shift(), _zs.shift(), _as.shift(), _bs.shift(), _cs.shift() ), this.zipWith6( func, _xs, _ys, _zs, _as, _bs, _cs ) ) )
            },

            zipWith7: function( func, xs, ys, zs, as, bs, cs, ds ){
                var _xs, _ys, _zs, _as, _bs, _cs, _ds;
                return arguments.length < 8 ? Data.Private.portion( arguments, this ) : ( xs.length == 1 || ys.length == 1 || zs.length == 1 || as.length == 1 || bs.length == 1 || cs.length == 1 || ds.length == 1) ? func( xs[0], ys[0], zs[0], as[0], bs[0], cs[0], ds[0] ) : ( _xs = xs.concat(), _ys = ys.concat(), _zs = zs.concat(), _as = as.concat(), _bs = bs.concat(), _cs = cs.concat(), _ds = ds.concat(), [].concat( func( _xs.shift(), _ys.shift(), _zs.shift(), _as.shift(), _bs.shift(), _cs.shift(), _ds.shift() ),this.zipWith7( func, _xs, _ys, _zs, _as, _bs, _cs, _ds ) ) )
            },

            unzip: function( xs ){
                if( arguments.length < 1 ) return Data.Private.portion( arguments, this );
                var one = [], two = [];
                for( var i=0; i<xs.length; i++ ){
                    if(xs[i].length != 2) return false;
                    one[i] = xs[i][0];
                    two[i] = xs[i][1];
                }
                return [one,two]
            },

            unzip3: function( xs ){
                if( arguments.length < 1 ) return Data.Private.portion( arguments, this );
                var one = [], two = [], the = [];
                for( var i=0; i<xs.length; i++ ){
                    if(xs[i].length != 3) return false;
                    one[i] = xs[i][0];
                    two[i] = xs[i][1];
                    the[i] = xs[i][2];
                }
                return [one,two,the]
            },

            unzip4: function( xs ){
                if( arguments.length < 1 ) return Data.Private.portion( arguments, this );
                var one = [], two = [], the = [], fou = [];
                for( var i=0; i<xs.length; i++ ){
                    if(xs[i].length != 4) return false;
                    one[i] = xs[i][0];
                    two[i] = xs[i][1];
                    the[i] = xs[i][2];
                    fou[i] = xs[i][3];
                }
                return [one,two,the,fou]
            },

            unzip5: function( xs ){
                if( arguments.length < 1 ) return Data.Private.portion( arguments, this );
                var one = [], two = [], the = [], fou = [], fiv = [];
                for( var i=0; i<xs.length; i++ ){
                    if(xs[i].length != 5) return false;
                    one[i] = xs[i][0];
                    two[i] = xs[i][1];
                    the[i] = xs[i][2];
                    fou[i] = xs[i][3];
                    fiv[i] = xs[i][4];
                }
                return [one,two,the,fou,fiv]
            },

            unzip6: function( xs ){
                if( arguments.length < 1 ) return Data.Private.portion( arguments, this );
                var one = [], two = [], the = [], fou = [], fiv = [], six =[];
                for( var i=0; i<xs.length; i++ ){
                    if(xs[i].length != 6) return false;
                    one[i] = xs[i][0];
                    two[i] = xs[i][1];
                    the[i] = xs[i][2];
                    fou[i] = xs[i][3];
                    fiv[i] = xs[i][4];
                    six[i] = xs[i][5];
                }
                return [one,two,the,fou,fiv,six]
            },

            unzip7: function( xs ){
                if( arguments.length < 1 ) return Data.Private.portion( arguments, this );
                var one = [], two = [], the = [], fou = [], fiv = [], six =[], sev = [];
                for( var i=0; i<xs.length; i++ ){
                    if(xs[i].length != 7) return false;
                    one[i] = xs[i][0];
                    two[i] = xs[i][1];
                    the[i] = xs[i][2];
                    fou[i] = xs[i][3];
                    fiv[i] = xs[i][4];
                    six[i] = xs[i][5];
                    sev[i] = xs[i][6];
                }
                return [one,two,the,fou,fiv,six,sev]
            },

            /* ----- * Special lists ----- */
            
            /* ----- ** Functions on strings ----- */
            
            lines: function( line ){
                return arguments.length < 1 ? Data.Private.portion( arguments, this ) : line.split(/\n/)
            },

            words: function( line ){
                return arguments.length < 1 ? Data.Private.portion( arguments, this ) : line.split(/\s/)
            },

            unlines: function( xs ){
                return arguments.length < 1 ? Data.Private.portion( arguments, this ) : xs.join('\n')
            },

            unwords: function( xs ){
                return arguments.length < 1 ? Data.Private.portion( arguments, this ) : xs.join(' ')
            },

            /* ----- ** \"Set\" operations ----- */
            
            nub: function( xs ){
                return arguments.length < 1 ? Data.Private.portion( arguments, this ) : xs.filter( function ( x, i, self ){
                    return self.indexOf(x) === i
                } )
            },

            delete: function( elem, xs ){
                if( arguments.length < 2 ) return Data.Private.portion( arguments, this );
                var _xs = xs.concat();
                if( _xs.indexOf(elem) > -1 ) delete _xs.splice( _xs.indexOf(elem), 1 );
                return _xs
            },

            '\\': function( arr1, arr2 ){
                if( arguments.length < 2 ) return Data.Private.portion( arguments, this );
                for( var i=0; i<arr2.length; i++ ) if( arr1.indexOf( arr2[i] ) > -1 ) arr1.splice( arr1.indexOf(arr2[i]), 1 );
                return arr1;
            },

            union: function( arr1, arr2 ){
                return arguments.length < 2 ? Data.Private.portion( arguments, this ) : this.nub( arr1.concat( arr2 ) )
            },

            intersect: function( arr1, arr2 ){
                if( arguments.length < 2 ) return Data.Private.portion( arguments, this );
                var arr = [];
                for( var i=0; i<arr1.length; i++ ) for( var j=0; j<arr2.length; j++ ) if( arr1[i] === arr2[j] ) arr[arr.length] = arr1[i];
                return arr
            },
            
            /* ----- ** Ordered lists ----- */
            
            sort: function( xs ){
                if( arguments.length < 1 ) return Data.Private.portion( arguments, this );
                if( !xs.length ) return [];
                var _xs = xs.concat();
                var base  = _xs.shift(),
                    small = _xs.filter(function(e){ return e <= base }),
                    large = _xs.filter(function(e){ return e >  base });
                return this.sort( small ).concat( base, this.sort( large ) )
            },
            
            // Since 4.8.0.0
            sortOn: function( func, xs ){
                if( arguments.length < 2 ) return Data.Private.portion( arguments, this );
                var fst = xs.filter( func );
                var sec = [];
                for( var i=0;i<xs.length;i++ ) if( !func(xs[i]) ) sec[sec.length] = xs[i];
                return sec.concat( fst )
            },

            insert: function( elem, xs ){
                return arguments.length < 2 ? Data.Private.portion( arguments, this ) : [elem].concat(xs)
            },
            
            /* ----- * Generalized functions ----- */
            
            /* ----- ** The \"@By@\" operations ----- */
            
            nubBy: function( eq, xs ){
                if( arguments.length < 2 ) return Data.Private.portion( arguments, this );
                if( !xs.length ) return [];
                var _xs = xs.concat();

                var x = _xs.shift()
                var func = function( y ){
                    return !eq(y,x)
                }
                return [x].concat( this.nubBy( eq, Data.List.filter( func, _xs ) ) )
            },

            deleteBy: function( eq, x, ys ){
                if( arguments.length < 3 ) return Data.Private.portion( arguments, this );
                var flg = true, arr = [];
                for( var i=0; i<ys.length; i++ ){
                    if( flg && !eq( x, ys[i] ) ) arr[arr.length] = ys[i];
                    else{
                        if( !flg ) arr[arr.length] = ys[i];
                        flg = false
                    }
                }
                return arr
            },

            deleteFirstsBy: function( eq, xs, ys ){
                if( arguments.length < 3 ) return Data.Private.portion( arguments, this );
                var flip = function( f, x, y){
                    if( !f ) return flip;
                    if( !x ) return flip.bind(this,f);
                    if( !y ) return flip.bind(this,f,x);
                    return f( y, x )
                };
                return this.foldl( flip( this.deleteBy( eq ) ), xs, ys )
            },

            unionBy: function( eq, xs, ys ){
                if( arguments.length < 3 ) return Data.Private.portion( arguments, this );
                var flip = function( f, x, y ){
                    if( !f ) return flip;
                    if( !x ) return flip.bind(this,f);
                    if( !y ) return flip.bind(this,f,x);
                    return f(y,x)
                };
                var arr = [];
                for(var i=0;i<xs.length;i++) arr[i] = xs[i];
                return arr.concat( this.foldl( flip( this.deleteBy( eq ) ), this.nubBy( eq, ys ), xs ) )
            },

            intersectBy: function( eq, xs, ys ){
                if( arguments.length < 3 ) return Data.Private.portion( arguments, this );
                var arr = [];
                for( var i=0; i<xs.length; i++ ){
                    var x = xs[i];
                    var _eq = eq.bind( this, x );
                    var a = this.any( _eq, ys );
                    if( a ) arr[arr.length] = x
                }
                return arr
            },

            groupBy: function( eq, xs ){
                if( arguments.length < 2 ) return Data.Private.portion( arguments, this );
                if ( !xs.length ) return [];
                var _xs = xs.concat();
                var x = _xs.shift();
                var _sp = this.span( eq.bind( this, x ), _xs );
                var ys = _sp[0];
                var zs = _sp[1];
                return [[x].concat( ys )].concat( this.groupBy( eq, zs ) )
            },
            
            /* ----- *** User-supplied comparison (replacing an @Ord@ context) ----- */
            
            sortBy: function( cmp, xs ){
                return  arguments.length < 2 ? Data.Private.portion( arguments, this ) : this.foldr( this.insertBy( cmp ), [], xs )
            },

            insertBy: function( cmp, x, ys ){
                if( arguments.length < 3 ) return Data.Private.portion( arguments, this );
                if( !ys.length ) return [x];
                var y = ys[0];
                var ys_ = [];
                for(var i=1;i<ys.length;i++) ys_[ys_.length] = ys[i];
                switch( cmp( x, y ) ){
                        case 'GT':
                            return [y].concat(this.insertBy(cmp,x,ys_));
                        default:
                            return [x].concat(ys)
                }
            },

            maximumBy: function( cmp, xs ){
                if( arguments.length < 2 ) return Data.Private.portion( arguments, this );
                var maxBy = function(x,y){
                    switch( cmp( x, y )){
                            case 'GT':
                                return x;
                            default:
                                return y;
                    }
                }
                return this.foldl1( maxBy, xs )
            },

            minimumBy: function( cmp, xs ){
                if( arguments.length < 2 ) return Data.Private.portion( arguments, this );
                var minBy = function( x, y ){
                    switch( cmp( x,y ) ){
                            case 'LT':
                            return x;
                            break;
                            default:
                            return y;
                    }
                }
                return this.foldl1( minBy, xs )
            }
            
        },
            
        Private: {
            
            portion: function( arg, self ){
                return arg.callee.bind.apply( arg.callee, [ self ].concat( [].slice.call( arg ) ) )
            },
            
            nonEmptySubsequences: function( xs ){
                if( !xs.length ) return [];
                var _xs = xs.concat(),
                    x   = _xs.shift(),
                    f   = function( _x, ys, r ){
                        return [ys].concat( [[x].concat( ys )], r )
                    }.bind( this, x );
                return [[x]].concat( Data.List.foldr( f, [], this.nonEmptySubsequences( _xs ) ) )
            }
            
        }
        
    }
    
    /* ----- ** The \"@generic@\" operations ----- */
    
    Data.List.genericLength = Data.List.length;
    Data.List["foldl'"] = Data.List.foldl;
    Data.List["foldl1'"] = Data.List.foldl1;
    Data.List["scanl'"] = Data.List.scanl;
    Data.List.genericTake = Data.List.take;
    Data.List.genericDrop = Data.List.drop;
    Data.List.genericSplitAt = Data.List.splitAt;
    Data.List.genericIndex = Data.List['!!'];
    Data.List.genericReplicate = Data.List.replicate;
    
    exports.Data = { List: Data.List }
    
})( window )