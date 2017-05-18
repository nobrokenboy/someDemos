/**
 * Created by jessic on 2017/5/18.
 */
var Mock=require('mockjs');
var $=require('jquery');
var data=Mock.mock('hello/test','post',{
    // ���� list ��ֵ��һ�����飬���к��� 1 �� 10 ��Ԫ��
    'list|1-10': [{
        // ���� id ��һ������������ʼֵΪ 1��ÿ���� 1
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
