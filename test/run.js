console.time('a')

console.log( Data.List['++']( [1,2,3], [4,5,6] ) )
console.log( Data.List.head([1,2]) )
console.log( Data.List.last([1,2,3]) )
console.log( Data.List.tail([1,2,3]) )
console.log( Data.List.init([1,2,3]) )
console.log( Data.List.uncons([1,2,3]) )
console.log( Data.List['null']([]) )
console.log( Data.List.length([]) )

console.log( Data.List.map(function(x){
    return x*2
},[1,2,3,4,5]) )
console.log( Data.List.reverse([1,[2],3,4,5]) )
console.log( Data.List.intersperse(5,[1,2,3,2,1]) )
console.log( Data.List.intercalate( [1,2],[[3,4],[5,6],[7,8]]) )
console.log( Data.List.transpose( [[1,2],[5,6]] ))
console.log( Data.List.subsequences( [1,2,3] ))
console.log( Data.List.permutation()( [1,2,3] ))

console.log( Data.List.foldl( function(x,y){ return x + y }, 0, [1,2,3,4,5] ) )
console.log( Data.List["foldl'"]( function(x,y){ return x + y }, 0, [1,2,3,4,5] ) )
console.log( Data.List.foldl1( function(x,y){ return x + y })( [1,2,3,4,5] ) )
console.log( Data.List["foldl1'"]( function(x,y){ return x + y }, [1,2,3,4,5] ) )
console.log( Data.List.foldr( function(x,y){ return x + y }, 0, [1,2,3,4,5] ) )
console.log( Data.List.foldr1( function(x,y){ return x + y })( [1,2,3,4,5] ) )

console.log( Data.List.concat([[1],[2],[3]]) )
console.log( Data.List.concatMap(function(x){
    return x.concat([2])
},[[1],[2],[3]]) )
console.log( Data.List.and([true,1,false]) )
console.log( Data.List.or([false,1,false]) )
console.log( Data.List.any(function(x){
    return x < 5
},[6,5,9,7]) )
console.log( Data.List.all(function(x){
    return x < 5
},[2,1,3,4]) )
console.log( Data.List.sum([5,4,7,4,2,32,87]) )
console.log( Data.List.product([5,4,7,4,2,32,87]) )
console.log( Data.List.maximum([5,4,7,4,2,32,87]) )
console.log( Data.List.minimum([5,4,7,4,2,32,87]) )

console.log(Data.List.scanl(function(x,y){return x+y},0,[1,2,3,4,5]))
console.log(Data.List.scanl1(function(x,y){return x+y},[1,2,3,4,5]))
console.log(Data.List.scanr(function(x,y){return x+y},0,[1,2,3,4,5]))
console.log(Data.List.scanr1(function(x,y){return x+y},[1,2,3,4,5]))

console.log( Data.List.mapAccumL(function(x,y){
    return [x*y,x+y]
},1,[1,2,3,4,5]))
console.log( Data.List.mapAccumR(function(x,y){
    return [x*y,x+y]
},1,[1,2,3,4,5]))

console.log( Data.List.iterate(function(x){return x*2},2)(4) )
console.log( Data.List.repeat(2)(4) )
console.log( Data.List.replicate(4)(2) )
console.log( Data.List.cycle([1,2,3])(11) )

console.log( Data.List.unfoldr(function(x){
    if( x < 0 ) return false
    return x - 2
},10))

console.log( Data.List.take(2,[1,2,3,4,5]) )
console.log( Data.List.drop(2,[1,2,3,4,5]) )
console.log( Data.List.splitAt(2,[1,2,3,4,5]) )
console.log( Data.List.takeWhile(function(x){
    return x < 3
},[1,2,3,4,5]) )
console.log( Data.List.dropWhile(function(x){
    return x < 3
},[1,2,3,4,5]) )
console.log( Data.List.dropWhileEnd(function(x){
    return x > 3
},[1,2,3,4,5]) )
console.log( Data.List.span(function(x){
    return x < 3
},[1,2,3,4,5]) )
console.log( Data.List.break(function(x){
    return x < 3
},[4,2,3,4,5]) )
console.log( Data.List.stripPrefix([1,2,3],[1,2,3,4,5]) )
console.log( Data.List.group([1,1,2,3,3,3,4,5]) )
console.log( Data.List.inits([1,2,3,4,5]) )
console.log( Data.List.tails([1,2,3,4,5]) )

console.log( Data.List.isPrefixOf([1,2,3],[1,2,3,4,5]) )
console.log( Data.List.isSuffixOf([1,2,3,4,5],[1,2,3]) )
console.log( Data.List.isInfixOf([1,2,3],[1,2,3,5]) )
console.log( Data.List.isSubsequenceOf([1,2,3],[2,1,2,3,4]) )

console.log( Data.List.elem(5,[1,2,3,4,5]) )
console.log( Data.List.notElem(5,[1,2,3,4]) )
console.log( Data.List.lookup(2,[[1,2],[3,4],[5,5],[2,1]]) )

console.log( Data.List.find(function(x){return x<5},[5,4,3]) )
console.log( Data.List.filter(function(x){return x<5},[5,4,3]) )
console.log( Data.List.partition(function(x){return x<5},[5,6,7,4,3,6]) )

console.log( Data.List['!!']([1,2,3,4,5],3))
console.log( Data.List.elemIndex(3,[1,2,3,4,5]))
console.log( Data.List.elemIndices(3,[1,2,3,4,3,5]))
console.log( Data.List.findIndex(function(x){
    return x > 4 
},[1,2,3,4,3,5]))
console.log( Data.List.findIndices(function(x){
    return x > 4 
},[1,2,3,4,5,7,3,5]))

console.log( Data.List.zip([1,2,3,4],[9,8,7,6]) )
console.log( Data.List.zip3([1,2,3,4],[9,8,7,6],[1,2,3,4]) )
console.log( Data.List.zip4([1,2,3,4],[9,8,7,6],[1,2,3,4],[9,8,7,6]) )
console.log( Data.List.zip5([1,2,3,4],[9,8,7,6],[1,2,3,4],[9,8,7,6],[1,2,3,4,5]) )
console.log( Data.List.zip6([1,2,3,4],[9,8,7,6],[1,2,3,4],[9,8,7,6],[1,2,3,4,5],[9,8,7,6]) )
console.log( Data.List.zip7([1,2,3,4],[9,8,7,6],[1,2,3,4],[9,8,7,6],[1,2,3,4,5],[9,8,7,6],[1,2,3,4]) )
console.log( Data.List.zipWith(function(x,y){
    return x + y
},[1,2,3,4],[9,8,7,6]) )
console.log( Data.List.zipWith3(function(x,y,z){
    return x + y + z
},[1,2,3,4],[9,8,7,6],[1,2,3,4]) )
console.log( Data.List.zipWith4(function(x,y,z,a){
    return x + y + z + a
},[1,2,3,4],[9,8,7,6],[1,2,3,4],[9,8,7,6]) )
console.log( Data.List.zipWith5(function(x,y,z,a,b){
    return x + y + z + a + b
},[1,2,3,4],[9,8,7,6],[1,2,3,4],[9,8,7,6],[1,2,3,4,5]) )
console.log( Data.List.zipWith6(function(x,y,z,a,b,c){
    return x + y + z + a + b + c
},[1,2,3,4],[9,8,7,6],[1,2,3,4],[9,8,7,6],[1,2,3,4,5],[9,8,7,6]) )
console.log( Data.List.zipWith7(function(x,y,z,a,b,c,d){
    return x + y + z + a + b + c + d
},[1,2,3,4],[9,8,7,6],[1,2,3,4],[9,8,7,6],[1,2,3,4,5],[9,8,7,6],[1,2,3,4]) )
console.log( Data.List.unzip([[1,3],[2,4]]) )
console.log( Data.List.unzip3([[1,3,5],[2,4,6]]) )
console.log( Data.List.unzip4([[1,3,5,7],[2,4,6,8]]) )
console.log( Data.List.unzip5([[1,3,5,7,9],[2,4,6,8,10]]) )
console.log( Data.List.unzip6([[1,3,5,7,9,11],[2,4,6,8,10,12]]) )
console.log( Data.List.unzip7([[1,3,5,7,9,11,13],[2,4,6,8,10,12,14]]) )

console.log( Data.List.lines('ABC\nDEF\nGHI') )
console.log( Data.List.words('ABC DEF GHI') )
console.log( Data.List.unlines( Data.List.lines('ABC\nDEF\nGHI') ) )
console.log( Data.List.unwords( Data.List.words('ABC DEF GHI') ) )

console.log( Data.List.nub([1,1,2,3,3,4,5]) )
console.log( Data.List.delete(4,[1,1,2,4,3,3,4,5]) )
console.log( Data.List['\\']([1,2,3,4,5],[1,2,3]) )
console.log( Data.List.union([1,2,3,4,5],[3,4,6,7,8]) )
console.log( Data.List.intersect([1,2,3,4,5],[3,4,6,7,8]) )

console.log( Data.List.sort([1,3,2,6,8,5,4]) )
console.log( Data.List.sortOn(function(x){
	return x < 3
}, [3,5,2,1,3,2]))
console.log( Data.List.insert(5,[1,3,2,6,8,5,4]) )

console.log( Data.List.nubBy(function(x,y){
    return x < y
},[1,2,1,2,3,1,5,4,3,2,6,8,4]) )
console.log( Data.List.deleteBy(function(x,y){
    return x < y
},5,[1,2,6]) )
console.log( Data.List.deleteFirstsBy(function(x,y){
    return x < y
},[1,2,3,4,5],[1,2]) )
console.log( Data.List.unionBy(function(x,y){
    return x < y
},[1,2,3,4,5],[1,2]) )
console.log( Data.List.intersectBy(function(x,y){
    return x < y
},[1,2,3,4],[1,2,3,5,2]))
console.log( Data.List.groupBy(function(x,y){
    return x < y
},[1,2,1,2,3]) )

console.log( Data.List.sortBy(function(x,y){
    return x < y ? 'LT' : 'GT'
},[1,4,3,2,6]) )
console.log( Data.List.insertBy(function(x,y){
    return (x < y) ? 'LT' : 'GT'
},5,[1,2,3,4,5,6,4,3,2]) )
console.log( Data.List.maximumBy(function(x,y){
    if(x < y) return 'LT'
    else return 'GT'
},[1,2,6,4,5]) )
console.log( Data.List.minimumBy(function(x,y){
    if(x < y) return 'LT'
    else return 'GT'
},[1,2,6,4,5]) )

console.log( Data.List.genericLength([1,2,3,4,5]) )
console.log( Data.List.genericTake(2,[1,2,3,4,5]) )
console.log( Data.List.genericDrop(2,[1,2,3,4,5]) )
console.log( Data.List.genericSplitAt(2,[1,2,3,4,5]) )
console.log( Data.List.genericIndex([1,2,3,4,5],2) )
console.log( Data.List.genericReplicate(5,[1,2,3,4,5]) )

console.timeEnd('a')