window.onload = function(){
    let arr = [false,false];
    //前端正则验证
    $('#user').blur(function(){
        let re = /^(15|19|17|13)\d{9}$/;
        if (re.test($(this).val())) {
            arr[0] = true;
        } else {
            arr[0] = false;
        }
    })
    $('#upwd').blur(function(){
        let re = /^\w{6,18}$/;
        if(re.test($(this).val())){
             arr[1] = true;
        }else{
            arr[1] = false;
         }
    })
    $('.login-btn').click(function(){
        if(arr.indexOf(false) === -1){
            //后端验证
            let user = $('#user').val();
            let upwd = $('#upwd').val();
            //获取cookie
            let cookie_str =getCookie('users') ? getCookie('users'):'';
            //转为对象
            let cookie_obj = convertStrToObj(cookie_str);
            //判断对象中是否存在当前用户
            if(user in cookie_obj){
                //判断密码是否正确
               
                if(upwd === cookie_obj[user]){
                    createCookie('users',JSON.stringify(cookie_obj),{expires : 10,path : '/'});
                    location.href = '../../dist/index.html';
                   
                }else{
                    $('.login-false').css("display","block");
                }
            }else{
                alert('未注册');
            }
        }else{
            alert('信息不完整');
        }
    })
}
function convertStrToObj(str){
    if(!str){
        return {};
    }
    return JSON.parse(str);
}