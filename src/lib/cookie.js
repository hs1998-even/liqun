//创建cookie
// createCookie('姓名','张三',{expires : 7,path : '/'})
function createCookie(key,value,json){
    //初始化参数
    json = json || {};
    let cookie_str = encodeURIComponent(key) + '=' + encodeURIComponent(value);
    //有效期，是否为数字
    if(!isNaN(json.expires)){
        let date = new Date();
        date.setDate(date.getDate() + json.expires);
        cookie_str += ';expires=' + date;
    }
    //路径
    if(json.path){
        cookie_str += ';path=' + json.path;
    }
    //域
    if(json.domain){
        cookie_str += ';domain=' + json.domain;
    }
    //安全
    if(json.secure){
        cookie_str += ';secure';
    }
    //创建cookie
    document.cookie = cookie_str;
}
// createCookie('name','tom',{expires : 5});
// createCookie('url','www.tom.com',{expires : 6});
// createCookie('email','tom@1000phone.com',{expires : 7});
// alert(document.cookie);
//获取cookie
//getCookie('姓名')     返回张三
/*
'name=tom; url=www.tom.com; email=tom%401000phone.com'
截取：
    substring(start,end)
    substr(start,length)
    slice(start,end)

                name        url      email
    start       0           10       27       + key.length

    end         8           25
*/
function getCookie(key){
    let arr = document.cookie.split('; '); //['name=tom','url=www.tom.com','email=tom%401000phone.com']
    //遍历数组
    for(let i = 0,len = arr.length;i < len;i ++){
        let list = arr[i].split('=');
        //[ ['name','tom' ], ['url','www.tom.com'], ['email','tom%401000phone.com']]
        // list = ['name','tom' ]
        // list = ['url','www.tom.com']
        // list = ['email','tom%401000phone.com']
        if(list[0] === encodeURIComponent(key)){
            return decodeURIComponent(list[1]);
        }
    }
}
function gainCookie(key){
    let parent_str = document.cookie;
    let _key = encodeURIComponent(key) + '=';
    let start = parent_str.indexOf(_key);
    if(start !== -1){
        let end = parent_str.indexOf(';',start);
        if(end === -1){
            end = parent_str.length;
        }
        return decodeURIComponent(parent_str.substring(start + _key.length,end))
    }
}

//删除cookie
//removeCookie('姓名');
function removeCookie(key,json){
    //初始化参数
    json = json || {};
    if(json.path){ //设置过路径 
        document.cookie = encodeURIComponent(key) + '=;expires=' + new Date(0) + ';path=' + json.path;
    }else{ // 未设置过路径 
        document.cookie = encodeURIComponent(key) + '=;expires=' + new Date(0);
    }
}
// removeCookie('url',{path : '/'});

// createCookie('name','',{expires : -1});