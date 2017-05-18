/**
 * Created by jessic on 2017/5/18.
 */
var Mock=require('mockjs');
var $=require('jquery');
var data=Mock.mock('hello/test','post',{
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-10': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1,
        'name': '@name',
        'color': '@color',
        'url': '@url',
        'email': '@email',
        'friends|3': [{name: '@name'}],
        'price|10-20.2-5': 11,
        'cost|10-20.3': 11,
        'test|3.2-5': 52,
        'yourname|2-4': 'alice-'
    }]
});
/*console.log(JSON.stringify(data, null, 4));*/
$.ajax({
    url:'hello/test',
    type:"post",
    data:{
        id:2
    },
    dataType: 'json',
    success: function(data, status, jqXHR) {
       console.log(data);
       console.log(data.list);
    }
});
