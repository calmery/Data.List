/*

    Haskell - Data.List 4.7.0.1 in JavaScript
    
    Copyright (C) 2015 M. Kikukawa All rights reserved.
    Released under the MIT license ( ../LICENSE.txt )
    
    Date - Sun May 31 2015 18:45:00 GMT+0900 (JST)
    
    Data.List - //hackage.haskell.org/package/base-4.7.0.1/docs/src/Data-List.html
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

    var Data = { List: {}, Private: {} }
    
    /* ----- ----- Data.List ----- ----- */
    
    Data.List = {
        
        /* ----- 基本関数 ----- */
        
        // リストの連結
        '++': function( xs, ys ){
            var pe = Data.Private.permit( arguments, this, 2 );
            if( pe != true ) return pe;
            
            return xs.concat( ys )
        },
        
        // 先頭の要素を返す
        head: function( xs ){
            var pe = Data.Private.permit( arguments, this, 1 );
            if( pe != true ) return pe;
            
            return xs[0]
        },
        
        // 最後の要素を返す
        last: function( xs ){
            var pe = Data.Private.permit( arguments, this, 1 );
            if( pe != true ) return pe;
            
            return xs[xs.length-1]
        },
        
        // 最初の要素をのぞいたすべての要素を返す
        tail: function( xs ){
            var pe = Data.Private.permit( arguments, this, 1 );
            if( pe != true ) return pe;
            
            var _xs = xs.concat();
            return _xs.shift(), _xs
        },
        
        // 最後の要素をのぞいたすべての要素を返す
        init: function( xs ){
            var pe = Data.Private.permit( arguments, this, 1 );
            if( pe != true ) return pe;
            
            var _xs = xs.concat();
            return _xs.pop(), _xs
        },
        
        // uncons 関数はサポートしていない
        
        // 配列が空かどうかを返す
        'null': function( xs ){
            var pe = Data.Private.permit( arguments, this, 1 );
            if( pe != true ) return pe;
            
            return !xs.length
        },
        
        // リストの長さを返す
        length: function( xs ){
            var pe = Data.Private.permit( arguments, this, 1 );
            if( pe != true ) return pe;
            
            return xs.length
        },
        
        /* ----- リストの変換 ----- */
        
        // 配列のそれぞれの要素に与えられた関数を適用する
        map: function( func, xs ){
            var pe = Data.Private.permit( arguments, this, 2 );
            if( pe != true ) return pe;
            
            if( !xs.length ) return [];
            var _xs = xs.concat();
            return [].concat( func( _xs.shift() ), arguments.callee( func, _xs ) )
        },
        
        // 配列を反転させる
        reverse: function( xs ){
            var pe = Data.Private.permit( arguments, this, 1 );
            if( pe != true ) return pe;
            
            if( !xs.length ) return [];
            var _xs  = xs.concat(),
                last = _xs.shift();
            if( typeof last == 'object' ) last = [last];
            return this.reverse( _xs ).concat( last )
        },
        
        // リストの各要素の間にある要素を挿入
        intersperse: function( elem, xs ){
            var pe = Data.Private.permit( arguments, this, 2 );
            if( pe != true ) return pe;
            
            var arr = [],
                _xs = xs.concat();
            for( var i=0; i<xs.length*2-1; i++ ) arr[i] = i%2 ? elem : _xs.shift();
            return arr
        },
        
        // リストの各要素の間にあるリストの要素を挿入して結合
        intercalate: function( xs, inXs ){
            var pe = Data.Private.permit( arguments, this, 2 );
            if( pe != true ) return pe;
            
            var arr1 = this.intersperse( xs, inXs ),
                arr2 = [];
            for( var i=0; i<arr1.length; i++ )
                for( var j=0; j<arr1[i].length; j++ ) arr2[arr2.length] = arr1[i][j];
            return arr2
        },
        
        // 配列の転地
        transpose: function( xs ){
            var pe = Data.Private.permit( arguments, this, 1 );
            if( pe != true ) return pe;
            
            var num  = xs.length,
                arr1 = [],
                max  = 0;
            for( var i=0; i<num; i++ ) max = max < xs[i].length ? xs[i].length : max;
            for( var j=0; j<max; j++ ){
                var arr2 = [];
                for( var k=0; k<num; k++ ) if(xs[k][j]) arr2[arr2.length] = xs[k][j];
                arr1[arr1.length] = arr2;
            }
            return arr1
        },
        
        // 与えられた配列の部分配列を返す
        subsequences: function( xs ){
            var pe = Data.Private.permit( arguments, this, 1 );
            if( pe != true ) return pe;
        
            return [[]].concat( Data.Private.nonEmptySubsequences( xs ) )
        },
        
        permutation: function( xs ){
            var pe = Data.Private.permit( arguments, this, 1 );
            if( pe != true ) return pe;
        
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
        
        /* ----- 配列の畳み込み ----- */
        
        foldl: function( func, fst, xs ){
            var pe = Data.Private.permit( arguments, this, 3 );
            if( pe != true ) return pe;
            
            if( !xs.length ) return fst;
            var _xs = xs.concat();
            return arguments.callee( func, func(fst, _xs.shift() ), _xs )
        },
        
        foldl1: function( func, xs ){
            var pe = Data.Private.permit( arguments, this, 2 );
            if( pe != true ) return pe;
            
            if( xs.length == 1 ) return xs[0];
            xs[1] = func( xs[0], xs[1] );
            var _xs = xs.concat();
            _xs.shift();
            return arguments.callee( func, _xs )
        },
        
        foldr: function( func, fst, xs ){
            var pe = Data.Private.permit( arguments, this, 3 );
            if( pe != true ) return pe;
            
            if( !xs.length ) return fst;
            var _xs = xs.concat();
            return arguments.callee( func, func( _xs.pop(), fst ), _xs )
        },
        
        foldr1: function( func, xs ){
            var pe = Data.Private.permit( arguments, this, 2 );
            if( pe != true ) return pe;
            
            if( xs.length == 1 ) return xs[0];
            xs[xs.length-2] = func( xs[xs.length-2], xs[xs.length-1] );
            var _xs = xs.concat();
            _xs.pop();
            return arguments.callee( func, _xs )
        },
        
        /* ----- ----- 配列の畳み込み（その他）----- ----- */
        concat: function( xs ){
            var pe = Data.Private.permit( arguments, this, 1 );
            if( pe != true ) return pe;
            
            if( !xs.length ) return [];
            var _xs = xs.concat();
            return _xs.shift().concat( arguments.callee( _xs ) )
        },
        
        concatMap: function( func, xs ){
            var pe = Data.Private.permit( arguments, this, 2 );
            if( pe != true ) return pe;
            
            if( !xs.length ) return [];
            var _xs = xs.concat();
            return func( _xs.shift() ).concat( arguments.callee( func, _xs ) )
        },
        
        and: function( xs ){
            var pe = Data.Private.permit( arguments, this, 1 );
            if( pe != true ) return pe;
            
            if( !xs.length ) return true;
            var _xs = xs.concat();
            return _xs.shift() ? arguments.callee( _xs ) : false
        },
        
        or: function( xs ){
            var pe = Data.Private.permit( arguments, this, 1 );
            if( pe != true ) return pe;
            
            if( !xs.length ) return false;
            var _xs = xs.concat();
            return _xs.shift() ? true : arguments.callee( _xs )
        },
        
        any: function( func, xs ){
            var pe = Data.Private.permit( arguments, this, 2 );
            if( pe != true ) return pe;
            
            var arr = [];
            for( var i=0; i<xs.length; i++ ) arr[i] = func( xs[i] );
            return this.or( arr )
        },
        
        all: function( func, xs ){
            var pe = Data.Private.permit( arguments, this, 2 );
            if( pe != true ) return pe;
            
            var arr = [];
            for( var i=0; i<xs.length; i++ ) arr[i] = func( xs[i] );
            return this.and( arr )
        },
        
        sum: function( xs ){
            var pe = Data.Private.permit( arguments, this, 1 );
            if( pe != true ) return pe;
            
            if( !xs.length ) return 0;
            var _xs = xs.concat();
            return _xs.shift() + arguments.callee( _xs )
        },
        
        product: function( xs ){
            var pe = Data.Private.permit( arguments, this, 1 );
            if( pe != true ) return pe;
            
            if( !xs.length ) return 1;
            var _xs = xs.concat();
            return _xs.shift() * arguments.callee( _xs )
        },
        
        maximum: function( xs ){
            var pe = Data.Private.permit( arguments, this, 1 );
            if( pe != true ) return pe;
            
            var _xs = xs.concat();
            var max = _xs.shift();
            for( var i=0; i<_xs.length; i++ ) max = ( _xs[i] < max ) ? max : _xs[i];
            return max
        },
        
        minimum: function( xs ){
            var pe = Data.Private.permit( arguments, this, 1 );
            if( pe != true ) return pe;
            
            var _xs = xs.concat();
            var min = _xs.shift();
            for( var i=0; i<_xs.length; i++ ) min = ( _xs[i] < min ) ? _xs[i] : min;
            return min
        },
        
        /* ----- ------ スキャン ----- ----- */
        
        scanl: function( func, x, ys ){
            var pe = Data.Private.permit( arguments, this, 3 );
            if( pe != true ) return pe;
            
            if( !ys.length ) return [x]
            var _ys = ys.concat();
            var y = _ys.shift();
            return [x].concat(arguments.callee(func,func(x,y),_ys))
        },
        
        scanl1: function( func, ys ){
            var pe = Data.Private.permit( arguments, this, 2 );
            if( pe != true ) return pe;
            
            var copy = ys[0];
            var res  = func( copy, ys[0] );
            var _f   = function( func, ys ){
                if( ys.length == 1 ) return [];
                ys[1] = func( ys[0], ys[1] );
                var _ys = ys.concat();
                _ys.shift();
                return [_ys[0]].concat(_f(func,_ys))
            }
            return [copy].concat( _f( func, ys ) )
        },
        
        scanr: function( func, x, ys ){
            var pe = Data.Private.permit( arguments, this, 3 );
            if( pe != true ) return pe;
            
            if( !ys.length ) return [x];
            var _ys = ys.concat();
            var y = _ys.pop();
            return arguments.callee( func, func( y, x ), _ys ).concat( x )
        },
        
        scanr1: function( func, ys ){
            var pe = Data.Private.permit( arguments, this, 2 );
            if( pe != true ) return pe;
            
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
        
        /* ----- ----- 累積写像 ----- ------ */
        
        mapAccumL: function( func, fst, xs ){
            var pe = Data.Private.permit( arguments, this, 3 );
            if( pe != true ) return pe;
            
            if( !xs.length ) return [fst,[]];
            
            var _xs = xs.concat(),
                x   = _xs.shift();
            var s2_y = func( fst, x );
            var s2 = s2_y[0], y = s2_y[1];
            var s3_ys = arguments.callee( func, s2, _xs );
            var s3 = s3_ys[0], ys = s3_ys[1];
            
            return [s3,[y].concat(ys)]
        },
        
        mapAccumR: function( func, fst, xs ){
            var pe = Data.Private.permit( arguments, this, 3 );
            if( pe != true ) return pe;
            
            if( !xs.length ) return [fst,[]];
            
            var _xs = xs.concat(),
                x   = _xs.shift();
            var s2_ys = arguments.callee( func, fst, _xs );
            var s2 = s2_ys[0], ys = s2_ys[1];
            var s3_y = func( s2, x );
            var s3 = s3_y[0], y = s3_y[1];
            
            return [s3,[y].concat(ys)]
        },
        
        /* ----- ----- リスト生成 ----- ----- */
        
        iterate: function( func, fst ){
            var pe = Data.Private.permit( arguments, this, 2 );
            if( pe != true ) return pe;
            
            return function( func, fst, num ){
                var arr = [fst];
                for( var i=1; i<num; i++ ) arr[i] = func( arr[i-1] );
                return arr
            }.bind( this, func, fst )
        },

        repeat: function( elem ){
            var pe = Data.Private.permit( arguments, this, 1 );
            if( pe != true ) return pe;

            return function( elem, num ){
                var arr = [];
                for( var i=0; i<num; i++ ) arr[i] = elem;
                return arr
            }.bind( this, elem )
        },

        replicate: function( num, elem ){
            var pe = Data.Private.permit( arguments, this, 2 );
            if( pe != true ) return pe;
            
            return this.repeat( elem )( num )
        },

        cycle: function( xs ){
            var pe = Data.Private.permit( arguments, this, 1 );
            if( pe != true ) return pe;
            
            return function( xs, num ){
                var arr = [];
                for( var i=0; i<Math.floor( num/xs.length )+1; i++ ) arr = arr.concat( xs );
                return arr.splice( 0, num )
            }.bind( this, xs )
        },
        
        /* ----- ----- unfoldr ----- ----- */
        
        unfoldr: function( func, fst ){
            var pe = Data.Private.permit( arguments, this, 2 );
            if( pe != true ) return pe;
            
            var re = func( fst );
            if( !re ) return [].concat( func( fst ) )
            return [].concat( func( fst ), arguments.callee( func, re ) )
        },
        
        /* ----- ----- 部分リストの操作 ----- ----- */
        
        take: function( num, xs ){
            var pe = Data.Private.permit( arguments, this, 2 );
            if( pe != true ) return pe;
            
            var _xs = xs.concat();
            return _xs.splice( 0, num )
        },

        drop: function( num, xs ){
            var pe = Data.Private.permit( arguments, this, 2 );
            if( pe != true ) return pe;
            
            var _xs = xs.concat();
            return _xs.splice( num, _xs.length )
        },

        splitAt: function( num, xs ){
            var pe = Data.Private.permit( arguments, this, 2 );
            if( pe != true ) return pe;
            
            var _xs = xs.concat();
            return [_xs.splice( 0, num ),_xs]
        },

        takeWhile: function( func, xs ){
            var pe = Data.Private.permit( arguments, this, 2 );
            if( pe != true ) return pe;
            
            var arr = [];
            for( var i=0; i<xs.length; i++ ){
                if( func( xs[i] ) ) arr[arr.length] = xs[i];
                else return arr
            }
            return arr
        },

        dropWhile: function( func, xs ){
            var pe = Data.Private.permit( arguments, this, 2 );
            if( pe != true ) return pe;
            
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
            var pe = Data.Private.permit( arguments, this, 2 );
            if( pe != true ) return pe;
            
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
            var pe = Data.Private.permit( arguments, this, 2 );
            if( pe != true ) return pe;
            
             var ys = [],zs = [];

             var flg = true;
             for (var i = 0; i < xs.length; i++) {

                 if (flg && func( xs[i] )) ys[ys.length] = xs[i];
                 else {
                     flg = false;
                     zs[zs.length] = xs[i]
                 }

             }

             return [ys, zs]            
        },

        'break': function( func, xs ){
            var pe = Data.Private.permit( arguments, this, 2 );
            if( pe != true ) return pe;
            
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
            var pe = Data.Private.permit( arguments, this, 2 );
            if( pe != true ) return pe;
            
            var ar2 = this.splitAt( arr1.length, arr2 )
            return this.isPrefixOf( arr1, ar2[0] ) ? ar2[1] : false 
        },

        group: function( xs ){
            var pe = Data.Private.permit( arguments, this, 1 );
            if( pe != true ) return pe;
            
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
            var pe = Data.Private.permit( arguments, this, 1 );
            if( pe != true ) return pe;
            
            var arr = [[]], _xs = xs.concat();
            var j = 0;
            for( var i=0; i<xs.length; i++ ) arr[arr.length] = [];
            for( var i=1; i<arr.length; i++ ) arr[i] = arr[i-1].concat( _xs.shift() );
            return arr
        },

        tails: function( xs ){
            var pe = Data.Private.permit( arguments, this, 1 );
            if( pe != true ) return pe;
            
            return this.reverse( this.inits( xs ) )
        },
        
        /* ----- 述語系 ----- */
        
        isPrefixOf: function( arr1, arr2 ){
            var pe = Data.Private.permit( arguments, this, 2 );
            if( pe != true ) return pe;
            
            return ( arr2.join(',').indexOf( arr1.join(',') ) > -1 ) ? true : false
        },

        isSuffixOf: function( arr1, arr2 ){
            var pe = Data.Private.permit( arguments, this, 2 );
            if( pe != true ) return pe;
            
            return ( arr1.join(',').indexOf( arr2.join(',') ) > -1 ) ? true : false
        },
        
        isInfixOf: function( arr1, arr2 ){
            var pe = Data.Private.permit( arguments, this, 2 );
            if( pe != true ) return pe;
            
            return this.isPrefixOf( arr1, arr2 )
        },
        
        /* ----- 検索系 -----*/
        
        elem: function( elem, xs ){
            var pe = Data.Private.permit( arguments, this, 2 );
            if( pe != true ) return pe;
            
            if( !xs.length ) return false;
            var _xs = xs.concat();
            return ( elem === _xs.shift() ) ? true : arguments.callee( elem, _xs )
        },

        
        notElem: function( elem, xs ){
            var pe = Data.Private.permit( arguments, this, 2 );
            if( pe != true ) return pe;
            
            return this.elem( elem, xs ) ? false : true
        },

        
        lookup: function( index, xs ){
            var pe = Data.Private.permit( arguments, this, 2 );
            if( pe != true ) return pe;
            
            if( xs[0].length > 2 ) return false;
            for( var i=0; i<xs.length; i++ ) if( index == xs[i][0] ) return xs[i][1];
            return false // Nothing
        },
        
        find: function( ex, xs ){
            var pe = Data.Private.permit( arguments, this, 2 );
            if( pe != true ) return pe;
            
            return this.filter( ex, xs )[0]
        },

        filter: function( func, xs ){
            var pe = Data.Private.permit( arguments, this, 2 );
            if( pe != true ) return pe;
            
            /*
            var arr = [];
            for( var i=0; i<xs.length; i++ ) if( func( xs[i] ) ) arr[arr.length] = xs[i];
            return arr
            */
            
            if( !xs.length ) return [];
            var _xs = xs.concat();
            var x = _xs.shift();
            return [].concat(func(x)?x:[],arguments.callee(func,_xs))
        },

        partition: function( func, xs ){
            var pe = Data.Private.permit( arguments, this, 2 );
            if( pe != true ) return pe;
            
            var tru = [], fal = [];
            for( var i=0; i<xs.length; i++ ){
                if( func( xs[i] ) ) tru[tru.length] = xs[i];
                else fal[fal.length] = xs[i]
            }
            return [tru,fal]
        },
        
        /* ----- インデックスによるリストの操作 ----- */
        
        '!!': function( xs, index ){
            var pe = Data.Private.permit( arguments, this, 2 );
            if( pe != true ) return pe;
            
            return xs[index]
        },

        elemIndex: function( index, xs ){
            var pe = Data.Private.permit( arguments, this, 2 );
            if( pe != true ) return pe;
            
            return this.elemIndices( index, xs )[0]
        },

        elemIndices: function( index, xs ){
            var pe = Data.Private.permit( arguments, this, 2 );
            if( pe != true ) return pe;
            
            var arr = [];
            for( var i=0; i<xs.length; i++ ) if( index === xs[i] ) arr[arr.length] = i;
            return arr
        },

        findIndex: function( func, xs ){
            var pe = Data.Private.permit( arguments, this, 2 );
            if( pe != true ) return pe;
            
            return this.findIndices( func, xs )[0]
        },

        findIndices: function( func, xs ){
            var pe = Data.Private.permit( arguments, this, 2 );
            if( pe != true ) return pe;
            
            var arr = [];
            for( var i=0; i<xs.length; i++ ) if( func(xs[i]) ) arr[arr.length] = i;
            return arr
        },
        
        /* ----- ----- 配列の結合、分解 ----- ----- */
        
        zip: function( xs, ys ){
            var pe = Data.Private.permit( arguments, this, 2 );
            if( pe != true ) return pe;
            
            if( xs.length == 1 || ys.length == 1 ) return [[xs[0], ys[0]]];
            return [[xs.shift(),ys.shift()]].concat( arguments.callee( xs, ys ) )
        },
        
        zip3: function( xs, ys, zs ){
            var pe = Data.Private.permit( arguments, this, 3 );
            if( pe != true ) return pe;
            
            if( xs.length == 1 || ys.length == 1 || zs.length == 1 ) return [[xs[0], ys[0], zs[0]]];
            return [[xs.shift(),ys.shift(),zs.shift()]].concat( arguments.callee( xs, ys, zs ) )
        },
        
        zip4: function( xs, ys, zs, as ){
            var pe = Data.Private.permit( arguments, this, 4 );
            if( pe != true ) return pe;
            
            if( xs.length == 1 || ys.length == 1 || zs.length == 1 || as.length == 1) return [[xs[0], ys[0], zs[0], as[0]]];
            return [[xs.shift(),ys.shift(),zs.shift(),as.shift()]].concat( arguments.callee( xs, ys, zs, as ) )
        },
        
        zip5: function( xs, ys, zs, as, bs ){
            var pe = Data.Private.permit( arguments, this, 5 );
            if( pe != true ) return pe;
            
            if( xs.length == 1 || ys.length == 1 || zs.length == 1 || as.length == 1 || bs.length == 1 ) return [[xs[0], ys[0], zs[0], as[0], bs[0]]];
            return [[xs.shift(),ys.shift(),zs.shift(),as.shift(),bs.shift()]].concat( arguments.callee( xs, ys, zs, as, bs ) )
        },
        
        zip6: function( xs, ys, zs, as, bs, cs ){
            var pe = Data.Private.permit( arguments, this, 6 );
            if( pe != true ) return pe;
            
            if( xs.length == 1 || ys.length == 1 || zs.length == 1 || as.length == 1 || bs.length == 1 || cs.length == 1 ) return [[xs[0], ys[0], zs[0], as[0], bs[0], cs[0]]];
            return [[xs.shift(),ys.shift(),zs.shift(),as.shift(),bs.shift(),cs.shift()]].concat( arguments.callee( xs, ys, zs, as, bs, cs ) )
        },
        
        zip7: function( xs, ys, zs, as, bs, cs, ds ){
            var pe = Data.Private.permit( arguments, this, 7 );
            if( pe != true ) return pe;
            
            if( xs.length == 1 || ys.length == 1 || zs.length == 1 || as.length == 1 || bs.length == 1 || cs.length == 1 || ds.length == 1 ) return [[xs[0], ys[0], zs[0], as[0], bs[0], cs[0], ds[0]]];
            return [[xs.shift(),ys.shift(),zs.shift(),as.shift(),bs.shift(),cs.shift(),ds.shift()]].concat( arguments.callee( xs, ys, zs, as, bs, cs, ds ) )
        },
        
        zipWith: function( func, xs, ys ){
            var pe = Data.Private.permit( arguments, this, 3 );
            if( pe != true ) return pe;
            
            if( xs.length == 1 || ys.length == 1 ) return func( xs[0], ys[0] );
            return [].concat( func( xs.shift(), ys.shift() ), arguments.callee( func, xs, ys ) )
        },
        
        zipWith3: function( func, xs, ys, zs ){
            var pe = Data.Private.permit( arguments, this, 4 );
            if( pe != true ) return pe;
            
            if( xs.length == 1 || ys.length == 1 || zs.length == 1 ) return func( xs[0], ys[0], zs[0] );
            return [].concat( func( xs.shift(), ys.shift(), zs.shift() ), arguments.callee( func, xs, ys, zs ) )
        },

        zipWith4: function( func, xs, ys, zs, as ){
            var pe = Data.Private.permit( arguments, this, 5 );
            if( pe != true ) return pe;
            
            if( xs.length == 1 || ys.length == 1 || zs.length == 1 || as.length == 1 ) return func( xs[0], ys[0], zs[0], as[0] );
            return [].concat( func( xs.shift(), ys.shift(), zs.shift(), as.shift() ), arguments.callee( func, xs, ys, zs, as) )
        },

        zipWith5: function( func, xs, ys, zs, as, bs ){
            var pe = Data.Private.permit( arguments, this, 6 );
            if( pe != true ) return pe;
            
            if( xs.length == 1 || ys.length == 1 || zs.length == 1 || as.length == 1 || bs.length == 1) return func( xs[0], ys[0], zs[0], as[0], bs[0] );
            return [].concat( func( xs.shift(), ys.shift(), zs.shift(), as.shift(), bs.shift() ), arguments.callee( func, xs, ys, zs, as, bs ) )
        },

        zipWith6: function( func, xs, ys, zs, as, bs, cs ){
            var pe = Data.Private.permit( arguments, this, 7 );
            if( pe != true ) return pe;
            
            if( xs.length == 1 || ys.length == 1 || zs.length == 1 || as.length == 1 || bs.length == 1 || cs.length == 1) return func( xs[0], ys[0], zs[0], as[0], bs[0], cs[0] );
            return [].concat( func( xs.shift(), ys.shift(), zs.shift(), as.shift(), bs.shift(), cs.shift() ), arguments.callee( func, xs, ys, zs, as, bs, cs ) )
        },

        zipWith7: function( func, xs, ys, zs, as, bs, cs, ds ){
            var pe = Data.Private.permit( arguments, this, 8 );
            if( pe != true ) return pe;
            
            if( xs.length == 1 || ys.length == 1 || zs.length == 1 || as.length == 1 || bs.length == 1 || cs.length == 1 || ds.length == 1) return func( xs[0], ys[0], zs[0], as[0], bs[0], cs[0], ds[0] );
            return [].concat( func( xs.shift(), ys.shift(), zs.shift(), as.shift(), bs.shift(), cs.shift(), ds.shift() ),arguments.callee( func, xs, ys, zs, as, bs, cs, ds ) )
        },
        
        unzip: function( xs ){
            var pe = Data.Private.permit( arguments, this, 1 );
            if( pe != true ) return pe;
            
            var one = [], two = [];
            for( var i=0; i<xs.length; i++ ){
                if(xs[i].length != 2) return false;
                one[i] = xs[i][0];
                two[i] = xs[i][1];
            }
            return [one,two]
        },
        
        unzip3: function( xs ){
            var pe = Data.Private.permit( arguments, this, 1 );
            if( pe != true ) return pe;
            
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
            var pe = Data.Private.permit( arguments, this, 1 );
            if( pe != true ) return pe;
            
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
            var pe = Data.Private.permit( arguments, this, 1 );
            if( pe != true ) return pe;
            
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
            var pe = Data.Private.permit( arguments, this, 1 );
            if( pe != true ) return pe;
            
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
            var pe = Data.Private.permit( arguments, this, 1 );
            if( pe != true ) return pe;
            
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
        
        /* ----- 文字列用の関数 ----- */

        lines: function( line ){
            var pe = Data.Private.permit( arguments, this, 1 );
            if( pe != true ) return pe;
            
            return line.split(/\n/)
        },

        words: function( line ){
            var pe = Data.Private.permit( arguments, this, 1 );
            if( pe != true ) return pe;
            
            return line.split(/\s/)
        },

        unlines: function( xs ){
            var pe = Data.Private.permit( arguments, this, 1 );
            if( pe != true ) return pe;
            
            return xs.join('\n')
        },

        unwords: function( xs ){
            var pe = Data.Private.permit( arguments, this, 1 );
            if( pe != true ) return pe;
            
            return xs.join(' ')
        },

        /* ----- ----- 集合演算 ----- ----- */
        
        nub: function( xs ){
            var pe = Data.Private.permit( arguments, this, 1 );
            if( pe != true ) return pe;
            
            return xs.filter( function ( x, i, self ){
                return self.indexOf(x) === i
            } )
        },
        
        delete: function( elem, xs ){
            var pe = Data.Private.permit( arguments, this, 2 );
            if( pe != true ) return pe;
            
            var _xs = xs.concat();
            if( _xs.indexOf(elem) > -1 ) delete _xs.splice( _xs.indexOf(elem), 1 );
            return _xs
        },

        '\\': function( arr1, arr2 ){
            var pe = Data.Private.permit( arguments, this, 2 );
            if( pe != true ) return pe;
    
            for( var i=0; i<arr2.length; i++ ) if( arr1.indexOf( arr2[i] ) > -1 ) arr1.splice( arr1.indexOf(arr2[i]), 1 );
            return arr1;
        },
        
        union: function( arr1, arr2 ){
            var pe = Data.Private.permit( arguments, this, 2 );
            if( pe != true ) return pe;
            
            return this.nub( arr1.concat( arr2 ) )
        },
 
        intersect: function( arr1, arr2 ){
            var pe = Data.Private.permit( arguments, this, 2 );
            if( pe != true ) return pe;
            
            var arr = [];
            for( var i=0; i<arr1.length; i++ ) for( var j=0; j<arr2.length; j++ ) if( arr1[i] === arr2[j] ) arr[arr.length] = arr1[i];
            return arr
        },
        
                        
       /* ----- 順序づけられたリスト操作 ----- */

        sort: function( xs ){
            var pe = Data.Private.permit( arguments, this, 1 );
            if( pe != true ) return pe;
            
            if( !xs.length ) return [];
            var _xs = xs.concat();
            var base  = _xs.shift(),
                small = _xs.filter(function(e){ return e <= base }),
                large = _xs.filter(function(e){ return e >  base });
            return arguments.callee(small).concat(base,arguments.callee(large))
        },
        
        insert: function( elem, xs ){
            var pe = Data.Private.permit( arguments, this, 2 );
            if( pe != true ) return pe;

            return [elem].concat( xs )
        },
        
        /* ----- ----- Generalized functions - The "By" operations - User-supplied equality (replacing an Eq context) ----- ----- */
        
        nubBy: function( eq, xs ){
            var pe = Data.Private.permit( arguments, this, 2 );
            if( pe != true ) return pe;
            
            if( !xs.length ) return [];
            var _xs = xs.concat();
            
            var x = _xs.shift()
            var func = function( y ){
                return !eq(y,x)
            }
            return [x].concat( arguments.callee( eq, Data.List.filter( func, _xs ) ) )
        },

        deleteBy: function( eq, x, ys ){
            var pe = Data.Private.permit( arguments, this, 3 );
            if( pe != true ) return pe;

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
            var pe = Data.Private.permit( arguments, this, 3 );
            if( pe != true ) return pe;
            
            var flip = function( f, x, y){
                if( !f ) return arguments.callee;
                if( !x ) return arguments.callee.bind(this,f);
                if( !y ) return arguments.callee.bind(this,f,x);
                return f( y, x )
            };
            return this.foldl( flip( this.deleteBy( eq ) ), xs, ys )
        },

        unionBy: function( eq, xs, ys ){
            var pe = Data.Private.permit( arguments, this, 3 );
            if( pe != true ) return pe;
            
            var flip = function( f, x, y ){
                if( !f ) return arguments.callee;
                if( !x ) return arguments.callee.bind(this,f);
                if( !y ) return arguments.callee.bind(this,f,x);
                return f(y,x)
            };
            var arr = [];
            for(var i=0;i<xs.length;i++) arr[i] = xs[i];
            return arr.concat( this.foldl( flip( this.deleteBy( eq ) ), this.nubBy( eq, ys ), xs ) )
        },
        
        intersectBy: function( eq, xs, ys ){
            var pe = Data.Private.permit( arguments, this, 3 );
            if( pe != true ) return pe;
            
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
            var pe = Data.Private.permit( arguments, this, 2 );
            if( pe != true ) return pe;
            
            if ( !xs.length ) return [];
            var _xs = xs.concat();
            var x = _xs.shift();
            var _sp = this.span( eq.bind( this, x ), _xs );
            var ys = _sp[0];
            var zs = _sp[1];
            return [[x].concat( ys )].concat( this.groupBy( eq, zs ) )
        },
        
        /* ----- ----- Generalized functions - The "By" operations - User-supplied comparison (replacing an Ord context) ----- ----- */
        
        sortBy: function( cmp, xs ){
            var pe = Data.Private.permit( arguments, this, 2 );
            if( pe != true ) return pe;
            
            return this.foldr( this.insertBy( cmp ), [], xs )
        },

         

        insertBy: function( cmp, x, ys ){
            var pe = Data.Private.permit( arguments, this, 3 );
            if( pe != true ) return pe;
            
            if( !ys.length ) return [x];

            var y = ys[0];
            var ys_ = [];
            for(var i=1;i<ys.length;i++) ys_[ys_.length] = ys[i];
            
            switch( cmp( x, y ) ){
                    case 'GT':
                    return [y].concat(this.insertBy(cmp,x,ys_));
                    break;
                    default:
                    return [x].concat(ys)
            }
        },

        maximumBy: function( cmp, xs ){
            var pe = Data.Private.permit( arguments, this, 2 );
            if( pe != true ) return pe;
            
            var maxBy = function(x,y){
                switch( cmp( x, y )){
                        case 'GT':
                        return x;
                        break;
                        default:
                        return y;
                }
            }
            return this.foldl1( maxBy, xs )
        },
        
        minimumBy: function( cmp, xs ){
            var pe = Data.Private.permit( arguments, this, 2 );
            if( pe != true ) return pe;
            
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
        
    };
    
    /* ----- ----- 同じ動作のもの（扱い）を追加 ----- ------ */
    
    Data.List["foldl'"] = Data.List.foldl;
    Data.List["foldl1'"] = Data.List.foldl1;
    Data.List.genericLength = Data.List.length;
    Data.List.genericTake = Data.List.take;
    Data.List.genericDrop = Data.List.drop;
    Data.List.genericSplitAt = Data.List.splitAt;
    Data.List.genericIndex = Data.List['!!'];
    Data.List.genericReplicate = Data.List.replicate;
    
    /* ----- ----- Data.Private ----- ----- */
    
    Data.Private = {
        
        permit: function( args, self, num ){
            var arr = [].slice.call(args);
            return num > arr.length 
                ? args.callee.bind.apply( args.callee, [self].concat( arr ) ) 
                : true;
        },
        
        // subsequences
        nonEmptySubsequences: function( xs ){
            if( !xs.length ) return [];
            var _xs = xs.concat(),
                x   = _xs.shift(),
                f   = function( _x, ys, r ){
                    return [ys].concat([[x].concat(ys)],r)
                }.bind(this,x);
            return [[x]].concat(Data.List.foldr(f,[],this.nonEmptySubsequences( _xs )))
        }
        
    };
    
    /* ----- ----- Export ----- ----- */
    
    exports.Data = { List: Data.List /*, Private: Data.Private */ }
    
})( window )
